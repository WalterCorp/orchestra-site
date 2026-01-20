import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-[#080d1a] px-10 pt-12 pb-24 text-sm text-zinc-300">
      {/* Transition douce vers le fond global en bas */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#0b1020]" />

      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        {/* Présentation */}
        <div className="space-y-3">
          <div className="text-lg font-semibold text-white">ORCHESTRA</div>
          <p className="max-w-xs leading-6">
  Cabinet de conseil en stratégie
  et organisation, fondé sur une
  collaboration structurée entre
  expertise humaine et intelligence artificielle.
</p>
        </div>

        {/* Navigation */}
        <div className="space-y-2">
          <div className="font-semibold text-white">Navigation</div>
          <ul className="space-y-1">
            <li>
              <Link href="/" className="hover:text-white">
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/cabinet" className="hover:text-white">
                Le Cabinet
              </Link>
            </li>
            <li>
              <Link href="/methode-orchestra" className="hover:text-white">
                La Méthode ORCHESTRA
              </Link>
            </li>
            <li>
              <Link href="/fonctionnement" className="hover:text-white">
                Comment nous travaillons
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Principes */}
        <div className="space-y-2">
          <div className="font-semibold text-white">Principes</div>
          <ul className="space-y-1">
            <li>Méthodologie structurée</li>
            <li>Expertise humaine centrale</li>
            <li>Usage responsable de l’IA</li>
            <li>Décisions orientées action</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-zinc-400 md:flex-row">
        <div>2026 ORCHESTRA – Tous droits réservés</div>
        <div>Mentions légales – Politiques de confidentialité</div>
      </div>
    </footer>
  );
}
