// app/expertises/page.tsx

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

export default async function ExpertisesPage() {
  const data = await getPageBySlug("expertises");

  // ✅ CORRECTION #2 : notFound() — 404 réel si document absent dans Sanity
  if (!data) notFound();

  const hero = data.hero;
  const e = data.expertisesSections;
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
    <h1 className="mx-auto mt-10 max-w-[1100px] text-center text-3xl font-semibold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl lg:mt-12">
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
          APPROCHE
      ========================================================== */}
      <Section variant="darker" className="py-24">
        <Container>
          <div className="text-center">
            {e?.approach?.titleRich ? (
              <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl lg:text-6xl">
                <RichTextInline value={e.approach.titleRich} />
              </h2>
            ) : null}

            {e?.approach?.contentRich ? (
              <div className="mx-auto mt-8 max-w-4xl">
                <RichText value={e.approach.contentRich} />
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      {/* =========================================================
          DOMAINES D'EXPERTISE
      ========================================================== */}
      <Section className="py-24">
        <Container className="max-w-[74rem]">
          <div className="text-center">
            {e?.domains?.titleRich ? (
              <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl lg:text-6xl">
                <RichTextInline value={e.domains.titleRich} />
              </h2>
            ) : null}

            {e?.domains?.introRich ? (
              <div className="mx-auto mt-8 max-w-4xl">
                <RichText value={e.domains.introRich} />
              </div>
            ) : null}

            {(e?.domains?.cards ?? []).length > 0 ? (
              <div className="mt-16 grid gap-6 lg:grid-cols-4">
                {(e.domains.cards ?? []).map((c: any, idx: number) => (
                  <BigCard
                    key={`expertise-${idx}`}
                    className="text-left"
                    icon={c?.icon}
                    titleLines={Array.isArray(c?.titleLines) ? c.titleLines : []}
                    top={c?.topRich ? <RichTextSmall value={c.topRich} /> : null}
                    label={c?.labelRich ? <RichTextInline value={c.labelRich} /> : null}
                    bottom={c?.bottomRich ? <RichTextSmall value={c.bottomRich} /> : null}
                    outro={c?.outroRich ? <RichTextSmall value={c.outroRich} /> : null}
                  />
                ))}
              </div>
            ) : null}

            {/* Bandeau — Accompagnement au changement */}
            {/* ✅ Rendu uniquement si au moins un champ est présent */}
            {(e?.domains?.changeBand?.title || e?.domains?.changeBand?.textRich) ? (
              <div className="mt-8 rounded-2xl bg-[#0f1a2b] p-8 text-center ring-1 ring-white/10">
                {e.domains.changeBand.title ? (
                  <div className="text-lg font-semibold leading-7">
                    {e.domains.changeBand.title}
                  </div>
                ) : null}

                {e.domains.changeBand.textRich ? (
                  <div className="mx-auto mt-4 max-w-4xl text-sm leading-7 text-white/80">
                    <RichText value={e.domains.changeBand.textRich} />
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      {/* =========================================================
          ORCHESTRA SOUTIENT
      ========================================================== */}
      <Section variant="darker" className="py-24">
        <Container>
          <div className="text-center">
            {e?.orchestraSupport?.titleRich ? (
              <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl lg:text-6xl">
                <RichTextInline value={e.orchestraSupport.titleRich} />
              </h2>
            ) : null}

            {e?.orchestraSupport?.introRich ? (
              <div className="mx-auto mt-8 max-w-4xl">
                <RichText value={e.orchestraSupport.introRich} />
              </div>
            ) : null}

            {e?.orchestraSupport?.labelRich ? (
              <div className="mt-10 text-base font-semibold text-[var(--color-brand)]">
                <RichTextInline value={e.orchestraSupport.labelRich} />
              </div>
            ) : null}

            {(e?.orchestraSupport?.cards ?? []).length > 0 ? (
              <div className="mt-10 grid gap-6 sm:grid-cols-3">
                {(e.orchestraSupport.cards ?? []).map((c: any, idx: number) => (
                  <Card
                    key={`support-${idx}`}
                    icon={c?.icon}
                    title={<TitleLines lines={c?.titleLines} />}
                  />
                ))}
              </div>
            ) : null}

            {e?.orchestraSupport?.outroRich ? (
              <div className="mx-auto mt-10 max-w-4xl">
                <RichText value={e.orchestraSupport.outroRich} />
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      {/* =========================================================
          POUR QUI
      ========================================================== */}
      <Section className="py-24">
        <Container>
          <div className="text-center">
            {e?.audiences?.titleRich ? (
              <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl lg:text-6xl">
                <RichTextInline value={e.audiences.titleRich} />
              </h2>
            ) : null}

            {e?.audiences?.labelRich ? (
              <div className="mt-10 text-base font-semibold text-[var(--color-brand)]">
                <RichTextInline value={e.audiences.labelRich} />
              </div>
            ) : null}

            {(e?.audiences?.cards ?? []).length > 0 ? (
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {(e.audiences.cards ?? []).map((c: any, idx: number) => (
                  <Card
                    key={`audience-${idx}`}
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