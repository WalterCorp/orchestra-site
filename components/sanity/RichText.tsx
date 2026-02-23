// components/sanity/RichText.tsx
import { PortableText, type PortableTextComponents } from "@portabletext/react";

/**
 * Custom marks
 */
const marks: PortableTextComponents["marks"] = {
  highlight: ({ children }) => <span className="text-sky-400">{children}</span>,
};

/**
 * BODY renderer
 * - Enter (nouveau block) => nouveau <p> avec espacement léger via wrapper
 * - Shift+Enter (hardBreak) => <br /> (retour à la ligne contrôlé)
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
 * Objectif :
 * - Supporter Enter => nouvelle ligne (blocks)
 * - Supporter Shift+Enter => <br />
 * - Empêcher la génération de <h1>/<h2>... en inline (sinon nested headings)
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