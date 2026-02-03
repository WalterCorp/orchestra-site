import Link from "next/link";
import React from "react";

type ButtonVariant = "primary" | "secondary";

type BaseProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type ButtonAsLinkProps = BaseProps & {
  // Quand href est présent, le composant se comporte comme un <Link>
  href: string;
  onClick?: never;
  type?: never;
};

type ButtonAsButtonProps = BaseProps & {
  // Quand href n'est pas présent, le composant se comporte comme un <button>
  href?: never;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
};

type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;

/**
 * Button global — ORCHESTRA V2
 *
 * Rôle :
 * - Centraliser les styles de CTA (primary / secondary)
 * - Garantir une cohérence visuelle sur tout le site
 *
 * Règles d’usage :
 * - Les tailles (height, padding) restent au contexte via className
 *   (ex: h-14 px-10 pour Hero, h-12 px-7 pour CTA Premium)
 * - Aucun comportement métier : uniquement de la présentation (UI)
 *
 * Convention :
 * - Si `href` est fourni => rendu <Link>
 * - Sinon => rendu <button>
 */
export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  // Base commune (ne contient pas de height/padding volontairement)
  const base =
    "inline-flex items-center justify-center rounded-xl text-base font-semibold transition-colors focus:outline-none focus:ring-2";

  // Styles par variante (strictement alignés sur la V1)
  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-sky-600 text-white shadow-sm hover:bg-sky-500 focus:ring-sky-400/60",
    secondary:
      "bg-white/5 text-white ring-1 ring-white/10 hover:bg-white/10 focus:ring-white/30",
  };

  const classes = `${base} ${variants[variant]} ${className}`.trim();

  // Branch 1: Link (si href est fourni)
  const href = (props as ButtonAsLinkProps).href;
  if (typeof href === "string") {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  // Branch 2: Button (sinon)
  const buttonProps = props as ButtonAsButtonProps;

  return (
    <button
      type={buttonProps.type ?? "button"}
      onClick={buttonProps.onClick}
      className={classes}
    >
      {children}
    </button>
  );
}
