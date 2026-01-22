import Link from "next/link";
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

export default function Footer() {
  return (
    <footer className="relative bg-[#080d1a] border-t border-white/10 px-6 pt-12 pb-24 text-sm text-zinc-300 sm:px-10">
      {/* Transition douce vers le fond global */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#0b1020]" />

      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Présentation */}
        <div className="space-y-3">
          {/* Marque (cohérente Header) */}
          <div className="flex items-center gap-3 text-lg font-semibold text-white">
            <span
              className="h-4 w-4 rounded-full border-2 border-sky-400"
              aria-hidden="true"
            />
            ORCHESTRA
          </div>

          <p className="max-w-xs leading-6">
            Cabinet de conseil en stratégie et organisation, fondé sur une
            collaboration structurée entre expertise humaine et intelligence
            artificielle.
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
                Fonctionnement
              </Link>
            </li>
            <li>
              <Link href="/expertises" className="hover:text-white">
                Expertises
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-white">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Intégrations possibles (démonstration) */}
        <div className="space-y-2">
          <div className="font-semibold text-white">Intégrations possibles</div>

          <ul className="space-y-2 text-zinc-400">
            <li className="flex items-center gap-2">
              <Linkedin className="h-4 w-4 text-sky-400" />
              LinkedIn (cabinet / dirigeant)
            </li>
            <li className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-sky-400" />
              Page entreprise
            </li>
            <li className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-sky-400" />
              Blog & contenus experts
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-sky-400" />
              Newsletter / veille stratégique
            </li>
          </ul>

          <p className="pt-2 text-xs text-zinc-500">
            Exemples présentés à titre démonstratif
          </p>
        </div>

        {/* Principes */}
        <div className="space-y-2">
          <div className="font-semibold text-white">Principes</div>

          <ul className="space-y-2 text-zinc-400">
            <li className="flex items-center gap-2">
              <ListChecks className="h-4 w-4 text-sky-400" />
              Méthodologie structurée
            </li>
            <li className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-sky-400" />
              Expertise humaine centrale
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-sky-400" />
              Usage responsable de l’IA
            </li>
            <li className="flex items-center gap-2">
              <Target className="h-4 w-4 text-sky-400" />
              Décisions orientées action
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-zinc-400 md:flex-row">
        <div>© 2026 ORCHESTRA — Site vitrine démonstrateur</div>
        <div>Mentions légales · Politique de confidentialité</div>
      </div>
    </footer>
  );
}
