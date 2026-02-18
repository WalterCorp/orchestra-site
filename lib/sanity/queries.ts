// lib/sanity/queries.ts

import { sanityClient } from "./client";

/* =========================================================
   PAGE_BY_SLUG_QUERY
   ---------------------------------------------------------
   GROQ query to fetch a single "page" document by its slug.

   Returned fields:
   - title
   - slug
   - content (Portable Text)
   - SEO fields
   - _updatedAt (for debug / freshness tracking)
========================================================= */

export const PAGE_BY_SLUG_QUERY = /* groq */ `
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    "slug": slug.current,
    content,
    seoTitle,
    seoDescription,
    _updatedAt
  }
`;

/* =========================================================
   getPageBySlug
   ---------------------------------------------------------
   Centralized helper to fetch a CMS page by slug.

   Important:
   We guard against undefined / empty slugs to avoid
   the GROQ error:
   "param $slug referenced, but not provided"
========================================================= */

export async function getPageBySlug(slug: string) {
  // Safety guard: avoid crashing Sanity query
  if (!slug || typeof slug !== "string") {
    return null;
  }

  return sanityClient.fetch(PAGE_BY_SLUG_QUERY, { slug });
}
