// app/cabinet/page.tsx

import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";
import { RichText, RichTextInline } from "@/components/sanity/RichText";
import { getPageBySlug } from "@/lib/sanity/queries";

export const dynamic = "force-dynamic";

export default async function CabinetPage() {
  const data = await getPageBySlug("cabinet");

  // ✅ CORRECTION #2 : notFound() — 404 réel si document absent dans Sanity
  if (!data) notFound();

  const hero = data.hero;
  const sections = data.cabinetSections;
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
      <Hero
        badge={heroBadge}
        title={heroTitle}
        description={heroDescription}
        primaryCta={heroPrimaryCta}
        secondaryCta={heroSecondaryCta}
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

      {/* Vision */}
      <Section variant="darker" className="py-24">
        <Container>
          <div className="text-center">
            {sections?.vision?.titleRich ? (
              <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl lg:text-6xl">
                <RichTextInline value={sections.vision.titleRich} />
              </h2>
            ) : null}

            {/* ✅ text-[var(--color-brand)] au lieu de text-sky-400 hardcodé */}
            {sections?.vision?.emoji ? (
              <div className="mx-auto mt-6 w-fit text-3xl text-[var(--color-brand)]" aria-hidden="true">
                {sections.vision.emoji}
              </div>
            ) : null}

            {sections?.vision?.content ? (
              <div className="mx-auto mt-10 max-w-4xl">
                <RichText value={sections.vision.content} />
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      {/* Humain */}
      <Section className="py-24">
        <Container>
          <div className="text-center">
            {sections?.human?.titleRich ? (
              <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl lg:text-6xl">
                <RichTextInline value={sections.human.titleRich} />
              </h2>
            ) : null}

            {sections?.human?.emoji ? (
              <div className="mx-auto mt-6 w-fit text-3xl text-[var(--color-brand)]" aria-hidden="true">
                {sections.human.emoji}
              </div>
            ) : null}

            {sections?.human?.content ? (
              <div className="mx-auto mt-10 max-w-4xl">
                <RichText value={sections.human.content} />
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      {/* IA */}
      <Section variant="darker" className="py-24">
        <Container>
          <div className="text-center">
            {sections?.ai?.titleRich ? (
              <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl lg:text-6xl">
                <RichTextInline value={sections.ai.titleRich} />
              </h2>
            ) : null}

            {sections?.ai?.emoji ? (
              <div className="mx-auto mt-6 w-fit text-3xl text-[var(--color-brand)]" aria-hidden="true">
                {sections.ai.emoji}
              </div>
            ) : null}

            {sections?.ai?.content ? (
              <div className="mx-auto mt-10 max-w-4xl">
                <RichText value={sections.ai.content} />
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      {/* CTA FINAL — conditionnel */}
      {cta ? (
        <Section variant="darker" className="py-24">
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