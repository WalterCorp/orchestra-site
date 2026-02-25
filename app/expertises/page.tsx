// app/expertises/page.tsx

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BigCard } from "@/components/ui/BigCard";

import { RichTextInline, RichTextSmall } from "@/components/sanity/RichText";
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

export default async function ExpertisesPage() {
  const data = await getPageBySlug("expertises");

  if (!data) {
    return (
      <main className="p-10 space-y-4">
        <h1 className="text-2xl font-bold">Expertises page missing in CMS</h1>
        <p className="text-gray-600">
          No Sanity document found for slug: expertises
        </p>
      </main>
    );
  }

  const hero = data.hero;
  const e = data.expertisesSections;
  const cta = data.finalCta;

  // =========================================================
  // HERO (commun)
  // =========================================================

  const heroBadge = (
    <>
      <span aria-hidden="true">{hero?.badgeEmoji ?? "🤖"}</span>
      <span>{hero?.badgeText ?? "Conseil augmenté par l’IA"}</span>
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
          APPROCHE
      ========================================================== */}
      <Section variant="darker" className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              <RichTextInline value={e?.approach?.titleRich} />
            </h2>

            <div className="mx-auto mt-8 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
              <RichTextInline value={e?.approach?.contentRich} />
            </div>
          </div>
        </Container>
      </Section>

      {/* =========================================================
          DOMAINES D’EXPERTISE
      ========================================================== */}
      <Section className="py-24">
        <Container className="max-w-[74rem]">
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              <RichTextInline value={e?.domains?.titleRich} />
            </h2>

            {e?.domains?.introRich ? (
              <div className="mx-auto mt-8 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
                <RichTextInline value={e.domains.introRich} />
              </div>
            ) : null}

            <div className="mt-16 grid gap-6 lg:grid-cols-4">
              {(e?.domains?.cards ?? []).map((c: any, idx: number) => (
                <BigCard
                  key={`expertise-${idx}`}
                  className="text-left"
                  icon={c?.icon}
                  titleLines={Array.isArray(c?.titleLines) ? c.titleLines : []}
                  top={c?.topRich ? <RichTextSmall value={c.topRich} /> : null}
                  label={
                    c?.labelRich ? <RichTextInline value={c.labelRich} /> : null
                  }
                  bottom={
                    c?.bottomRich ? <RichTextSmall value={c.bottomRich} /> : null
                  }
                  outro={
                    c?.outroRich ? <RichTextSmall value={c.outroRich} /> : null
                  }
                />
              ))}
            </div>

            {/* Bandeau — Accompagnement au changement */}
            {e?.domains?.changeBand ? (
              <div className="mt-8 rounded-2xl bg-[#0f1a2b] p-8 text-center ring-1 ring-white/10">
                <div className="text-lg font-semibold leading-7">
                  {e.domains.changeBand?.title ?? "Accompagnement au changement"}
                </div>

                <div className="mx-auto mt-4 max-w-4xl text-sm leading-7 text-white/80">
                  <RichTextInline value={e.domains.changeBand?.textRich} />
                </div>
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
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              <RichTextInline value={e?.orchestraSupport?.titleRich} />
            </h2>

            <div className="mx-auto mt-8 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
              <RichTextInline value={e?.orchestraSupport?.introRich} />
            </div>

            {e?.orchestraSupport?.labelRich ? (
              <div className="mt-10 text-base font-semibold text-white/90">
                <RichTextInline value={e.orchestraSupport.labelRich} />
              </div>
            ) : null}

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {(e?.orchestraSupport?.cards ?? []).map((c: any, idx: number) => (
                <Card
                  key={`support-${idx}`}
                  icon={c?.icon}
                  title={<TitleLines lines={c?.titleLines} />}
                />
              ))}
            </div>

            {e?.orchestraSupport?.outroRich ? (
              <div className="mx-auto mt-10 max-w-4xl text-base font-medium text-white/85 sm:text-lg">
                <RichTextInline value={e.orchestraSupport.outroRich} />
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
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              <RichTextInline value={e?.audiences?.titleRich} />
            </h2>

            {e?.audiences?.labelRich ? (
              <div className="mt-10 text-base font-semibold text-white/90">
                <RichTextInline value={e.audiences.labelRich} />
              </div>
            ) : null}

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {(e?.audiences?.cards ?? []).map((c: any, idx: number) => (
                <Card
                  key={`audience-${idx}`}
                  icon={c?.icon}
                  title={<TitleLines lines={c?.titleLines} />}
                />
              ))}
            </div>
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