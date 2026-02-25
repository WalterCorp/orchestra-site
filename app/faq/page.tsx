// orchestra-site/app/faq/page.tsx

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";
import { RichTextInline, RichTextSmall } from "@/components/sanity/RichText";
import { getPageBySlug } from "@/lib/sanity/queries";

export const dynamic = "force-dynamic";

export default async function FaqPage() {
  const data = await getPageBySlug("faq");

  if (!data) {
    return (
      <main className="p-10 space-y-4">
        <h1 className="text-2xl font-bold">FAQ page missing in CMS</h1>
        <p className="text-gray-600">No Sanity document found for slug: faq</p>
      </main>
    );
  }

  const hero = data.hero;
  const faq = data.faqSections;
  const cta = data.finalCta;

  // =========================================================
  // HERO
  // =========================================================
  const heroBadge = (
    <>
      <span aria-hidden="true">{hero?.badgeEmoji ?? "🤖"}</span>
      <span>{hero?.badgeText ?? "Conseil augmenté par l’IA"}</span>
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
      <Hero
        badge={heroBadge}
        title={heroTitle}
        description={heroDescription}
        primaryCta={heroPrimaryCta}
        secondaryCta={heroSecondaryCta}
        fullHeight
      />

      {/* =========================================================
          QUESTIONS / RÉPONSES
      ========================================================== */}
      <Section className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              <RichTextInline
                value={faq?.titleRich ?? [{ _type: "block", children: [{ _type: "span", text: "Questions / Réponses" }] }]}
              />
            </h2>

            {faq?.introRich ? (
              <div className="mx-auto mt-8 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
                <RichTextInline value={faq.introRich} />
              </div>
            ) : null}
          </div>

          <div className="mt-14 space-y-8">
            {(faq?.items ?? []).map((item: any, idx: number) => (
              <div
                key={`${item?.question ?? "faq"}-${idx}`}
                className="rounded-2xl bg-[#0f1a2b] p-8 ring-1 ring-white/10"
              >
                <div className="text-sm font-semibold text-white/95 sm:text-base">
                  {item?.question}
                </div>

                <div className="mt-4 text-sm leading-7 text-white/85 sm:text-base">
                  <span className="font-semibold text-white">Réponse :</span>
                  <div className="mt-2">
                    <RichTextSmall value={item?.answerRich} />
                  </div>
                </div>
              </div>
            ))}

            {/* Bandeau conviction */}
            {faq?.conviction?.textRich ? (
              <div className="rounded-2xl bg-[#0f1a2b] p-8 text-center ring-1 ring-white/10">
                <div className="mx-auto mb-4 w-fit rounded-full bg-white/5 px-3 py-2 text-sm">
                  {faq?.conviction?.badgeEmoji ?? "🤖"}
                </div>

                <div className="mx-auto max-w-4xl text-sm leading-7 text-white/85 sm:text-base">
                  <RichTextInline value={faq.conviction.textRich} />
                </div>
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      {/* =========================================================
          CTA FINAL (commun)
      ========================================================== */}
      {cta ? (
        <Section variant="darker" className="py-24">
          <Container>
            <div className="rounded-3xl bg-[#0f1a2b] p-10 text-center ring-1 ring-white/10 sm:p-14">
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                <RichTextInline value={cta?.titleRich} />
              </h2>

              <div className="mx-auto mt-6 max-w-4xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
                <RichTextInline value={cta?.textRich} />
              </div>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  href={cta?.primaryHref ?? "/contact"}
                  variant="primary"
                  className="h-12 px-7"
                >
                  {cta?.primaryLabel ?? "Nous contacter"}
                </Button>

                <Button
                  href={cta?.secondaryHref ?? "/methode-orchestra"}
                  variant="secondary"
                  className="h-12 px-7 gap-2"
                >
                  {cta?.secondaryLabel ?? "Découvrir la méthode ORCHESTRA"}
                  <span aria-hidden="true">›</span>
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}
    </div>
  );
}