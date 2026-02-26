// app/faq/page.tsx

import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";
import { RichText, RichTextInline, RichTextSmall } from "@/components/sanity/RichText";
import { getPageBySlug } from "@/lib/sanity/queries";

export const dynamic = "force-dynamic";

// Label UI fixe — pas du contenu CMS (cf. standard Jour 40)
const ANSWER_LABEL = "Réponse :";

export default async function FaqPage() {
  const data = await getPageBySlug("faq");

  // ✅ CORRECTION #2 : notFound() — 404 réel si document absent dans Sanity
  if (!data) notFound();

  const hero = data.hero;
  const faq = data.faqSections;
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
    <h1 className="mx-auto mt-10 max-w-[900px] text-center text-5xl font-semibold leading-[1.15] tracking-tight sm:text-6xl lg:mt-12">
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
          QUESTIONS / RÉPONSES
      ========================================================== */}
      <Section className="py-24">
        <Container>
          <div className="text-center">
            {faq?.titleRich ? (
              <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
                <RichTextInline value={faq.titleRich} />
              </h2>
            ) : null}

            {faq?.introRich ? (
              <div className="mx-auto mt-8 max-w-4xl">
                <RichText value={faq.introRich} />
              </div>
            ) : null}
          </div>

          {(faq?.items ?? []).length > 0 ? (
            <div className="mt-14 space-y-8">
              {(faq.items ?? []).map((item: any, idx: number) => (
                <div
                  key={`${item?.question ?? "faq"}-${idx}`}
                  className="rounded-2xl bg-[#0f1a2b] p-8 ring-1 ring-white/10"
                >
                  {item?.question ? (
                    <div className="text-sm font-semibold text-white/95 sm:text-base">
                      {item.question}
                    </div>
                  ) : null}

                  {item?.answerRich ? (
                    <div className="mt-4 text-sm leading-7 text-white/85 sm:text-base">
                      <span className="font-semibold text-white">{ANSWER_LABEL}</span>
                      <div className="mt-2">
                        <RichTextSmall value={item.answerRich} />
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}

              {/* Bandeau conviction — conditionnel sur textRich */}
              {faq?.conviction?.textRich ? (
                <div className="rounded-2xl bg-[#0f1a2b] p-8 text-center ring-1 ring-white/10">
                  {faq.conviction.badgeEmoji ? (
                    <div className="mx-auto mb-4 w-fit rounded-full bg-white/5 px-3 py-2 text-sm">
                      {faq.conviction.badgeEmoji}
                    </div>
                  ) : null}

                  <div className="mx-auto max-w-4xl text-sm leading-7 text-white/85 sm:text-base">
                    <RichText value={faq.conviction.textRich} />
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
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