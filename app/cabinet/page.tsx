// app/cabinet/page.tsx

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";
import { RichText } from "@/components/sanity/RichText";
import { getPageBySlug } from "@/lib/sanity/queries";

export const dynamic = "force-dynamic";

function safeStr(v?: string) {
  const s = (v ?? "").trim();
  return s || null;
}

export default async function CabinetPage() {
  const slug = "cabinet";

  let data: any = null;

  try {
    data = await getPageBySlug(slug);
  } catch (e) {
    console.error("[CabinetPage] Sanity fetch failed:", e);
  }

  // ==================================================
  // HERO
  // ==================================================

  const hero = data?.hero ?? {};

  const heroBadge = (
    <>
      <span aria-hidden="true">
        {safeStr(hero.badgeEmoji) ?? "🤖"}
      </span>
      <span>
        {safeStr(hero.badgeText) ?? "Conseil augmenté par l’IA"}
      </span>
    </>
  );

  const heroTitle = (
    <h1 className="mx-auto mt-10 max-w-[900px] text-center text-5xl font-semibold leading-[1.15] tracking-tight sm:text-6xl lg:mt-12">
      {Array.isArray(hero.titleRich) ? (
        <RichText value={hero.titleRich} />
      ) : (
        safeStr(hero.title) ??
        "Une expertise humaine renforcée par l’intelligence artificielle"
      )}
    </h1>
  );

  const heroDescription = (
    <div className="mx-auto mt-8 max-w-4xl text-center text-sm leading-8 text-white/80 sm:text-base sm:leading-8">
      {Array.isArray(hero.descriptionRich) ? (
        <RichText value={hero.descriptionRich} />
      ) : (
        <p>
          {safeStr(hero.description) ??
            "Des experts au coeur des décisions, soutenus par une architecture d’intelligences artificielles conçue pour clarifier, structurer et éclairer les choix stratégiques."}
        </p>
      )}
    </div>
  );

  const heroPrimaryCta = (
    <Button
      href={safeStr(hero.primaryCtaHref) ?? "/methode-orchestra"}
      variant="primary"
      className="h-14 px-10"
    >
      {safeStr(hero.primaryCtaLabel) ?? "Découvrir la méthode ORCHESTRA"}
    </Button>
  );

  const heroSecondaryCta = (
    <Button
      href={safeStr(hero.secondaryCtaHref) ?? "/contact"}
      variant="secondary"
      className="h-14 px-10 gap-2"
    >
      {safeStr(hero.secondaryCtaLabel) ?? "Nous contacter ›"}
    </Button>
  );

  // ==================================================
  // SECTIONS
  // ==================================================

  const sectionsRoot = data?.cabinetSections ?? {};

  const sections = [
    { key: "vision", variant: "darker" },
    { key: "human", variant: "default" },
    { key: "ai", variant: "darker" },
  ].map((s) => {
    const node = sectionsRoot?.[s.key] ?? {};
    return {
      key: s.key,
      variant: s.variant,
      title: node.title,
      titleRich: node.titleRich,
      emoji: node.emoji,
      content: node.content,
    };
  });

  // ==================================================
  // CTA
  // ==================================================

  const cta = data?.cabinetCta ?? {};

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

      {sections.map((s) => {
        const variant = s.variant === "darker" ? "darker" : undefined;

        return (
          <Section key={s.key} variant={variant as any} className="py-24">
            <Container>
              <div className="text-center">
                <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
                  {Array.isArray(s.titleRich) ? (
                    <RichText value={s.titleRich} />
                  ) : (
                    safeStr(s.title) ?? "(Titre manquant)"
                  )}
                </h2>

                {safeStr(s.emoji) && (
                  <div className="mx-auto mt-6 w-fit text-3xl text-sky-400">
                    {s.emoji}
                  </div>
                )}

                <div className="mx-auto mt-10 max-w-4xl text-white/85">
                  {Array.isArray(s.content) ? (
                    <RichText value={s.content} />
                  ) : (
                    <p className="italic text-white/60">
                      Aucun contenu.
                    </p>
                  )}
                </div>
              </div>
            </Container>
          </Section>
        );
      })}

      <Section className="py-24">
        <Container>
          <div className="rounded-3xl bg-[#0f1a2b] p-10 text-center ring-1 ring-white/10 sm:p-14">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {Array.isArray(cta.titleRich) ? (
                <RichText value={cta.titleRich} />
              ) : (
                safeStr(cta.title) ??
                "Vous souhaitez comprendre notre approche et échanger sur vos enjeux ?"
              )}
            </h2>

            <div className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
              {Array.isArray(cta.textRich) ? (
                <RichText value={cta.textRich} />
              ) : (
                <p>
                  {safeStr(cta.text) ??
                    "Un échange humain, sans engagement, pour clarifier votre contexte et vérifier l’adéquation avec notre méthode."}
                </p>
              )}
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                href={safeStr(cta.primaryHref) ?? "/contact"}
                variant="primary"
                className="h-12 px-7"
              >
                {safeStr(cta.primaryLabel) ?? "Nous contacter"}
              </Button>

              <Button
                href={safeStr(cta.secondaryHref) ?? "/methode-orchestra"}
                variant="secondary"
                className="h-12 px-7 gap-2"
              >
                {safeStr(cta.secondaryLabel) ??
                  "Découvrir la méthode ORCHESTRA ›"}
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
