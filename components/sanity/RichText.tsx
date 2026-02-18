// components/cms/RichText.tsx
import { PortableText, type PortableTextComponents } from "@portabletext/react";

/**
 * Shared mark renderer:
 * Sanity decorator "highlight" => <span class="text-sky-400" />
 */
const marks: PortableTextComponents["marks"] = {
  highlight: ({ children }) => <span className="text-sky-400">{children}</span>,
};

/**
 * 1) RichText: for BODY content (paragraphs)
 * - Adds spacing between paragraphs
 * - Matches your existing typography (white/85, leading-8, sm:text-lg)
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
 * 2) Inline RichText: for TITLES (H1/H2) & short inline text
 * - No <p>, no margins
 * - Just returns spans/fragments
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
