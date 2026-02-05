import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function FonctionnementPage() {
  // --------------------------------------------------
  // HERO — contenu injecté (ReactNode) pour conserver
  // le rendu fullHeight (comme la V1)
  // --------------------------------------------------

  const heroBadge = (
    <>
      <span aria-hidden="true">🤖</span>
      <span>Conseil augmenté par l&apos;IA</span>
    </>
  );

  const heroTitle = (
    <h1 className="mx-auto mt-10 max-w-[1100px] text-center text-5xl font-semibold leading-[1.12] tracking-tight sm:text-6xl lg:mt-12">
      Une <span className="text-sky-400">méthode</span> claire, structurée et{" "}
      <span className="text-sky-400">pilotée</span> par l&apos;
      <span className="text-sky-400">humain</span>
    </h1>
  );

  const heroDescription = (
    <p className="mx-auto mt-8 max-w-4xl text-center text-sm leading-8 text-white/80 sm:text-base sm:leading-8">
      Chaque mission suit un{" "}
      <span className="text-sky-400">processus lisible</span>, construit autour
      de la <span className="text-sky-400">collaboration</span>
      <br />
      entre experts humains et le noyau d&apos;intelligences artificielles{" "}
      <span className="text-sky-400">ORCHESTRA</span>.
    </p>
  );

  const heroPrimaryCta = (
    <Button href="/methode-orchestra" variant="primary" className="h-14 px-10">
      Découvrir la Méthode ORCHESTRA
    </Button>
  );

  const heroSecondaryCta = (
    <Button href="/contact" variant="secondary" className="h-14 px-10 gap-2">
      Nous contacter <span aria-hidden="true">›</span>
    </Button>
  );

  return (
    <div className="bg-[#0b1020] text-white">
      <Hero
        badge={heroBadge}
        title={heroTitle}
        description={heroDescription}
        primaryCta={heroPrimaryCta}
        secondaryCta={heroSecondaryCta}
        fullHeight
      />

      {/* =========================================================
          PRINCIPES — Bloc structurant (fond alterné)
      ========================================================== */}
      <Section variant="darker" className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              <span className="text-sky-400">Principes</span> de notre approche
            </h2>

            <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">
              Notre manière de travailler repose sur trois principes fondamentaux :
            </p>

            <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-3">
              <Card title="La clarté avant la complexité" icon="☑" />
              <Card
                title={
                  <>
                    <div className="text-lg font-semibold">
                      L&apos;humain avant
                    </div>
                    <div className="text-lg font-semibold">
                      l&apos;automatisation
                    </div>
                  </>
                }
                icon="👥"
              />
              <Card
                title={
                  <>
                    <div className="text-lg font-semibold">
                      La méthode avant la
                    </div>
                    <div className="text-lg font-semibold">technologie</div>
                  </>
                }
                icon="☑"
              />
            </div>

            <p className="mx-auto mt-14 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
              L&apos;intelligence artificielle n&apos;est jamais utilisée pour
              accélérer sans réfléchir, mais pour structurer, éclairer et{" "}
              <span className="text-sky-400">renforcer la prise de décision</span>.
            </p>
          </div>
        </Container>
      </Section>

      {/* =========================================================
          DÉROULEMENT — Fond global (✅ largeur augmentée)
          Note : cartes d’étapes laissées inline (alignement left + contenu dense)
      ========================================================== */}
      <section className="py-24">
        <div className="mx-auto w-full max-w-[74rem] px-6 sm:px-10">
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              Déroulement d&apos;un{" "}
              <span className="text-sky-400">accompagnement</span>
            </h2>

            <p className="mx-auto mt-8 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
              Chaque accompagnement suit une progression logique et maitrisée,{" "}
              <span className="text-sky-400">adaptée au contexte</span>
              <br className="hidden sm:block" />
              du client.
            </p>

            <div className="mt-16 grid gap-6 lg:grid-cols-4">
              {/* 1 — Cadrage */}
              <div className="rounded-2xl bg-[#0f1a2b] p-7 text-left ring-1 ring-white/10">
                <div className="text-3xl text-sky-400">↪</div>
                <h3 className="mt-4 text-lg font-semibold">
                  Compréhension &amp; cadrage
                </h3>
                <div className="mt-4 text-sm leading-7 text-white/85">
                  <ul className="space-y-2">
                    <li>- Echange initial avec le client</li>
                    <li>- Analyse du contexte, des enjeux et des objectifs</li>
                    <li>- Clarification des attentes et des contraintes</li>
                  </ul>

                  <div className="mt-6 font-semibold text-white">
                    <span className="text-sky-400">ORCHESTRA</span> intervient pour :
                  </div>
                  <ul className="mt-3 space-y-2">
                    <li>- Structurer les informations</li>
                    <li>- Identifier les zones d&apos;incertitude</li>
                    <li>- Enrichir la réflexion initiale</li>
                  </ul>
                </div>
              </div>

              {/* 2 — Analyse augmentée */}
              <div className="rounded-2xl bg-[#0f1a2b] p-7 text-left ring-1 ring-white/10">
                <div className="text-3xl text-sky-400">🧠</div>
                <h3 className="mt-4 text-lg font-semibold">
                  Analyse augmentée &amp; structuration
                </h3>
                <div className="mt-4 text-sm leading-7 text-white/85">
                  <ul className="space-y-2">
                    <li>- Analyse approfondie des problématiques</li>
                    <li>- Mise en perspective des données et informations</li>
                    <li>- Identification des leviers d&apos;action</li>
                  </ul>

                  <div className="mt-6 font-semibold text-white">
                    <span className="text-sky-400">ORCHESTRA</span> soutient :
                  </div>
                  <ul className="mt-3 space-y-2">
                    <li>- L&apos;analyse stratégique</li>
                    <li>- La veille sectorielle</li>
                    <li>- La structuration des options possibles</li>
                  </ul>
                </div>
              </div>

              {/* 3 — Scénarios */}
              <div className="rounded-2xl bg-[#0f1a2b] p-7 text-left ring-1 ring-white/10">
                <div className="text-3xl text-sky-400">☑</div>
                <h3 className="mt-4 text-lg font-semibold">
                  Scénarios &amp; arbitrages
                </h3>
                <div className="mt-4 text-sm leading-7 text-white/85">
                  <ul className="space-y-2">
                    <li>- Construction de scénarios possibles</li>
                    <li>- Projection des impacts et conséquences</li>
                    <li>- Evaluation des risques et opportunités</li>
                  </ul>

                  <div className="mt-6 font-semibold text-white">
                    Les experts humains sont là pour :
                  </div>
                  <ul className="mt-3 space-y-2">
                    <li>- Arbitrer les propositions</li>
                    <li>- Sélectionner les options pertinentes</li>
                    <li>- Prendre les décisions finales</li>
                  </ul>
                </div>
              </div>

              {/* 4 — Mise en œuvre */}
              <div className="rounded-2xl bg-[#0f1a2b] p-7 text-left ring-1 ring-white/10">
                <div className="text-3xl text-sky-400">🚀</div>
                <h3 className="mt-4 text-lg font-semibold">
                  Mise en œuvre &amp; accompagnement
                </h3>
                <div className="mt-4 text-sm leading-7 text-white/85">
                  <ul className="space-y-2">
                    <li>- Traduction des décisions en actions concrètes</li>
                    <li>- Accompagnement dans la mise en œuvre</li>
                    <li>- Ajustements en fonction du terrain et des retours</li>
                  </ul>

                  <div className="mt-8 text-center font-semibold text-white">
                    <span className="text-sky-400">ORCHESTRA</span> reste un support permanent,
                    sans jamais se substituer à l&apos;humain.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PLACE D’ORCHESTRA — Bloc structurant (fond alterné)
      ========================================================== */}
      <Section variant="darker" className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              La place d&apos;<span className="text-sky-400">ORCHESTRA</span> dans
              le <span className="text-sky-400">processus</span>
            </h2>

            <p className="mx-auto mt-8 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
              <span className="text-sky-400">ORCHESTRA</span> agit comme un{" "}
              <span className="text-sky-400">copilote</span> structurant. Il aide à
              voir plus clair, plus loin et plus vite
              <br className="hidden sm:block" />
              <span className="text-sky-400">
                sans jamais décider à la place de l&apos;humain
              </span>
              .
            </p>

            <p className="mx-auto mt-16 max-w-2xl text-base font-semibold leading-8 text-white/90 sm:text-lg">
              Chaque production issue d&apos;<span className="text-sky-400">ORCHESTRA</span>{" "}
              est :
            </p>

            <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-3">
              <Card title="Analysée" icon="🧠" />
              <Card title="Contextualisée" icon="🧩" />
              <Card
                title={
                  <>
                    <div className="text-lg font-semibold">Validée par un</div>
                    <div className="text-lg font-semibold">expert humain</div>
                  </>
                }
                icon="✅"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* =========================================================
          CE QUE ÇA CHANGE — Fond global
      ========================================================== */}
      <Section className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              Ce que cela change pour le{" "}
              <span className="text-sky-400">client</span>
            </h2>

            <p className="mx-auto mt-10 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">
              Cette méthode permet au client de bénéficier :
            </p>

            <div className="mx-auto mt-14 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card title="D&apos;un cadre clair et rassurant" icon="📄" />
              <Card title="D&apos;analyses structurées et lisibles" icon="🧱" />
              <Card title="D&apos;une prise de décision plus sereine" icon="☑" />
              <Card
                title="D&apos;un accompagnement humain renforcé par l&apos;IA"
                icon="👥"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* =========================================================
          CTA PREMIUM — Fin de page (style “carte” ORCHESTRA)
      ========================================================== */}
      <Section variant="darker" className="py-24">
        <Container>
          <div className="rounded-3xl bg-[#0f1a2b] p-10 text-center ring-1 ring-white/10 sm:p-14">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Vous souhaitez <span className="text-sky-400">découvrir</span>{" "}
              comment cette méthode peut{" "}
              <span className="text-sky-400">s&apos;appliquer</span> à votre
              contexte ?
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
              Un échange humain, sans engagement, pour clarifier vos enjeux et
              envisager les prochaines étapes.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/contact" variant="primary" className="h-12 px-7">
                Nous contacter
              </Button>

              <Button
                href="/methode-orchestra"
                variant="secondary"
                className="h-12 px-7 gap-2"
              >
                Découvrir la Méthode ORCHESTRA <span aria-hidden="true">›</span>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
