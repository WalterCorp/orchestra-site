import OpenAI from "openai";
import { ORCHESTRA_KNOWLEDGE_EXTRACT } from "./knowledgeExtract";
import type { AssistantInput, AssistantOutput } from "@/app/api/assistant/route";

/**
 * ORCHESTRA — Assistant IA
 * Logique métier du chatbot (Phase 5)
 *
 * Ce fichier est volontairement séparé de la route HTTP.
 * Il gère :
 * - La composition du prompt système
 * - L'injection du knowledge extract
 * - L'appel OpenAI
 * - Le parsing de la réponse structurée
 * - Le fallback en cas d'erreur
 *
 * Gouvernance :
 * - Clé OpenAI côté serveur uniquement (variable d'environnement)
 * - Température basse (0.3) pour des réponses stables
 * - Tokens limités (350) pour des réponses concises
 * - Aucune promesse commerciale dans le prompt
 */

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Prompt système versionné — v1.0
const SYSTEM_PROMPT = `
Tu es l'assistant ORCHESTRA, un cabinet de conseil en stratégie et organisation
qui collabore avec l'intelligence artificielle de manière structurée et gouvernée.

Ton rôle :
- Répondre aux questions sur la méthode, les expertises et le fonctionnement du cabinet
- Orienter l'utilisateur vers la bonne page du site si pertinent
- Clarifier un besoin en posant 1 à 2 questions maximum si nécessaire
- Proposer un échange humain si le besoin est complexe ou dépasse ton périmètre

Règles absolues — ne jamais enfreindre :
- Ne jamais donner de prix, tarif ou estimation de coût
- Ne jamais promettre un délai ou un résultat
- Ne jamais t'engager contractuellement au nom du cabinet
- Ne jamais donner d'avis juridique, fiscal ou financier
- Ne jamais collecter de données personnelles
- Si tu ne sais pas : orienter vers le formulaire de contact
- Réponse maximale : 180 mots
- Ton : professionnel, neutre, bienveillant, jamais commercial

Si la question est large ou générale (ex: "je veux restructurer mon organisation") :

1) Donne une première orientation concise
2) Propose une question de clarification (1 seule)
3) Oriente vers une page pertinente (/expertises ou /fonctionnement)
4) Ne mets suggestContact à true que si l'utilisateur exprime explicitement un besoin d'accompagnement concret.

IMPORTANT :
Ne mets suggestContact à true QUE si l'utilisateur :
- demande explicitement un rendez-vous, un échange ou un accompagnement,
OU
- pose une question nécessitant une responsabilité humaine directe.

Dans tous les autres cas, laisse suggestContact à false.

Format de réponse — tu dois toujours répondre en JSON valide, sans texte autour :
{
  "answer": "ta réponse ici (180 mots max)",
  "suggestedPage": "/route-si-pertinent-ou-null",
  "suggestContact": true ou false
}

suggestedPage : uniquement si tu peux orienter vers une page précise du site.
Pages disponibles : /, /cabinet, /methode, /fonctionnement, /expertises, /faq, /contact
Si aucune page n'est particulièrement pertinente, mets null.

suggestContact : true uniquement si le besoin nécessite clairement un échange humain.

--- CONTEXTE ORCHESTRA ---
${ORCHESTRA_KNOWLEDGE_EXTRACT}
`;

// Fallback si OpenAI est indisponible ou retourne une réponse invalide
const FALLBACK_RESPONSE: AssistantOutput = {
  answer:
    "Je ne suis pas en mesure de répondre pour le moment. " +
    "N'hésitez pas à nous contacter directement via notre formulaire, " +
    "un expert vous répondra sous 24-48h ouvrées.",
  suggestedPage: "/contact",
  suggestContact: true,
};

/**
 * Génère une réponse de l'assistant IA à partir d'une question utilisateur.
 * Retourne toujours une réponse valide (fallback si erreur).
 */
export async function generateAssistantResponse(
  input: AssistantInput
): Promise<AssistantOutput> {
  const { question, pageContext, conversation = [] } = input;

  // Construction des messages pour OpenAI
  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: pageContext
        ? `${SYSTEM_PROMPT}\n\nPage actuelle consultée par l'utilisateur : ${pageContext}`
        : SYSTEM_PROMPT,
    },
    // Historique de la conversation (limité à 6 messages max — validé en amont)
    ...conversation.map((msg) => ({
      role: msg.role as "user" | "assistant",
      content: msg.content,
    })),
    // Question actuelle
    {
      role: "user",
      content: question,
    },
  ];

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.3,       // Réponses stables et cohérentes
      max_tokens: 350,        // Limite stricte de longueur
      response_format: { type: "json_object" }, // Force le JSON en sortie
    });

    const rawContent = completion.choices[0]?.message?.content;

    if (!rawContent) {
      console.error("[assistant] empty response from OpenAI");
      return FALLBACK_RESPONSE;
    }

    // Parsing de la réponse JSON
    const parsed = JSON.parse(rawContent);

    // Validation minimale de la structure
    if (typeof parsed.answer !== "string" || parsed.answer.trim().length === 0) {
      console.error("[assistant] invalid response structure", parsed);
      return FALLBACK_RESPONSE;
    }

    return {
     answer: parsed.answer.trim(),
    suggestedPage:
    typeof parsed.suggestedPage === "string" &&
    parsed.suggestedPage.trim().length > 0
      ? parsed.suggestedPage.trim()
      : undefined,
    suggestContact: parsed.suggestContact === true,
  };

  } catch (error) {
    // Gestion spécifique quota insuffisant (HTTP 429)
    if (error instanceof OpenAI.APIError && error.status === 429) {
      console.error("[assistant] OpenAI quota exceeded");
    } else {
      console.error("[assistant] OpenAI error", {
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }

    return FALLBACK_RESPONSE;
  }
}