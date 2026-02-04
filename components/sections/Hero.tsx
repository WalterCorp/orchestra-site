import React from "react";

/**
 * Hero — Section de tête réutilisable
 *
 * Rôle :
 * - Fournir une structure de Hero cohérente sur le site
 * - Centraliser la logique de layout (centrage, spacing, largeur)
 *
 * Principes :
 * - Le Hero ne contient aucune logique métier
 * - Le contenu (titre, texte, CTA) est injecté via des props
 * - Le rendu visuel doit rester strictement identique lors du refactor
 */

type HeroProps = {
  /** Badge optionnel affiché au-dessus du titre */
  badge?: React.ReactNode;

  /** Titre principal (souvent un <h1>) */
  title: React.ReactNode;

  /** Texte descriptif sous le titre */
  description?: React.ReactNode;

  /** CTA principal (ex: bouton primary) */
  primaryCta?: React.ReactNode;

  /** CTA secondaire (ex: bouton secondary) */
  secondaryCta?: React.ReactNode;

  /**
   * Active une hauteur minimale plein écran.
   * Utilisé principalement sur la page d’accueil.
   */
  fullHeight?: boolean;

  /** Classes additionnelles sur la section */
  className?: string;
};

export function Hero({
  badge,
  title,
  description,
  primaryCta,
  secondaryCta,
  fullHeight = false,
  className = "",
}: HeroProps) {
  return (
    <section className={`relative overflow-hidden ${className}`}>
      <div
        className={[
          "relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-6 py-14 text-center sm:px-10 lg:py-20",
          fullHeight ? "min-h-[calc(100vh-88px)]" : "",
        ].join(" ")}
      >
        {/* Badge */}
        {badge && (
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
            {badge}
          </div>
        )}

        {/* Titre */}
        <div className={badge ? "mt-10" : ""}>{title}</div>

        {/* Description */}
        {description && (
          <div className="mx-auto mt-6 max-w-3xl text-center">
            {description}
          </div>
        )}

        {/* CTA */}
        {(primaryCta || secondaryCta) && (
          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row lg:mt-12">
            {primaryCta}
            {secondaryCta}
          </div>
        )}
      </div>
    </section>
  );
}
