import { NextRequest, NextResponse } from "next/server";

/**
 * ORCHESTRA — POST /api/assistant
 * Endpoint du module Chatbot IA contextuel (Phase 5)
 *
 * Reçoit une question utilisateur et retourne une réponse générée par l'IA.
 * La logique IA est isolée dans lib/ai/assistant.ts (séparation route / logique).
 *
 * Gouvernance :
 * - Clé OpenAI jamais exposée côté client
 * - Toute logique IA côté serveur uniquement
 * - Fallback systématique si OpenAI indisponible
 */

// Types du contrat API
export interface AssistantInput {
  question: string;
  pageContext?: string;
  conversation?: {
    role: "user" | "assistant";
    content: string;
  }[];
}

export interface AssistantOutput {
  answer: string;
  suggestedPage?: string;
  suggestContact?: boolean;
}

export interface AssistantError {
  error: string;
  fallback: string;
}

// Message de fallback si OpenAI est indisponible
const FALLBACK_MESSAGE =
  "Je ne suis pas en mesure de répondre pour le moment. " +
  "N'hésitez pas à nous contacter directement via le formulaire de contact, " +
  "un expert vous répondra sous 24-48h.";

export async function POST(req: NextRequest): Promise<NextResponse> {
  // 1. Vérification Content-Type
  const contentType = req.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { error: "Content-Type application/json requis", fallback: FALLBACK_MESSAGE },
      { status: 415 }
    );
  }

  // 2. Parsing du body
  let body: AssistantInput;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Corps de la requête invalide", fallback: FALLBACK_MESSAGE },
      { status: 400 }
    );
  }

  const { question, pageContext, conversation } = body;

  // 3. Validation de la question (champ obligatoire)
  if (!question || typeof question !== "string" || question.trim().length === 0) {
    return NextResponse.json(
      { error: "Le champ 'question' est obligatoire", fallback: FALLBACK_MESSAGE },
      { status: 400 }
    );
  }

  // 4. Validation longueur question (anti-abus)
  if (question.trim().length > 500) {
    return NextResponse.json(
      { error: "La question est trop longue (500 caractères maximum)", fallback: FALLBACK_MESSAGE },
      { status: 400 }
    );
  }

  // 5. Validation de l'historique si fourni
  if (conversation !== undefined) {
    if (!Array.isArray(conversation)) {
      return NextResponse.json(
        { error: "Le champ 'conversation' doit être un tableau", fallback: FALLBACK_MESSAGE },
        { status: 400 }
      );
    }
    // Limite de l'historique à 6 messages (3 échanges)
    if (conversation.length > 6) {
      return NextResponse.json(
        { error: "L'historique est limité à 6 messages", fallback: FALLBACK_MESSAGE },
        { status: 400 }
      );
    }
  }

  // 6. Log minimal RGPD-safe (sans contenu de la question)
  console.log("[assistant] request received", {
    timestamp: new Date().toISOString(),
    question_length: question.trim().length,
    has_page_context: !!pageContext,
    conversation_length: conversation?.length ?? 0,
  });

  // 7. Appel à la logique IA (isolée dans lib/ai/assistant.ts)
  try {
    const { generateAssistantResponse } = await import("@/lib/ai/assistant");

    const result = await generateAssistantResponse({
      question: question.trim(),
      pageContext: pageContext?.trim(),
      conversation: conversation ?? [],
    });

    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    // Log technique (sans données utilisateur)
    console.error("[assistant] error", {
      timestamp: new Date().toISOString(),
      message: error instanceof Error ? error.message : "Unknown error",
    });

    // Fallback — ne jamais laisser l'utilisateur sans réponse
    return NextResponse.json(
      {
        error: "Service temporairement indisponible",
        fallback: FALLBACK_MESSAGE,
      } satisfies AssistantError,
      { status: 503 }
    );
  }
}