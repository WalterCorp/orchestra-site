// app/sanity-test/page.tsx

import { sanityClient } from "@/lib/sanity/client";
import { PAGE_BY_SLUG_QUERY } from "@/lib/sanity/queries";

// This page is a temporary sandbox route
// used to validate CMS connection and data shape.
// It does NOT affect production pages.

export default async function SanityTestPage() {
  try {
    const data = await sanityClient.fetch(PAGE_BY_SLUG_QUERY, {
      slug: "accueil",
    });

    return (
      <main className="p-10">
        <h1 className="text-2xl font-bold mb-6">Sanity Test</h1>

        <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      </main>
    );
  } catch (error) {
    console.error("Sanity fetch error:", error);

    return (
      <main className="p-10">
        <h1 className="text-2xl font-bold text-red-600">
          Error fetching Sanity data
        </h1>
      </main>
    );
  }
}
