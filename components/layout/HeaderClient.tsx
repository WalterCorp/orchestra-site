// components/layout/HeaderClient.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";

type NavItem = {
  label: string;
  href: string;
  isCta?: boolean;
  openInNewTab?: boolean;
};

export default function HeaderClient({
  brandLabel,
  navItems,
  mobileTagline,
}: {
  brandLabel: string;
  navItems: NavItem[];
  mobileTagline: string;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Split : liens centraux vs CTA (ancré à droite)
  const { links, cta } = useMemo(() => {
    const ctaItem = navItems.find((i) => i.isCta);
    const linkItems = navItems.filter((i) => !i.isCta);
    return { links: linkItems, cta: ctaItem };
  }, [navItems]);

  // ✅ Le menu se ferme via onClick sur chaque lien (voir plus bas)
  // Pas d'useEffect sur pathname — évite setState synchrone dans un effet

  // Empêche le scroll arrière-plan quand le menu est ouvert
  useEffect(() => {
    if (!mobileOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#080d1a] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5 sm:px-10">
        {/* Marque */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 text-2xl font-semibold tracking-wide"
        >
          <span
            className="h-5 w-5 rounded-full border-2 border-sky-400"
            aria-hidden="true"
          />
          {brandLabel}
        </Link>

        {/* Navigation desktop (à partir de xl pour éviter le squeeze) */}
        <div className="hidden flex-1 items-center justify-center xl:flex">
          <nav className="flex items-center gap-6 text-base">
            {links.map((item) => {
              const isActive = pathname === item.href;
              const target = item.openInNewTab ? "_blank" : undefined;
              const rel = item.openInNewTab ? "noreferrer noopener" : undefined;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  target={target}
                  rel={rel}
                  className={
                    isActive
                      ? "font-semibold text-white underline underline-offset-8"
                      : "text-white/70 transition-colors hover:text-white"
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* CTA desktop (ancré à droite, séparé du nav) */}
        <div className="hidden shrink-0 items-center xl:flex">
          {cta ? (
            <Button
              href={cta.href}
              variant="primary"
              className="h-10 px-4 rounded-lg"
            >
              {cta.label}
            </Button>
          ) : null}
        </div>

        {/* Bouton menu mobile (visible < xl) */}
        <button
          type="button"
          className="inline-flex h-10 items-center justify-center rounded-lg bg-white/5 px-4 text-sm font-semibold text-white ring-1 ring-white/10 transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 xl:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          Menu <span aria-hidden="true" className="ml-2">☰</span>
        </button>
      </div>

      {/* Menu mobile (overlay) */}
      {mobileOpen && (
        <div className="xl:hidden">
          {/* Backdrop */}
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default bg-black/50"
            aria-label="Fermer le menu"
            onClick={() => setMobileOpen(false)}
          />

          {/* Panel */}
          <div
            id="mobile-menu"
            className="fixed left-0 right-0 top-[72px] z-50 border-b border-white/10 bg-[#080d1a] px-6 py-6 sm:px-10"
          >
            <div className="mx-auto max-w-7xl">
              <div className="flex flex-col gap-3">
                {links.map((item) => {
                  const isActive = pathname === item.href;
                  const target = item.openInNewTab ? "_blank" : undefined;
                  const rel = item.openInNewTab ? "noreferrer noopener" : undefined;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      target={target}
                      rel={rel}
                      onClick={() => setMobileOpen(false)}
                      className={
                        isActive
                          ? "rounded-lg bg-white/5 px-3 py-3 font-semibold text-white ring-1 ring-white/10"
                          : "rounded-lg px-3 py-3 text-white/80 ring-1 ring-white/10 transition-colors hover:bg-white/5 hover:text-white"
                      }
                    >
                      {item.label}
                    </Link>
                  );
                })}

                {cta ? (
                  <Button
                    href={cta.href}
                    variant="primary"
                    className="mt-2 h-12 px-7"
                  >
                    {cta.label}
                  </Button>
                ) : null}
              </div>

              <div className="mt-4 text-xs text-white/50">{mobileTagline}</div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}