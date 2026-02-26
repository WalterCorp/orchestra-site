// app/fonctionnement/page.tsx

import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BigCard } from "@/components/ui/BigCard";
import { RichText, RichTextInline, RichTextSmall } from "@/components/sanity/RichText";
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

export default async function FonctionnementPage() {
  const data = await getPageBySlug("fonctionnement");

  // ✅ CORRECTION #2 : notFound() — 404 réel si document absent dans Sanity
  if (!data) notFound();

  const hero = data.hero;
  const f = data.fonctionnementSections;
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
    <h1 className="mx-auto mt-10 max-w-[1100px] text-center text-5xl font-semibold leading-[1.12] tracking-tight sm:text-6xl lg:mt-12">
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
        overlayIntensity={hero?.overlayIntensity}
      />

      {/* =========================================================
          PRINCIPES
      ========================================================== */}
      <Section variant="darker" className="py-24">
        <Container>
          <div className="text-center">
            {f?.principles?.titleRich ? (
              <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
                <RichTextInline value={f.principles.titleRich} />
              </h2>
            ) : null}

            {f?.principles?.introRich ? (
              <div className="mx-auto mt-8 max-w-4xl">
                <RichText value={f.principles.introRich} />
              </div>
            ) : null}

            {(f?.principles?.cards ?? []).length > 0 ? (
              <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-3">
                {(f.principles.cards ?? []).map((c: any, idx: number) => (
                  <Card
                    key={`principle-${idx}`}
                    icon={c?.icon}
                    title={<TitleLines lines={c?.titleLines} />}
                  />
                ))}
              </div>
            ) : null}

            {f?.principles?.outroRich ? (
              <div className="mx-auto mt-14 max-w-4xl">
                <RichText value={f.principles.outroRich} />
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      {/* =========================================================
          DÉROULEMENT
      ========================================================== */}
      <Section className="py-24">
        <Container className="max-w-[74rem]">
          <div className="text-center">
            {f?.process?.titleRich ? (
              <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
                <RichTextInline value={f.process.titleRich} />
              </h2>
            ) : null}

            {f?.process?.introRich ? (
              <div className="mx-auto mt-8 max-w-4xl">
                <RichText value={f.process.introRich} />
              </div>
            ) : null}

            {(f?.process?.steps ?? []).length > 0 ? (
              <div className="mt-16 grid gap-6 lg:grid-cols-4">
                {(f.process.steps ?? []).map((s: any, idx: number) => (
                  <BigCard
                    key={`step-${idx}`}
                    className="text-left"
                    icon={s?.icon}
                    titleLines={Array.isArray(s?.titleLines) ? s.titleLines : []}
                    top={s?.topRich ? <RichTextSmall value={s.topRich} /> : null}
                    label={s?.labelRich ? <RichTextInline value={s.labelRich} /> : null}
                    bottom={s?.bottomRich ? <RichTextSmall value={s.bottomRich} /> : null}
                    outro={s?.outroRich ? <RichTextSmall value={s.outroRich} /> : null}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      {/* =========================================================
          PLACE D'ORCHESTRA
      ========================================================== */}
      <Section variant="darker" className="py-24">
        <Container>
          <div className="text-center">
            {f?.orchestraPlace?.titleRich ? (
              <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
                <RichTextInline value={f.orchestraPlace.titleRich} />
              </h2>
            ) : null}

            {f?.orchestraPlace?.introRich ? (
              <div className="mx-auto mt-8 max-w-4xl">
                <RichText value={f.orchestraPlace.introRich} />
              </div>
            ) : null}

            {f?.orchestraPlace?.labelRich ? (
              <div className="mx-auto mt-6 max-w-4xl text-base font-semibold text-[var(--color-brand)]">
                <RichTextInline value={f.orchestraPlace.labelRich} />
              </div>
            ) : null}

            {(f?.orchestraPlace?.cards ?? []).length > 0 ? (
              <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-3">
                {(f.orchestraPlace.cards ?? []).map((c: any, idx: number) => (
                  <Card
                    key={`orchestra-${idx}`}
                    icon={c?.icon}
                    title={<TitleLines lines={c?.titleLines} />}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      {/* =========================================================
          CLIENT BENEFITS
      ========================================================== */}
      <Section className="py-24">
        <Container>
          <div className="text-center">
            {f?.clientBenefits?.titleRich ? (
              <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
                <RichTextInline value={f.clientBenefits.titleRich} />
              </h2>
            ) : null}

            {f?.clientBenefits?.introRich ? (
              <div className="mx-auto mt-10 max-w-4xl">
                <RichText value={f.clientBenefits.introRich} />
              </div>
            ) : null}

            {(f?.clientBenefits?.cards ?? []).length > 0 ? (
              <div className="mx-auto mt-14 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {(f.clientBenefits.cards ?? []).map((c: any, idx: number) => (
                  <Card
                    key={`benefit-${idx}`}
                    icon={c?.icon}
                    title={<TitleLines lines={c?.titleLines} />}
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