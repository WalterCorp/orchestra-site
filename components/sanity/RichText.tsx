// components/sanity/RichText.tsx

import { PortableText, type PortableTextComponents } from "@portabletext/react";

/**
 * Custom marks
 *
 * ✅ highlight : utilise --color-brand au lieu de text-sky-400 hardcodé
 * La couleur est pilotée par globalSettings.brand.brandColor dans Sanity.
 * S'adapte automatiquement à chaque client sans modifier ce fichier.
 *
 * ✅ link : annotation PortableText (définie inline dans le schéma page.ts)
 * - href: string (required)
 * - blank: boolean (optionnel) => ouvre dans un nouvel onglet
 */
const marks: PortableTextComponents["marks"] = {
  highlight: ({ children }) => (
    <span className="text-[var(--color-brand)]">{children}</span>
  ),

  link: ({ children, value }) => {
    const href = (value as any)?.href;
    const blank = Boolean((value as any)?.blank);

    // Safety: si la valeur est invalide, on rend juste le texte
    if (typeof href !== "string" || href.trim().length === 0) return <>{children}</>;

    // (Optionnel) rel safe en target _blank
    const rel = blank ? "noopener noreferrer" : undefined;

    return (
      <a
        href={href}
        target={blank ? "_blank" : undefined}
        rel={rel}
        className="text-[var(--color-brand)] underline underline-offset-4 transition-opacity hover:opacity-80"
      >
        {children}
      </a>
    );
  },
};

/**
 * BODY renderer (sections / blocs de page)
 * - Enter (nouveau block) => nouveau <p>
 * - Shift+Enter (hardBreak) => <br />
 * - ✅ H2 / H3 supportés pour les sections contentRich
 *   (autorisés dans le schéma Sanity page.ts)
 */
const bodyComponents: PortableTextComponents = {
  marks,
  hardBreak: () => <br />,
  block: {
    normal: ({ children }) => (
      <p className="text-base leading-8 text-white/85 sm:text-lg">{children}</p>
    ),
    // ✅ Ajout H2 / H3 — utilisés dans les sections contentRich
    // Non disponibles dans titleRich / descriptionRich (restreints dans le schéma)
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold tracking-tight text-white">
        {children}
      </h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-2 pl-6 text-base leading-8 text-white/85 sm:text-lg">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-2 pl-6 text-base leading-8 text-white/85 sm:text-lg">
        {children}
      </ol>
    ),
  },
};

/**
 * INLINE renderer (titres / phrases courtes)
 * - Supporte Enter => nouvelle ligne (blocks)
 * - Supporte Shift+Enter => <br />
 * - Empêche la génération de <h1>/<h2>... en inline
 *   (tous les styles de titres sont rendus comme span)
 */
const inlineComponents: PortableTextComponents = {
  marks,
  hardBreak: () => <br />,
  block: {
    normal: ({ children }) => <span className="block">{children}</span>,
    h1: ({ children }) => <span className="block">{children}</span>,
    h2: ({ children }) => <span className="block">{children}</span>,
    h3: ({ children }) => <span className="block">{children}</span>,
    h4: ({ children }) => <span className="block">{children}</span>,
    h5: ({ children }) => <span className="block">{children}</span>,
    h6: ({ children }) => <span className="block">{children}</span>,
  },
};

/**
 * SMALL renderer (cards / contenus denses)
 * - Listes à puces et numérotées supportées
 */
const smallComponents: PortableTextComponents = {
  marks,
  hardBreak: () => <br />,
  block: {
    normal: ({ children }) => (
      <p className="text-sm leading-7 text-white/85">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-white/85">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-2 pl-5 text-sm leading-7 text-white/85">
        {children}
      </ol>
    ),
  },
};

export function RichText({ value }: { value: unknown }) {
  if (!Array.isArray(value) || value.length === 0) return null;

  return (
    <div className="space-y-3">
      <PortableText value={value as any} components={bodyComponents} />
    </div>
  );
}

export function RichTextInline({ value }: { value: unknown }) {
  if (!Array.isArray(value) || value.length === 0) return null;

  return <PortableText value={value as any} components={inlineComponents} />;
}

export function RichTextSmall({ value }: { value: unknown }) {
  if (!Array.isArray(value) || value.length === 0) return null;

  return (
    <div className="space-y-3">
      <PortableText value={value as any} components={smallComponents} />
    </div>
  );
}