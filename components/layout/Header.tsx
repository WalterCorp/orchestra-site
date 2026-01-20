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
  { label: "Nous contacter", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#080d1a]/85 text-white backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-10 px-6 py-4 sm:px-10">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          ORCHESTRA
        </Link>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;

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
