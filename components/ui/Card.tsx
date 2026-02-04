import React from "react";

type CardVariant = "sm" | "md";

type CardProps = {
  /**
   * Variante de taille :
   * - sm : cartes compactes (ex: piliers)
   * - md : cartes plus confortables (ex: cartes avec paragraphe)
   */
  variant?: CardVariant;

  /** Icône ou élément visuel en haut de carte (emoji, icon, etc.) */
  icon?: React.ReactNode;

  /** Titre de la carte (libre : 1 ou plusieurs lignes) */
  title?: React.ReactNode;

  /** Contenu complémentaire (ex: paragraphe) */
  children?: React.ReactNode;

  /** Classes additionnelles (à utiliser avec parcimonie) */
  className?: string;
};

/**
 * Card — composant UI réutilisable
 *
 * Rôle :
 * - Centraliser le style des cartes ORCHESTRA (fond, radius, ring)
 * - Éviter la duplication de classes Tailwind dans les pages
 *
 * Principe :
 * - Le contenu est injecté (icon / title / children)
 * - Le composant reste purement présentational (aucune logique métier)
 */
export function Card({
  variant = "sm",
  icon,
  title,
  children,
  className = "",
}: CardProps) {
  const base = "rounded-2xl bg-[#0f1a2b] text-center ring-1 ring-white/10";

  const variants: Record<CardVariant, string> = {
    sm: "p-7",
    md: "p-9",
  };

  return (
    <div className={`${base} ${variants[variant]} ${className}`.trim()}>
      {icon && <div className="mx-auto w-fit text-3xl text-sky-400">{icon}</div>}

      {title && (
        <div className={icon ? "mt-4" : ""}>
          {typeof title === "string" ? (
            <div className="text-lg font-semibold">{title}</div>
          ) : (
            title
          )}
        </div>
      )}

      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
