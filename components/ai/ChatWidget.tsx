"use client";

import * as React from "react";
import Link from "next/link";

type AssistantMessage = {
  role: "user" | "assistant";
  content: string;
};

type AssistantResponse = {
  answer: string;
  suggestedPage?: string | null;
  suggestContact?: boolean;
};

type AssistantErrorResponse = {
  error: string;
  fallback: string;
};

type ChatWidgetProps = {
  /** Route courante (optionnel). Ex: "/expertises" */
  pageContext?: string;
  /** Position de la bulle */
  position?: "bottom-right" | "bottom-left";
  /** Titre affiché dans le header du widget */
  title?: string;
};

const DEFAULT_TITLE = "Assistant ORCHESTRA";

/**
 * ORCHESTRA — ChatWidget (Phase 5)
 * Widget bulle flottante minimal, gouverné.
 *
 * - UI discrète (pas d'ouverture auto)
 * - Historique limité côté client (max 6 messages envoyés)
 * - Appel server-only via /api/assistant
 * - Gestion loading + erreurs + fallback
 *
 * IMPORTANT (gouvernance) :
 * - Ne pas collecter d'email / tel / données perso dans le chat.
 * - Orienter vers /contact si besoin d'échange humain.
 */
export function ChatWidget({
  pageContext,
  position = "bottom-right",
  title = DEFAULT_TITLE,
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMinimized, setIsMinimized] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  // Conversation UI (client) — on garde plus long si tu veux,
  // mais on n'envoie que les 6 derniers messages à l'API.
  const [messages, setMessages] = React.useState<AssistantMessage[]>([
    {
      role: "assistant",
      content:
        "Bonjour — je peux répondre sur la méthode ORCHESTRA, nos expertises, et vous orienter vers la bonne page. Si votre besoin nécessite un échange humain, je vous proposerai le formulaire de contact.",
    },
  ]);

  const [lastSuggestedPage, setLastSuggestedPage] = React.useState<string | null>(null);
  const [lastSuggestContact, setLastSuggestContact] = React.useState<boolean>(false);

  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const messagesRef = React.useRef<AssistantMessage[]>(messages);

  React.useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const positionClasses =
    position === "bottom-left"
      ? "left-4 sm:left-6 bottom-4 sm:bottom-6"
      : "right-4 sm:right-6 bottom-4 sm:bottom-6";

  // Focus input quand on ouvre
  React.useEffect(() => {
    if (isOpen && !isMinimized) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 60);
      return () => window.clearTimeout(t);
    }
  }, [isOpen, isMinimized]);

  // ESC pour fermer
  React.useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  function toggleOpen() {
    setIsOpen((v) => !v);
    setIsMinimized(false);
  }

  function minimize() {
    setIsMinimized(true);
  }

  function restore() {
    setIsMinimized(false);
  }

  function clearChat() {
    setMessages([
      {
        role: "assistant",
        content:
          "Bonjour — je peux répondre sur la méthode ORCHESTRA, nos expertises, et vous orienter vers la bonne page. Si votre besoin nécessite un échange humain, je vous proposerai le formulaire de contact.",
      },
    ]);
    setLastSuggestedPage(null);
    setLastSuggestContact(false);
    setInput("");
    inputRef.current?.focus();
  }

  function sanitizeUserText(text: string) {
    return text.replace(/\s+/g, " ").trim();
  }

  function getConversationForApi(all: AssistantMessage[]): AssistantMessage[] {
    // Envoie uniquement les 6 derniers messages max (gouvernance + coût + perf)
    return all.slice(-6);
  }

  async function askAssistant(questionRaw: string) {
    const question = sanitizeUserText(questionRaw);
    if (!question) return;

    // UX : push user message
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setInput("");
    setIsLoading(true);
    setLastSuggestedPage(null);
    setLastSuggestContact(false);

    try {
      // IMPORTANT : conversation envoyée = messages AVANT la réponse assistant
      // Ici, on reconstruit avec la question déjà ajoutée.
      const nextMessages: AssistantMessage[] = [
        ...messagesRef.current,
        { role: "user", content: question },
      ];

      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          pageContext,
          conversation: getConversationForApi(nextMessages),
        }),
      });

      if (!res.ok) {
        const err: AssistantErrorResponse = await res.json().catch(() => ({
          error: "Erreur",
          fallback:
            "Je ne suis pas en mesure de répondre pour le moment. N'hésitez pas à nous contacter via /contact.",
        }));
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: err.fallback || "Je ne suis pas en mesure de répondre pour le moment.",
          },
        ]);
        setLastSuggestedPage("/contact");
        setLastSuggestContact(true);
        return;
      }

      const data: AssistantResponse = await res.json();

      const answer = typeof data.answer === "string" && data.answer.trim().length > 0
        ? data.answer.trim()
        : "Je peux vous aider à clarifier le sujet, mais cela mérite un échange humain. Vous pouvez nous contacter via le formulaire.";

      setMessages((prev) => [...prev, { role: "assistant", content: answer }]);

      const suggested =
        typeof data.suggestedPage === "string" && data.suggestedPage.trim().length > 0
          ? data.suggestedPage.trim()
          : null;

      setLastSuggestedPage(suggested);
      setLastSuggestContact(data.suggestContact === true);

      // Scroll bas
      requestAnimationFrame(() => {
        if (!panelRef.current) return;
        panelRef.current.scrollTop = panelRef.current.scrollHeight;
      });
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Je ne suis pas en mesure de répondre pour le moment. N'hésitez pas à nous contacter via le formulaire, un expert vous répondra sous 24-48h ouvrées.",
        },
      ]);
      setLastSuggestedPage("/contact");
      setLastSuggestContact(true);
    } finally {
      setIsLoading(false);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isLoading) return;
    void askAssistant(input);
  }

  // ──────────────────────────────────────────────
  // UI
  // ──────────────────────────────────────────────

  // Bulle fermée
  if (!isOpen) {
    return (
      <div className={`fixed z-50 ${positionClasses}`}>
        <button
          type="button"
          onClick={toggleOpen}
          className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-4 py-3 text-sm text-white shadow-lg backdrop-blur transition hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          aria-label="Ouvrir l'assistant ORCHESTRA"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
            {/* simple icon */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12c0 1.768.46 3.428 1.268 4.868.132.236.18.51.116.774L2.6 20.9a.8.8 0 0 0 .5.99c.163.057.34.06.506.01l3.26-.96c.264-.078.548-.042.789.096A9.956 9.956 0 0 0 12 22Z"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path
                d="M8 11.5h8M8 15h5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="hidden sm:inline">Assistant</span>
          <span className="inline text-white/70 sm:hidden">IA</span>
        </button>
      </div>
    );
  }

  // Widget ouvert (minimisé)
  if (isMinimized) {
    return (
      <div className={`fixed z-50 ${positionClasses}`}>
        <button
          type="button"
          onClick={restore}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-4 py-3 text-sm text-white shadow-lg backdrop-blur transition hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          aria-label="Réouvrir l'assistant ORCHESTRA"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12c0 1.768.46 3.428 1.268 4.868.132.236.18.51.116.774L2.6 20.9a.8.8 0 0 0 .5.99c.163.057.34.06.506.01l3.26-.96c.264-.078.548-.042.789.096A9.956 9.956 0 0 0 12 22Z"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path
                d="M8 11.5h8M8 15h5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span>{title}</span>
        </button>
      </div>
    );
  }

  // Widget ouvert (panel)
  return (
    <div className={`fixed z-50 ${positionClasses}`}>
      <div className="w-[92vw] max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-black/70 text-white shadow-2xl backdrop-blur">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
          <div className="min-w-0">
            <div className="truncate text-sm font-medium">{title}</div>
            <div className="truncate text-xs text-white/60">
              Orientation • FAQ • Qualification légère
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={clearChat}
              className="rounded-lg px-2 py-1 text-xs text-white/70 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
              aria-label="Réinitialiser la conversation"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={minimize}
              className="rounded-lg px-2 py-1 text-xs text-white/70 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
              aria-label="Minimiser"
            >
              —
            </button>
            <button
              type="button"
              onClick={toggleOpen}
              className="rounded-lg px-2 py-1 text-xs text-white/70 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
              aria-label="Fermer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Body */}
        <div
          ref={panelRef}
          className="max-h-[55vh] space-y-3 overflow-y-auto px-4 py-4"
        >
          {/* Disclaimer gouvernance */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white/70">
            Je peux aider à clarifier et orienter. Pour toute décision, tarif, délai, ou cas complexe,
            je vous proposerai un échange humain via le formulaire de contact.
          </div>

          {messages.map((m, idx) => {
            const isUser = m.role === "user";
            return (
              <div
                key={`${m.role}-${idx}`}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={[
                    "max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
                    isUser
                      ? "bg-white/15 text-white"
                      : "bg-white/5 text-white/90",
                  ].join(" ")}
                >
                  {m.content}
                </div>
              </div>
            );
          })}

          {/* Loading */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl bg-white/5 px-3 py-2 text-sm text-white/70">
                Réflexion…
              </div>
            </div>
          )}

          {/* Quick actions */}
          {(lastSuggestedPage || lastSuggestContact) && !isLoading && (
            <div className="flex flex-wrap gap-2 pt-1">
              {lastSuggestedPage && (
                <Link
                  href={lastSuggestedPage}
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10 hover:text-white"
                >
                  Voir la page {lastSuggestedPage}
                </Link>
              )}

              {lastSuggestContact && (
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/15"
                >
                  Parler à un humain
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Footer / Input */}
        <form onSubmit={onSubmit} className="border-t border-white/10 p-3">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez une question (sans données personnelles)…"
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
              disabled={isLoading}
              maxLength={500}
              aria-label="Votre question"
            />
            
            <button
              type="submit"
              onTouchEnd={(e) => {
                if (isLoading || sanitizeUserText(input).length === 0) return;
                e.preventDefault();
                void askAssistant(input);
              }}
              disabled={isLoading || sanitizeUserText(input).length === 0}
              className="inline-flex shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Envoyer"
            >
              Envoyer
            </button>
          </div>

          <div className="mt-2 flex items-center justify-between text-[11px] text-white/50">
            <span>Réponses concises • pas de tarifs • pas de promesses</span>
            <span>{input.length}/500</span>
          </div>
        </form>
      </div>
    </div>
  );
}