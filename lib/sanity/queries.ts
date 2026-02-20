// lib/sanity/queries.ts
import { sanityClient } from "./client";

/**
 * ---------------------------------------------------------
 * PAGE BY SLUG
 * ---------------------------------------------------------
 * Récupère une page dynamique depuis Sanity
 */
export const PAGE_BY_SLUG_QUERY = /* groq */ `
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    "slug": slug.current,

    seoTitle,
    seoDescription,
    _updatedAt,

    hero{
      badgeEmoji,
      badgeText,
      titleRich,
      descriptionRich,
      primaryCtaLabel,
      primaryCtaHref,
      secondaryCtaLabel,
      secondaryCtaHref
    },

    cabinetSections{
      vision{ titleRich, emoji, content },
      human{ titleRich, emoji, content },
      ai{ titleRich, emoji, content }
    },

    cabinetCta{
      titleRich,
      textRich,
      primaryLabel,
      primaryHref,
      secondaryLabel,
      secondaryHref
    }
  }
`;

export async function getPageBySlug(slug: string) {
  return sanityClient.fetch(PAGE_BY_SLUG_QUERY, { slug });
}

/**
 * ---------------------------------------------------------
 * GLOBAL SETTINGS
 * ---------------------------------------------------------
 * Source de vérité unique pour :
 * - Header
 * - Footer
 */
export const GLOBAL_SETTINGS_QUERY = /* groq */ `
  *[_type == "globalSettings"][0]{
    header{
      brandLabel,
      mobileTagline,
      navItems[]{
        label,
        href,
        isCta,
        openInNewTab
      }
    },
    footer{
      brandDescription,
      navTitle,
      navItems[]{
        label,
        href,
        isCta,
        openInNewTab
      },
      columns[]{
        title,
        note,
        items[]{
          text,
          iconKey
        }
      },
      copyright,
      legalText
    }
  }
`;

export async function getGlobalSettings() {
  return sanityClient.fetch(GLOBAL_SETTINGS_QUERY);
}