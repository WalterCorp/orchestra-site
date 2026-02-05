import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function MethodeOrchestraPage() {
  // --------------------------------------------------
  // HERO — contenu injecté (ReactNode) + label ORCHESTRA spécifique
  // --------------------------------------------------

  const heroBadge = (
    <>
      <span aria-hidden="true">🤖</span>
      <span>Conseil augmenté par l&apos;IA</span>
    </>
  );

  const heroTitle = (
    <>
      {/* Label ORCHESTRA */}
      <div className="mt-7 text-4xl font-semibold tracking-tight text-sky-400 sm:text-5xl">
        ORCHESTRA
      </div>

      {/* H1 */}
      <h1 className="mx-auto mt-6 max-w-[1100px] text-center text-5xl font-semibold leading-[1.15] tracking-tight sm:text-6xl">
        Une équipe de{" "}
        <span className="text-sky-400">collaborateurs intelligents</span> au
        service de la <span className="text-sky-400">décision</span>
      </h1>
    </>
  );

  const heroDescription = (
    <p className="mx-auto mt-8 max-w-4xl text-center text-sm leading-8 text-white/80 sm:text-base sm:leading-8">
      <span className="text-sky-400">ORCHESTRA</span> n&apos;est pas une
      intelligence artificielle unique,
      <br className="hidden lg:block" />
      mais une architecture coordonnée{" "}
      <span className="text-sky-400">d&apos;intelligences spécialisées</span>,
      pilotée et validée par des{" "}
      <span className="text-sky-400">experts humains</span>.
    </p>
  );

  const heroPrimaryCta = (
    <Button href="/fonctionnement" variant="primary" className="h-14 px-10">
      Comment nous travaillons
    </Button>
  );

  const heroSecondaryCta = (
    <Button href="/contact" variant="secondary" className="h-14 px-10 gap-2">
      Nous contacter <span aria-hidden="true">›</span>
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
          UNE NOUVELLE FAÇON DE TRAVAILLER — Bloc structurant (fond alterné)
      ========================================================== */}
      <Section variant="darker" className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              Une nouvelle <span className="text-sky-400">façon</span> de
              travailler avec l&apos;<span className="text-sky-400">IA</span>
            </h2>

            <div
              className="mx-auto mt-6 w-fit text-3xl text-sky-400"
              aria-hidden="true"
            >
              🧩
            </div>

            <div className="mx-auto mt-10 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
              <p>
                <span className="text-sky-400">ORCHESTRA</span> est le noyau
                d&apos;intelligences artificielles du cabinet.
                <br />
                Il fonctionne comme{" "}
                <span className="text-sky-400">
                  une équipe de consultants numériques spécialisés
                </span>
                ,<br />
                organisés, coordonnés et encadrés par l&apos;humain.
                <br />
                Contrairement aux usages classiques de l&apos;IA,{" "}
                <span className="text-sky-400">ORCHESTRA</span> n&apos;agit jamais
                de manière autonome.
                <br />
                Chaque analyse, chaque projection et chaque recommandation
                <br />
                est supervisée, interprétée et validée par des experts humains.
                <br />
                Nous ne déléguons pas la décision à l&apos;intelligence
                artificielle.
                <br />
                <span className="text-sky-400">Nous collaborons avec elle.</span>
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* =========================================================
          POURQUOI ORCHESTRA — Fond global
      ========================================================== */}
      <Section className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              Pourquoi <span className="text-sky-400">ORCHESTRA</span>
            </h2>

            <p className="mx-auto mt-8 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
              Les organisations évoluent dans des environnements complexes,
              marqués par l&apos;incertitude,
              <br className="hidden sm:block" />
              la surcharge d&apos;informations et la multiplication des choix
              stratégiques.
            </p>

            <p className="mt-8 font-semibold text-sky-400">
              ORCHESTRA permet de :
            </p>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card icon="🧠" title="Structurer la réflexion" className="p-8" />
              <Card icon="📋" title="Clarifier les enjeux" className="p-8" />
              <Card icon="↪" title="Objectiver les décisions" className="p-8" />
              <Card
                icon="👥"
                title={
                  <>
                    <div className="text-lg font-semibold">
                      Conserver une lecture
                    </div>
                    <div className="text-lg font-semibold">
                      humaine, pragmatique et
                    </div>
                    <div className="text-lg font-semibold">responsable</div>
                  </>
                }
                className="p-8"
              />
            </div>

            <p className="mx-auto mt-12 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
              L&apos;intelligence artificielle devient alors{" "}
              <span className="text-sky-400">un levier de clarté</span>, et non
              une promesse abstraite.
            </p>
          </div>
        </Container>
      </Section>

      {/* =========================================================
          COMPOSITION DU NOYAU ORCHESTRA — Bloc structurant (fond alterné)
      ========================================================== */}
      <Section variant="darker" className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              Composition du noyau{" "}
              <span className="text-sky-400">ORCHESTRA</span>
            </h2>

            <p className="mx-auto mt-8 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
              ORCHESTRA repose sur une architecture d&apos;intelligences
              artificielles spécialisées,
              <br />
              chacune dédiée à <span className="text-sky-400">un rôle précis</span>.
            </p>

            <p className="mt-10 font-semibold text-white">
              Exemples de composants :
            </p>

            {/* Bulles (2 lignes pour un alignement parfait) — spécifique, conservé inline */}
            <div className="mx-auto mt-14 max-w-6xl space-y-6">
              {/* Ligne 1 : 3 bulles */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex aspect-square flex-col items-center justify-center rounded-full bg-[#0f1a2b] p-10 text-center ring-1 ring-white/10">
                  <div className="mx-auto w-fit text-3xl text-sky-400">🧮</div>
                  <div className="mt-5 text-lg font-semibold">
                    IA d&apos;analyse stratégique
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/80">
                    Analyse des contextes,
                    <br />
                    problématiques et objectifs
                  </p>
                </div>

                <div className="flex aspect-square flex-col items-center justify-center rounded-full bg-[#0f1a2b] p-10 text-center ring-1 ring-white/10">
                  <div className="mx-auto w-fit text-3xl text-sky-400">🧾</div>
                  <div className="mt-5 text-lg font-semibold">
                    IA de veille et de synthèse
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/80">
                    Collecte d&apos;informations,
                    <br />
                    tendances, benchmarks et
                    <br />
                    synthèses claires
                  </p>
                </div>

                <div className="flex aspect-square flex-col items-center justify-center rounded-full bg-[#0f1a2b] p-10 text-center ring-1 ring-white/10">
                  <div className="mx-auto w-fit text-3xl text-sky-400">🧩</div>
                  <div className="mt-5 text-lg font-semibold">
                    IA de structuration
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/80">
                    Organisation des idées,
                    <br />
                    méthodes, plans d&apos;action et
                    <br />
                    processus
                  </p>
                </div>
              </div>

              {/* Ligne 2 : 2 bulles positionnées sous (1-2) et (2-3) */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6 lg:justify-items-center">
                <div className="hidden lg:block" />

                <div className="flex aspect-square flex-col items-center justify-center rounded-full bg-[#0f1a2b] p-10 text-center ring-1 ring-white/10 lg:col-span-2">
                  <div className="mx-auto w-fit text-3xl text-sky-400">🧭</div>
                  <div className="mt-5 text-lg font-semibold">
                    IA de projection et scénarios
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/80">
                    Simulation de scénarios,
                    <br />
                    hypothèses et impacts
                    <br />
                    potentiels
                  </p>
                </div>

                <div className="flex aspect-square flex-col items-center justify-center rounded-full bg-[#0f1a2b] p-10 text-center ring-1 ring-white/10 lg:col-span-2">
                  <div className="mx-auto w-fit text-3xl text-sky-400">🎓</div>
                  <div className="mt-5 text-lg font-semibold">
                    IA de reformulation et pédagogie
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/80">
                    Chaque composant agit
                    <br />
                    comme un expert spécialisé,
                    <br />
                    intégré dans une logique
                    <br />
                    globale et cohérente
                  </p>
                </div>

                <div className="hidden lg:block" />
              </div>
            </div>

            <p className="mx-auto mt-14 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
              Chaque composant agit comme{" "}
              <span className="text-sky-400">un expert spécialisé</span>, intégré
              dans une logique globale et cohérente.
            </p>
          </div>
        </Container>
      </Section>

      {/* =========================================================
          RÔLE CENTRAL DE L’HUMAIN — Fond global
      ========================================================== */}
      <Section className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              Le rôle central de l&apos;<span className="text-sky-400">humain</span>
            </h2>

            <p className="mx-auto mt-4 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
              L&apos;humain reste au centre du dispositif{" "}
              <span className="text-sky-400">ORCHESTRA</span>.
            </p>

            <p className="mt-10 font-semibold text-white">
              Les experts humains sont là pour :
            </p>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card icon="↪" title="Définir les orientations" className="p-8" />
              <Card icon="⌨️" title="Arbitrer les propositions" className="p-8" />
              <Card
                icon="✅"
                title={
                  <>
                    <div className="text-lg font-semibold">
                      Valider les analyses et
                    </div>
                    <div className="text-lg font-semibold">
                      prendre les décisions
                    </div>
                    <div className="text-lg font-semibold">finales</div>
                  </>
                }
                className="p-8"
              />
              <Card
                icon="📊"
                title={
                  <>
                    <div className="text-lg font-semibold">Assurer</div>
                    <div className="text-lg font-semibold">
                      l&apos;accompagnement client
                    </div>
                  </>
                }
                className="p-8"
              />
            </div>

            <p className="mx-auto mt-12 max-w-5xl text-sm text-white/85 sm:text-base">
              <span className="text-sky-400">ORCHESTRA</span> ne remplace pas
              l&apos;expertise humaine.{" "}
              <span className="text-sky-400">
                Il l&apos;amplifie, la structure et la rend plus lisible
              </span>
              .
            </p>
          </div>
        </Container>
      </Section>

      {/* =========================================================
          FONCTIONNEMENT GLOBAL — Bloc structurant (fond alterné)
      ========================================================== */}
      <Section variant="darker" className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              Fonctionnement global de la méthode{" "}
              <span className="text-sky-400">ORCHESTRA</span>
            </h2>

            <p className="mx-auto mt-10 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
              La méthode <span className="text-sky-400">ORCHESTRA</span> repose
              sur un fonctionnement clair et structuré :
            </p>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card
                icon="👥"
                title={
                  <>
                    <div className="text-lg font-semibold">
                      Analyse du contexte et des
                    </div>
                    <div className="text-lg font-semibold">
                      enjeux par les experts
                    </div>
                    <div className="text-lg font-semibold">humains</div>
                  </>
                }
                className="p-8"
              />
              <Card
                icon="⭕"
                title={
                  <>
                    <div className="text-lg font-semibold">
                      Appui d&apos;<span className="text-sky-400">ORCHESTRA</span>{" "}
                      pour
                    </div>
                    <div className="text-lg font-semibold">
                      enrichir l&apos;analyse
                    </div>
                  </>
                }
                className="p-8"
              />
              <Card
                icon="✅"
                title={
                  <>
                    <div className="text-lg font-semibold">
                      Arbitrage et validation
                    </div>
                    <div className="text-lg font-semibold">humaine</div>
                  </>
                }
                className="p-8"
              />
              <Card
                icon="📊"
                title={
                  <>
                    <div className="text-lg font-semibold">Mise en oeuvre et</div>
                    <div className="text-lg font-semibold">accompagnement</div>
                  </>
                }
                className="p-8"
              />
            </div>

            <p className="mx-auto mt-12 max-w-5xl text-sm text-white/85 sm:text-base">
              Cette organisation permet{" "}
              <span className="text-sky-400">
                une prise de décision plus éclairée
              </span>
              , sans jamais perdre la maîtrise humaine.
            </p>
          </div>
        </Container>
      </Section>

      {/* =========================================================
          BÉNÉFICES POUR LE CLIENT — Fond global
      ========================================================== */}
      <Section className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              <span className="text-sky-400">Bénéfices</span> pour le client
            </h2>

            <p className="mx-auto mt-10 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
              Voici les avantages de l&apos;utilisation d&apos;ORCHESTRA pour le
              client :
            </p>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card
                icon="↪"
                title={
                  <>
                    <div className="text-lg font-semibold">
                      Une meilleure clarté dans
                    </div>
                    <div className="text-lg font-semibold">ses décisions</div>
                  </>
                }
                className="p-8"
              />
              <Card
                icon="🧠"
                title={
                  <>
                    <div className="text-lg font-semibold">
                      Une expertise renforcée
                    </div>
                    <div className="text-lg font-semibold">
                      mais ancrée dans le réel
                    </div>
                  </>
                }
                className="p-8"
              />
              <Card
                icon="✅"
                title={
                  <>
                    <div className="text-lg font-semibold">
                      Une méthode lisible et
                    </div>
                    <div className="text-lg font-semibold">expliquée</div>
                  </>
                }
                className="p-8"
              />
              <Card
                icon="📊"
                title={
                  <>
                    <div className="text-lg font-semibold">
                      Un accompagnement
                    </div>
                    <div className="text-lg font-semibold">
                      structuré et responsable
                    </div>
                  </>
                }
                className="p-8"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* =========================================================
          CTA PREMIUM — Fin de page (style “carte” ORCHESTRA)
          (Texte spécifique à la page Méthode)
      ========================================================== */}
      <Section variant="darker" className="py-24">
        <Container>
          <div className="rounded-3xl bg-[#0f1a2b] p-10 text-center ring-1 ring-white/10 sm:p-14">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Vous souhaitez <span className="text-sky-400">découvrir</span>{" "}
              notre manière de travailler
              <br className="hidden sm:block" />
              ou <span className="text-sky-400">échanger</span> sur votre
              contexte ?
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
              Un échange humain, sans engagement, pour clarifier vos enjeux et
              envisager les prochaines étapes.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/contact" variant="primary" className="h-12 px-7">
                Nous contacter
              </Button>

              <Button
                href="/fonctionnement"
                variant="secondary"
                className="h-12 px-7 gap-2"
              >
                Comment nous travaillons <span aria-hidden="true">›</span>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
