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
    <html lang="fr">
      <body className="min-h-screen bg-zinc-50 text-black antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
