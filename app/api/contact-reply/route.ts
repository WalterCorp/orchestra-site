import { NextRequest, NextResponse } from "next/server";
import { generateContactReply } from "@/lib/ai/contactReply";

export async function POST(req: NextRequest) {
  const start = Date.now();

  try {
    // 1️⃣ Vérification Content-Type
    if (!req.headers.get("content-type")?.includes("application/json")) {
      return NextResponse.json(
        {
          ok: false,
          error: "InvalidJSON",
          details: ["Content-Type must be application/json"],
        },
        { status: 400 }
      );
    }

    const body = await req.json();

    // 2️⃣ Validation minimale du payload
    const lead = body?.lead;
    const signals = body?.signals;

    if (!lead || typeof lead.message !== "string") {
      return NextResponse.json(
        {
          ok: false,
          error: "ValidationError",
          details: ["lead.message is required"],
        },
        { status: 400 }
      );
    }

    const message = lead.message.trim();

    if (message.length < 20) {
      return NextResponse.json(
        {
          ok: false,
          error: "ValidationError",
          details: ["Message must be at least 20 characters"],
        },
        { status: 400 }
      );
    }

    // 3️⃣ Gestion honeypot / spam
    if (signals?.spam_suspected === true) {
      console.log("contact_reply_skipped_spam", {
        event: "contact_reply_skipped_spam",
        message_length: message.length,
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json({
        ok: true,
        reply: null,
        disclaimer: "Spam suspected — no draft generated.",
        meta: {
          version: "v1",
          generated_at: new Date().toISOString(),
        },
      });
    }

    // 4️⃣ Appel OpenAI via helper (avec fallback en cas d’erreur)
    let reply;

    try {
      reply = await generateContactReply({
        full_name:
          typeof lead.full_name === "string" ? lead.full_name : null,
        company:
          typeof lead.company === "string" ? lead.company : null,
        message,
      });

      console.log("contact_reply_generated_ai", {
        event: "contact_reply_generated_ai",
        message_length: message.length,
        timestamp: new Date().toISOString(),
      });

    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : String(e);

      console.error("contact_reply_ai_unavailable_fallback_mock", {
        event: "contact_reply_ai_unavailable_fallback_mock",
        error_message: errorMessage,
        timestamp: new Date().toISOString(),
      });

      // Mode dégradé si OpenAI échoue
      reply = {
        summary:
          "Demande entrante nécessitant clarification et échange humain.",
        intent: "Exploration d’un besoin potentiel.",
        draft:
          "Merci pour votre message. Votre demande semble concerner un besoin nécessitant clarification. Nous vous proposons un échange exploratoire afin de mieux comprendre votre contexte et déterminer les prochaines étapes pertinentes.",
        next_steps: [
          "Organiser un échange exploratoire",
          "Préciser les objectifs et contraintes",
        ],
      };
    }

    const duration = Date.now() - start;

    return NextResponse.json({
      ok: true,
      reply,
      disclaimer:
        "Brouillon généré automatiquement — validation humaine requise.",
      meta: {
        version: "v1",
        generated_at: new Date().toISOString(),
        duration_ms: duration,
      },
    });

  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : String(error);

    console.error("contact_reply_internal_error", {
      event: "contact_reply_internal_error",
      error_message: errorMessage,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { ok: false, error: "InternalError", details: ["Unexpected error"] },
      { status: 500 }
    );
  }
}
