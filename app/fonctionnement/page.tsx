// app/fonctionnement/page.tsx

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BigCard } from "@/components/ui/BigCard";

import {
  RichTextInline,
  RichTextSmall,
} from "@/components/sanity/RichText";

import { getPageBySlug } from "@/lib/sanity/queries";

export const dynamic = "force-dynamic";

function TitleLines({ lines }: { lines?: string[] }) {
  if (!Array.isArray(lines)) return null;

  return (
    <>
      {lines.filter(Boolean).map((line, idx) => (
        <div key={`${line}-${idx}`} className="text-lg font-semibold">
          {line}
        </div>
      ))}
    </>
  );
}

export default async function FonctionnementPage() {
  const data = await getPageBySlug("fonctionnement");

  if (!data) {
    return (
      <main className="p-10 space-y-4">
        <h1 className="text-2xl font-bold">
          Fonctionnement page missing in CMS
        </h1>
        <p className="text-gray-600">
          No Sanity document found for slug: fonctionnement
        </p>
      </main>
    );
  }

  const hero = data.hero;
  const f = data.fonctionnementSections;
  const cta = data.finalCta;

  // =========================================================
  // HERO
  // =========================================================

  const heroBadge = (
    <>
      <span aria-hidden="true">{hero?.badgeEmoji ?? "⚙️"}</span>
      <span>{hero?.badgeText ?? "Comment nous travaillons"}</span>
    </>
  );

  const heroTitle = (
    <h1 className="mx-auto mt-10 max-w-[1100px] text-center text-5xl font-semibold leading-[1.12] tracking-tight sm:text-6xl lg:mt-12">
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
      href={hero?.primaryCtaHref ?? "/contact"}
      variant="primary"
      className="h-14 px-10"
    >
      {hero?.primaryCtaLabel ?? "Nous contacter"}
    </Button>
  );

  const heroSecondaryCta = (
    <Button
      href={hero?.secondaryCtaHref ?? "/methode-orchestra"}
      variant="secondary"
      className="h-14 px-10 gap-2"
    >
      {hero?.secondaryCtaLabel ?? (
        <>
          Découvrir la méthode <span aria-hidden="true">›</span>
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
          PRINCIPES
      ========================================================== */}
      <Section variant="darker" className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              <RichTextInline value={f?.principles?.titleRich} />
            </h2>

            <div className="mx-auto mt-8 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
              <RichTextInline value={f?.principles?.introRich} />
            </div>

            <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-3">
              {(f?.principles?.cards ?? []).map((c: any, idx: number) => (
                <Card
                  key={`principle-${idx}`}
                  icon={c?.icon}
                  title={<TitleLines lines={c?.titleLines} />}
                />
              ))}
            </div>

            <div className="mx-auto mt-14 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
              <RichTextInline value={f?.principles?.outroRich} />
            </div>
          </div>
        </Container>
      </Section>

      {/* =========================================================
          DÉROULEMENT
      ========================================================== */}
      <Section className="py-24">
        <Container className="max-w-[74rem]">
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              <RichTextInline value={f?.process?.titleRich} />
            </h2>

            <div className="mx-auto mt-8 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
              <RichTextInline value={f?.process?.introRich} />
            </div>

            <div className="mt-16 grid gap-6 lg:grid-cols-4">
              {(f?.process?.steps ?? []).map((s: any, idx: number) => (
                <BigCard
                  key={`step-${idx}`}
                  className="text-left"
                  icon={s?.icon}
                  titleLines={
                    Array.isArray(s?.titleLines) ? s.titleLines : []
                  }
                  top={
                    s?.topRich ? (
                      <RichTextSmall value={s.topRich} />
                    ) : null
                  }
                  label={
                    s?.labelRich ? (
                      <RichTextInline value={s.labelRich} />
                    ) : null
                  }
                  bottom={
                    s?.bottomRich ? (
                      <RichTextSmall value={s.bottomRich} />
                    ) : null
                  }
                  outro={
                    s?.outroRich ? (
                      <RichTextSmall value={s.outroRich} />
                    ) : null
                  }
                />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* =========================================================
          PLACE D’ORCHESTRA
      ========================================================== */}
      <Section variant="darker" className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              <RichTextInline value={f?.orchestraPlace?.titleRich} />
            </h2>

            <div className="mx-auto mt-8 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
              <RichTextInline value={f?.orchestraPlace?.introRich} />
            </div>

            <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-3">
              {(f?.orchestraPlace?.cards ?? []).map(
                (c: any, idx: number) => (
                  <Card
                    key={`orchestra-${idx}`}
                    icon={c?.icon}
                    title={<TitleLines lines={c?.titleLines} />}
                  />
                )
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* =========================================================
          CLIENT BENEFITS
      ========================================================== */}
      <Section className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              <RichTextInline value={f?.clientBenefits?.titleRich} />
            </h2>

            <div className="mx-auto mt-10 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
              <RichTextInline value={f?.clientBenefits?.introRich} />
            </div>

            <div className="mx-auto mt-14 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {(f?.clientBenefits?.cards ?? []).map(
                (c: any, idx: number) => (
                  <Card
                    key={`benefit-${idx}`}
                    icon={c?.icon}
                    title={<TitleLines lines={c?.titleLines} />}
                  />
                )
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* =========================================================
          CTA FINAL
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
                  {cta?.secondaryLabel ??
                    "Découvrir la méthode ORCHESTRA"}
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