// lib/sanity/queries.ts

import { sanityClient } from "./client";

// --------------------------------------------------
// GROQ query to fetch a single page by slug.
// Alignée sur le schemaTypes/page.ts actuel.
// --------------------------------------------------
export const PAGE_BY_SLUG_QUERY = /* groq */ `
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    "slug": slug.current,

    // Portable Text générique (optionnel)
    content,

    // SEO
    seoTitle,
    seoDescription,
    _updatedAt,

    // HERO (champs plats dans ton schema)
    hero{
      badgeEmoji,
      badgeText,
      title,
      titleHighlights,
      description,
      descriptionHighlights,
      primaryCtaLabel,
      primaryCtaHref,
      secondaryCtaLabel,
      secondaryCtaHref
    },

    // Cabinet sections (objet -> vision/human/ai)
    cabinetSections{
      vision{
        title,
        emoji,
        content
      },
      human{
        title,
        emoji,
        content
      },
      ai{
        title,
        emoji,
        content
      }
    },

    // Cabinet CTA bloc
    cabinetCta{
      title,
      text,
      primaryLabel,
      primaryHref,
      secondaryLabel,
      secondaryHref
    }
  }
`;

// --------------------------------------------------
// Helper function to fetch a page document by its slug.
// --------------------------------------------------
export async function getPageBySlug(slug: string) {
  return sanityClient.fetch(PAGE_BY_SLUG_QUERY, { slug });
}
