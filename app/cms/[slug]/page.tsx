// app/cms/[slug]/page.tsx

import { sanityClient } from "@/lib/sanity/client";
import { PAGE_BY_SLUG_QUERY } from "@/lib/sanity/queries";

// Types for minimal Portable Text parsing (plain text MVP)
type PortableTextChild = { _type?: string; text?: string };
type PortableTextBlock = { _type?: string; children?: PortableTextChild[] };

// Convert Sanity Portable Text into plain readable text (MVP)
function portableTextToPlainText(content: unknown): string {
  if (!Array.isArray(content)) return "";

  return content
    .map((block) => {
      const b = block as PortableTextBlock;
      if (b?._type !== "block" || !Array.isArray(b.children)) return "";

      return b.children
        .map((child) => (typeof child?.text === "string" ? child.text : ""))
        .join("");
    })
    .filter(Boolean)
    .join("\n\n");
}

export default async function CmsPage({
  params,
}: {
  // In some Next.js / Turbopack versions, params can be async.
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug) {
    return (
      <main className="p-10 space-y-3">
        <h1 className="text-2xl font-bold">Missing slug</h1>
        <p className="text-gray-600">The URL slug is required.</p>
      </main>
    );
  }

  const data = await sanityClient.fetch(PAGE_BY_SLUG_QUERY, { slug });

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
