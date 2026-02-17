// app/sanity-test/page.tsx

import { sanityClient } from "@/lib/sanity/client";
import { PAGE_BY_SLUG_QUERY } from "@/lib/sanity/queries";

// This page is a temporary sandbox route used to validate CMS connection and data shape.
// It does NOT affect production pages.

type PortableTextChild = { _type?: string; text?: string };
type PortableTextBlock = { _type?: string; children?: PortableTextChild[] };

function portableTextToPlainText(content: unknown): string {
  if (!Array.isArray(content)) return "";

  return content
    .map((block) => {
      const b = block as PortableTextBlock;

      // Sanity Portable Text blocks are usually:
      // { _type: "block", children: [{ text: "..." }, ...] }
      if (b?._type !== "block" || !Array.isArray(b.children)) return "";

      return b.children
        .map((child) => (typeof child?.text === "string" ? child.text : ""))
        .join("");
    })
    .filter(Boolean)
    .join("\n\n");
}

export default async function SanityTestPage() {
  try {
    // We centralize the slug in a variable
    // to avoid hardcoding it in multiple places.
    const slug = "cabinet";

    const data = await sanityClient.fetch(PAGE_BY_SLUG_QUERY, {
      slug,
    });

    const title = data?.title ?? "(No title)";
    const updatedAt = data?._updatedAt ?? null;
    const plainText = portableTextToPlainText(data?.content);

    return (
      <main className="p-10 space-y-8">
        <header className="space-y-2">
          <h1 className="text-2xl font-bold">
            Sanity Test (Minimal Render)
          </h1>
          <p className="text-sm text-gray-600">
            Slug: <span className="font-mono">{slug}</span>
          </p>
        </header>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">{title}</h2>

          {updatedAt ? (
            <p className="text-sm text-gray-600">
              Last update:{" "}
              <span className="font-mono">{updatedAt}</span>
            </p>
          ) : null}
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-semibold">
            Content (plain text)
          </h3>

          {plainText ? (
            <div className="whitespace-pre-wrap leading-relaxed">
              {plainText}
            </div>
          ) : (
            <p className="text-gray-600 italic">
              No content found.
            </p>
          )}
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-semibold">
            Debug (raw JSON)
          </h3>

          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </section>
      </main>
    );
  } catch (error) {
    console.error("Sanity fetch error:", error);

    return (
      <main className="p-10">
        <h1 className="text-2xl font-bold text-red-600">
          Error fetching Sanity data
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          Check server logs for details.
        </p>
      </main>
    );
  }
}
