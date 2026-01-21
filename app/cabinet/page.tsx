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
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
            <span aria-hidden="true">🤖</span>
            <span>Conseil augmenté par l&apos;IA</span>
          </div>

          <h1 className="mx-auto mt-12 max-w-[980px] text-center text-5xl font-semibold leading-[1.15] tracking-tight sm:text-6xl">
            Une <span className="text-sky-400">expertise humaine</span> renforcée
            par l&apos;
            <span className="text-sky-400">intelligence artificielle</span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
            Des experts au coeur des décisions, soutenus par une{" "}
            <span className="text-sky-400">architecture</span>{" "}
            <span className="text-sky-400">d&apos;intelligences artificielles</span>{" "}
            conçue
            <br className="hidden sm:block" />
            pour clarifier, structurer et éclairer les choix stratégiques.
          </p>

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

      {/* LA PLACE DE L'HUMAIN */}
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

      {/* L'USAGE ENCADRÉ DE L'IA */}
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
                <span className="text-sky-400">validation humaine</span>, garantissant
                fiabilité, cohérence et responsabilité.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA FINAL */}
      <section className="bg-[#080d1a] py-24">
        <Container>
          <div className="text-center">
            <h2 className="mx-auto max-w-5xl text-2xl font-semibold leading-snug tracking-tight sm:text-4xl">
              Vous souhaitez <span className="text-sky-400">comprendre</span>{" "}
              notre méthode, découvrir comment nous travaillons ou{" "}
              <span className="text-sky-400">échanger</span> sur vos enjeux
              organisationnels ?
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
