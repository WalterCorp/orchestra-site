import type { ReactNode } from "react";

// Section globale — gestion des blocs de page et des fonds alternés
// Permet de sortir la logique de layout des pages
import { Section } from "@/components/layout/Section";

// Container global — référence de largeur et de padding pour toutes les pages
// Centralisé pour rendre le site réplicable et maintenable
import { Container } from "@/components/layout/Container";

// Button global — centralisation des styles CTA (primary / secondary)
import { Button } from "@/components/ui/Button";

// Card globale — centralisation des styles de cartes (piliers, contenus, etc.)
// Permet d’éviter la duplication de classes Tailwind dans les pages
import { Card } from "@/components/ui/Card";

// BigCard globale — cartes “expertise” (intro + label ORCHESTRA + bullets)
import { BigCard } from "@/components/ui/BigCard";

// Hero — section réutilisable (extrait du code inline pour rendre le site réplicable)
import { Hero } from "@/components/sections/Hero";

/**
 * SectionTitle
 * - Titre de section réutilisable (avec mot mis en avant)
 *
 * Note :
 * - Conservé temporairement pendant le refactor
 * - Sera remplacé plus tard par un composant global si nécessaire
 */
function SectionTitle({
  title,
  highlight,
  subtitle,
}: {
  title: string;
  highlight?: string;
  subtitle?: ReactNode;
}) {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
        {highlight ? (
          <>
            {title} <span className="text-sky-400">{highlight}</span>
          </>
        ) : (
          title
        )}
      </h2>

      {subtitle ? (
        <div className="mx-auto mt-8 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
          {subtitle}
        </div>
      ) : null}
    </div>
  );
}

export default function ExpertisesPage() {
  // --------------------------------------------------
  // HERO — contenu injecté pour conserver la liberté
  // de mise en forme sans modifier le rendu
  // --------------------------------------------------

  const heroBadge = (
    <>
      <span aria-hidden="true">🤖</span>
      <span>Conseil augmenté par l&apos;IA</span>
    </>
  );

  const heroTitle = (
    <h1 className="mx-auto mt-10 max-w-[980px] text-5xl font-semibold leading-[1.15] tracking-tight sm:text-6xl lg:mt-12">
      Des <span className="text-sky-400">expertises humaines</span>, renforcées
      par <span className="text-sky-400">ORCHESTRA</span>
    </h1>
  );

  const heroDescription = (
    <p className="mx-auto mt-8 max-w-4xl text-mx-auto mt-8 max-w-4xl text-center text-sm leading-8 text-white/80 sm:text-base sm:leading-8base leading-8 text-white/85 sm:text-base">
      Chaque domaine d&apos;intervention s&apos;appuie sur une{" "}
      <span className="text-sky-400">expertise humaine augmentée</span> par une
      architecture d&apos;intelligences artificielles{" "}
      <span className="text-sky-400">spécialisées</span>, au service de la{" "}
      <span className="text-sky-400">clarté</span> et de la{" "}
      <span className="text-sky-400">performance</span>.
    </p>
  );

  const heroPrimaryCta = (
    <Button href="/methode-orchestra" variant="primary" className="h-14 px-10">
      Découvrir la méthode ORCHESTRA
    </Button>
  );

  const heroSecondaryCta = (
    <Button href="/contact" variant="secondary" className="h-14 px-10 gap-2">
      Nous contacter <span aria-hidden="true">›</span>
    </Button>
  );

  return (
    <div className="bg-[#0b1020] text-white">
      {/* =========================================================
          HERO — Expertises (cohérent avec Accueil)
          Refactor : extraction vers le composant Hero global
      ========================================================== */}
      <Hero
        badge={heroBadge}
        title={heroTitle}
        description={heroDescription}
        primaryCta={heroPrimaryCta}
        secondaryCta={heroSecondaryCta}
        fullHeight
      />

      {/* =========================================================
          SECTION 2 — Approche (fond alterné)
          Refactor : passage via Section (variant darker)
      ========================================================== */}
      <Section variant="darker" className="py-24">
        <Container>
          <SectionTitle
            title="Notre approche des"
            highlight="expertises"
            subtitle={
              <>
                Nous n&apos;appliquons pas une solution unique à tous les
                contextes.
                <br />
                Chaque mission mobilise des{" "}
                <span className="text-sky-400">expertises spécifiques</span>{" "}
                soutenues par <span className="text-sky-400">ORCHESTRA</span>{" "}
                pour analyser, structurer et projeter.
                <br />
                <br />
                L&apos;intelligence artificielle permet{" "}
                <span className="text-sky-400">
                  d&apos;élargir la capacité d&apos;analyse
                </span>
                , mais les choix restent humains, contextualisés et responsables.
              </>
            }
          />
        </Container>
      </Section>

      {/* =========================================================
          SECTION 3 — Domaines d’expertise (fond global)
      ========================================================== */}
      <section className="py-24">
        <Container>
          <SectionTitle title="Nos domaines d’" highlight="expertise" />

        <div className="mt-14 grid gap-6 lg:grid-cols-4">
            <BigCard
              icon="↗"
              title="Stratégie & prise de décision"
              intro="Nous accompagnons les dirigeants et décideurs dans leurs réflexions stratégiques, leurs choix structurants et leurs arbitrages complexes."
              label="intervient pour"
              bullets={[
                "Analyser les données disponibles",
                "Structurer les enjeux",
                "Projeter différents scénarios",
              ]}
              outro="Les décisions finales restent pilotées par l’humain."
            />

            <BigCard
              icon="⎇"
              title="Organisation & structuration des processus"
              intro="Nous aidons les organisations à clarifier leurs modes de fonctionnement, leurs processus internes et leurs responsabilités."
              label="soutient"
              bullets={[
                "L’analyse des flux",
                "L’identification des points de friction",
                "La structuration des processus lisibles et opérationnels",
              ]}
            />

            <BigCard
              icon="≡"
              title="Performance opérationnelle"
              intro="Nous travaillons sur l’optimisation des pratiques existantes sans remettre en cause inutilement ce qui fonctionne déjà."
              label="permet"
              bullets={[
                "D’objectiver les situations",
                "De comparer différentes approches",
                "De prioriser les actions à forte valeur ajoutée",
              ]}
            />

            <BigCard
              icon="▦"
              title="Aide à la structuration de projets complexes"
              intro="Lorsque les projets deviennent transverses ou complexes, nous intervenons pour remettre de la lisibilité."
              label="permet"
              bullets={[
                "Organiser les informations",
                "Clarifier les objectifs",
                "Structurer les plans d’action",
              ]}
            />
          </div>

          {/* Bandeau — Changement */}
          <div className="mt-8 rounded-2xl bg-[#0f1a2b] p-8 text-center ring-1 ring-white/10">
            <div className="text-base font-semibold">
              Accompagnement au changement
            </div>
            <p className="mx-auto mt-4 max-w-4xl text-sm leading-7 text-white/80">
              Nous accompagnons les équipes dans l&apos;appropriation des
              décisions et des évolutions organisationnelles.{" "}
              <span className="text-sky-400">ORCHESTRA</span> soutient la
              pédagogie, mais l&apos;accompagnement reste humain, progressif et
              contextualisé.
            </p>
          </div>
        </Container>
      </section>

      {/* =========================================================
          SECTION 4 — ORCHESTRA soutient (fond alterné)
          Refactor : passage via Section (variant darker)
      ========================================================== */}
      <Section variant="darker" className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              Comment <span className="text-sky-400">ORCHESTRA</span> soutient nos{" "}
              <span className="text-sky-400">expertises</span>
            </h2>

            <p className="mx-auto mt-8 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
              <span className="text-sky-400">ORCHESTRA</span> n&apos;est pas une
              expertise en soi. Il agit comme un socle transversal qui soutient
              l&apos;ensemble de nos domaines d&apos;intervention.
            </p>

            <div className="mt-10 text-base font-semibold text-white/90">
              Il permet :
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <Card icon="⌁" title="D’enrichir l’analyse" />
              <Card icon="⎇" title="De structurer les réflexions" />
              <Card icon="≡" title="De gagner en clarté" />
            </div>

            <p className="mx-auto mt-10 max-w-4xl text-base font-medium text-white/85 sm:text-lg">
              <span className="text-sky-400">sans jamais</span> se substituer à
              l&apos;expertise humaine.
            </p>
          </div>
        </Container>
      </Section>

      {/* =========================================================
          SECTION 5 — Pour qui (fond global)
      ========================================================== */}
      <section className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              Pour qui sont ces{" "}
              <span className="text-sky-400">expertises</span> ?
            </h2>

            <div className="mt-10 text-base font-semibold text-white/90">
              Nos expertises s’adressent :
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card icon="👤" title="Aux dirigeants et décideurs" />
              <Card icon="🏛️" title="Aux PME et organisations en croissance" />
              <Card
                icon="≡"
                title="Aux équipes confrontées à des enjeux de structuration"
              />
              <Card icon="⇄" title="Aux projets nécessitant clarté et méthode" />
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================
          CTA PREMIUM — Fin de page (style “carte” ORCHESTRA)
          Refactor : remplacement des Link par Button global
      ========================================================== */}
      <Section variant="darker" className="py-24">
        <Container>
          <div className="rounded-3xl bg-[#0f1a2b] p-10 text-center ring-1 ring-white/10 sm:p-14">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Vous souhaitez <span className="text-sky-400">savoir</span> comment
              ces expertises peuvent{" "}
              <span className="text-sky-400">s&apos;appliquer</span> à votre
              organisation ?
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
              Un échange humain, sans engagement, pour clarifier votre contexte
              et identifier les expertises les plus pertinentes.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/contact" variant="primary" className="h-12 px-7">
                Nous contacter
              </Button>

              <Button
                href="/methode-orchestra"
                variant="secondary"
                className="h-12 px-7 gap-2"
              >
                Découvrir la méthode ORCHESTRA{" "}
                <span aria-hidden="true">›</span>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
