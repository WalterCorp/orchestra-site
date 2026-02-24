// components/sanity/RichText.tsx
import { PortableText, type PortableTextComponents } from "@portabletext/react";

/**
 * Custom marks
 */
const marks: PortableTextComponents["marks"] = {
  highlight: ({ children }) => <span className="text-sky-400">{children}</span>,
};

/**
 * BODY renderer (sections / blocs de page)
 * - Enter (nouveau block) => nouveau <p>
 * - Shift+Enter (hardBreak) => <br />
 */
const bodyComponents: PortableTextComponents = {
  marks,
  hardBreak: () => <br />,
  block: {
    normal: ({ children }) => (
      <p className="text-base leading-8 text-white/85 sm:text-lg">{children}</p>
    ),
  },
};

/**
 * INLINE renderer (titres / phrases courtes)
 * - Supporte Enter => nouvelle ligne (blocks)
 * - Supporte Shift+Enter => <br />
 * - Empêche la génération de <h1>/<h2>... en inline
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
 * Objectif : retrouver la typo V1 dans les cartes
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

  // ✅ contrôle global de l'écart entre paragraphes (Enter)
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