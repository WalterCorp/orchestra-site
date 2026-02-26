import type { Metadata } from "next";
import { Inter, Poppins, Manrope, DM_Sans, Sora } from "next/font/google";
import "./globals.css";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { getGlobalSettings } from "@/lib/sanity/queries";

// =========================================================
// CACHE — évite le double appel Sanity entre generateMetadata()
// et RootLayout(). cache() de React partage le résultat dans
// le même render tree sans requête réseau supplémentaire.
// CONTRAT : getGlobalSettings() doit être wrappée avec cache()
// dans lib/sanity/queries.ts — cf. correction queries.ts
// =========================================================

// =========================================================
// FONTS — toutes préchargées, activée via --font-brand
// CONTRAT : synchronisé avec globalSettings.brand.brandFont
// Si une font est ajoutée dans Sanity, l'ajouter ici aussi.
// =========================================================
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

// Table de correspondance brandFont (Sanity) → variable CSS font
// CONTRAT : doit rester synchronisée avec globalSettings.ts
const fontMap: Record<string, string> = {
  "inter":   "var(--font-inter)",
  "poppins": "var(--font-poppins)",
  "manrope": "var(--font-manrope)",
  "dm-sans": "var(--font-dm-sans)",
  "sora":    "var(--font-sora)",
};

// =========================================================
// METADATA — pilotée par globalSettings.seo
// Fallback sur valeurs ORCHESTRA si Sanity indisponible
// =========================================================
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getGlobalSettings();

  return {
    title:
      settings?.seo?.metaTitle ??
      "ORCHESTRA — Cabinet de conseil en management augmenté par l'IA",
    description:
      settings?.seo?.metaDescription ??
      "ORCHESTRA est un cabinet de conseil en management augmenté par l'intelligence artificielle, où l'humain pilote et l'IA assiste.",
    openGraph: settings?.seo?.ogImage?.asset
      ? {
          images: [
            {
              url: settings.seo.ogImage.asset.url,
              width: 1200,
              height: 630,
            },
          ],
        }
      : undefined,
  };
}

// =========================================================
// LAYOUT
// =========================================================
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getGlobalSettings();

  // Couleur brand — fallback sky-400 si Sanity indisponible
  const brandColor = settings?.brand?.brandColor ?? "#38bdf8";

  // Font brand — fallback Inter si Sanity indisponible ou valeur inconnue
  const brandFontKey = settings?.brand?.brandFont ?? "inter";
  const brandFont = fontMap[brandFontKey] ?? fontMap["inter"];

  return (
    <html
      lang="fr"
      className={[
        "bg-[#0b1020]",
        inter.variable,
        poppins.variable,
        manrope.variable,
        dmSans.variable,
        sora.variable,
      ].join(" ")}
    >
      <body
        className="min-h-screen bg-[#0b1020] text-white antialiased"
        style={
          {
            // ✅ Variables CSS injectées depuis Sanity
            // --color-brand : utilisée dans RichText (highlight), boutons, accents
            // --font-brand  : utilisée dans globals.css (font-family body)
            "--color-brand": brandColor,
            "--font-brand": brandFont,
          } as React.CSSProperties
        }
      >
        {/* Fond global : éclairage subtil en haut de page
            ✅ Utilise --color-brand au lieu de sky-400 hardcodé
            → S'adapte automatiquement à la couleur du client */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div
            className="absolute inset-0 bg-gradient-to-b via-transparent to-transparent"
            style={{
              backgroundImage: `linear-gradient(to bottom, color-mix(in srgb, ${brandColor} 10%, transparent), transparent)`,
            }}
          />
        </div>

        {/* Header et Footer font leur propre appel getGlobalSettings()
            — sans doublon réseau grâce au cache() dans queries.ts */}
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}