import Link from "next/link";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">{children}</div>;
}

function SectionTitle({
  title,
  highlight,
  subtitle,
}: {
  title: string;
  highlight?: string;
  subtitle?: React.ReactNode;
}) {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
        {highlight ? (
          <>
            {title} <span className="text-sky-400">{highlight}</span>
          </>
        ) : (
          title
        )}
      </h2>

      {subtitle ? (
        <div className="mx-auto mt-8 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
          {subtitle}
        </div>
      ) : null}
    </div>
  );
}

function Card({
  title,
  icon,
  children,
}: {
  title: React.ReactNode;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-[#0f1a2b] p-7 ring-1 ring-white/10">
      <div className="mx-auto w-fit text-3xl text-sky-400">{icon}</div>
      <div className="mt-5 text-center text-base font-semibold leading-6">{title}</div>
      <div className="mt-4 text-sm leading-7 text-white/80">{children}</div>
    </div>
  );
}

function BigCard({
  title,
  icon,
  intro,
  label,
  bullets,
  outro,
}: {
  title: string;
  icon: React.ReactNode;
  intro: string;
  label: string;
  bullets: string[];
  outro?: string;
}) {
  return (
    <div className="rounded-2xl bg-[#0f1a2b] p-7 ring-1 ring-white/10">
      <div className="mx-auto w-fit text-3xl text-sky-400">{icon}</div>
      <h3 className="mt-5 text-center text-base font-semibold">{title}</h3>

      <p className="mt-4 text-sm leading-7 text-white/80">{intro}</p>

      <p className="mt-6 text-sm font-semibold text-white">
  <span className="text-sky-400">ORCHESTRA</span>{" "}
  <span className="whitespace-nowrap">
    {label}&nbsp;:
  </span>
</p>


      <ul className="mt-3 space-y-2 text-sm leading-7 text-white/80">
        {bullets.map((b) => (
          <li key={b}>- {b}</li>
        ))}
      </ul>

      {outro ? <p className="mt-5 text-sm leading-7 text-white/80">{outro}</p> : null}
    </div>
  );
}

export default function ExpertisesPage() {
  return (
    <div className="bg-[#0b1020] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-6 py-14 text-center sm:px-10 lg:min-h-[calc(100vh-72px)] lg:py-24">
          {/* Badge (icône identique aux autres pages) */}
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
            <span aria-hidden="true">🤖</span>
            <span>Conseil augmenté par l&apos;IA</span>
          </div>

          {/* H1 */}
          <h1 className="mx-auto mt-12 max-w-[980px] text-5xl font-semibold leading-[1.15] tracking-tight sm:text-6xl">
            Des <span className="text-sky-400">expertises humaines</span>, renforcées
            par <span className="text-sky-400">ORCHESTRA</span>
          </h1>

          {/* Texte (un peu plus resserré) */}
          <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">
            Chaque domaine d&apos;intervention s&apos;appuie sur une{" "}
            <span className="text-sky-400">expertise humaine augmentée</span> par une
            architecture d&apos;intelligences artificielles{" "}
            <span className="text-sky-400">spécialisées</span>, au service de la{" "}
            <span className="text-sky-400">clarté</span> et de la{" "}
            <span className="text-sky-400">performance</span>.
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

      {/* SECTION 2 : Approche (fond sombre, sans border-y pour éviter la fine ligne) */}
      <section className="bg-[#080d1a] py-24">
        <Container>
          <SectionTitle
            title="Notre approche des"
            highlight="expertises"
            subtitle={
              <>
                Nous n&apos;appliquons pas une solution unique à tous les contextes.
                <br />
                Chaque mission mobilise des{" "}
                <span className="text-sky-400">expertises spécifiques</span> soutenues
                par <span className="text-sky-400">ORCHESTRA</span> pour analyser,
                structurer et projeter.
                <br />
                <br />
                L&apos;intelligence artificielle permet{" "}
                <span className="text-sky-400">d&apos;élargir la capacité d&apos;analyse</span>,
                mais les choix restent humains, contextualisés et responsables.
              </>
            }
          />
        </Container>
      </section>

      {/* SECTION 3 : Domaines d'expertise */}
      <section className="py-24">
        <Container>
          <SectionTitle title="Nos domaines d’" highlight="expertise" />

          <div className="mt-14 grid gap-6 lg:grid-cols-4">
            <BigCard
              icon="↗"
              title="Stratégie & prise de décision"
              intro="Nous accompagnons les dirigeants et décideurs dans leurs réflexions stratégiques, leurs choix structurants et leurs arbitrages complexes."
              label="intervient pour"
              bullets={[
                "Analyser les données disponibles",
                "Structurer les enjeux",
                "Projeter différents scénarios",
              ]}
              outro="Les décisions finales restent pilotées par l’humain."
            />

            <BigCard
              icon="⎇"
              title="Organisation & structuration des processus"
              intro="Nous aidons les organisations à clarifier leurs modes de fonctionnement, leurs processus internes et leurs responsabilités."
              label="soutient"
              bullets={[
                "L’analyse des flux",
                "L’identification des points de friction",
                "La structuration des processus lisibles et opérationnels",
              ]}
            />

            <BigCard
              icon="≡"
              title="Performance opérationnelle"
              intro="Nous travaillons sur l’optimisation des pratiques existantes sans remettre en cause inutilement ce qui fonctionne déjà."
              label="permet"
              bullets={[
                "D’objectiver les situations",
                "De comparer différentes approches",
                "De prioriser les actions à forte valeur ajoutée",
              ]}
            />

            <BigCard
              icon="▦"
              title="Aide à la structuration de projets complexes"
              intro="Lorsque les projets deviennent transverses ou complexes, nous intervenons pour remettre de la lisibilité."
              label="permet"
              bullets={[
                "Organiser les informations",
                "Clarifier les objectifs",
                "Structurer les plans d’action",
              ]}
            />
          </div>

          {/* Bandeau "Accompagnement au changement" */}
          <div className="mt-8 rounded-2xl bg-[#0f1a2b] p-8 text-center ring-1 ring-white/10">
            <div className="text-base font-semibold">Accompagnement au changement</div>
            <p className="mx-auto mt-4 max-w-4xl text-sm leading-7 text-white/80">
              Nous accompagnons les équipes dans l&apos;appropriation des décisions et des
              évolutions organisationnelles.{" "}
              <span className="text-sky-400">ORCHESTRA</span> soutient la pédagogie,
              mais l&apos;accompagnement reste humain, progressif et contextualisé.
            </p>
          </div>
        </Container>
      </section>

      {/* SECTION 4 : ORCHESTRA soutient (fond sombre, sans border-y pour éviter la fine ligne) */}
      <section className="bg-[#080d1a] py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              Comment <span className="text-sky-400">ORCHESTRA</span> soutient nos{" "}
              <span className="text-sky-400">expertises</span>
            </h2>

            <p className="mx-auto mt-8 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
              <span className="text-sky-400">ORCHESTRA</span> n&apos;est pas une expertise en soi.
              Il agit comme un socle transversal qui soutient l&apos;ensemble de nos domaines
              d&apos;intervention.
            </p>

            <div className="mt-10 text-base font-semibold text-white/90">Il permet :</div>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <Card icon="⌁" title="D’enrichir l’analyse">
                &nbsp;
              </Card>
              <Card icon="⎇" title="De structurer les réflexions">
                &nbsp;
              </Card>
              <Card icon="≡" title="De gagner en clarté">
                &nbsp;
              </Card>
            </div>

            <p className="mx-auto mt-10 max-w-4xl text-sm text-white/75">
              <span className="text-sky-400">sans jamais</span> se substituer à l&apos;expertise
              humaine.
            </p>
          </div>
        </Container>
      </section>

      {/* SECTION 5 : Pour qui */}
      <section className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              Pour qui sont ces <span className="text-sky-400">expertises</span> ?
            </h2>

            <div className="mt-10 text-base font-semibold text-white/90">
              Nos expertises s’adressent :
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card icon="👤" title="Aux dirigeants et décideurs">
                &nbsp;
              </Card>
              <Card icon="🏛️" title="Aux PME et organisations en croissance">
                &nbsp;
              </Card>
              <Card icon="≡" title="Aux équipes confrontées à des enjeux de structuration">
                &nbsp;
              </Card>
              <Card icon="⇄" title="Aux projets nécessitant clarté et méthode">
                &nbsp;
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA FINAL (fond sombre + boutons harmonisés) */}
      <section className="bg-[#080d1a] py-24">
        <Container>
          <div className="text-center">
            <h2 className="mx-auto max-w-4xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Vous souhaitez <span className="text-sky-400">savoir</span> comment ces expertises peuvent{" "}
              <span className="text-sky-400">s&apos;appliquer</span> à votre organisation ?
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
