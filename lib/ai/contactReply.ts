type ContactReplyResult = {
  summary: string;
  intent: string;
  draft: string;
  next_steps: string[];
};

const SYSTEM_PROMPT = `
Tu es un assistant interne utilisé par ORCHESTRA,
un démonstrateur de cabinet de conseil en management augmenté par l’IA.

IMPORTANT :
- Tu es un outil d’aide à la réflexion et à la rédaction.
- Tu n’es PAS un décideur.
- Tu ne t’engages jamais au nom de l’entreprise.
- Toute réponse doit être relue et validée par un humain.

CONTEXTE ORCHESTRA :
ORCHESTRA illustre une posture de conseil où l’IA agit comme copilote.
Les décisions, engagements et responsabilités sont toujours humaines.
Aucune promesse de résultat, de délai ou de budget ne doit être formulée.

MISSION :
À partir du message reçu via le formulaire de contact,
produis une PRÉ-RÉPONSE PROFESSIONNELLE destinée à un humain,
qui pourra ensuite l’adapter et l’envoyer manuellement.

RÈGLES ABSOLUES :
- Ne promets jamais de résultats, délais ou prix.
- Ne prends aucune décision commerciale.
- Ne parles pas comme un représentant engageant de l’entreprise.
- N’utilise pas de ton marketing agressif.
- Reste factuel, clair et professionnel.
- Si la demande est floue ou engageante, explicite les limites
  et propose un échange humain.

FORMAT DE SORTIE OBLIGATOIRE (JSON UNIQUEMENT) :
{
  "summary": "string",
  "intent": "string",
  "draft": "string",
  "next_steps": ["string", "string"]
}

Contraintes :
- next_steps : 1 à 3 éléments maximum
- Réponds UNIQUEMENT avec du JSON valide (aucun texte autour).
`.trim();

function getEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

function assertReplyShape(data: any): ContactReplyResult {
  if (!data || typeof data !== "object") throw new Error("Invalid AI JSON (not an object)");
  const { summary, intent, draft, next_steps } = data;

  if (typeof summary !== "string") throw new Error("Invalid AI JSON: summary");
  if (typeof intent !== "string") throw new Error("Invalid AI JSON: intent");
  if (typeof draft !== "string") throw new Error("Invalid AI JSON: draft");
  if (!Array.isArray(next_steps)) throw new Error("Invalid AI JSON: next_steps");
  if (next_steps.length < 1 || next_steps.length > 3) throw new Error("Invalid AI JSON: next_steps length");
  for (const s of next_steps) if (typeof s !== "string") throw new Error("Invalid AI JSON: next_steps item");

  return { summary, intent, draft, next_steps };
}

export async function generateContactReply(input: {
  full_name?: string | null;
  company?: string | null;
  email?: string | null; // pas utilisé dans le prompt si tu veux rester strict
  message: string;
}): Promise<ContactReplyResult> {
  const apiKey = getEnv("OPENAI_API_KEY");
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  const userContent = [
    "Données du contact (à utiliser uniquement pour contextualiser le brouillon, sans engagement) :",
    `- Nom: ${input.full_name ?? "non renseigné"}`,
    `- Organisation: ${input.company ?? "non renseignée"}`,
    "",
    "Message du prospect :",
    input.message,
  ].join("\n");

  // Timeout simple (évite que la route “pend”)
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        max_tokens: 400,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userContent },
        ],
      }),
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(`OpenAI API error: ${res.status} ${txt}`.slice(0, 300));
    }

    const json = await res.json();
    const content = json?.choices?.[0]?.message?.content;

    if (!content || typeof content !== "string") {
      throw new Error("OpenAI API: missing message content");
    }

    // On s’attend à du JSON pur
    const parsed = JSON.parse(content);
    return assertReplyShape(parsed);
  } finally {
    clearTimeout(timeout);
  }
}
