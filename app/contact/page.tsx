// orchestra-site/app/contact/page.tsx

import { notFound } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/contact/ContactForm";
import { RichText } from "@/components/sanity/RichText";
import { getPageBySlug } from "@/lib/sanity/queries";

const CONTACT_SLUG = "contact";

export default async function ContactPage() {
  const page = await getPageBySlug(CONTACT_SLUG);

  if (!page) notFound();

  // --------------------------------------------------
  // HERO — mêmes attributs que les autres pages (Sanity)
  // --------------------------------------------------
  const heroBadge = (
    <>
      <span aria-hidden="true">{page.hero.badgeEmoji}</span>
      <span>{page.hero.badgeText}</span>
    </>
  );

  const heroTitle = (
    <div className="mx-auto mt-10 max-w-[900px] text-center text-5xl font-semibold leading-[1.15] tracking-tight sm:text-6xl">
      <RichText value={page.hero.titleRich} />
    </div>
  );

  const heroDescription = (
    <div className="mx-auto mt-8 max-w-4xl text-center text-sm leading-8 text-white/80 sm:text-base sm:leading-8">
      <RichText value={page.hero.descriptionRich} />
    </div>
  );

  const heroPrimaryCta = (
    <Button href={page.hero.primaryCtaHref} variant="primary" className="h-14 px-10">
      {page.hero.primaryCtaLabel}
    </Button>
  );

  const heroSecondaryCta = (
    <Button
      href={page.hero.secondaryCtaHref}
      variant="secondary"
      className="h-14 px-10 gap-2"
    >
      {page.hero.secondaryCtaLabel} <span aria-hidden="true">›</span>
    </Button>
  );

  // --------------------------------------------------
  // SECTIONS — Contact (Sanity) (sans fallback)
  // --------------------------------------------------
  const form = page.contactSections?.form;
  const reassurance = page.contactSections?.reassurance;

  if (!form || !reassurance) {
    // même logique que les autres pages “no fallback” :
    // si ton contenu n’est pas saisi -> page invalide
    notFound();
  }

  return (
    <div className="bg-[#0b1020] text-white">
      <Hero
        badge={heroBadge}
        title={heroTitle}
        description={heroDescription}
        primaryCta={heroPrimaryCta}
        secondaryCta={heroSecondaryCta}
      />

      {/* =========================================================
          FORMULAIRE — bloc principal (fond alterné + card)
      ========================================================== */}
      <Section variant="darker" className="py-24" id="formulaire">
        <Container>
          <div className="mx-auto max-w-5xl text-center">
            <div className="text-4xl font-semibold tracking-tight sm:text-6xl">
              <RichText value={form.titleRich} />
            </div>

            <div className="mx-auto mt-10 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
              <RichText value={form.textRich} />
            </div>
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
            <div className="text-3xl font-semibold tracking-tight sm:text-4xl">
              <RichText value={reassurance.titleRich} />
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {reassurance.cards?.map((card: { title: string }, idx: number) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#0f1a2b] p-7 text-center ring-1 ring-white/10"
                >
                  <div className="text-base font-semibold">{card.title}</div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-sm text-white/60">
              {reassurance.linkLabel ? (
                <>
                  Vous préférez découvrir notre approche ?{" "}
                  <a
                    href={reassurance.linkHref}
                    className="text-sky-400 transition-colors hover:text-sky-300"
                  >
                    {reassurance.linkLabel}
                  </a>
                </>
              ) : null}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}