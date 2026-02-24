// lib/sanity/queries.ts
import { sanityClient } from "./client";

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

    finalCta{
      titleRich,
      textRich,
      primaryLabel,
      primaryHref,
      secondaryLabel,
      secondaryHref
    },

    homeSections{
      approach{ titleRich, content },
      orchestraCore{
        titleRich,
        content,
        pillars[]{ icon, line1, line2 }
      },
      humanPlace{
        titleRich,
        intro,
        cards[]{ icon, title, text },
        outro
      }
    },

    cabinetSections{
      vision{ titleRich, emoji, content },
      human{ titleRich, emoji, content },
      ai{ titleRich, emoji, content }
    },

    methodeSections{
      intro{ titleRich, emoji, contentRich },

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
    },

    fonctionnementSections{
      principles{
        titleRich,
        introRich,
        cards[]{ icon, titleLines },
        outroRich
      },

      process{
        titleRich,
        introRich,
        steps[]{
          icon,
          titleLines,
          topRich,
          labelRich,
          bottomRich,
          outroRich
        }
      },

      orchestraPlace{
        titleRich,
        introRich,
        labelRich,
        cards[]{ icon, titleLines }
      },

      clientBenefits{
        titleRich,
        introRich,
        cards[]{ icon, titleLines }
      }
    }
  }
`;

export async function getPageBySlug(slug: string) {
  return sanityClient.fetch(PAGE_BY_SLUG_QUERY, { slug });
}

export const GLOBAL_SETTINGS_QUERY = /* groq */ `
  *[_type == "globalSettings"][0]{
    header{
      brandLabel,
      mobileTagline,
      navItems[]{ label, href, isCta, openInNewTab }
    },
    footer{
      brandDescription,
      navTitle,
      navItems[]{ label, href, isCta, openInNewTab },
      columns[]{
        title,
        note,
        items[]{ text, iconKey }
      },
      copyright,
      legalText
    }
  }
`;

export async function getGlobalSettings() {
  return sanityClient.fetch(GLOBAL_SETTINGS_QUERY);
}