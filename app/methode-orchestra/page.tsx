// app/methode-orchestra/page.tsx

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

// Sanity
import { RichText, RichTextInline } from "@/components/sanity/RichText";
import { getPageBySlug } from "@/lib/sanity/queries";

// MVP: refléter les updates CMS sans cache surprise
export const dynamic = "force-dynamic";

function TitleLines({ lines }: { lines?: string[] }) {
  const safe = Array.isArray(lines) ? lines.filter(Boolean) : [];
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

  if (!data) {
    return (
      <main className="p-10 space-y-4">
        <h1 className="text-2xl font-bold">Methode page missing in CMS</h1>
        <p className="text-gray-600">
          No Sanity document found for slug: methode-orchestra
        </p>
      </main>
    );
  }

  const hero = data.hero;
  const methode = data.methodeSections;

  // ✅ STANDARD GLOBAL : CTA final = finalCta uniquement (plus de fallback legacy)
  const cta = data.finalCta;

  // --------------------------------------------------
  // HERO — pattern identique à Accueil
  // + label ORCHESTRA spécifique (comme la page statique)
  // --------------------------------------------------

  const heroBadge = (
    <>
      <span aria-hidden="true">{hero?.badgeEmoji ?? "🤖"}</span>
      <span>{hero?.badgeText ?? "Conseil augmenté par l'IA"}</span>
    </>
  );

  const heroTitle = (
    <>
      {/* Label ORCHESTRA — spécifique (laissé volontairement vide si non piloté CMS) */}
      <div className="mt-7 text-4xl font-semibold tracking-tight text-sky-400 sm:text-5xl" />

      <h1 className="mx-auto mt-6 max-w-[1100px] text-center text-5xl font-semibold leading-[1.15] tracking-tight sm:text-6xl">
        <RichTextInline value={hero?.titleRich} />
      </h1>
    </>
  );

  const heroDescription = (
    <div className="mx-auto mt-8 max-w-4xl text-center text-sm leading-8 text-white/80 sm:text-base sm:leading-8">
      <RichTextInline value={hero?.descriptionRich} />
    </div>
  );

  const heroPrimaryCta = (
    <Button
      href={hero?.primaryCtaHref ?? "/fonctionnement"}
      variant="primary"
      className="h-14 px-10"
    >
      {hero?.primaryCtaLabel ?? "Comment nous travaillons"}
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
          INTRO — fond alterné
      ========================================================== */}
      <Section variant="darker" className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              <RichTextInline value={methode?.intro?.titleRich} />
            </h2>

            <div
              className="mx-auto mt-6 w-fit text-3xl text-sky-400"
              aria-hidden="true"
            >
              {methode?.intro?.emoji ?? "🧩"}
            </div>

            <div className="mx-auto mt-10 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
              <RichText value={methode?.intro?.contentRich} />
            </div>
          </div>
        </Container>
      </Section>

      {/* =========================================================
          WHY — fond global
      ========================================================== */}
      <Section className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              <RichTextInline value={methode?.why?.titleRich} />
            </h2>

            <div className="mx-auto mt-8 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
              <RichTextInline value={methode?.why?.introRich} />
            </div>

            <p className="mt-8 font-semibold text-sky-400">
              {methode?.why?.label ?? "ORCHESTRA permet de :"}
            </p>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {(methode?.why?.pillars ?? []).map((pillar: any, idx: number) => (
                <Card
                  key={`${pillar.icon}-${idx}`}
                  icon={pillar.icon}
                  title={<TitleLines lines={pillar.titleLines} />}
                  className="p-8"
                />
              ))}
            </div>

            <div className="mx-auto mt-12 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
              <RichTextInline value={methode?.why?.outroRich} />
            </div>
          </div>
        </Container>
      </Section>

      {/* =========================================================
          CORE — fond alterné
      ========================================================== */}
      <Section variant="darker" className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              <RichTextInline value={methode?.core?.titleRich} />
            </h2>

            <div className="mx-auto mt-8 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
              <RichTextInline value={methode?.core?.introRich} />
            </div>

            <p className="mt-10 font-semibold text-white">
              {methode?.core?.label ?? "Exemples de composants :"}
            </p>

            {/* Bulles — layout 3 + 2 (même structure visuelle que la statique) */}
            <div className="mx-auto mt-14 max-w-6xl space-y-6">
              {/* Ligne 1 : 3 bulles */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {(methode?.core?.bubbles?.line1 ?? []).map(
                  (b: any, idx: number) => (
                    <div
                      key={`${b.icon}-${b.title}-${idx}`}
                      className="flex aspect-square flex-col items-center justify-center rounded-full bg-[#0f1a2b] p-10 text-center ring-1 ring-white/10"
                    >
                      <div className="mx-auto w-fit text-3xl text-sky-400">
                        {b.icon}
                      </div>
                      <div className="mt-5 text-lg font-semibold">{b.title}</div>
                      {b.text ? (
                        <p className="mt-3 whitespace-pre-line text-sm leading-6 text-white/80">
                          {b.text}
                        </p>
                      ) : null}
                    </div>
                  )
                )}
              </div>

              {/* Ligne 2 : 2 bulles */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6 lg:justify-items-center">
                <div className="hidden lg:block" />

                {(methode?.core?.bubbles?.line2 ?? []).map(
                  (b: any, idx: number) => (
                    <div
                      key={`${b.icon}-${b.title}-${idx}`}
                      className="flex aspect-square flex-col items-center justify-center rounded-full bg-[#0f1a2b] p-10 text-center ring-1 ring-white/10 lg:col-span-2"
                    >
                      <div className="mx-auto w-fit text-3xl text-sky-400">
                        {b.icon}
                      </div>
                      <div className="mt-5 text-lg font-semibold">{b.title}</div>
                      {b.text ? (
                        <p className="mt-3 whitespace-pre-line text-sm leading-6 text-white/80">
                          {b.text}
                        </p>
                      ) : null}
                    </div>
                  )
                )}

                <div className="hidden lg:block" />
              </div>
            </div>

            <div className="mx-auto mt-14 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
              <RichTextInline value={methode?.core?.outroRich} />
            </div>
          </div>
        </Container>
      </Section>

      {/* =========================================================
          HUMAN — fond global
      ========================================================== */}
      <Section className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              <RichTextInline value={methode?.human?.titleRich} />
            </h2>

            <div className="mx-auto mt-4 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
              <RichTextInline value={methode?.human?.introRich} />
            </div>

            <p className="mt-10 font-semibold text-white">
              {methode?.human?.label ?? "Les experts humains sont là pour :"}
            </p>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {(methode?.human?.cards ?? []).map((card: any, idx: number) => (
                <Card
                  key={`${card.icon}-${idx}`}
                  icon={card.icon}
                  title={<TitleLines lines={card.titleLines} />}
                  className="p-8"
                />
              ))}
            </div>

            <div className="mx-auto mt-12 max-w-5xl text-base leading-8 text-white/85 sm:text-lg">
              <RichTextInline value={methode?.human?.outroRich} />
            </div>
          </div>
        </Container>
      </Section>

      {/* =========================================================
          WORKFLOW — fond alterné
      ========================================================== */}
      <Section variant="darker" className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              <RichTextInline value={methode?.workflow?.titleRich} />
            </h2>

            <div className="mx-auto mt-10 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
              <RichTextInline value={methode?.workflow?.introRich} />
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {(methode?.workflow?.steps ?? []).map((step: any, idx: number) => (
                <Card
                  key={`${step.icon}-${idx}`}
                  icon={step.icon}
                  title={<TitleLines lines={step.titleLines} />}
                  className="p-8"
                />
              ))}
            </div>

            <div className="mx-auto mt-12 max-w-5xl text-base leading-8 text-white/85 sm:text-lg">
              <RichTextInline value={methode?.workflow?.outroRich} />
            </div>
          </div>
        </Container>
      </Section>

      {/* =========================================================
          BENEFITS — fond global
      ========================================================== */}
      <Section className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              <RichTextInline value={methode?.benefits?.titleRich} />
            </h2>

            <div className="mx-auto mt-10 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
              <RichTextInline value={methode?.benefits?.introRich} />
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {(methode?.benefits?.cards ?? []).map((card: any, idx: number) => (
                <Card
                  key={`${card.icon}-${idx}`}
                  icon={card.icon}
                  title={<TitleLines lines={card.titleLines} />}
                  className="p-8"
                />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* =========================================================
          CTA FINAL — commun (finalCta uniquement)
          Standard global : si finalCta est vide → on n’affiche rien
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
                  href={cta?.secondaryHref ?? "/fonctionnement"}
                  variant="secondary"
                  className="h-12 px-7 gap-2"
                >
                  {cta?.secondaryLabel ?? "Comment nous travaillons"}
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