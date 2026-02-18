// app/cms/[slug]/page.tsx

/**
 * CMS Dynamic Route
 * -----------------
 * This route dynamically renders a page from Sanity based on its slug.
 *
 * Examples:
 * - /cms/accueil
 * - /cms/cabinet
 *
 * It also generates dynamic SEO metadata via generateMetadata()
 * using Sanity fields:
 * - seoTitle
 * - seoDescription
 */

import type { Metadata } from "next";
import { getPageBySlug } from "@/lib/sanity/queries";

// Force dynamic rendering (no static caching) for this CMS route during dev/MVP.
// This ensures page content + metadata reflect the latest published Sanity data.
export const dynamic = "force-dynamic";

/* =========================================================
   Portable Text → Plain Text (MVP renderer)
   ---------------------------------------------------------
   Sanity "content" is stored as Portable Text (rich text JSON).
   For this MVP, we only extract readable plain text.
   Later: replace with a real Portable Text renderer.
========================================================= */

type PortableTextChild = {
  _type?: string;
  text?: string;
};

type PortableTextBlock = {
  _type?: string;
  children?: PortableTextChild[];
};

function portableTextToPlainText(content: unknown): string {
  // Sanity Portable Text is an array of blocks.
  if (!Array.isArray(content)) return "";

  return content
    .map((block) => {
      const b = block as PortableTextBlock;

      // We only process standard text blocks:
      // { _type: "block", children: [{ text: "..." }, ...] }
      if (b?._type !== "block" || !Array.isArray(b.children)) return "";

      // Join child spans into a single paragraph.
      return b.children
        .map((child) => (typeof child?.text === "string" ? child.text : ""))
        .join("");
    })
    .filter(Boolean)
    // Separate blocks with blank lines for readability.
    .join("\n\n");
}

/* =========================================================
   Dynamic SEO — generateMetadata
   ---------------------------------------------------------
   Next.js will call this function to generate <title> and
   <meta name="description"> for each /cms/[slug] page.
========================================================= */

export async function generateMetadata({
  params,
}: {
  // ✅ IMPORTANT: In some Next.js/Turbopack versions, params is async (Promise).
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const data = await getPageBySlug(slug);

  // If no document exists, return safe defaults.
  if (!data) {
    return {
      title: "Page introuvable — ORCHESTRA",
      description: "Cette page n'existe pas dans le CMS.",
    };
  }

  // Priority:
  // 1) seoTitle
  // 2) title
  // 3) fallback "ORCHESTRA"
  const title = (data.seoTitle ?? data.title ?? "ORCHESTRA").trim();

  // If empty string, we return undefined so Next.js doesn't output an empty meta.
  const description = (data.seoDescription ?? "").trim() || undefined;

  return {
    title,
    description,
  };
}

/* =========================================================
   Main Page Component
========================================================= */

export default async function CmsPage({
  params,
}: {
  // ✅ IMPORTANT: In some Next.js/Turbopack versions, params is async (Promise).
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Safety guard (should not happen with a [slug] route, but keeps code robust).
  if (!slug) {
    return (
      <main className="p-10 space-y-3">
        <h1 className="text-2xl font-bold">Missing slug</h1>
        <p className="text-gray-600">The URL slug is required.</p>
      </main>
    );
  }

  // Fetch page data via centralized helper (queries.ts).
  const data = await getPageBySlug(slug);

  // If no page exists for this slug, show a clear 404-like screen.
  if (!data) {
    return (
      <main className="p-10 space-y-4">
        <h1 className="text-2xl font-bold">CMS Page not found</h1>
        <p className="text-gray-600">No Sanity document found for slug:</p>
        <p className="font-mono text-sm">{slug}</p>
      </main>
    );
  }

  const title = data.title ?? "(No title)";
  const updatedAt = data._updatedAt ?? null;
  const plainText = portableTextToPlainText(data.content);

  return (
    <main className="p-10 space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">CMS Dynamic Route</h1>
        <p className="text-sm text-gray-600">
          Slug: <span className="font-mono">{slug}</span>
        </p>
      </header>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">{title}</h2>

        {updatedAt ? (
          <p className="text-sm text-gray-600">
            Last update: <span className="font-mono">{updatedAt}</span>
          </p>
        ) : null}
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Content (plain text)</h3>

        {plainText ? (
          <div className="whitespace-pre-wrap leading-relaxed">{plainText}</div>
        ) : (
          <p className="text-gray-600 italic">No content found.</p>
        )}
      </section>
    </main>
  );
}
