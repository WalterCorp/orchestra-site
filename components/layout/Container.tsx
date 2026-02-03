import React from "react";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Container global — ORCHESTRA V2
 *
 * Rôle :
 * - Centraliser la largeur maximale et les paddings horizontaux du site
 * - Éviter la duplication de logique de layout dans chaque page
 *
 * Règle :
 * - Toute section de page doit être encapsulée dans ce Container
 * - Toute modification ici impacte l’ensemble du site
 *
 * Contrainte :
 * - Les classes Tailwind sont volontairement identiques à la V1
 *   afin de garantir un rendu strictement inchangé
 */
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 sm:px-10 ${className}`.trim()}>
      {children}
    </div>
  );
}
