// components/ui/BigCard.tsx
import React from "react";

type BigCardProps = {
  /** Titre affiché en haut de carte */
  title: string;

  /** Icône/emoji/élément visuel (ex: "↗") */
  icon: React.ReactNode;

  /** Texte d’introduction (paragraphe) */
  intro: string;

  /**
   * Libellé affiché après "ORCHESTRA"
   * Exemple : "intervient pour" / "soutient" / "permet"
   */
  label: string;

  /** Liste de points (affichés en liste) */
  bullets: string[];

  /** Texte optionnel de fin de carte */
  outro?: string;

  /** Classes supplémentaires (rare, mais utile en cas de variante) */
  className?: string;
};

/**
 * BigCard — Carte “expertise” (ORCHESTRA)
 *
 * Rôle :
 * - Afficher un bloc d’expertise structuré (intro + label + bullets)
 * - Standardiser le rendu des cartes longues (pages type Expertises)
 *
 * Principes :
 * - Zéro logique métier
 * - Texte injecté via props
 * - Rendu stable (important pour un refactor sans régression)
 */
export function BigCard({
  title,
  icon,
  intro,
  label,
  bullets,
  outro,
  className = "",
}: BigCardProps) {
  return (
    <div
      className={[
        "rounded-2xl bg-[#0f1a2b] p-7 ring-1 ring-white/10",
        className,
      ].join(" ")}
    >
      {/* Icône */}
      <div className="mx-auto w-fit text-3xl text-sky-400">{icon}</div>

      {/* Titre */}
      <h3 className="mt-5 text-center text-base font-semibold">{title}</h3>

      {/* Intro */}
      <p className="mt-4 text-sm leading-7 text-white/80">{intro}</p>

      {/* Label ORCHESTRA */}
      <p className="mt-6 text-sm font-semibold text-white">
        <span className="text-sky-400">ORCHESTRA</span>{" "}
        <span className="whitespace-nowrap">{label}&nbsp;:</span>
      </p>

      {/* Bullets */}
      <ul className="mt-3 space-y-2 text-sm leading-7 text-white/80">
        {bullets.map((b) => (
          <li key={b}>- {b}</li>
        ))}
      </ul>

      {/* Outro */}
      {outro ? (
        <p className="mt-5 text-sm leading-7 text-white/80">{outro}</p>
      ) : null}
    </div>
  );
}
