import Link from "next/link";

/**
 * Container
 * - Contrainte de largeur + padding (référence UI sur tout le site)
 */
function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">{children}</div>;
}

export default function ContactPage() {
  return (
    <div className="bg-[#0b1020] text-white">
      {/* =========================================================
          HERO — court / form-first (aligné Accueil)
      ========================================================== */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-10 pt-14 text-center sm:px-10 lg:pb-12 lg:pt-16">
          {/* Badge */}
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
            <span aria-hidden="true">🤖</span>
            <span>Conseil augmenté par l&apos;IA</span>
          </div>

          {/* H1 */}
          <h1 className="mx-auto mt-10 max-w-[900px] text-5xl font-semibold leading-[1.15] tracking-tight sm:text-6xl">
            Nous <span className="text-sky-400">contacter</span>
          </h1>

          {/* Intro */}
          <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
            Un <span className="text-sky-400">échange humain</span>, sans
            engagement. ORCHESTRA soutient l&apos;analyse, mais un{" "}
            <span className="text-sky-400">expert</span> vous répond.
            <br className="hidden sm:block" />
            Réponse sous <span className="text-sky-400">24–48h</span> ouvrées.
          </p>

          {/* CTA (ancre + découverte) */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#formulaire"
              className="inline-flex h-14 items-center justify-center rounded-xl bg-sky-600 px-10 text-base font-semibold text-white shadow-sm transition-colors hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400/60"
            >
              Accéder au formulaire
            </Link>

            <Link
              href="/methode-orchestra"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-white/5 px-10 text-base font-semibold text-white ring-1 ring-white/10 transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              Découvrir la méthode ORCHESTRA <span aria-hidden="true">›</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          FORMULAIRE — bloc principal (fond alterné + card)
      ========================================================== */}
      <section id="formulaire" className="bg-[#080d1a] py-24">
        <Container>
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              Écrivez-nous, on{" "}
              <span className="text-sky-400">revient vers vous</span> rapidement
            </h2>

            <p className="mx-auto mt-10 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
              Nous ne proposons jamais de solution standardisée sans{" "}
              <span className="text-sky-400">compréhension préalable</span>.
              ORCHESTRA intervient ensuite{" "}
              <span className="text-sky-400">en soutien</span> de l’analyse menée
              par nos <span className="text-sky-400">experts humains</span>.
            </p>
          </div>

          {/* Form card — pattern “cartes” ORCHESTRA */}
          <div className="mx-auto mt-14 max-w-5xl rounded-2xl bg-[#0f1a2b] p-8 ring-1 ring-white/10 sm:p-10">
            <form className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-white/90">
                  Nom &amp; Prénom
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full rounded-xl border border-white/10 bg-white px-4 py-3 text-[#0b1020] outline-none placeholder:text-zinc-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
                  placeholder=""
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-white/90">
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full rounded-xl border border-white/10 bg-white px-4 py-3 text-[#0b1020] outline-none placeholder:text-zinc-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
                  placeholder=""
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-white/90">
                  Organisation{" "}
                  <span className="text-white/50">(optionnel)</span>
                </label>
                <input
                  type="text"
                  name="organization"
                  className="w-full rounded-xl border border-white/10 bg-white px-4 py-3 text-[#0b1020] outline-none placeholder:text-zinc-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
                  placeholder=""
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-white/90">
                  Votre message
                </label>
                <textarea
                  name="message"
                  rows={6}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white px-4 py-3 text-[#0b1020] outline-none placeholder:text-zinc-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
                  placeholder=""
                />
              </div>

              <div className="pt-2 text-center">
                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-sky-600 px-7 text-base font-semibold text-white shadow-sm transition-colors hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400/60"
                >
                  Envoyer
                </button>
              </div>

              <p className="text-center text-xs text-white/50">
                En envoyant ce message, vous acceptez d’être recontacté par
                ORCHESTRA.
              </p>
            </form>
          </div>
        </Container>
      </section>

      {/* =========================================================
          RÉASSURANCE — après formulaire (fond global)
      ========================================================== */}
      <section className="py-24">
        <Container>
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Ce premier contact permet de{" "}
              <span className="text-sky-400">clarifier</span> l’essentiel
            </h2>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl bg-[#0f1a2b] p-7 text-center ring-1 ring-white/10">
                <div className="text-base font-semibold">Clarifier vos enjeux</div>
              </div>

              <div className="rounded-2xl bg-[#0f1a2b] p-7 text-center ring-1 ring-white/10">
                <div className="text-base font-semibold">
                  Vérifier l’adéquation avec notre approche
                </div>
              </div>

              <div className="rounded-2xl bg-[#0f1a2b] p-7 text-center ring-1 ring-white/10">
                <div className="text-base font-semibold">
                  Définir ensemble les prochaines étapes
                </div>
              </div>
            </div>

            <div className="mt-12 text-sm text-white/60">
              Vous préférez découvrir notre approche ?{" "}
              <Link
                href="/methode-orchestra"
                className="text-sky-400 transition-colors hover:text-sky-300"
              >
                Découvrir la Méthode ORCHESTRA
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
