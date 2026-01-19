import type { Metadata } from "next";
import "./globals.css";

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
        {/* Header global */}
        <header className="border-b border-zinc-200 px-10 py-4">
          <div className="mx-auto max-w-7xl">
            <span className="text-lg font-semibold">ORCHESTRA</span>
          </div>
        </header>

        {/* Contenu des pages */}
        <main className="mx-auto max-w-7xl px-10 py-8">
          {children}
        </main>

        {/* Footer global */}
        <footer className="border-t border-zinc-200 px-10 py-6 text-sm text-zinc-600">
          <div className="mx-auto max-w-7xl space-y-2">
            <div>
              © ORCHESTRA — Cabinet de conseil en management augmenté par l’IA
            </div>
            <div>
              Site démonstrateur — l’humain pilote, l’IA assiste
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
