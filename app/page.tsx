// app/page.tsx

import { notFound } from "next/navigation";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Hero } from "@/components/sections/Hero";
import { RichText, RichTextInline } from "@/components/sanity/RichText";
import { getPageBySlug } from "@/lib/sanity/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const data = await getPageBySlug("accueil");

  // ✅ CORRECTION #2 : notFound() — 404 réel si document absent dans Sanity
  if (!data) notFound();

  const hero = data.hero;
  const homeSections = data.homeSections;
  const cta = data.finalCta;

  // --------------------------------------------------
  // HERO — rendu conditionnel sur chaque champ optionnel
  // ✅ CORRECTION #3 : pas de ?? hardcodé
  // --------------------------------------------------

  const heroBadge =
    hero?.badgeEmoji || hero?.badgeText ? (
      <>
        {hero.badgeEmoji ? <span aria-hidden="true">{hero.badgeEmoji}</span> : null}
        {hero.badgeText ? <span>{hero.badgeText}</span> : null}
      </>
    ) : null;

  const heroTitle = hero?.titleRich ? (
    <h1 className="mx-auto mt-10 max-w-[900px] text-center text-3xl font-semibold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl lg:mt-12">
      <RichTextInline value={hero.titleRich} />
    </h1>
  ) : null;

  const heroDescription = hero?.descriptionRich ? (
    <div className="mx-auto mt-8 max-w-4xl text-center text-sm leading-8 text-white/80 sm:text-base sm:leading-8">
      <RichTextInline value={hero.descriptionRich} />
    </div>
  ) : null;

  const heroPrimaryCta =
    hero?.primaryCtaHref && hero?.primaryCtaLabel ? (
      <Button href={hero.primaryCtaHref} variant="primary" className="h-14 px-10">
        {hero.primaryCtaLabel}
      </Button>
    ) : null;

  const heroSecondaryCta =
    hero?.secondaryCtaHref && hero?.secondaryCtaLabel ? (
      <Button href={hero.secondaryCtaHref} variant="secondary" className="h-14 px-10 gap-2">
        {hero.secondaryCtaLabel}
      </Button>
    ) : null;

  return (
    <div className="bg-[#0b1020] text-white">
      {/* =========================================================
          HERO — Piloté par Sanity
          ✅ Props background passées explicitement (pas de spread brut)
      ========================================================== */}
      <Hero
        badge={heroBadge}
        title={heroTitle}
        description={heroDescription}
        primaryCta={heroPrimaryCta}
        secondaryCta={heroSecondaryCta}
        fullHeight
        backgroundMode={hero?.backgroundMode}
        backgroundImage={
          hero?.backgroundImage?.asset?.url
            ? {
                url: hero.backgroundImage.asset.url,
                alt: hero.backgroundImage.alt,
                metadata: hero.backgroundImage.asset.metadata,
              }
            : null
        }
        backgroundVideo={
          hero?.backgroundVideo?.asset?.url
            ? { url: hero.backgroundVideo.asset.url }
            : null
        }
        overlayIntensity={hero?.overlayIntensity}
      />

      {/* =========================================================
          NOTRE APPROCHE — Piloté par Sanity (fond alterné)
      ========================================================== */}
      <Section variant="darker" className="py-24">
        <Container>
          <div className="text-center">
            {homeSections?.approach?.titleRich ? (
              <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl lg:text-6xl">
                <RichTextInline value={homeSections.approach.titleRich} />
              </h2>
            ) : null}

            {homeSections?.approach?.content ? (
              <div className="mx-auto mt-10 max-w-4xl">
                <RichText value={homeSections.approach.content} />
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      {/* =========================================================
          ORCHESTRA — Noyau (piloté par Sanity)
      ========================================================== */}
      <Section className="py-24">
        <Container>
          <div className="text-center">
            {homeSections?.orchestraCore?.titleRich ? (
              <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl lg:text-6xl">
                <RichTextInline value={homeSections.orchestraCore.titleRich} />
              </h2>
            ) : null}

            {homeSections?.orchestraCore?.content ? (
              <div className="mx-auto mt-10 max-w-4xl">
                <RichText value={homeSections.orchestraCore.content} />
              </div>
            ) : null}

            {(homeSections?.orchestraCore?.pillars ?? []).length > 0 ? (
              <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {(homeSections.orchestraCore.pillars ?? []).map(
                  (pillar: any, idx: number) => (
                    <Card
                      key={`${pillar.icon}-${pillar.line1}-${idx}`}
                      icon={pillar.icon}
                      title={
                        <>
                          <div className="mt-4 text-lg font-semibold">{pillar.line1}</div>
                          {pillar.line2 ? (
                            <div className="text-lg font-semibold">{pillar.line2}</div>
                          ) : null}
                        </>
                      }
                    />
                  )
                )}
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      {/* =========================================================
          LA PLACE DE L'HUMAIN — Piloté par Sanity (fond alterné)
      ========================================================== */}
      <Section variant="darker" className="py-24">
        <Container>
          <div className="text-center">
            {homeSections?.humanPlace?.titleRich ? (
              <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl lg:text-6xl">
                <RichTextInline value={homeSections.humanPlace.titleRich} />
              </h2>
            ) : null}

            {homeSections?.humanPlace?.intro ? (
              <div className="mx-auto mt-8 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
                <RichText value={homeSections.humanPlace.intro} />
              </div>
            ) : null}

            {(homeSections?.humanPlace?.cards ?? []).length > 0 ? (
              <div className="mt-14 grid gap-6 lg:grid-cols-3">
                {(homeSections.humanPlace.cards ?? []).map((card: any, idx: number) => (
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
            ) : null}

            {homeSections?.humanPlace?.outro ? (
              <div className="mx-auto mt-14 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">
                <RichText value={homeSections.humanPlace.outro} />
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      {/* =========================================================
          CTA FINAL — conditionnel (si absent dans Sanity → rien)
      ========================================================== */}
      {cta ? (
        <Section className="py-24">
          <Container>
            <div className="rounded-3xl bg-[#0f1a2b] p-10 text-center ring-1 ring-white/10 sm:p-14">
              {cta.titleRich ? (
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  <RichTextInline value={cta.titleRich} />
                </h2>
              ) : null}

              {cta.textRich ? (
                <div className="mx-auto mt-6 max-w-4xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
                  <RichText value={cta.textRich} />
                </div>
              ) : null}

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                {cta.primaryHref && cta.primaryLabel ? (
                  <Button href={cta.primaryHref} variant="primary" className="h-12 px-7">
                    {cta.primaryLabel}
                  </Button>
                ) : null}

                {cta.secondaryHref && cta.secondaryLabel ? (
                  <Button href={cta.secondaryHref} variant="secondary" className="h-12 px-7 gap-2">
                    {cta.secondaryLabel}
                  </Button>
                ) : null}
              </div>
            </div>
          </Container>
        </Section>
      ) : null}
    </div>
  );
}