// components/sanity/RichText.tsx
import { PortableText, type PortableTextComponents } from "@portabletext/react";

const marks: PortableTextComponents["marks"] = {
  highlight: ({ children }) => <span className="text-sky-400">{children}</span>,
};

/**
 * BODY renderer: paragraphs with spacing (for section content)
 */
const bodyComponents: PortableTextComponents = {
  marks,
  block: {
    normal: ({ children }) => (
      <p className="mt-6 text-base leading-8 text-white/85 sm:text-lg">{children}</p>
    ),
  },
};

/**
 * INLINE renderer: no <p>, no margins (for titles inside H1/H2)
 */
const inlineComponents: PortableTextComponents = {
  marks,
  block: {
    normal: ({ children }) => <>{children}</>,
  },
};

export function RichText({ value }: { value: unknown }) {
  if (!Array.isArray(value) || value.length === 0) return null;
  return <PortableText value={value as any} components={bodyComponents} />;
}

export function RichTextInline({ value }: { value: unknown }) {
  if (!Array.isArray(value) || value.length === 0) return null;
  return <PortableText value={value as any} components={inlineComponents} />;
}
