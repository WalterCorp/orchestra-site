import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/contact/ContactForm";

export default function ContactPage() {
  // --------------------------------------------------
  // HERO — contenu injecté (ReactNode) pour conserver
  // la structure “courte / form-first”
  // --------------------------------------------------

  const heroBadge = (
    <>
      <span aria-hidden="true">🤖</span>
      <span>Conseil augmenté par l&apos;IA</span>
    </>
  );

  const heroTitle = (
    <h1 className="mx-auto mt-10 max-w-[900px] text-center text-5xl font-semibold leading-[1.15] tracking-tight sm:text-6xl">
      Nous <span className="text-sky-400">contacter</span>
    </h1>
  );

  const heroDescription = (
    <p className="mx-auto mt-8 max-w-4xl text-center text-sm leading-8 text-white/80 sm:text-base sm:leading-8">
      Un <span className="text-sky-400">échange humain</span>, sans engagement.
      ORCHESTRA soutient l&apos;analyse, mais un{" "}
      <span className="text-sky-400">expert</span> vous répond.
      <br className="hidden sm:block" />
      Réponse sous <span className="text-sky-400">24–48h</span> ouvrées.
    </p>
  );

  const heroPrimaryCta = (
    <Button href="#formulaire" variant="primary" className="h-14 px-10">
      Accéder au formulaire
    </Button>
  );

  const heroSecondaryCta = (
    <Button
      href="/methode-orchestra"
      variant="secondary"
      className="h-14 px-10 gap-2"
    >
      Découvrir la méthode ORCHESTRA <span aria-hidden="true">›</span>
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
      />

      {/* =========================================================
          FORMULAIRE — bloc principal (fond alterné + card)
      ========================================================== */}
      <Section variant="darker" className="py-24" id="formulaire">
        <Container>
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              Écrivez-nous, on{" "}
              <span className="text-sky-400">revient vers vous</span> rapidement
            </h2>

            <p className="mx-auto mt-10 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
              Nous ne proposons jamais de solution standardisée sans{" "}
              <span className="text-sky-400">compréhension préalable</span>.
              ORCHESTRA intervient ensuite{" "}
              <span className="text-sky-400">en soutien</span> de l’analyse menée
              par nos <span className="text-sky-400">experts humains</span>.
            </p>
          </div>

          {/* Form card — pattern “cartes” ORCHESTRA */}
          <div className="mx-auto mt-14 max-w-5xl rounded-2xl bg-[#0f1a2b] p-8 ring-1 ring-white/10 sm:p-10">
            <ContactForm />
          </div>
        </Container>
      </Section>

      {/* =========================================================
          RÉASSURANCE — après formulaire (fond global)
      ========================================================== */}
      <Section className="py-24">
        <Container>
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Ce premier contact permet de{" "}
              <span className="text-sky-400">clarifier</span> l’essentiel
            </h2>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl bg-[#0f1a2b] p-7 text-center ring-1 ring-white/10">
                <div className="text-base font-semibold">Clarifier vos enjeux</div>
              </div>

              <div className="rounded-2xl bg-[#0f1a2b] p-7 text-center ring-1 ring-white/10">
                <div className="text-base font-semibold">
                  Vérifier l’adéquation avec notre approche
                </div>
              </div>

              <div className="rounded-2xl bg-[#0f1a2b] p-7 text-center ring-1 ring-white/10">
                <div className="text-base font-semibold">
                  Définir ensemble les prochaines étapes
                </div>
              </div>
            </div>

            <div className="mt-12 text-sm text-white/60">
              Vous préférez découvrir notre approche ?{" "}
              <a
                href="/methode-orchestra"
                className="text-sky-400 transition-colors hover:text-sky-300"
              >
                Découvrir la Méthode ORCHESTRA
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
