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
 * INLINE renderer (titres)
 * - On évite les <br /> dans les H1/H2 : hardBreak devient un espace
 * - Pas de <p>
 */
const inlineComponents: PortableTextComponents = {
  marks,
  hardBreak: () => " ",
  block: {
    normal: ({ children }) => <>{children}</>,
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
