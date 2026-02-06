/**
 * ORCHESTRA — Contact Pro API
 * ---------------------------
 * Endpoint server-side destiné à recevoir les demandes de contact.
 * Cette première version constitue un squelette :
 * - vérifie que la requête est un POST
 * - vérifie que le body est bien du JSON
 * - répond OK si le pipeline fonctionne
 *
 * La validation métier, l’anti-spam et les logs
 * seront ajoutés dans les commits suivants.
 */

import { NextResponse } from "next/server";

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
    // Pour l’instant, on ne traite pas les données :
    // on vérifie simplement que le JSON est valide.
    await req.json();

    // 3) Réponse de succès (MVP)
    // Le serveur a bien reçu et compris la requête
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    // 4) Erreur de parsing JSON ou problème inattendu
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
