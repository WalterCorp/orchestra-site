import Link from "next/link";
import React from "react";

type ButtonVariant = "primary" | "secondary";

type BaseProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type ButtonAsLinkProps = BaseProps & {
  href: string;
  onClick?: never;
};

type ButtonAsButtonProps = BaseProps & {
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
 * Règle :
 * - Les tailles (height, padding) sont volontairement laissées au contexte
 * - Ce composant ne doit pas contenir de logique métier
 */
export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-xl text-base font-semibold transition-colors focus:outline-none focus:ring-2";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-sky-600 text-white shadow-sm hover:bg-sky-500 focus:ring-sky-400/60",
    secondary:
      "bg-white/5 text-white ring-1 ring-white/10 hover:bg-white/10 focus:ring-white/30",
  };

  const classes = `${base} ${variants[variant]} ${className}`.trim();

  if ("href" in props) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      className={classes}
    >
      {children}
    </button>
  );
}
