import React from "react";

type SectionVariant = "default" | "darker";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  variant?: SectionVariant;
  as?: "section" | "div";
};

/**
 * Section globale — ORCHESTRA V2
 *
 * Rôle :
 * - Centraliser la gestion des sections de page
 * - Gérer les fonds alternés de manière cohérente
 *
 * Variants :
 * - default : fond global du site
 * - darker  : fond alternatif utilisé pour les blocs structurants
 *
 * Règle :
 * - Les pages décrivent la structure, pas les styles de fond
 */
export function Section({
  children,
  className = "",
  variant = "default",
  as: Tag = "section",
  ...props
}: SectionProps) {
  const background = variant === "darker" ? "bg-[#080d1a]" : "";

  return (
    <Tag {...props} className={`${background} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
