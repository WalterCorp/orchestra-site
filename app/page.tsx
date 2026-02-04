// Section globale — gestion des blocs de page et des fonds alternés
// Permet de sortir la logique de layout des pages
import { Section } from "@/components/layout/Section";

// Container global — référence de largeur et de padding pour toutes les pages
// Centralisé pour rendre le site réplicable et maintenable
import { Container } from "@/components/layout/Container";

// Button global — centralisation des styles CTA (primary / secondary)
import { Button } from "@/components/ui/Button";

// Card globale — centralisation des styles de cartes (piliers, contenus, etc.)
// Permet d’éviter la duplication de classes Tailwind dans les pages
import { Card } from "@/components/ui/Card";

// Hero — section réutilisable (extrait du code inline pour rendre le site réplicable)
import { Hero } from "@/components/sections/Hero";

export default function HomePage() {
  // --------------------------------------------------
  // HERO — contenu injecté (ReactNode) pour garder
  // une liberté totale de mise en forme sans régression
  // --------------------------------------------------

  const heroBadge = (
    <>
      <span aria-hidden="true">🤖</span>
      <span>Conseil augmenté par l&apos;IA</span>
    </>
  );

  const heroTitle = (
    <h1 className="mx-auto mt-10 max-w-[900px] text-center text-5xl font-semibold leading-[1.15] tracking-tight sm:text-6xl lg:mt-12">
      <span>
        L&apos;<span className="text-sky-400">intelligence artificielle</span>{" "}
        comme
      </span>
      <br />
      <span>
        système de <span className="text-sky-400">collaborateurs</span>,
      </span>
      <br />
      au service de la{" "}
      <span className="text-sky-400">clarté</span> et de la{" "}
      <span className="text-sky-400">performance</span>.
    </h1>
  );

  const heroDescription = (
    <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
      Nous ne remplaçons pas l&apos;humain par l&apos;IA. Nous collaborons avec
      elle pour renforcer l&apos;analyse, la structuration et la prise de
      décision.
    </p>
  );

  const heroPrimaryCta = (
    <Button href="/methode-orchestra" variant="primary" className="h-14 px-10">
      Découvrir la méthode ORCHESTRA
    </Button>
  );

  const heroSecondaryCta = (
    <Button href="/contact" variant="secondary" className="h-14 px-10 gap-2">
      Nous contacter <span aria-hidden="true">›</span>
    </Button>
  );

  return (
    <div className="bg-[#0b1020] text-white">
      {/* =========================================================
          HERO — Référence UI (typographie + CTA + centrage)
          Refactor : extraction en composant réutilisable
      ========================================================== */}
      <Hero
        badge={heroBadge}
        title={heroTitle}
        description={heroDescription}
        primaryCta={heroPrimaryCta}
        secondaryCta={heroSecondaryCta}
        fullHeight
      />

      {/* =========================================================
          NOTRE APPROCHE — Bloc structurant (fond alterné)
      ========================================================== */}
      <Section variant="darker" className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              Notre <span className="text-sky-400">approche</span>
            </h2>

            <div className="mx-auto mt-10 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
              <p>
                Notre cabinet accompagne les organisations dans leurs prises de{" "}
                <span className="text-sky-400">décision</span>{" "}
                <span className="text-sky-400">stratégiques</span> et{" "}
                <span className="text-sky-400">organisationnelles</span> grâce à
                une méthode de travail reposant sur la{" "}
                <span className="text-sky-400">collaboration</span> entre{" "}
                <span className="text-sky-400">experts humains</span> et une{" "}
                <span className="text-sky-400">
                  architecture d’intelligences artificielles spécialisées
                </span>
                . L’intelligence artificielle n’est pas utilisée comme une
                promesse ou un outil autonome, mais comme un{" "}
                <span className="text-sky-400">système de collaborateurs</span>{" "}
                <span className="text-sky-400">structuré</span>, encadré et piloté
                par l’humain.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* =========================================================
          ORCHESTRA — Noyau de collaboration IA
      ========================================================== */}
      <section className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              ORCHESTRA - Notre noyau de{" "}
              <span className="text-sky-400">collaboration IA</span>
            </h2>

            <p className="mx-auto mt-10 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
              Au coeur de notre méthode se trouve{" "}
              <span className="text-sky-400">ORCHESTRA</span>, un noyau{" "}
              <span className="text-sky-400">
                d’intelligences artificielles spécialisées
              </span>{" "}
              fonctionnant comme une équipe de consultants numériques. ORCHESTRA
              soutient l’analyse, la structuration et la projection des
              scénarios, tout en laissant{" "}
              <span className="text-sky-400">
                l&apos;humain responsable des arbitrages et des décisions
              </span>
              . Cette approche permet de produire une expertise plus robuste,
              plus claire et ancrée dans le réel.
            </p>

            {/* Grille 4 piliers — refactor : remplacement des cartes inline par Card */}
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card
                icon="📊"
                title={
                  <>
                    <div className="mt-4 text-lg font-semibold">Collecter</div>
                    <div className="text-lg font-semibold">&amp; Analyser</div>
                  </>
                }
              />

              <Card
                icon="🧩"
                title={
                  <>
                    <div className="mt-4 text-lg font-semibold">Structurer</div>
                    <div className="text-lg font-semibold">&amp; Expliquer</div>
                  </>
                }
              />

              <Card
                icon="🗺️"
                title={
                  <>
                    <div className="mt-4 text-lg font-semibold">Explorer</div>
                    <div className="text-lg font-semibold">&amp; Scénariser</div>
                  </>
                }
              />

              <Card
                icon="✅"
                title={
                  <>
                    <div className="mt-4 text-lg font-semibold">Superviser</div>
                    <div className="text-lg font-semibold">&amp; Valider</div>
                  </>
                }
              />
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================
          LA PLACE DE L’HUMAIN — Bloc structurant (fond alterné)
      ========================================================== */}
      <Section variant="darker" className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              La place de l&apos;<span className="text-sky-400">humain</span>
            </h2>

            <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">
              L&apos;humain reste au centre de chaque accompagnement. Nos experts
              définissent les orientations, valident les analyses et prennent les
              décisions finales.
            </p>

            {/* 3 cartes — refactor : remplacement des cartes inline par Card (variant md) */}
            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              <Card
                variant="md"
                icon="⇅"
                title={
                  <h3 className="mt-4 text-xl font-semibold">
                    Pilotage des orientations
                  </h3>
                }
              >
                <p className="mt-4 text-base leading-7 text-white/85">
                  Les experts humains définissent le cadre, les objectifs et les
                  priorités de chaque mission.
                </p>
              </Card>

              <Card
                variant="md"
                icon="✔"
                title={<h3 className="mt-4 text-xl font-semibold">Validation humaine</h3>}
              >
                <p className="mt-4 text-base leading-7 text-white/85">
                  Les analyses produites par l&apos;IA sont systématiquement
                  relues, challengées et validées par des experts.
                </p>
              </Card>

              <Card
                variant="md"
                icon="👥"
                title={
                  <h3 className="mt-4 text-xl font-semibold">
                    Responsabilité humaine
                  </h3>
                }
              >
                <p className="mt-4 text-base leading-7 text-white/85">
                  Les décisions finales appartiennent toujours aux consultants,
                  garants du sens et de l&apos;impact réel.
                </p>
              </Card>
            </div>

            <p className="mx-auto mt-14 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">
              <span className="text-sky-400">
                L&apos;intelligence artificielle
              </span>{" "}
              est un <span className="text-sky-400">levier</span>, pas un
              substitut. Elle renforce l&apos;expertise humaine sans jamais
              s&apos;y substituer.
            </p>
          </div>
        </Container>
      </Section>

      {/* =========================================================
          CTA PREMIUM — Bloc final (style “carte” ORCHESTRA)
      ========================================================== */}
      <section className="py-24">
        <Container>
          <div className="rounded-3xl bg-[#0f1a2b] p-10 text-center ring-1 ring-white/10 sm:p-14">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Prêt à <span className="text-sky-400">clarifier</span> vos enjeux
              <br className="hidden sm:block" />
              et structurer vos{" "}
              <span className="text-sky-400">décisions</span> ?
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
              Un échange humain, sans engagement. ORCHESTRA soutient l’analyse,{" "}
              <span className="text-sky-400">l’humain pilote</span> la décision.
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
                Découvrir la méthode ORCHESTRA<span aria-hidden="true">›</span>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
