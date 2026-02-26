// app/contact/page.tsx

import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/contact/ContactForm";
import { Card } from "@/components/ui/Card";
import { RichText, RichTextInline } from "@/components/sanity/RichText";
import { getPageBySlug } from "@/lib/sanity/queries";

export const dynamic = "force-dynamic";

// Label UI fixe — pas du contenu CMS (cf. standard Jour 40)
const REASSURANCE_LINK_PREFIX = "Vous préférez découvrir notre approche ?";

export default async function ContactPage() {
  const page = await getPageBySlug("contact");

  if (!page) notFound();

  const hero = page.hero;
  const form = page.contactSections?.form;
  const reassurance = page.contactSections?.reassurance;

  // ✅ Doctrine stricte contact : form + reassurance requis
  // Si absent dans Sanity → page invalide → 404
  if (!form || !reassurance) notFound();

  // --------------------------------------------------
  // HERO — rendu conditionnel sur chaque champ optionnel
  // ✅ pas de ?? hardcodé
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
          FORMULAIRE — bloc principal (fond alterné + card)
      ========================================================== */}
      <Section variant="darker" className="py-24" id="formulaire">
        <Container>
          <div className="mx-auto max-w-5xl text-center">
            {form.titleRich ? (
              <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
                <RichTextInline value={form.titleRich} />
              </h2>
            ) : null}

            {form.textRich ? (
              <div className="mx-auto mt-10 max-w-4xl">
                <RichText value={form.textRich} />
              </div>
            ) : null}
          </div>

          <div className="mx-auto mt-14 max-w-5xl rounded-2xl bg-[#0f1a2b] p-8 ring-1 ring-white/10 sm:p-10">
            <ContactForm />
          </div>
        </Container>
      </Section>

      {/* =========================================================
          RÉASSURANCE — après formulaire (fond global)
      ========================================================== */}
      <Section className="py-24">
        <Container>
          <div className="mx-auto max-w-5xl text-center">
            {reassurance.titleRich ? (
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                <RichTextInline value={reassurance.titleRich} />
              </h2>
            ) : null}

            {(reassurance.cards ?? []).length > 0 ? (
              <div className="mt-10 grid gap-6 sm:grid-cols-3">
                {(reassurance.cards ?? []).map((card: { title?: string }, idx: number) => (
                  <Card key={idx} title={card.title} />
                ))}
              </div>
            ) : null}

            {reassurance.linkHref && reassurance.linkLabel ? (
              <div className="mt-12 text-sm text-white/60">
                {REASSURANCE_LINK_PREFIX}{" "}
                {/* ✅ text-[var(--color-brand)] au lieu de text-sky-400 hardcodé */}
                <a
                  href={reassurance.linkHref}
                  className="text-[var(--color-brand)] transition-colors hover:opacity-80"
                >
                  {reassurance.linkLabel}
                </a>
              </div>
            ) : null}
          </div>
        </Container>
      </Section>
    </div>
  );
}