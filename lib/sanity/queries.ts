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
 * - getPageBySlug("methode-orchestra")
 *
 * Architecture :
 * - Hero commun à toutes les pages
 * - CTA final commun (finalCta) + fallback legacy (homeCta/cabinetCta)
 * - Blocs spécifiques par page (Accueil, Cabinet, Méthode...)
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

    // ---------------------------
    // CTA FINAL (commun)
    // ---------------------------
    finalCta{
      titleRich,
      textRich,
      primaryLabel,
      primaryHref,
      secondaryLabel,
      secondaryHref
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

    // Legacy Accueil (encore utilisé par le front)
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

    // Legacy Cabinet (encore utilisé par le front)
    cabinetCta{
      titleRich,
      textRich,
      primaryLabel,
      primaryHref,
      secondaryLabel,
      secondaryHref
    },

    // =========================================================
    // MÉTHODE ORCHESTRA
    // =========================================================
    methodeSections{
      intro{
        titleRich,
        emoji,
        contentRich
      },

      why{
        titleRich,
        introRich,
        label,
        pillars[]{ icon, titleLines },
        outroRich
      },

      core{
        titleRich,
        introRich,
        label,
        bubbles{
          line1[]{ icon, title, text },
          line2[]{ icon, title, text }
        },
        outroRich
      },

      human{
        titleRich,
        introRich,
        label,
        cards[]{ icon, titleLines },
        outroRich
      },

      workflow{
        titleRich,
        introRich,
        steps[]{ icon, titleLines },
        outroRich
      },

      benefits{
        titleRich,
        introRich,
        cards[]{ icon, titleLines }
      }
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