"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { label: "Accueil", href: "/" },
  { label: "Le Cabinet", href: "/cabinet" },
  { label: "La Méthode ORCHESTRA", href: "/methode-orchestra" },
  { label: "Comment nous travaillons", href: "/fonctionnement" },
  { label: "Expertises", href: "/expertises" },
  { label: "FAQ", href: "/faq" },
  { label: "Nous contacter", href: "/contact", cta: true },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Ferme le menu quand on change de page
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

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
          ORCHESTRA
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden min-w-0 items-center gap-6 text-base lg:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;

            if (item.cta) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex h-10 items-center justify-center rounded-lg bg-sky-600 px-4 font-semibold text-white transition-colors hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400/60"
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
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

        {/* Bouton menu mobile */}
        <button
          type="button"
          className="inline-flex h-10 items-center justify-center rounded-lg bg-white/5 px-4 text-sm font-semibold text-white ring-1 ring-white/10 transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          Menu <span aria-hidden="true" className="ml-2">☰</span>
        </button>
      </div>

      {/* Menu mobile (overlay) */}
      {mobileOpen && (
        <div className="lg:hidden">
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
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href;

                  if (item.cta) {
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="mt-2 inline-flex h-12 items-center justify-center rounded-xl bg-sky-600 px-7 text-base font-semibold text-white shadow-sm transition-colors hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400/60"
                      >
                        {item.label}
                      </Link>
                    );
                  }

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
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
              </div>

              <div className="mt-4 text-xs text-white/50">
                L&apos;IA soutient l&apos;analyse, l&apos;humain pilote la décision.
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
