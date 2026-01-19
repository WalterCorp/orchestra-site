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
    <header className="border-b border-zinc-800 bg-zinc-900 px-10 py-4 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-10">
        <Link href="/" className="text-lg font-semibold">
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
                    : "text-zinc-300 hover:text-white"
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
