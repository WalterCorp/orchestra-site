// app/page.tsx

// Section globale — gestion des blocs de page et des fonds alternés
import { Section } from "@/components/layout/Section";

// Container global — référence de largeur et de padding pour toutes les pages
import { Container } from "@/components/layout/Container";

// Button global — centralisation des styles CTA (primary / secondary)
import { Button } from "@/components/ui/Button";

// Card globale — centralisation des styles de cartes (piliers, contenus, etc.)
import { Card } from "@/components/ui/Card";

// Hero — section réutilisable
import { Hero } from "@/components/sections/Hero";

// Sanity
import { RichText, RichTextInline } from "@/components/sanity/RichText";
import { getPageBySlug } from "@/lib/sanity/queries";

// On force le rendu dynamique (MVP) pour refléter les updates Sanity sans surprises.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const data = await getPageBySlug("accueil");

  // Safety : si la page n’existe pas encore dans Sanity
  if (!data) {
    return (
      <main className="p-10 space-y-4">
        <h1 className="text-2xl font-bold">Home page missing in CMS</h1>
        <p className="text-gray-600">No Sanity document found for slug: accueil</p>
      </main>
    );
  }

  const hero = data.hero;
  const homeSections = data.homeSections;
  const homeCta = data.homeCta;

  // --------------------------------------------------
  // HERO — contenu injecté (ReactNode) pour garder
  // une liberté totale de mise en forme sans régression
  // --------------------------------------------------

  const heroBadge = (
    <>
      <span aria-hidden="true">{hero?.badgeEmoji}</span>
      <span>{hero?.badgeText}</span>
    </>
  );

  const heroTitle = (
    <h1 className="mx-auto mt-10 max-w-[900px] text-center text-5xl font-semibold leading-[1.15] tracking-tight sm:text-6xl lg:mt-12">
      <RichTextInline value={hero?.titleRich} />
    </h1>
  );

  const heroDescription = (
    <div className="mx-auto mt-8 max-w-4xl text-center text-sm leading-8 text-white/80 sm:text-base sm:leading-8">
      <RichTextInline value={hero?.descriptionRich} />
    </div>
  );

  const heroPrimaryCta = (
    <Button
      href={hero?.primaryCtaHref ?? "/methode-orchestra"}
      variant="primary"
      className="h-14 px-10"
    >
      {hero?.primaryCtaLabel ?? "Découvrir la méthode ORCHESTRA"}
    </Button>
  );

  const heroSecondaryCta = (
    <Button
      href={hero?.secondaryCtaHref ?? "/contact"}
      variant="secondary"
      className="h-14 px-10 gap-2"
    >
      {hero?.secondaryCtaLabel ?? (
        <>
          Nous contacter <span aria-hidden="true">›</span>
        </>
      )}
    </Button>
  );

  return (
    <div className="bg-[#0b1020] text-white">
      {/* =========================================================
          HERO — Piloté par Sanity
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
          NOTRE APPROCHE — Piloté par Sanity (fond alterné)
      ========================================================== */}
      <Section variant="darker" className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              <RichTextInline value={homeSections?.approach?.titleRich} />
            </h2>

            <div className="mx-auto mt-10 max-w-4xl">
              <RichText value={homeSections?.approach?.content} />
            </div>
          </div>
        </Container>
      </Section>

      {/* =========================================================
          ORCHESTRA — Noyau (piloté par Sanity)
      ========================================================== */}
      <section className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              <RichTextInline value={homeSections?.orchestraCore?.titleRich} />
            </h2>

            <div className="mx-auto mt-10 max-w-4xl">
              <RichText value={homeSections?.orchestraCore?.content} />
            </div>

            {/* Grille 4 piliers — pilotée par Sanity (structure stable) */}
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {(homeSections?.orchestraCore?.pillars ?? []).map(
                (pillar: any, idx: number) => (
                  <Card
                    key={`${pillar.icon}-${pillar.line1}-${idx}`}
                    icon={pillar.icon}
                    title={
                      <>
                        <div className="mt-4 text-lg font-semibold">{pillar.line1}</div>
                        <div className="text-lg font-semibold">{pillar.line2}</div>
                      </>
                    }
                  />
                )
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================
          LA PLACE DE L’HUMAIN — Piloté par Sanity (fond alterné)
      ========================================================== */}
      <Section variant="darker" className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              <RichTextInline value={homeSections?.humanPlace?.titleRich} />
            </h2>

            <div className="mx-auto mt-8 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
              <RichTextInline value={homeSections?.humanPlace?.intro} />
            </div>

            {/* 3 cartes — pilotées par Sanity (structure stable) */}
            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {(homeSections?.humanPlace?.cards ?? []).map((card: any, idx: number) => (
                <Card
                  key={`${card.icon}-${card.title}-${idx}`}
                  variant="md"
                  icon={card.icon}
                  title={<h3 className="mt-4 text-xl font-semibold">{card.title}</h3>}
                >
                  <p className="mt-4 text-base leading-7 text-white/85">{card.text}</p>
                </Card>
              ))}
            </div>

            <div className="mx-auto mt-14 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">
              <RichTextInline value={homeSections?.humanPlace?.outro} />
            </div>
          </div>
        </Container>
      </Section>

      {/* =========================================================
          CTA FINAL — Piloté par Sanity
      ========================================================== */}
      <section className="py-24">
        <Container>
          <div className="rounded-3xl bg-[#0f1a2b] p-10 text-center ring-1 ring-white/10 sm:p-14">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              <RichTextInline value={homeCta?.titleRich} />
            </h2>

            <div className="mx-auto mt-6 max-w-4xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
              <RichTextInline value={homeCta?.textRich} />
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href={homeCta?.primaryHref ?? "/contact"} variant="primary" className="h-12 px-7">
                {homeCta?.primaryLabel ?? "Nous contacter"}
              </Button>

              <Button
                href={homeCta?.secondaryHref ?? "/methode-orchestra"}
                variant="secondary"
                className="h-12 px-7 gap-2"
              >
                {homeCta?.secondaryLabel ?? "Découvrir la méthode ORCHESTRA"}
                <span aria-hidden="true">›</span>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}