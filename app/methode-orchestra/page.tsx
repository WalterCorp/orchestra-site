import Link from "next/link";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">{children}</div>;
}

function Card({
  icon,
  title,
  className = "",
}: {
  icon: string;
  title: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-2xl bg-[#0f1a2b] p-8 text-center ring-1 ring-white/10",
        className,
      ].join(" ")}
    >
      <div className="mx-auto w-fit text-3xl text-sky-400" aria-hidden="true">
        {icon}
      </div>
      <div className="mt-6 text-lg font-semibold leading-snug">{title}</div>
    </div>
  );
}

export default function MethodeOrchestraPage() {
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

          <div className="mt-7 text-4xl font-semibold tracking-tight text-sky-400 sm:text-5xl">
            ORCHESTRA
          </div>

          <h1 className="mx-auto mt-6 max-w-[1100px] text-center text-5xl font-semibold leading-[1.15] tracking-tight sm:text-6xl">
            Une équipe de{" "}
            <span className="text-sky-400">collaborateurs intelligents</span> au
            service de la <span className="text-sky-400">décision</span>
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
            <span className="text-sky-400">ORCHESTRA</span> n&apos;est pas une
            intelligence artificielle unique,
            <br />
            mais une architecture coordonnée{" "}
            <span className="text-sky-400">d&apos;intelligences spécialisées</span>,
            <br />
            pilotée et validée par des{" "}
            <span className="text-sky-400">experts humains</span>.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Link
              href="/fonctionnement"
              className="inline-flex h-14 items-center justify-center rounded-xl bg-sky-600 px-10 text-base font-semibold text-white shadow-sm hover:bg-sky-500"
            >
              Comment nous travaillons
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

      {/* UNE NOUVELLE FAÇON DE TRAVAILLER */}
      <section className="bg-[#080d1a] py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              Une nouvelle <span className="text-sky-400">façon</span> de
              travailler avec l&apos;<span className="text-sky-400">IA</span>
            </h2>

            <div className="mx-auto mt-6 w-fit text-3xl text-sky-400" aria-hidden="true">
              🧩
            </div>

            <div className="mx-auto mt-10 max-w-3xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
              <p>
                <span className="text-sky-400">ORCHESTRA</span> est le noyau
                d&apos;intelligences artificielles du cabinet.
                <br />
                Il fonctionne comme{" "}
                <span className="text-sky-400">
                  une équipe de consultants numériques spécialisés
                </span>
                ,
                <br />
                organisés, coordonnés et encadrés par l&apos;humain.
                <br />
                Contrairement aux usages classiques de l&apos;IA,{" "}
                <span className="text-sky-400">ORCHESTRA</span> n&apos;agit jamais
                de manière autonome.
                <br />
                Chaque analyse, chaque projection et chaque recommandation
                <br />
                est supervisée, interprétée et validée par des experts humains.
                <br />
                Nous ne déléguons pas la décision à l&apos;intelligence artificielle.
                <br />
                <span className="text-sky-400">Nous collaborons avec elle.</span>
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* POURQUOI ORCHESTRA */}
      <section className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              Pourquoi <span className="text-sky-400">ORCHESTRA</span>
            </h2>

            <p className="mx-auto mt-6 max-w-5xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
              Les organisations évoluent dans des environnements complexes,
              marqués par l&apos;incertitude,
              <br className="hidden sm:block" />
              la surcharge d&apos;informations et la multiplication des choix stratégiques.
            </p>

            <p className="mt-8 font-semibold text-sky-400">ORCHESTRA permet de :</p>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card icon="🧠" title="Structurer la réflexion" />
              <Card icon="📋" title="Clarifier les enjeux" />
              <Card icon="↪" title="Objectiver les décisions" />
              <Card
                icon="👥"
                title={
                  <>
                    Conserver une lecture
                    <br />
                    humaine, pragmatique et
                    <br />
                    responsable
                  </>
                }
              />
            </div>

            <p className="mx-auto mt-12 max-w-4xl text-sm text-white/85 sm:text-base">
              L&apos;intelligence artificielle devient alors{" "}
              <span className="text-sky-400">un levier de clarté</span>, et non une promesse abstraite.
            </p>
          </div>
        </Container>
      </section>

      {/* COMPOSITION DU NOYAU ORCHESTRA */}
      <section className="bg-[#080d1a] py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              Composition du noyau <span className="text-sky-400">ORCHESTRA</span>
            </h2>

            <p className="mx-auto mt-6 max-w-4xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
              ORCHESTRA repose sur une architecture d&apos;intelligences artificielles spécialisées,
              <br />
              chacune dédiée à <span className="text-sky-400">un rôle précis</span>.
            </p>

            <p className="mt-10 font-semibold text-white">Exemples de composants :</p>

            {/* Bulles (approximation fidèle sans assets) */}
            <div className="relative mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-full bg-[#0f1a2b] p-10 text-center ring-1 ring-white/10">
                <div className="mx-auto w-fit text-3xl text-sky-400">🧮</div>
                <div className="mt-5 text-lg font-semibold">IA d&apos;analyse stratégique</div>
                <p className="mt-3 text-sm leading-6 text-white/80">
                  Analyse des contextes,
                  <br />
                  problématiques et Objectifs
                </p>
              </div>

              <div className="rounded-full bg-[#0f1a2b] p-10 text-center ring-1 ring-white/10">
                <div className="mx-auto w-fit text-3xl text-sky-400">🧾</div>
                <div className="mt-5 text-lg font-semibold">IA de veille et de synthèse</div>
                <p className="mt-3 text-sm leading-6 text-white/80">
                  Collecte d&apos;informations,
                  <br />
                  tendances, benchmarks et
                  <br />
                  synthèse claires
                </p>
              </div>

              <div className="rounded-full bg-[#0f1a2b] p-10 text-center ring-1 ring-white/10">
                <div className="mx-auto w-fit text-3xl text-sky-400">🧩</div>
                <div className="mt-5 text-lg font-semibold">IA de structuration</div>
                <p className="mt-3 text-sm leading-6 text-white/80">
                  Organisation des idées,
                  <br />
                  méthodes, plans d&apos;action et
                  <br />
                  processus
                </p>
              </div>

              <div className="rounded-full bg-[#0f1a2b] p-10 text-center ring-1 ring-white/10 lg:col-start-1 lg:col-end-3 lg:mx-auto lg:w-[70%]">
                <div className="mx-auto w-fit text-3xl text-sky-400">🧭</div>
                <div className="mt-5 text-lg font-semibold">IA de projection et scénarios</div>
                <p className="mt-3 text-sm leading-6 text-white/80">
                  Simulation de scénarios,
                  <br />
                  hypothèses et impacts
                  <br />
                  potentiels
                </p>
              </div>

              <div className="rounded-full bg-[#0f1a2b] p-10 text-center ring-1 ring-white/10 lg:col-start-3 lg:col-end-4">
                <div className="mx-auto w-fit text-3xl text-sky-400">🎓</div>
                <div className="mt-5 text-lg font-semibold">
                  IA de reformulation et pédagogie
                </div>
                <p className="mt-3 text-sm leading-6 text-white/80">
                  Chaque composant agit
                  <br />
                  comme un expert spécialisé,
                  <br />
                  intégré dans une logique
                  <br />
                  globale et cohérente
                </p>
              </div>
            </div>

            <p className="mx-auto mt-14 max-w-4xl text-sm text-white/85 sm:text-base">
              Chaque composant agit comme{" "}
              <span className="text-sky-400">un expert spécialisé</span>, intégré dans une logique globale et cohérente.
            </p>
          </div>
        </Container>
      </section>

      {/* LE RÔLE CENTRAL DE L'HUMAIN */}
      <section className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              Le rôle central de l&apos;<span className="text-sky-400">humain</span>
            </h2>

            <p className="mx-auto mt-4 max-w-4xl text-sm text-white/85 sm:text-base">
              L&apos;humain reste au centre du dispositif{" "}
              <span className="text-sky-400">ORCHESTRA</span>.
            </p>

            <p className="mt-10 font-semibold text-white">Les experts humains sont là pour:</p>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card icon="↪" title="Définir les orientations" />
              <Card icon="⌨️" title="Arbitrer les propositions" />
              <Card icon="✅" title={<>Valider les analyses et<br />prendre les décisions<br />finales</>} />
              <Card icon="📊" title={<>Assurer<br />l&apos;accompagnement client</>} />
            </div>

            <p className="mx-auto mt-12 max-w-5xl text-sm text-white/85 sm:text-base">
              <span className="text-sky-400">ORCHESTRA</span> ne remplace pas l&apos;expertise humaine.{" "}
              <span className="text-sky-400">Il l&apos;amplifie, la structure et la rend plus lisible</span>
            </p>
          </div>
        </Container>
      </section>

      {/* FONCTIONNEMENT GLOBAL */}
      <section className="bg-[#080d1a] py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              Fonctionnement global de la méthode{" "}
              <span className="text-sky-400">ORCHESTRA</span>
            </h2>

            <p className="mx-auto mt-10 max-w-4xl text-sm text-white/85 sm:text-base">
              La méthode <span className="text-sky-400">ORCHESTRA</span> repose sur un fonctionnement clair et structuré :
            </p>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card
                icon="👥"
                title={
                  <>
                    Analyse du contexte et des
                    <br />
                    enjeux par les experts
                    <br />
                    humains
                  </>
                }
              />
              <Card
                icon="⭕"
                title={
                  <>
                    Appui d&apos;<span className="text-sky-400">ORCHESTRA</span> pour
                    <br />
                    enrichir l&apos;analyser
                  </>
                }
              />
              <Card icon="✅" title={<>Arbitrage et validation<br />humaine</>} />
              <Card icon="📊" title={<>Mise en oeuvre et<br />accompagnement</>} />
            </div>

            <p className="mx-auto mt-12 max-w-5xl text-sm text-white/85 sm:text-base">
              Cette organisation permet{" "}
              <span className="text-sky-400">une prise de décision plus éclairée</span>, sans jamais perdre la maîtrise humaine
            </p>
          </div>
        </Container>
      </section>

      {/* BÉNÉFICES POUR LE CLIENT */}
      <section className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              <span className="text-sky-400">Bénéfices</span> pour le client
            </h2>

            <p className="mx-auto mt-10 max-w-4xl text-sm text-white/85 sm:text-base">
              Voici les avantages de l&apos;utilisation d&apos;ORCHESTRA pour le client :
            </p>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card icon="↪" title={<>Une meilleure clarté dans<br />ses décisions</>} />
              <Card icon="🧠" title={<>Une expertise renforcée<br />mais ancrée dans le réel</>} />
              <Card icon="✅" title={<>Une méthode lisible et<br />expliquée</>} />
              <Card icon="📊" title={<>Un accompagnement<br />structuré et responsable</>} />
            </div>
          </div>
        </Container>
      </section>

      {/* CTA FINAL */}
      <section className="bg-[#080d1a] py-24">
        <Container>
          <div className="text-center">
            <h2 className="mx-auto max-w-5xl text-2xl font-semibold leading-snug tracking-tight sm:text-4xl">
              Vous souhaitez <span className="text-sky-400">comprendre</span> comment{" "}
              <span className="text-sky-400">ORCHESTRA</span> peut clarifier
              <br className="hidden sm:block" />
              vos enjeux et <span className="text-sky-400">structurer</span> vos décisions ?
            </h2>

            <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
              <Link
                href="/fonctionnement"
                className="inline-flex h-14 items-center justify-center rounded-xl bg-sky-600 px-10 text-base font-semibold text-white shadow-sm hover:bg-sky-500"
              >
                Comment nous travaillons
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
