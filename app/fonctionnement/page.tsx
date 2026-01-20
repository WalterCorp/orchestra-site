import Link from "next/link";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">{children}</div>;
}

function Section({
  children,
  variant = "dark",
}: {
  children: React.ReactNode;
  variant?: "dark" | "darker";
}) {
  return (
    <section className={variant === "darker" ? "bg-[#080d1a] py-24" : "py-24"}>
      <Container>{children}</Container>
    </section>
  );
}

function Card({
  title,
  icon,
  children,
  align = "left",
}: {
  title: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div
      className={[
        "rounded-2xl bg-[#0f1a2b] p-7 ring-1 ring-white/10",
        align === "center" ? "text-center" : "text-left",
      ].join(" ")}
    >
      {icon ? <div className="text-3xl text-sky-400">{icon}</div> : null}
      <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
      {children ? <div className="mt-4 text-sm leading-7 text-white/80">{children}</div> : null}
    </div>
  );
}

export default function FonctionnementPage() {
  return (
    <div className="bg-[#0b1020] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto flex min-h-[calc(100vh-72px)] w-full max-w-6xl flex-col items-center justify-center px-6 py-16 text-center sm:px-10">
          {/* Badge */}
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
            <span aria-hidden="true">🤖</span>
            <span>Conseil augmenté par l&apos;IA</span>
          </div>

          {/* H1 */}
          <h1 className="mx-auto mt-12 max-w-[1100px] text-center text-5xl font-semibold leading-[1.12] tracking-tight sm:text-6xl">
            Une <span className="text-sky-400">méthode</span> claire, structurée et{" "}
            <span className="text-sky-400">pilotée</span> par l&apos;
            <span className="text-sky-400">humain</span>
          </h1>

          {/* Texte */}
          <p className="mx-auto mt-8 max-w-3xl text-center text-base leading-8 text-white/85 sm:text-lg">
            Chaque mission suit un <span className="text-sky-400">processus lisible</span>, construit autour de la{" "}
            <span className="text-sky-400">collaboration</span> entre experts humains et <br className="hidden sm:block" />
            le noyau d&apos;intelligences artificielles <span className="text-sky-400">ORCHESTRA</span>.
          </p>

          {/* Boutons */}
          <div className="mt-14 flex flex-col items-center justify-center gap-5 sm:flex-row">
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
      </section>

      {/* PRINCIPES */}
      <Section variant="darker">
        <div className="text-center">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            <span className="text-sky-400">Principes</span> de notre approche
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">
            Notre manière de travailler repose sur trois principes fondamentaux :
          </p>

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-3">
            <Card title="La clarté avant la complexité" icon="☑" align="center" />
            <Card title={"L'humain avant\nl'automatisation"} icon="👥" align="center" />
            <Card title={"La méthode avant la\ntechnologie"} icon="☑" align="center" />
          </div>

          <p className="mx-auto mt-14 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
            L&apos;intelligence artificielle n&apos;est jamais utilisée pour accélérer sans réfléchir, mais pour{" "}
            structurer, éclairer et <span className="text-sky-400">renforcer la prise de décision</span>.
          </p>
        </div>
      </Section>

      {/* DEROULEMENT */}
      <Section>
        <div className="text-center">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            Déroulement d&apos;un <span className="text-sky-400">accompagnement</span>
          </h2>

          <p className="mx-auto mt-8 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
            Chaque accompagnement suit une progression logique et maitrisée,{" "}
            <span className="text-sky-400">adaptée au contexte</span>
            <br className="hidden sm:block" />
            du client.
          </p>

          <div className="mt-16 grid gap-6 lg:grid-cols-4">
            <div className="rounded-2xl bg-[#0f1a2b] p-7 text-left ring-1 ring-white/10">
              <div className="text-3xl text-sky-400">↪</div>
              <h3 className="mt-4 text-lg font-semibold">Compréhension &amp; cadrage</h3>
              <div className="mt-4 text-sm leading-7 text-white/85">
                <ul className="space-y-2">
                  <li>- Echange initial avec le client</li>
                  <li>- Analyse du contexte, des enjeux et des objectifs</li>
                  <li>- Clarification des attentes et des contraintes</li>
                </ul>

                <div className="mt-6 font-semibold text-white">ORCHESTRA intervient pour :</div>
                <ul className="mt-3 space-y-2">
                  <li>- Structurer les informations</li>
                  <li>- Identifier les zones d&apos;incertitude</li>
                  <li>- Enrichir la réflexion initiale</li>
                </ul>
              </div>
            </div>

            <div className="rounded-2xl bg-[#0f1a2b] p-7 text-left ring-1 ring-white/10">
              <div className="text-3xl text-sky-400">🧠</div>
              <h3 className="mt-4 text-lg font-semibold">Analyse augmentée &amp; structuration</h3>
              <div className="mt-4 text-sm leading-7 text-white/85">
                <ul className="space-y-2">
                  <li>- Analyse approfondie des problématiques</li>
                  <li>- Mise en perspective des données et informations</li>
                  <li>- Identification des leviers d&apos;action</li>
                </ul>

                <div className="mt-6 font-semibold text-white">ORCHESTRA soutient :</div>
                <ul className="mt-3 space-y-2">
                  <li>- L&apos;analyse stratégique</li>
                  <li>- La veille sectorielle</li>
                  <li>- La structuration des options possibles</li>
                </ul>
              </div>
            </div>

            <div className="rounded-2xl bg-[#0f1a2b] p-7 text-left ring-1 ring-white/10">
              <div className="text-3xl text-sky-400">☑</div>
              <h3 className="mt-4 text-lg font-semibold">Scénarios &amp; arbitrages</h3>
              <div className="mt-4 text-sm leading-7 text-white/85">
                <ul className="space-y-2">
                  <li>- Construction de scénarios possibles</li>
                  <li>- Projection des impacts et conséquences</li>
                  <li>- Evaluation des risques et opportunités</li>
                </ul>

                <div className="mt-6 font-semibold text-white">Les experts humains sont là pour :</div>
                <ul className="mt-3 space-y-2">
                  <li>- Arbitrer les propositions</li>
                  <li>- Sélectionner les options pertinentes</li>
                  <li>- Prendre les décisions finales</li>
                </ul>
              </div>
            </div>

            <div className="rounded-2xl bg-[#0f1a2b] p-7 text-left ring-1 ring-white/10">
              <div className="text-3xl text-sky-400">🚀</div>
              <h3 className="mt-4 text-lg font-semibold">Mise en œuvre &amp; accompagnement</h3>
              <div className="mt-4 text-sm leading-7 text-white/85">
                <ul className="space-y-2">
                  <li>- Traduction des décisions en actions concrètes</li>
                  <li>- Accompagnement dans la mise en œuvre</li>
                  <li>- Ajustements en fonction du terrain et des retours</li>
                </ul>

                <div className="mt-8 text-center font-semibold text-white">
                  ORCHESTRA reste un support permanent, sans jamais se substituer à l&apos;humain.
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* PLACE D'ORCHESTRA */}
      <Section variant="darker">
        <div className="text-center">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            La place d&apos;<span className="text-sky-400">ORCHESTRA</span> dans le{" "}
            <span className="text-sky-400">processus</span>
          </h2>

          <p className="mx-auto mt-8 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
            ORCHESTRA agit comme un <span className="text-sky-400">copilote</span> structurant. Il aide à voir plus clair, plus loin et plus vite
            <br className="hidden sm:block" />
            <span className="text-sky-400">sans jamais décider à la place de l&apos;humain</span>.
          </p>

          <p className="mx-auto mt-16 max-w-2xl text-base font-semibold leading-8 text-white/90 sm:text-lg">
            Chaque production issue d&apos;<span className="text-sky-400">ORCHESTRA</span> est :
          </p>

          <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-3">
            <Card title="Analysée" icon="🧠" align="center" />
            <Card title="Contextualisée" icon="🧩" align="center" />
            <Card title={"Validée par un\nexpert humain"} icon="✅" align="center" />
          </div>
        </div>
      </Section>

      {/* CE QUE CA CHANGE */}
      <Section>
        <div className="text-center">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            Ce que cela change pour le <span className="text-sky-400">client</span>
          </h2>

          <p className="mx-auto mt-10 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">
            Cette méthode permet au client de bénéficier :
          </p>

          <div className="mx-auto mt-14 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card title={"D'un cadre clair et rassurant"} icon="📄" align="center" />
            <Card title={"D'analyses structurées et lisibles"} icon="🧱" align="center" />
            <Card title={"D'une prise de décision plus sereine"} icon="☑" align="center" />
            <Card title={"D'un accompagnement humain renforcé par l'IA"} icon="👥" align="center" />
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="mx-auto max-w-4xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Vous souhaitez <span className="text-sky-400">découvrir</span> comment cette méthode peut
              <br />
              <span className="text-sky-400">s&apos;appliquer</span> à votre contexte ?
            </h2>

            <div className="mt-14 flex flex-col items-center justify-center gap-5 sm:flex-row">
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
