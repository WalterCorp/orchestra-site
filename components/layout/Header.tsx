"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#080d1a] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-10 px-6 py-5 sm:px-10">
        {/* Marque */}
        <Link
          href="/"
          className="flex items-center gap-3 text-2xl font-semibold tracking-wide"
        >
          <span
            className="h-5 w-5 rounded-full border-2 border-sky-400"
            aria-hidden="true"
          />
          ORCHESTRA
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-base">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;

            if (item.cta) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex h-10 items-center justify-center rounded-lg bg-sky-600 px-4 font-semibold text-white transition hover:bg-sky-500"
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
      </div>
    </header>
  );
}
