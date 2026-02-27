import React from "react";
import Image from "next/image";

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
 * - Le fond (uni, image ou vidéo) est piloté par Sanity via backgroundMode
 *
 * CONTRAT backgroundMode :
 * - "solid" (défaut) : fond uni — couleur du site, pas d'image
 * - "image"          : image plein fond + overlay sombre pour lisibilité
 * - "video"          : vidéo plein fond (autoPlay muted loop) + overlay sombre
 *
 * CONTRAT overlayIntensity :
 * - "40" = 40% noir (image/vidéo très visible)
 * - "70" = 70% noir (équilibré, défaut)
 * - "90" = 90% noir (texte prioritaire)
 * Valeurs définies dans page.ts — synchronisées avec overlayOpacityMap ci-dessous
 */

// Table de correspondance overlayIntensity (string Sanity) → classe Tailwind
// CONTRAT : synchronisée avec les valeurs de page.ts overlayIntensity
const overlayOpacityMap: Record<string, string> = {
  "40": "bg-black/40",
  "70": "bg-black/70",
  "90": "bg-black/90",
};

// ✅ Type CMS-friendly (permissif)
// Sanity peut renvoyer des champs même si backgroundMode = "solid".
// On accepte donc backgroundImage/backgroundVideo/overlayIntensity en optionnel,
// et on conditionne l'affichage uniquement via backgroundMode + présence d'asset.
type HeroBackground = {
  backgroundMode?: "solid" | "image" | "video";
  backgroundImage?: {
    url?: string;
    alt?: string;
    metadata?: { dimensions?: { width: number; height: number } };
  } | null;
  backgroundVideo?: { url?: string } | null;
  overlayIntensity?: "40" | "70" | "90" | null;
};

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
   * Utilisé principalement sur la page d'accueil.
   */
  fullHeight?: boolean;

  /** Classes additionnelles sur la section */
  className?: string;
} & HeroBackground;

export function Hero({
  badge,
  title,
  description,
  primaryCta,
  secondaryCta,
  fullHeight = false,
  className = "",
  backgroundMode = "solid",
  backgroundImage = null,
  backgroundVideo = null,
  overlayIntensity = "70",
}: HeroProps) {
  const isImage = backgroundMode === "image";
  const isVideo = backgroundMode === "video";

  const overlayClass =
    overlayOpacityMap[String(overlayIntensity)] ?? "bg-black/70";

  return (
    <section className={`relative overflow-hidden ${className}`}>
      {/* =========================================================
          FOND IMAGE — visible uniquement si backgroundMode = "image"
          Image positionnée en absolute, couvre toute la section
          ========================================================= */}
      {isImage && backgroundImage?.url ? (
        <>
          <Image
            src={backgroundImage.url}
            alt={backgroundImage.alt ?? ""}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          {/* Overlay sombre pour lisibilité du texte */}
          <div className={`absolute inset-0 ${overlayClass}`} aria-hidden="true" />
        </>
      ) : null}

      {/* =========================================================
          FOND VIDÉO — visible uniquement si backgroundMode = "video"
          autoPlay muted loop playsInline = best practice vidéo hero
          La vidéo est servie via le CDN Sanity (asset->{ url })
          ========================================================= */}
      {isVideo && backgroundVideo?.url ? (
        <>
          <video
            src={backgroundVideo.url}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover object-center"
            aria-hidden="true"
          />
          {/* Overlay sombre — même système que le mode image */}
          <div className={`absolute inset-0 ${overlayClass}`} aria-hidden="true" />
        </>
      ) : null}

      {/* =========================================================
          CONTENU — positionné au-dessus du fond (z-10)
          ========================================================= */}
      <div
        className={[
          "relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-6 py-14 text-center sm:px-10 lg:py-20",
          fullHeight ? "min-h-[calc(100vh-88px)]" : "",
        ].join(" ")}
      >
        {/* Badge */}
        {badge ? (
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
            {badge}
          </div>
        ) : null}

        {/* Titre */}
        <div className={badge ? "mt-10" : ""}>{title}</div>

        {/* Description */}
        {description ? (
          <div className="mx-auto mt-6 max-w-3xl text-center">{description}</div>
        ) : null}

        {/* CTA */}
        {primaryCta || secondaryCta ? (
          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row lg:mt-12">
            {primaryCta}
            {secondaryCta}
          </div>
        ) : null}
      </div>
    </section>
  );
}