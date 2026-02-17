// app/cabinet/page.tsx

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";

// --- CMS (Sanity) ---
import { getPageBySlug } from "@/lib/sanity/queries";

/**
 * Portable Text (Sanity) = un format JSON pour représenter du texte riche.
 * Pour cette phase MVP, on ne rend pas encore le texte "riche" (titres, liens, etc.)
 * On extrait simplement le texte brut (plain text).
 */
type PortableTextChild = { _type?: string; text?: string };
type PortableTextBlock = { _type?: string; children?: PortableTextChild[] };

/**
 * Convertit du Portable Text Sanity → texte brut lisible.
 * - On prend uniquement les blocks standards (_type: "block")
 * - On concatène les textes des children
 * - On sépare les blocs par des sauts de ligne
 */
function portableTextToPlainText(content: unknown): string {
  if (!Array.isArray(content)) return "";

  return content
    .map((block) => {
      const b = block as PortableTextBlock;

      // Un bloc standard ressemble à :
      // { _type: "block", children: [{ text: "..." }, ...] }
      if (b?._type !== "block" || !Array.isArray(b.children)) return "";

      return b.children
        .map((child) => (typeof child?.text === "string" ? child.text : ""))
        .join("");
    })
    .filter(Boolean)
    .join("\n\n");
}

/**
 * Page Cabinet
 * On la passe en async car on va faire un fetch côté serveur (Server Component).
 * Objectif de la phase: injecter le CMS uniquement sur la section "Vision du Cabinet".
 */
export default async function CabinetPage() {
  // --------------------------------------------------
  // 1) Récupération CMS : slug = "cabinet"
  // --------------------------------------------------
  // Pourquoi slug ?
  // Le slug est l’identifiant "URL-friendly" côté CMS.
  // Ici on veut récupérer le document Sanity dont slug.current == "cabinet".
  const slug = "cabinet";

  // On stocke le texte CMS final ici.
  // Si Sanity ne répond pas ou ne renvoie pas de contenu,
  // on garde null et on affichera le fallback statique.
  let cmsVisionText: string | null = null;

  try {
    const data = await getPageBySlug(slug);

    // On transforme le Portable Text en texte brut
    const plain = portableTextToPlainText(data?.content);

    // On ne garde le texte que s’il contient quelque chose
    cmsVisionText = plain?.trim() ? plain.trim() : null;
  } catch (error) {
    // Important : on ne casse pas la page si le CMS échoue.
    // On log côté serveur pour debug.
    console.error("[CabinetPage] Sanity fetch failed:", error);
    cmsVisionText = null;
  }

  // --------------------------------------------------
  // 2) HERO — contenu injecté (ReactNode) pour conserver
  // le rendu fullHeight (comme la V1)
  // --------------------------------------------------
  const heroBadge = (
    <>
      <span aria-hidden="true">🤖</span>
      <span>Conseil augmenté par l&apos;IA</span>
    </>
  );

  const heroTitle = (
    <h1 className="mx-auto mt-10 max-w-[900px] text-center text-5xl font-semibold leading-[1.15] tracking-tight sm:text-6xl lg:mt-12">
      Une <span className="text-sky-400">expertise humaine</span> renforcée par
      l&apos;
      <span className="text-sky-400">intelligence artificielle</span>
    </h1>
  );

  const heroDescription = (
    <p className="mx-auto mt-8 max-w-4xl text-center text-sm leading-8 text-white/80 sm:text-base sm:leading-8">
      Des experts au coeur des décisions, soutenus par une{" "}
      <span className="text-sky-400">architecture</span>{" "}
      <span className="text-sky-400">d&apos;intelligences artificielles</span>{" "}
      conçue
      <br className="hidden sm:block" />
      pour clarifier, structurer et éclairer les choix stratégiques.
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

  // --------------------------------------------------
  // 3) RENDER
  // --------------------------------------------------
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
          LA VISION DU CABINET — Bloc structurant (fond alterné)
          Objectif MVP : cette section est alimentée par Sanity
          (si disponible), sinon fallback statique.
      ========================================================== */}
      <Section variant="darker" className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              La <span className="text-sky-400">vision</span> du Cabinet
            </h2>

            <div className="mx-auto mt-6 w-fit text-3xl text-sky-400">👁️</div>

            <div className="mx-auto mt-10 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
              {cmsVisionText ? (
                // CMS content (plain text)
                // whitespace-pre-wrap = respecte les retours à la ligne
                <p className="whitespace-pre-wrap">{cmsVisionText}</p>
              ) : (
                // Fallback content (version statique actuelle)
                <p>
                  Notre cabinet est né d&apos;un{" "}
                  <span className="text-sky-400">constat</span> simple : les
                  organisations évoluent dans des environnements de plus en plus
                  complexes.
                  <br />
                  Nous avons fait le choix de ne pas opposer l&apos;humain et
                  l&apos;intelligence artificielle, mais de les faire{" "}
                  <span className="text-sky-400">collaborer</span>.
                  <br />
                  Notre approche repose sur des experts humains, accompagnés par
                  une architecture d&apos;intelligences artificielles spécialisées,
                  conçue pour{" "}
                  <span className="text-sky-400">
                    renforcer l&apos;analyse et la structuration
                  </span>{" "}
                  des décisions, sans jamais s&apos;y substituer.
                </p>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* =========================================================
          LA PLACE DE L’HUMAIN — Fond global (statique pour l’instant)
      ========================================================== */}
      <Section className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              La place de l&apos;<span className="text-sky-400">humain</span>
            </h2>

            <div className="mx-auto mt-6 w-fit text-3xl text-sky-400">👤</div>

            <div className="mx-auto mt-10 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
              <p>
                L&apos;humain reste au centre de chaque accompagnement.
                <br />
                Nos experts définissent les{" "}
                <span className="text-sky-400">orientations</span>, posent les{" "}
                <span className="text-sky-400">hypothèses</span>, interprètent
                les <span className="text-sky-400">analyses</span> et assument
                les décisions finales.
                <br />
                L&apos;intelligence artificielle agit comme un{" "}
                <span className="text-sky-400">levier de clarification</span>,
                jamais comme un décideur autonome.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* =========================================================
          USAGE ENCADRÉ DE L’IA — Bloc structurant (statique pour l’instant)
      ========================================================== */}
      <Section variant="darker" className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              L&apos;usage <span className="text-sky-400">encadré</span> de
              l&apos;<span className="text-sky-400">IA</span>
            </h2>

            <div className="mx-auto mt-6 w-fit text-3xl text-sky-400">🖥️</div>

            <div className="mx-auto mt-10 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
              <p>
                L&apos;IA n&apos;est jamais utilisée comme une promesse abstraite.
                <br />
                Elle s&apos;inscrit dans une{" "}
                <span className="text-sky-400">méthode de travail précise</span>,
                pilotée et validée par l&apos;humain.
                <br />
                Chaque production fait l&apos;objet d&apos;une{" "}
                <span className="text-sky-400">validation humaine</span>,
                garantissant fiabilité, cohérence et responsabilité.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* =========================================================
          CTA PREMIUM — Fin de page (statique)
      ========================================================== */}
      <Section className="py-24">
        <Container>
          <div className="rounded-3xl bg-[#0f1a2b] p-10 text-center ring-1 ring-white/10 sm:p-14">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Vous souhaitez <span className="text-sky-400">comprendre</span>{" "}
              notre approche
              <br className="hidden sm:block" />
              et <span className="text-sky-400">échanger</span> sur vos enjeux ?
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
              Un échange humain, sans engagement, pour clarifier votre contexte
              et vérifier l’adéquation avec notre méthode.
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
                Découvrir la méthode ORCHESTRA<span aria-hidden="true">›</span>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
