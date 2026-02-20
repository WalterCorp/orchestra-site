// lib/sanity/queries.ts
import { sanityClient } from "./client";

/**
 * ============================================================
 * PAGE BY SLUG
 * ============================================================
 *
 * Objectif :
 * Récupérer une page dynamique depuis Sanity via son slug.
 *
 * Exemple :
 * - getPageBySlug("accueil")
 * - getPageBySlug("cabinet")
 *
 * Architecture :
 * - Hero commun à toutes les pages
 * - Blocs spécifiques par page (Accueil, Cabinet, etc.)
 * - Un seul type "page" côté CMS
 */

export const PAGE_BY_SLUG_QUERY = /* groq */ `
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    "slug": slug.current,

    // ---------------------------
    // SEO
    // ---------------------------
    seoTitle,
    seoDescription,
    _updatedAt,

    // ---------------------------
    // HERO (commun)
    // ---------------------------
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

    // =========================================================
    // ACCUEIL
    // =========================================================
    homeSections{
      approach{
        titleRich,
        content
      },
      orchestraCore{
        titleRich,
        content,
        pillars[]{
          icon,
          line1,
          line2
        }
      },
      humanPlace{
        titleRich,
        intro,
        cards[]{
          icon,
          title,
          text
        },
        outro
      }
    },

    homeCta{
      titleRich,
      textRich,
      primaryLabel,
      primaryHref,
      secondaryLabel,
      secondaryHref
    },

    // =========================================================
    // CABINET
    // =========================================================
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

/**
 * Helper centralisé
 * -------------------
 * Permet d’appeler la query sans la dupliquer.
 */
export async function getPageBySlug(slug: string) {
  return sanityClient.fetch(PAGE_BY_SLUG_QUERY, { slug });
}

/**
 * ============================================================
 * GLOBAL SETTINGS
 * ============================================================
 *
 * Source de vérité unique pour :
 * - Header
 * - Footer
 *
 * Évite toute valeur hardcodée côté Next.js.
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