// orchestra-site/lib/sanity/queries.ts

import { cache } from "react";
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
      // Fond du hero — ajouté suite à page.ts (backgroundMode/backgroundImage/overlayIntensity)
      backgroundMode,
      backgroundImage{
        alt,
        asset->{ url, metadata{ dimensions } }
      },
      overlayIntensity,

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
    },

    expertisesSections{
      approach{
        titleRich,
        contentRich
      },

      domains{
        titleRich,
        introRich,
        cards[]{
          icon,
          titleLines,
          topRich,
          labelRich,
          bottomRich,
          outroRich
        },
        changeBand{
          title,
          textRich
        }
      },

      orchestraSupport{
        titleRich,
        introRich,
        labelRich,
        cards[]{ icon, titleLines },
        outroRich
      },

      audiences{
        titleRich,
        labelRich,
        cards[]{ icon, titleLines }
      }
    },

    faqSections{
      titleRich,
      introRich,
      items[]{ question, answerRich },
      conviction{ badgeEmoji, textRich }
    },

    // ✅ CONTACT
    contactSections{
      form{
        titleRich,
        textRich
      },
      reassurance{
        titleRich,
        cards[]{ title },
        linkLabel,
        linkHref
      }
    }
  }
`;

export const getPageBySlug = cache(async (slug: string) => {
  return sanityClient.fetch(PAGE_BY_SLUG_QUERY, { slug });
});

export const GLOBAL_SETTINGS_QUERY = /* groq */ `
  *[_type == "globalSettings"][0]{

    // =========================================================
    // IDENTITÉ VISUELLE
    // ✅ Ajout brand — brandColor, brandFont, brandLogo
    // brandLogo projeté avec asset->{url} pour next/image
    // =========================================================
    brand{
      brandColor,
      brandFont,
      brandLogo{
        alt,
        height,
        asset->{ url, metadata{ dimensions } }
      }
    },

    // =========================================================
    // SEO GLOBAL
    // ✅ Ajout seo — metaTitle, metaDescription, ogImage
    // ogImage projeté avec asset->{url} pour generateMetadata()
    // =========================================================
    seo{
      metaTitle,
      metaDescription,
      ogImage{
        asset->{ url, metadata{ dimensions } }
      }
    },

    // =========================================================
    // HEADER — inchangé
    // =========================================================
    header{
      brandLabel,
      mobileTagline,
      navItems[]{ label, href, isCta, openInNewTab }
    },

    // =========================================================
    // FOOTER — inchangé
    // =========================================================
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

// ✅ cache() — évite le double appel réseau entre generateMetadata()
// et RootLayout() dans layout.tsx. React partage le résultat dans
// le même render tree sans requête Sanity supplémentaire.
export const getGlobalSettings = cache(async () => {
  return sanityClient.fetch(GLOBAL_SETTINGS_QUERY);
});