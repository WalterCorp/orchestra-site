"use client";

import { useRef, useState } from "react";

type ApiErrorResponse = {
  ok: false;
  errors?: Record<string, string>;
  error?: string;
};

type ApiSuccessResponse = {
  ok: true;
  message?: string;
};

type FormState = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string>("");
  const emailRef = useRef<HTMLInputElement | null>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setState("loading");
    setErrors({});
    setSuccessMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Champs (alignés avec l’API)
    const payload = {
      full_name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      company: String(formData.get("organization") || ""),
      subject: "", // optionnel, réservé si on l’ajoute au form plus tard
      message: String(formData.get("message") || ""),

      // Honeypot (sera ajouté au DOM en hidden)
      website: String(formData.get("website") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = (await res.json()) as ApiErrorResponse | ApiSuccessResponse;

      if (!res.ok || json.ok === false) {
      setState("error");

      const nextErrors =
        "errors" in json && json.errors
          ? json.errors
          : { global: "Une erreur est survenue. Réessayez." };

      setErrors(nextErrors);

      // Focus sur le premier champ en erreur (meilleure UX)
      if (nextErrors.email) emailRef.current?.focus();
      else if (nextErrors.message) messageRef.current?.focus();

      return;
    }

      setState("success");
      setSuccessMessage(
        "Message reçu. Un membre de l’équipe ORCHESTRA reviendra vers vous."
      );

      // Reset du form après succès
      form.reset();
    } catch {
      setState("error");
      setErrors({ global: "Impossible de contacter le serveur. Réessayez." });
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Honeypot : champ invisible, destiné aux bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {/* Erreur globale */}
      {errors.global ? (
        <p
          role="alert"
          aria-live="polite"
          className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-200 ring-1 ring-red-500/20"
        >
          {errors.global}
        </p>
      ) : null}

      {/* Succès */}
      {state === "success" ? (
         <p
          role="status"
          aria-live="polite"
          className="rounded-xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200 ring-1 ring-emerald-500/20"
        >
          {successMessage}
        </p>

      ) : null}

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
          E-mail <span className="text-sky-400">*</span>
        </label>
        <input
          ref={emailRef}
          required
          type="email"
          name="email"
          className="w-full rounded-xl border border-white/10 bg-white px-4 py-3 text-[#0b1020] outline-none placeholder:text-zinc-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
          placeholder=""
        />
        {errors.email ? (
          <p className="mt-2 text-xs text-red-200">{errors.email}</p>
        ) : null}
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-white/90">
          Organisation <span className="text-white/50">(optionnel)</span>
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
          Votre message <span className="text-sky-400">*</span>
        </label>
        <textarea
          ref={messageRef}
          required
          name="message"
          rows={6}
          className="w-full resize-none rounded-xl border border-white/10 bg-white px-4 py-3 text-[#0b1020] outline-none placeholder:text-zinc-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
          placeholder=""
        />
        {errors.message ? (
          <p className="mt-2 text-xs text-red-200">{errors.message}</p>
        ) : null}
      </div>

      <div className="pt-2 text-center">
        <button
          type="submit"
          disabled={state === "loading"}
          className="inline-flex h-12 items-center justify-center rounded-xl bg-sky-600 px-7 text-base font-semibold text-white shadow-sm transition-colors hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-sky-400/60"
        >
          {state === "loading" ? "Envoi..." : "Envoyer"}
        </button>
      </div>

      <p className="text-center text-xs text-white/50">
        En envoyant ce message, vous acceptez d’être recontacté par ORCHESTRA.
      </p>
    </form>
  );
}
