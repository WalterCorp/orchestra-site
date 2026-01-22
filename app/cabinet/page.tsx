import Link from "next/link";

/**
 * Container
 * - Contrainte de largeur + padding (référence UI sur tout le site)
 */
function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">{children}</div>;
}

export default function CabinetPage() {
  return (
    <div className="bg-[#0b1020] text-white">
      {/* =========================================================
          HERO — Présentation du cabinet (cohérent avec Accueil)
      ========================================================== */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-6xl flex-col items-center justify-center px-6 py-14 text-center sm:px-10 lg:py-20">
          {/* Badge */}
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
            <span aria-hidden="true">🤖</span>
            <span>Conseil augmenté par l&apos;IA</span>
          </div>

          {/* H1 */}
          <h1 className="mx-auto mt-10 max-w-[900px] text-center text-5xl font-semibold leading-[1.15] tracking-tight sm:text-6xl lg:mt-12">
            Une <span className="text-sky-400">expertise humaine</span> renforcée
            par l&apos;
            <span className="text-sky-400">intelligence artificielle</span>
          </h1>

          {/* Texte d’intro */}
          <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
            Des experts au coeur des décisions, soutenus par une{" "}
            <span className="text-sky-400">architecture</span>{" "}
            <span className="text-sky-400">d&apos;intelligences artificielles</span>{" "}
            conçue
            <br className="hidden sm:block" />
            pour clarifier, structurer et éclairer les choix stratégiques.
          </p>

          {/* CTA Hero */}
          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row lg:mt-12">
            <Link
              href="/methode-orchestra"
              className="inline-flex h-14 items-center justify-center rounded-xl bg-sky-600 px-10 text-base font-semibold text-white shadow-sm transition-colors hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400/60"
            >
              Découvrir la méthode ORCHESTRA
            </Link>

            <Link
              href="/contact"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-white/5 px-10 text-base font-semibold text-white ring-1 ring-white/10 transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              Nous contacter <span aria-hidden="true">›</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          LA VISION DU CABINET — Bloc structurant (fond alterné)
      ========================================================== */}
      <section className="bg-[#080d1a] py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              La <span className="text-sky-400">vision</span> du Cabinet
            </h2>

            <div className="mx-auto mt-6 w-fit text-3xl text-sky-400">👁️</div>

            <div className="mx-auto mt-10 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">
              <p>
                Notre cabinet est né d&apos;un{" "}
                <span className="text-sky-400">constat</span> simple : les
                organisations évoluent dans des environnements de plus en plus
                complexes.
                <br />
                Nous avons fait le choix de ne pas opposer l&apos;humain et
                l&apos;intelligence artificielle, mais de les faire{" "}
                <span className="text-sky-400">collaborer</span>.
                <br />
                Notre approche repose sur des experts humains, accompagnés par
                une architecture d&apos;intelligences artificielles spécialisées,
                conçue pour{" "}
                <span className="text-sky-400">
                  renforcer l&apos;analyse et la structuration
                </span>{" "}
                des décisions, sans jamais s&apos;y substituer.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================
          LA PLACE DE L’HUMAIN — Fond global
      ========================================================== */}
      <section className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              La place de l&apos;<span className="text-sky-400">humain</span>
            </h2>

            <div className="mx-auto mt-6 w-fit text-3xl text-sky-400">👤</div>

            <div className="mx-auto mt-10 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">
              <p>
                L&apos;humain reste au centre de chaque accompagnement.
                <br />
                Nos experts définissent les{" "}
                <span className="text-sky-400">orientations</span>, posent les{" "}
                <span className="text-sky-400">hypothèses</span>, interprètent les{" "}
                <span className="text-sky-400">analyses</span> et assument les
                décisions finales.
                <br />
                L&apos;intelligence artificielle agit comme un{" "}
                <span className="text-sky-400">levier de clarification</span>,
                jamais comme un décideur autonome.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================
          USAGE ENCADRÉ DE L’IA — Bloc structurant (fond alterné)
      ========================================================== */}
      <section className="bg-[#080d1a] py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              L&apos;usage <span className="text-sky-400">encadré</span> de l&apos;
              <span className="text-sky-400">IA</span>
            </h2>

            <div className="mx-auto mt-6 w-fit text-3xl text-sky-400">🖥️</div>

            <div className="mx-auto mt-10 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">
              <p>
                L&apos;IA n&apos;est jamais utilisée comme une promesse abstraite.
                <br />
                Elle s&apos;inscrit dans une{" "}
                <span className="text-sky-400">méthode de travail précise</span>,
                pilotée et validée par l&apos;humain.
                <br />
                Chaque production fait l&apos;objet d&apos;une{" "}
                <span className="text-sky-400">validation humaine</span>,
                garantissant fiabilité, cohérence et responsabilité.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================
          CTA PREMIUM — Fin de page (style “carte” ORCHESTRA)
          (Texte spécifique à la page Cabinet)
      ========================================================== */}
      <section className="py-24">
        <Container>
          <div className="rounded-3xl bg-[#0f1a2b] p-10 text-center ring-1 ring-white/10 sm:p-14">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Vous souhaitez{" "}
              <span className="text-sky-400">comprendre</span> notre approche
              <br className="hidden sm:block" />
              et <span className="text-sky-400">échanger</span> sur vos enjeux ?
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
              Un échange humain, sans engagement, pour clarifier votre contexte
              et vérifier l’adéquation avec notre méthode.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-sky-600 px-7 text-base font-semibold text-white shadow-sm transition-colors hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400/60"
              >
                Nous contacter
              </Link>

              <Link
                href="/methode-orchestra"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white/5 px-7 text-base font-semibold text-white ring-1 ring-white/10 transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                Découvrir la méthode ORCHESTRA<span aria-hidden="true">›</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
