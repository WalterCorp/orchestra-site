// components/layout/Footer.tsx
import Link from "next/link";
import { getGlobalSettings } from "@/lib/sanity/queries";
import {
  Linkedin,
  Building2,
  FileText,
  Mail,
  ListChecks,
  UserCheck,
  ShieldCheck,
  Target,
} from "lucide-react";

/**
 * Mapping iconKey (Sanity) → composant Lucide
 */
const ICON_MAP: Record<string, any> = {
  linkedin: Linkedin,
  building2: Building2,
  fileText: FileText,
  mail: Mail,
  listChecks: ListChecks,
  userCheck: UserCheck,
  shieldCheck: ShieldCheck,
  target: Target,
};

export default async function Footer() {
  const settings = await getGlobalSettings();
  const footer = settings?.footer;

  // ✅ CMS-first : marque pilotée par globalSettings.header.brandLabel
  const brandLabel: string = settings?.header?.brandLabel ?? "ORCHESTRA";

  const brandDescription =
    footer?.brandDescription ??
    "Cabinet de conseil en stratégie et organisation, fondé sur une collaboration structurée entre expertise humaine et intelligence artificielle.";

  const navTitle = footer?.navTitle ?? "Navigation";
  const navItems = footer?.navItems ?? [];
  const columns = footer?.columns ?? [];
  const copyright =
    footer?.copyright ?? "© 2026 ORCHESTRA — Site vitrine démonstrateur";
  const legalText =
    footer?.legalText ?? "Mentions légales · Politique de confidentialité";

  return (
    <footer className="relative bg-[#080d1a] border-t border-white/10 px-6 pt-12 pb-24 text-sm text-zinc-300 sm:px-10">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#0b1020]" />

      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Présentation */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-lg font-semibold text-white">
            <span
              className="h-4 w-4 rounded-full border-2 border-sky-400"
              aria-hidden="true"
            />
            {brandLabel}
          </div>

          <p className="max-w-xs leading-6">{brandDescription}</p>
        </div>

        {/* Navigation */}
        <div className="space-y-2">
          <div className="font-semibold text-white">{navTitle}</div>
          <ul className="space-y-1">
            {navItems.map((item: any) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Colonnes dynamiques */}
        {columns.map((column: any) => (
          <div key={column.title} className="space-y-2">
            <div className="font-semibold text-white">{column.title}</div>

            <ul className="space-y-2 text-zinc-400">
              {column.items.map((item: any) => {
                const Icon = ICON_MAP[item.iconKey];
                return (
                  <li
                    key={`${column.title}-${item.iconKey}-${item.text}`}
                    className="flex items-center gap-2"
                  >
                    {Icon && <Icon className="h-4 w-4 text-sky-400" />}
                    {item.text}
                  </li>
                );
              })}
            </ul>

            {column.note && (
              <p className="pt-2 text-xs text-zinc-500">{column.note}</p>
            )}
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-zinc-400 md:flex-row">
        <div>{copyright}</div>
        <div>{legalText}</div>
      </div>
    </footer>
  );
}