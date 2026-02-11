import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const start = Date.now();

  try {
    // 1️⃣ Vérification Content-Type
    if (!req.headers.get("content-type")?.includes("application/json")) {
      return NextResponse.json(
        { ok: false, error: "InvalidJSON", details: ["Content-Type must be application/json"] },
        { status: 400 }
      );
    }

    const body = await req.json();

    // 2️⃣ Validation minimale du payload
    const lead = body?.lead;
    const signals = body?.signals;

    if (!lead || typeof lead.message !== "string") {
      return NextResponse.json(
        { ok: false, error: "ValidationError", details: ["lead.message is required"] },
        { status: 400 }
      );
    }

    const message = lead.message.trim();

    if (message.length < 20) {
      return NextResponse.json(
        { ok: false, error: "ValidationError", details: ["Message must be at least 20 characters"] },
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

    // 4️⃣ Réponse MOCK (pas encore OpenAI)
    const mockReply = {
      summary: "Demande entrante nécessitant clarification et échange humain.",
      intent: "Exploration d’un besoin potentiel.",
      draft:
        "Merci pour votre message. Votre demande semble concerner un besoin nécessitant clarification. Nous vous proposons un échange exploratoire afin de mieux comprendre votre contexte et déterminer les prochaines étapes pertinentes.",
      next_steps: [
        "Organiser un échange exploratoire",
        "Préciser les objectifs et contraintes",
      ],
    };

    const duration = Date.now() - start;

    console.log("contact_reply_generated_mock", {
      event: "contact_reply_generated_mock",
      message_length: message.length,
      duration_ms: duration,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      ok: true,
      reply: mockReply,
      disclaimer:
        "Brouillon généré automatiquement — validation humaine requise.",
      meta: {
        version: "v1",
        generated_at: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("contact_reply_internal_error", {
      event: "contact_reply_internal_error",
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { ok: false, error: "InternalError", details: ["Unexpected error"] },
      { status: 500 }
    );
  }
}
