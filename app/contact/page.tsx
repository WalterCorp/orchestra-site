import Link from "next/link";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">{children}</div>;
}

export default function ContactPage() {
  return (
    <div className="bg-[#0b1020] text-white">
      {/* HERO (aligné sur Accueil) */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-6xl flex-col items-center justify-center px-6 py-14 text-center sm:px-10 lg:py-20">
          {/* Badge */}
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
            <span aria-hidden="true">🤖</span>
            <span>Conseil augmenté par l&apos;IA</span>
          </div>

          {/* H1 */}
          <h1 className="mx-auto mt-10 max-w-[900px] text-center text-5xl font-semibold leading-[1.15] tracking-tight sm:text-6xl lg:mt-12">
            Un premier <span className="text-sky-400">échange</span> pour comprendre votre{" "}
            <span className="text-sky-400">contexte</span>, vos enjeux et vos objectifs,{" "}
            <span className="text-sky-400">sans engagement</span>.
          </h1>

          {/* Texte d’intro */}
          <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
            Chaque mission débute par <span className="text-sky-400">un échange humain</span>. Avant de mobiliser
            notre méthode et <span className="text-sky-400">ORCHESTRA</span>, nous prenons le temps de{" "}
            <span className="text-sky-400">comprendre votre situation</span>, vos contraintes et vos attentes.
          </p>

          {/* CTA (aligné Accueil) */}
          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row lg:mt-12">
            <Link
              href="/methode-orchestra"
              className="inline-flex h-14 items-center justify-center rounded-xl bg-sky-600 px-10 text-base font-semibold text-white shadow-sm transition-colors hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400/60"
            >
              Découvrir la méthode ORCHESTRA
            </Link>

            <Link
              href="#formulaire"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-white/5 px-10 text-base font-semibold text-white ring-1 ring-white/10 transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              Nous écrire <span aria-hidden="true">›</span>
            </Link>
          </div>

          {/* Mini-titre */}
          <div className="mt-14 text-sm font-semibold text-white/80">
            Ce premier contact permet de :
          </div>

          {/* 3 cartes (alignées pattern Accueil) */}
          <div className="mt-6 grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
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
        </div>
      </section>

      {/* SECTION FORMULAIRE (fond alterné, aligné Accueil/FAQ) */}
      <section id="formulaire" className="bg-[#080d1a] py-24">
        <Container>
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              Un <span className="text-sky-400">échange humain</span> avant tout
            </h2>

            <p className="mx-auto mt-10 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
              Nous ne proposons jamais de solution standardisée sans{" "}
              <span className="text-sky-400">compréhension préalable</span>.{" "}
              <span className="text-sky-400">ORCHESTRA</span> n’intervient qu’après cet échange initial,{" "}
              <span className="text-sky-400">en soutien</span> de l’analyse menée par nos{" "}
              <span className="text-sky-400">experts humains</span>.
            </p>
          </div>

          {/* Form card */}
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
                  Organisation
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
            </form>
          </div>

          {/* Petit lien bas de page */}
          <div className="mt-10 text-center text-sm text-white/60">
            Vous préférez découvrir notre approche ?{" "}
            <Link href="/methode-orchestra" className="text-sky-400 hover:text-sky-300">
              Découvrir la Méthode ORCHESTRA
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
