// lib/sanity/queries.ts

// GROQ query to fetch a single page by slug.
// Returns structured fields needed for frontend rendering.

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
