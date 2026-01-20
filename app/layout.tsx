import type { Metadata } from "next";
import "./globals.css";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export const metadata: Metadata = {
  title: "ORCHESTRA — Cabinet de conseil en management augmenté par l’IA",
  description:
    "ORCHESTRA est un cabinet de conseil en management augmenté par l’intelligence artificielle, où l’humain pilote et l’IA assiste.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="bg-[#0b1020]">
      <body className="min-h-screen bg-[#0b1020] text-white antialiased">
        {/* Fond global ORCHESTRA : éclairage bleu clair subtil */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          {/* Lumière froide claire en haut de page (perceptible mais discrète) */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-400/10 via-transparent to-transparent" />
        </div>

        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
