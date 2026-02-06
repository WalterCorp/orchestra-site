/**
 * ORCHESTRA — Contact Pro API
 * ---------------------------
 * Endpoint server-side destiné à recevoir les demandes de contact.
 *
 * Commit 1 (squelette) :
 * - vérifie méthode / JSON
 * - répond OK si le pipeline fonctionne
 *
 * Commit 2 (ce fichier) :
 * - ajoute la validation serveur (email + message)
 * - normalise les champs (trim + limites)
 * - renvoie des erreurs structurées (400) si besoin
 *
 * Les commits suivants ajouteront :
 * - anti-spam (honeypot)
 * - logs minimaux (sans PII)
 * - option webhook n8n (non bloquante)
 */

import { NextResponse } from "next/server";

/**
 * Contrat d’entrée (MVP) — on garde volontairement simple.
 * Les champs non listés seront ignorés.
 */
type ContactPayload = {
  full_name?: string | null;
  email?: string | null;
  company?: string | null;
  subject?: string | null;
  message?: string | null;

  // Réservé au commit 3 (honeypot). On l’accepte déjà côté payload.
  website?: string | null;
};

/**
 * Limites (MVP)
 * Objectif : éviter les payloads anormaux et standardiser la taille des champs.
 */
const LIMITS = {
  EMAIL_MAX: 254,
  TEXT_MAX: 120,
  MESSAGE_MIN: 20,
  MESSAGE_MAX: 2000,
};

/**
 * Validation email (MVP)
 * On démarre simple : présence de "@" + limite de longueur.
 * On pourra durcir plus tard si nécessaire.
 */
function isProbablyEmail(value: string) {
  return value.includes("@") && value.length <= LIMITS.EMAIL_MAX;
}

/**
 * Normalisation texte :
 * - n’accepte que les strings
 * - trim
 * - convertit "" en null
 * - tronque si dépasse maxLen (sécurité)
 */
function cleanText(value: unknown, maxLen: number) {
  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  if (!trimmed) return null;

  return trimmed.length > maxLen ? trimmed.slice(0, maxLen) : trimmed;
}

/**
 * Log minimal (sans données personnelles)
 * Les logs sont visibles en local et côté hébergeur (Vercel).
 */
function logContactEvent(payload: {
  event: "contact_received";
  spam_suspected: boolean;
  message_length: number;
  has_optional_fields: boolean;
  user_agent: string | null;
}) {
  console.log("[CONTACT_PRO]", {
    ...payload,
    timestamp: new Date().toISOString(),
  });
}

/**
 * POST /api/contact
 * -----------------
 * Point d’entrée principal du formulaire Contact Pro.
 */
export async function POST(req: Request) {
  try {
    // 1) Vérification du Content-Type
    // On exige explicitement du JSON pour éviter les appels mal formés
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        {
          ok: false,
          error: "Invalid content-type. Expected application/json.",
        },
        { status: 400 }
      );
    }

    // 2) Lecture du body JSON
    // Ici, on récupère les champs et on les normalise.
    const raw = (await req.json()) as unknown;
    const data = (raw ?? {}) as ContactPayload;

    const full_name = cleanText(data.full_name, LIMITS.TEXT_MAX);
    const company = cleanText(data.company, LIMITS.TEXT_MAX);
    const subject = cleanText(data.subject, LIMITS.TEXT_MAX);

    const email = cleanText(data.email, LIMITS.EMAIL_MAX);
    const message = cleanText(data.message, LIMITS.MESSAGE_MAX);
    const website = cleanText(data.website, 200);

    // 2.5) Anti-spam (honeypot)
    // Si le champ "website" est rempli, on considère que c’est un bot.
    // On renvoie une réponse neutre (200) pour ne pas aider les spammeurs.
    if (website) {
        logContactEvent({
        event: "contact_received",
        spam_suspected: true,
        message_length: 0,
        has_optional_fields: false,
        user_agent: req.headers.get("user-agent"),
        });

    return NextResponse.json(
        { ok: true, message: "Message reçu. Votre demande sera examinée." },
        { status: 200 }
    );
    }

    // 3) Validation serveur (MVP)
    // On renvoie une structure d’erreurs simple pour le front.
    const errors: Record<string, string> = {};

    if (!email) errors.email = "Email requis.";
    else if (!isProbablyEmail(email)) errors.email = "Email invalide.";

    if (!message) errors.message = "Message requis.";
    else if (message.length < LIMITS.MESSAGE_MIN) {
      errors.message = `Message trop court (min ${LIMITS.MESSAGE_MIN} caractères).`;
    }

    // Si erreurs => 400
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    // À ce stade, message et email sont garantis non nuls
    const safeMessage = message!;

    // 3) Log minimal — contact valide (sans PII)
    logContactEvent({
    event: "contact_received",
    spam_suspected: false,
    message_length: safeMessage.length,
    has_optional_fields: Boolean(full_name || company || subject),
    user_agent: req.headers.get("user-agent"),
    });

    // 4) Réponse de succès (MVP)
    // Pour ce commit, on confirme seulement que la validation fonctionne.
    // (Dans les commits suivants, on ajoutera honeypot, logs et webhook n8n.)
    return NextResponse.json(
    {
    ok: true,
    message: "Message reçu. Votre demande sera examinée.",
    // Debug léger (utile pendant la phase API)
    message_length: safeMessage.length,

    // Champs optionnels normalisés (utile pour vérifier la structure)
    full_name,
    company,
    subject,
  },
  { status: 200 }
);

  } catch (error) {
    // Erreur de parsing JSON ou problème inattendu
    return NextResponse.json(
      {
        ok: false,
        error: "Invalid JSON body.",
      },
      { status: 400 }
    );
  }
}

/**
 * Réponse standard pour les méthodes non autorisées
 * (API volontairement limitée au POST)
 */
function methodNotAllowed() {
  return NextResponse.json(
    { ok: false, error: "Method Not Allowed" },
    { status: 405 }
  );
}

/**
 * Méthodes HTTP explicitement refusées
 * Cela rend l’API plus lisible et plus sécurisée.
 */
export async function GET() {
  return methodNotAllowed();
}

export async function PUT() {
  return methodNotAllowed();
}

export async function DELETE() {
  return methodNotAllowed();
}
