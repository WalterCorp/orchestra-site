import Link from "next/link";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">{children}</div>;
}

export default function CabinetPage() {
  return (
    <div className="bg-[#0b1020] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto flex min-h-[calc(100vh-72px)] w-full max-w-6xl flex-col items-center justify-center px-6 py-14 text-center sm:px-10 lg:py-20">
          {/* Badge */}
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
            <span aria-hidden="true">🤖</span>
            <span>Conseil augmenté par l&apos;IA</span>
          </div>

          {/* H1 */}
          <h1 className="mx-auto mt-12 max-w-[980px] text-center text-5xl font-semibold leading-[1.15] tracking-tight sm:text-6xl">
            Une{" "}
            <span className="text-sky-400">expertise humaine</span>{" "}
            renforcée par l&apos;<span className="text-sky-400">intelligence artificielle</span>
          </h1>

          {/* Texte */}
          <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
            Des experts au coeur des décisions, soutenus par une{" "}
            <span className="text-sky-400">architecture</span>{" "}
            <span className="text-sky-400">d&apos;intelligences artificielles</span>{" "}
            conçue
            <br className="hidden sm:block" />
            pour clarifier, structurer et éclairer les choix stratégiques.
          </p>

          {/* Boutons */}
          <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Link
              href="/methode-orchestra"
              className="inline-flex h-14 items-center justify-center rounded-xl bg-sky-600 px-10 text-base font-semibold text-white shadow-sm hover:bg-sky-500"
            >
              Découvrir la méthode ORCHESTRA
            </Link>

            <Link
              href="/contact"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-white/5 px-10 text-base font-semibold text-white ring-1 ring-white/10 hover:bg-white/10"
            >
              Nous contacter <span aria-hidden="true">›</span>
            </Link>
          </div>
        </div>
      </section>

      {/* LA VISION DU CABINET */}
      <section className="bg-[#080d1a] py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              La <span className="text-sky-400">vision</span> du Cabinet
            </h2>

            <div className="mx-auto mt-6 w-fit text-3xl text-sky-400" aria-hidden="true">
              👁️
            </div>

            <div className="mx-auto mt-10 max-w-3xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
              <p>
                Notre cabinet est né d&apos;un <span className="text-sky-400">constat</span> simple :
                <br />
                les organisations évoluent dans des environnements de plus en plus complexes, où les décisions
                <br />
                doivent être prises rapidement, avec méthode et discernement.
                <br />
                Face à cette complexité, nous avons fait le choix de ne pas opposer
                <br />
                l&apos;humain et l&apos;intelligence artificielle, mais de les faire{" "}
                <span className="text-sky-400">collaborer</span>.
                <br />
                Notre approche repose sur des experts humains,
                <br />
                accompagnés par une architecture d&apos;intelligences artificielles
                <br />
                spécialisées, conçue pour{" "}
                <span className="text-sky-400">renforcer l&apos;analyse et la structuration</span>
                <br />
                <span className="text-sky-400">des décisions</span>, sans jamais s&apos;y substituer.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* LA PLACE DE L'HUMAIN */}
      <section className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              La place de l&apos;<span className="text-sky-400">humain</span>
            </h2>

            <div className="mx-auto mt-6 w-fit text-3xl text-sky-400" aria-hidden="true">
              👤
            </div>

            <div className="mx-auto mt-10 max-w-3xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
              <p>
                L&apos;humain reste au centre de chaque accompagnement.
                <br />
                Nos experts définissent les <span className="text-sky-400">orientations</span>, posent les{" "}
                <span className="text-sky-400">hypothèses</span>,
                <br />
                interprètent les <span className="text-sky-400">analyses</span>, et assument l&apos;ensemble des décisions finales.
                <br />
                L&apos;intelligence artificielle intervient comme{" "}
                <span className="text-sky-400">un levier de clarification, de structuration et de projection</span>,
                <br />
                mais ne prend jamais de décision de manière autonome.
                <br />
                Cette exigence garantit une <span className="text-sky-400">expertise responsable</span>,
                <br />
                ancrée dans le réel et adaptée aux contextes spécifiques de chaque organisation.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* L'USAGE ENCADRÉ DE L'IA */}
      <section className="bg-[#080d1a] py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              L&apos;usage <span className="text-sky-400">encadré</span> de l&apos;<span className="text-sky-400">IA</span>
            </h2>

            <div className="mx-auto mt-6 w-fit text-3xl text-sky-400" aria-hidden="true">
              🖥️
            </div>

            <div className="mx-auto mt-10 max-w-3xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
              <p>
                L&apos;intelligence artificielle utilisée par le cabinet ne repose pas sur des promesses technologiques abstraites.
                <br />
                Elle est intégrée dans une <span className="text-sky-400">méthode de travail précise</span>,
                <br />
                encadrée et <span className="text-sky-400">pilotée par l&apos;humain</span>.
                <br />
                Chaque analyse, chaque proposition et chaque synthèse produite par l&apos;architecture d&apos;IA
                <br />
                fait l&apos;objet d&apos;une <span className="text-sky-400">validation humaine</span>.
                <br />
                Cette approche permet de bénéficier de la puissance de l&apos;IA
                <br />
                tout en conservant un haut niveau de{" "}
                <span className="text-sky-400">fiabilité</span>, de <span className="text-sky-400">cohérence</span> et de{" "}
                <span className="text-sky-400">responsabilité</span>.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* UNE APPROCHE PRAGMATIQUE */}
      <section className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              Une approche <span className="text-sky-400">pragmatique</span>
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-sm text-white/85 sm:text-base">
              Notre différenciation repose sur une <span className="text-sky-400">équilibre clair</span> :
            </p>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl bg-[#0f1a2b] p-8 text-center ring-1 ring-white/10">
                <div className="mx-auto w-fit text-3xl text-sky-400" aria-hidden="true">
                  👥
                </div>
                <div className="mt-6 text-lg font-semibold">
                  Une expertise humaine expérimentée
                </div>
              </div>

              <div className="rounded-2xl bg-[#0f1a2b] p-8 text-center ring-1 ring-white/10">
                <div className="mx-auto w-fit text-3xl text-sky-400" aria-hidden="true">
                  🧠
                </div>
                <div className="mt-6 text-lg font-semibold">
                  Une intelligence artificielle structurée et spécialisée
                </div>
              </div>

              <div className="rounded-2xl bg-[#0f1a2b] p-8 text-center ring-1 ring-white/10">
                <div className="mx-auto w-fit text-3xl text-sky-400" aria-hidden="true">
                  📋
                </div>
                <div className="mt-6 text-lg font-semibold">
                  une méthode lisible et compréhensible
                </div>
              </div>

              <div className="rounded-2xl bg-[#0f1a2b] p-8 text-center ring-1 ring-white/10">
                <div className="mx-auto w-fit text-3xl text-sky-400" aria-hidden="true">
                  ✅
                </div>
                <div className="mt-6 text-lg font-semibold">
                  Une volonté constante de produire des décisions utiles et actionnables
                </div>
              </div>
            </div>

            <p className="mx-auto mt-14 max-w-4xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
              Nous ne vendons pas une technologie, mais une méthode de travail
              <br />
              qui rend la <span className="text-sky-400">complexité</span> plus{" "}
              <span className="text-sky-400">lisible</span> et les{" "}
              <span className="text-sky-400">décisions</span> plus{" "}
              <span className="text-sky-400">éclairées</span>.
            </p>
          </div>
        </Container>
      </section>

      {/* CTA FINAL */}
      <section className="bg-[#080d1a] py-24">
        <Container>
          <div className="text-center">
            <h2 className="mx-auto max-w-5xl text-2xl font-semibold leading-snug tracking-tight sm:text-4xl">
              Vous souhaitez <span className="text-sky-400">comprendre</span> notre méthode,
              <br className="hidden sm:block" />
              découvrir comment nous travaillons ou{" "}
              <span className="text-sky-400">échanger</span> sur vos enjeux organisationnels ?
            </h2>

            <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
              <Link
                href="/methode-orchestra"
                className="inline-flex h-14 items-center justify-center rounded-xl bg-sky-600 px-10 text-base font-semibold text-white shadow-sm hover:bg-sky-500"
              >
                Découvrir la Méthode ORCHESTRA
              </Link>

              <Link
                href="/contact"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-white/5 px-10 text-base font-semibold text-white ring-1 ring-white/10 hover:bg-white/10"
              >
                Nous contacter <span aria-hidden="true">›</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
