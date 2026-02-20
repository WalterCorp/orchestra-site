// components/layout/Header.tsx
import HeaderClient from "./HeaderClient";
import { getGlobalSettings } from "@/lib/sanity/queries";

type NavItem = {
  label: string;
  href: string;
  isCta?: boolean;
  openInNewTab?: boolean;
};

export default async function Header() {
  const settings = await getGlobalSettings();

  const brandLabel: string = settings?.header?.brandLabel ?? "ORCHESTRA";
  const mobileTagline: string =
    settings?.header?.mobileTagline ??
    "L'IA soutient l'analyse, l'humain pilote la décision.";

  const navItems: NavItem[] = Array.isArray(settings?.header?.navItems)
    ? settings.header.navItems
    : [];

  return (
    <HeaderClient
      brandLabel={brandLabel}
      navItems={navItems}
      mobileTagline={mobileTagline}
    />
  );
}