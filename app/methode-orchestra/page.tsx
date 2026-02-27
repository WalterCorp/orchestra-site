// app/methode-orchestra/page.tsx

import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { RichText, RichTextInline } from "@/components/sanity/RichText";
import { getPageBySlug } from "@/lib/sanity/queries";

export const dynamic = "force-dynamic";

function TitleLines({ lines }: { lines?: string[] }) {
  const safe = Array.isArray(lines) ? lines.filter(Boolean) : [];
  if (safe.length === 0) return null;
  return (
    <>
      {safe.map((line, idx) => (
        <div key={`${line}-${idx}`} className="text-lg font-semibold">
          {line}
        </div>
      ))}
    </>
  );
}

export default async function MethodeOrchestraPage() {
  const data = await getPageBySlug("methode-orchestra");

  // ✅ CORRECTION #2 : notFound() — 404 réel si document absent dans Sanity
  if (!data) notFound();

  const hero = data.hero;
  const methode = data.methodeSections;
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
    <h1 className="mx-auto mt-10 max-w-[1100px] text-center text-3xl font-semibold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl lg:mt-12">
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

      {/* =========================================================
          INTRO — fond alterné
      ========================================================== */}
      <Section variant="darker" className="py-24">
        <Container>
          <div className="text-center">
            {methode?.intro?.titleRich ? (
              <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl lg:text-6xl">
                <RichTextInline value={methode.intro.titleRich} />
              </h2>
            ) : null}

            {/* ✅ text-[var(--color-brand)] + conditionnel */}
            {methode?.intro?.emoji ? (
              <div className="mx-auto mt-6 w-fit text-3xl text-[var(--color-brand)]" aria-hidden="true">
                {methode.intro.emoji}
              </div>
            ) : null}

            {methode?.intro?.contentRich ? (
              <div className="mx-auto mt-10 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
                <RichText value={methode.intro.contentRich} />
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      {/* =========================================================
          WHY — fond global
      ========================================================== */}
      <Section className="py-24">
        <Container>
          <div className="text-center">
            {methode?.why?.titleRich ? (
              <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl lg:text-6xl">
                <RichTextInline value={methode.why.titleRich} />
              </h2>
            ) : null}

            {methode?.why?.introRich ? (
              <div className="mx-auto mt-8 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
                <RichText value={methode.why.introRich} />
              </div>
            ) : null}

            {/* ✅ label conditionnel + brand color */}
            {methode?.why?.label ? (
              <p className="mt-8 font-semibold text-[var(--color-brand)]">
                {methode.why.label}
              </p>
            ) : null}

            {(methode?.why?.pillars ?? []).length > 0 ? (
              <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {(methode.why.pillars ?? []).map((pillar: any, idx: number) => (
                  <Card
                    key={`${pillar.icon}-${idx}`}
                    icon={pillar.icon}
                    title={<TitleLines lines={pillar.titleLines} />}
                    variant="md"
                  />
                ))}
              </div>
            ) : null}

            {methode?.why?.outroRich ? (
              <div className="mx-auto mt-12 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
                <RichText value={methode.why.outroRich} />
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      {/* =========================================================
          CORE — fond alterné
      ========================================================== */}
      <Section variant="darker" className="py-24">
        <Container>
          <div className="text-center">
            {methode?.core?.titleRich ? (
              <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl lg:text-6xl">
                <RichTextInline value={methode.core.titleRich} />
              </h2>
            ) : null}

            {methode?.core?.introRich ? (
              <div className="mx-auto mt-8 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
                <RichText value={methode.core.introRich} />
              </div>
            ) : null}

            {methode?.core?.label ? (
              <p className="mt-10 font-semibold text-white">{methode.core.label}</p>
            ) : null}

            <div className="mx-auto mt-14 max-w-6xl space-y-6">
              {/* Ligne 1 */}
              {(methode?.core?.bubbles?.line1 ?? []).length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {(methode.core.bubbles.line1 ?? []).map((b: any, idx: number) => (
                    <div
                      key={`${b.icon}-${b.title}-${idx}`}
                      className="flex aspect-square flex-col items-center justify-center rounded-full bg-[#0f1a2b] p-10 text-center ring-1 ring-white/10"
                    >
                      {/* ✅ text-[var(--color-brand)] */}
                      {b.icon ? (
                        <div className="mx-auto w-fit text-3xl text-[var(--color-brand)]">{b.icon}</div>
                      ) : null}
                      {b.title ? <div className="mt-5 text-lg font-semibold">{b.title}</div> : null}
                      {b.text ? (
                        <p className="mt-3 whitespace-pre-line text-sm leading-6 text-white/80">{b.text}</p>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : null}

              {/* Ligne 2 */}
              {(methode?.core?.bubbles?.line2 ?? []).length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6 lg:justify-items-center">
                  <div className="hidden lg:block" />
                  {(methode.core.bubbles.line2 ?? []).map((b: any, idx: number) => (
                    <div
                      key={`${b.icon}-${b.title}-${idx}`}
                      className="flex aspect-square flex-col items-center justify-center rounded-full bg-[#0f1a2b] p-10 text-center ring-1 ring-white/10 lg:col-span-2"
                    >
                      {b.icon ? (
                        <div className="mx-auto w-fit text-3xl text-[var(--color-brand)]">{b.icon}</div>
                      ) : null}
                      {b.title ? <div className="mt-5 text-lg font-semibold">{b.title}</div> : null}
                      {b.text ? (
                        <p className="mt-3 whitespace-pre-line text-sm leading-6 text-white/80">{b.text}</p>
                      ) : null}
                    </div>
                  ))}
                  <div className="hidden lg:block" />
                </div>
              ) : null}
            </div>

            {methode?.core?.outroRich ? (
              <div className="mx-auto mt-14 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
                <RichText value={methode.core.outroRich} />
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      {/* =========================================================
          HUMAN — fond global
      ========================================================== */}
      <Section className="py-24">
        <Container>
          <div className="text-center">
            {methode?.human?.titleRich ? (
              <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl lg:text-6xl">
                <RichTextInline value={methode.human.titleRich} />
              </h2>
            ) : null}

            {methode?.human?.introRich ? (
              <div className="mx-auto mt-4 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
                <RichText value={methode.human.introRich} />
              </div>
            ) : null}

            {methode?.human?.label ? (
              <p className="mt-10 font-semibold text-white">{methode.human.label}</p>
            ) : null}

            {(methode?.human?.cards ?? []).length > 0 ? (
              <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {(methode.human.cards ?? []).map((card: any, idx: number) => (
                  <Card
                    key={`${card.icon}-${idx}`}
                    icon={card.icon}
                    title={<TitleLines lines={card.titleLines} />}
                    variant="md"
                  />
                ))}
              </div>
            ) : null}

            {methode?.human?.outroRich ? (
              <div className="mx-auto mt-12 max-w-5xl text-base leading-8 text-white/85 sm:text-lg">
                <RichText value={methode.human.outroRich} />
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      {/* =========================================================
          WORKFLOW — fond alterné
      ========================================================== */}
      <Section variant="darker" className="py-24">
        <Container>
          <div className="text-center">
            {methode?.workflow?.titleRich ? (
              <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl lg:text-6xl">
                <RichTextInline value={methode.workflow.titleRich} />
              </h2>
            ) : null}

            {methode?.workflow?.introRich ? (
              <div className="mx-auto mt-10 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
                <RichText value={methode.workflow.introRich} />
              </div>
            ) : null}

            {(methode?.workflow?.steps ?? []).length > 0 ? (
              <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {(methode.workflow.steps ?? []).map((step: any, idx: number) => (
                  <Card
                    key={`${step.icon}-${idx}`}
                    icon={step.icon}
                    title={<TitleLines lines={step.titleLines} />}
                    variant="md"
                  />
                ))}
              </div>
            ) : null}

            {methode?.workflow?.outroRich ? (
              <div className="mx-auto mt-12 max-w-5xl text-base leading-8 text-white/85 sm:text-lg">
                <RichText value={methode.workflow.outroRich} />
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      {/* =========================================================
          BENEFITS — fond global
      ========================================================== */}
      <Section className="py-24">
        <Container>
          <div className="text-center">
            {methode?.benefits?.titleRich ? (
              <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl lg:text-6xl">
                <RichTextInline value={methode.benefits.titleRich} />
              </h2>
            ) : null}

            {methode?.benefits?.introRich ? (
              <div className="mx-auto mt-10 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
                <RichText value={methode.benefits.introRich} />
              </div>
            ) : null}

            {(methode?.benefits?.cards ?? []).length > 0 ? (
              <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {(methode.benefits.cards ?? []).map((card: any, idx: number) => (
                  <Card
                    key={`${card.icon}-${idx}`}
                    icon={card.icon}
                    title={<TitleLines lines={card.titleLines} />}
                    variant="md"
                  />
                ))}
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      {/* =========================================================
          CTA FINAL — conditionnel
      ========================================================== */}
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