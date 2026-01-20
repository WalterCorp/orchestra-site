import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="bg-[#0b1020] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-6 py-14 text-center sm:px-10 lg:min-h-[calc(100vh-72px)] lg:py-20">
          {/* Badge */}
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
            <span aria-hidden="true">🤖</span>
            <span className="text-white/80">Conseil augmenté par l’IA</span>
          </div>

          {/* CONTACT */}
          <div className="mt-10 text-4xl font-semibold tracking-wide text-sky-500/70 sm:text-5xl">
            CONTACT
          </div>

          {/* Titre */}
          <h1 className="mx-auto mt-8 max-w-[980px] text-balance text-center text-4xl font-semibold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
            Un premier{" "}
            <span className="text-sky-400">échange</span> pour comprendre votre{" "}
            <span className="text-sky-400">contexte</span>, vos enjeux et vos
            objectifs, <span className="text-sky-400">sans engagement</span>.
          </h1>

          {/* Sous-texte */}
          <p className="mx-auto mt-8 max-w-4xl text-balance text-lg text-white/85 sm:text-xl">
            Chaque mission débute par{" "}
            <span className="text-sky-400">un échange humain</span>.
            <br />
            Avant de mobiliser notre méthode et{" "}
            <span className="text-sky-400">ORCHESTRA</span>, nous prenons le temps
            de <span className="text-sky-400">comprendre votre situation</span>,
            vos contraintes et vos attentes.
          </p>

          {/* Mini-titre */}
          <div className="mt-14 text-sm font-semibold text-white/80">
            Ce premier contact permet de :
          </div>

          {/* 3 cartes */}
          <div className="mt-6 grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-[#0a0f22]/70 px-6 py-6 text-center shadow-lg">
              <div className="text-base font-semibold">Clarifier vos enjeux</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0a0f22]/70 px-6 py-6 text-center shadow-lg">
              <div className="text-base font-semibold">
                Vérifier l’adéquation avec notre approche
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0a0f22]/70 px-6 py-6 text-center shadow-lg">
              <div className="text-base font-semibold">
                Définir ensemble les prochaines étapes
              </div>
            </div>
          </div>

          {/* (Les PNG n’affichent pas de CTA ici, donc on n’en met pas dans ce hero) */}
        </div>
      </section>

      {/* SECTION FORMULAIRE */}
      <section className="relative">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10 lg:py-20">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Un <span className="text-sky-400">échange humain</span> avant tout
            </h2>

            <p className="mx-auto mt-6 max-w-4xl text-balance text-lg text-white/85 sm:text-xl">
              Nous ne proposons jamais de solution standardisée sans{" "}
              <span className="text-sky-400">compréhension préalable</span>.
              <br />
              <span className="text-sky-400">ORCHESTRA</span> n’intervient
              qu’après cet échange initial,{" "}
              <span className="text-sky-400">en soutien</span> de l’analyse menée
              par nos <span className="text-sky-400">experts humains</span>.
            </p>
          </div>

          {/* Form card */}
          <div className="mx-auto mt-12 max-w-5xl rounded-3xl border border-white/10 bg-[#070b18]/70 p-8 shadow-xl backdrop-blur-md sm:p-10">
            <form className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-white/90">
                  Nom &amp; Prénom
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full rounded-xl border border-white/10 bg-white px-4 py-3 text-[#0b1020] outline-none ring-0 placeholder:text-zinc-500 focus:border-sky-400"
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
                  className="w-full rounded-xl border border-white/10 bg-white px-4 py-3 text-[#0b1020] outline-none ring-0 placeholder:text-zinc-500 focus:border-sky-400"
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
                  className="w-full rounded-xl border border-white/10 bg-white px-4 py-3 text-[#0b1020] outline-none ring-0 placeholder:text-zinc-500 focus:border-sky-400"
                  placeholder=""
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-white/90">
                  Votre Message
                </label>
                <textarea
                  name="message"
                  rows={6}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white px-4 py-3 text-[#0b1020] outline-none ring-0 placeholder:text-zinc-500 focus:border-sky-400"
                  placeholder=""
                />
              </div>

              <div className="pt-2 text-center">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-10 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-sky-500"
                >
                  Envoyer
                </button>
              </div>

              {/* Optionnel (si tu veux plus tard): action/method + endpoint */}
              {/* <p className="text-center text-xs text-white/50">
                En envoyant ce message, vous acceptez d’être recontacté par ORCHESTRA.
              </p> */}
            </form>
          </div>

          {/* Petit lien bas de page (optionnel, utile) */}
          <div className="mt-10 text-center text-sm text-white/60">
            Vous préférez découvrir notre approche ?{" "}
            <Link href="/methode-orchestra" className="text-sky-400 hover:text-sky-300">
              Découvrir la Méthode ORCHESTRA
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
