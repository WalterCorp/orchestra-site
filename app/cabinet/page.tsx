// app/cabinet/page.tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";
import { RichText, RichTextInline } from "@/components/sanity/RichText";
import { getPageBySlug } from "@/lib/sanity/queries";

export const dynamic = "force-dynamic";

export default async function CabinetPage() {
  const data = await getPageBySlug("cabinet");

  // Minimal safety (if CMS returns nothing, show a clear message)
  if (!data) {
    return (
      <main className="p-10 space-y-4">
        <h1 className="text-2xl font-bold">Cabinet page missing in CMS</h1>
        <p className="text-gray-600">No Sanity document found for slug: cabinet</p>
      </main>
    );
  }

  const hero = data.hero;
  const sections = data.cabinetSections;
  const cta = data.cabinetCta;

  const heroBadge = (
    <>
      <span aria-hidden="true">{hero.badgeEmoji}</span>
      <span>{hero.badgeText}</span>
    </>
  );

  const heroTitle = (
    <h1 className="mx-auto mt-10 max-w-[900px] text-center text-5xl font-semibold leading-[1.15] tracking-tight sm:text-6xl lg:mt-12">
      <RichTextInline value={hero.titleRich} />
    </h1>
  );

  const heroDescription = (
    <div className="mx-auto mt-8 max-w-4xl text-center text-sm leading-8 text-white/80 sm:text-base sm:leading-8">
      <RichTextInline value={hero.descriptionRich} />
    </div>
  );

  const heroPrimaryCta = (
    <Button href={hero.primaryCtaHref} variant="primary" className="h-14 px-10">
      {hero.primaryCtaLabel}
    </Button>
  );

  const heroSecondaryCta = (
    <Button href={hero.secondaryCtaHref} variant="secondary" className="h-14 px-10 gap-2">
      {hero.secondaryCtaLabel}
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

      {/* Vision */}
      <Section variant="darker" className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              <RichTextInline value={sections.vision.titleRich} />
            </h2>
            <div className="mx-auto mt-6 w-fit text-3xl text-sky-400">{sections.vision.emoji}</div>
            <div className="mx-auto mt-10 max-w-4xl">
              <RichText value={sections.vision.content} />
            </div>
          </div>
        </Container>
      </Section>

      {/* Humain */}
      <Section className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              <RichTextInline value={sections.human.titleRich} />
            </h2>
            <div className="mx-auto mt-6 w-fit text-3xl text-sky-400">{sections.human.emoji}</div>
            <div className="mx-auto mt-10 max-w-4xl">
              <RichText value={sections.human.content} />
            </div>
          </div>
        </Container>
      </Section>

      {/* IA */}
      <Section variant="darker" className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              <RichTextInline value={sections.ai.titleRich} />
            </h2>
            <div className="mx-auto mt-6 w-fit text-3xl text-sky-400">{sections.ai.emoji}</div>
            <div className="mx-auto mt-10 max-w-4xl">
              <RichText value={sections.ai.content} />
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="py-24">
        <Container>
          <div className="rounded-3xl bg-[#0f1a2b] p-10 text-center ring-1 ring-white/10 sm:p-14">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              <RichTextInline value={cta.titleRich} />
            </h2>

            <div className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
              <RichTextInline value={cta.textRich} />
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href={cta.primaryHref} variant="primary" className="h-12 px-7">
                {cta.primaryLabel}
              </Button>

              <Button href={cta.secondaryHref} variant="secondary" className="h-12 px-7 gap-2">
                {cta.secondaryLabel}
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
