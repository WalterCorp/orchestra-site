// lib/sanity/queries.ts

import { sanityClient } from "./client";

// --------------------------------------------------
// GROQ query to fetch a single page by slug.
// Returns structured fields needed for frontend rendering.
// --------------------------------------------------

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

// --------------------------------------------------
// Helper function to fetch a page document by its slug.
// Centralizes CMS fetching logic for reuse across the app.
// --------------------------------------------------

export async function getPageBySlug(slug: string) {
  return sanityClient.fetch(PAGE_BY_SLUG_QUERY, { slug });
}
