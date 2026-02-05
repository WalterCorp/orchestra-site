import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";

const FAQ_ITEMS = [
  {
    q: "Question 1 -- L'intelligence artificielle prend-elle des décisions à votre place ?",
    a: "Non. L'intelligence artificielle ne prend aucune décision autonome. Orchestra agit comme un système de collaborateurs numériques qui soutient l'analyse, la structuration et la réflexion, mais toutes les décisions sont prises, arbitrées et validées par des experts humains.",
  },
  {
    q: "Question 2 -- En quoi votre approche est-elle différente d'un cabinet classique ?",
    a: "Notre différence repose sur la structuration de la réflexion. L'intelligence artificielle permet d'élargir le champ d'analyse, de structurer rapidement de grandes quantités d'informations et d'explorer plusieurs scénarios.",
  },
  {
    q: "Question 3 -- Utilisez-vous l'IA pour automatiser l'ensemble des missions ?",
    a: "Non. Nous n'automatisons jamais une mission sans compréhension préalable. L'IA est utilisée pour soutenir l'analyse, la veille, la structuration et la projection, mais l'accompagnement, les échanges et les décisions restent profondément humains.",
  },
  {
    q: "Question 4 -- Est-ce que cette méthode est adaptée à toutes les entreprises ?",
    a: "Notre méthode s'adapte au contexte. Elle est particulièrement pertinente pour les dirigeants confrontés à des décisions complexes, les organisations en croissance ou encore les projets nécessitant clarté et structuration. Chaque accompagnement est ajusté au niveau de maturité et aux besoins réels du client.",
  },
  {
    q: "Question 5 -- L'IA ne risque-t-elle pas de déshumaniser l'accompagnement ?",
    a: "L'IA permet de libérer du temps d'analyse et de structuration, ce qui renforce la qualité des échanges humains. L'accompagnement reste centré sur l'écoute, la compréhension du contexte et la prise de décision responsable.",
  },
  {
    q: "Question 6 -- Comment garantissez-vous la fiabilité des analyses produites ?",
    a: "Toutes les productions issues d'ORCHESTRA sont systématiquement analysées, contextualisées et validées par un expert humain. L'IA n'est jamais considérée comme une source de vérité, mais comme un support à la réflexion.",
  },
  {
    q: "Question 7 -- Travaillez-vous uniquement avec des outils d'intelligence artificielle ?",
    a: "Non. L'intelligence artificielle est un levier parmi d'autres. Notre méthode repose sur l'expertise humaine, l'analyse métier, la structuration des problématiques et l'utilisation raisonnée des technologies.",
  },
];

export default function FaqPage() {
  // --------------------------------------------------
  // HERO — contenu injecté (ReactNode) pour conserver
  // le rendu de la page actuelle, sans régression
  // --------------------------------------------------

  const heroBadge = (
    <>
      <span aria-hidden="true">🤖</span>
      <span>Conseil augmenté par l&apos;IA</span>
    </>
  );

  const heroTitle = (
    <h1 className="mx-auto mt-10 max-w-[900px] text-center text-5xl font-semibold leading-[1.15] tracking-tight sm:text-6xl lg:mt-12">
      Questions fréquentes
    </h1>
  );

  const heroDescription = (
    <p className="mx-auto mt-8 max-w-4xl text-center text-sm leading-8 text-white/80 sm:text-base sm:leading-8">
      Nous avons regroupé ici les{" "}
      <span className="text-sky-400">questions les plus fréquentes</span>{" "}
      concernant notre approche, l&apos;usage de l&apos;intelligence artificielle
      et notre manière de travailler.
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
      <Hero
        badge={heroBadge}
        title={heroTitle}
        description={heroDescription}
        primaryCta={heroPrimaryCta}
        secondaryCta={heroSecondaryCta}
        fullHeight
      />

      {/* =========================================================
          QUESTIONS / RÉPONSES (fond global)
      ========================================================== */}
      <Section className="py-24">
        <Container>
          <h2 className="text-center text-4xl font-semibold tracking-tight sm:text-5xl">
            Questions / Réponses
          </h2>

          <div className="mt-14 space-y-8">
            {FAQ_ITEMS.map((item) => (
              <div
                key={item.q}
                className="rounded-2xl bg-[#0f1a2b] p-8 ring-1 ring-white/10"
              >
                <div className="text-sm font-semibold text-white/95 sm:text-base">
                  {item.q}
                </div>

                <div className="mt-4 text-sm leading-7 text-white/85 sm:text-base">
                  <span className="font-semibold text-white">Réponse :</span>
                  <br />
                  {item.a}
                </div>
              </div>
            ))}

            {/* Bandeau conviction */}
            <div className="rounded-2xl bg-[#0f1a2b] p-8 text-center ring-1 ring-white/10">
              <div className="mx-auto mb-4 w-fit rounded-full bg-white/5 px-3 py-2 text-sm">
                🤖
              </div>
              <p className="mx-auto max-w-4xl text-sm leading-7 text-white/85 sm:text-base">
                Notre approche repose sur une conviction simple : l&apos;intelligence
                artificielle est un outil puissant lorsqu&apos;elle est encadrée,
                expliquée et pilotée par l&apos;humain.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* =========================================================
          CTA PREMIUM — Fin de page (style “carte” ORCHESTRA)
          (Texte spécifique à la FAQ)
      ========================================================== */}
      <Section variant="darker" className="py-24">
        <Container>
          <div className="rounded-3xl bg-[#0f1a2b] p-10 text-center ring-1 ring-white/10 sm:p-14">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Vous avez d&apos;autres questions ou souhaitez{" "}
              <span className="text-sky-400">échanger</span> sur votre contexte ?
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
              Un échange humain, sans engagement, pour clarifier votre situation
              et voir comment ORCHESTRA peut soutenir votre réflexion.
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
      </Section>
    </div>
  );
}
