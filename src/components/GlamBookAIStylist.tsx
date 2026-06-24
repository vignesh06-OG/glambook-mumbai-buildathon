"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { AIConsultantResponse, ConsultantMessage } from "@/lib/ai-consultant-types";
import { buildConsultantFallback } from "@/lib/ai-recommend";
import { SALONS } from "@/lib/salons";

type ChatEntry = ConsultantMessage & {
  recommendations?: AIConsultantResponse["recommendations"];
  provider?: AIConsultantResponse["provider"];
};

const STARTERS = [
  "I have frizzy hair and an event tomorrow in Bandra",
  "Affordable bridal makeup with home service",
  "Relaxing spa day near Powai under ₹2000",
  "Quick gel manicure before a party tonight",
];

export function GlamBookAIStylist() {
  const [messages, setMessages] = useState<ChatEntry[]>([
    {
      role: "assistant",
      content: "Hi gorgeous! I'm your GlamBook AI Stylist — your personal beauty concierge in Mumbai. ✨ Tell me about your hair, skin, event, or budget, and I'll curate the perfect salon picks for you.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  async function send(userText: string) {
    const text = userText.trim();
    if (!text || loading) return;

    const userMsg: ChatEntry = { role: "user", content: text };
    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-consultant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextHistory.map(({ role, content }) => ({ role, content })),
        }),
      });
      let data: AIConsultantResponse & { error?: string };
      if (res.ok) {
        data = (await res.json()) as AIConsultantResponse & { error?: string };
      } else {
        data = buildConsultantFallback(text, SALONS);
      }
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply ?? data.error ?? "Something went wrong. Please try again.",
          recommendations: data.recommendations,
          provider: data.provider,
        },
      ]);
    } catch {
      const data = buildConsultantFallback(text, SALONS);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply,
          recommendations: data.recommendations,
          provider: data.provider,
        },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" }), 100);
    }
  }

  return (
    <section
      id="ai-stylist"
      className="scroll-mt-20 py-28 px-4 sm:px-6"
      style={{ contentVisibility: "auto", containIntrinsicSize: "900px" }}
    >
      <div className="mx-auto max-w-3xl">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-soft border border-violet/20 px-4 py-2 text-sm font-semibold text-violet mb-5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-violet" />
            </span>
            Generative AI · Live
          </span>
          <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl tracking-tight">
            GlamBook AI <span className="gradient-text-bright">Stylist</span>
          </h2>
          <p className="mt-4 text-lg text-muted max-w-md mx-auto leading-relaxed">
            Real AI beauty consultant — powered by LLM, trained on our Mumbai salon catalog.
          </p>
        </div>

        {/* Chat container */}
        <div className="glass-card rounded-3xl overflow-hidden">
          {/* Chat header */}
          <div className="border-b border-border/50 bg-surface-2/50 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet to-blush text-xl shadow-lg shadow-violet/20">
                ✨
              </div>
              <div>
                <p className="font-display text-sm font-semibold text-foreground">Mumbai Beauty AI</p>
                <p className="text-xs text-muted">Personalized picks · Book in one tap</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5 rounded-full bg-emerald/10 border border-emerald/20 px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-emerald animate-pulse" />
                <span className="text-[10px] font-semibold text-emerald">Online</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={listRef}
            className="flex max-h-[min(420px,55vh)] flex-col gap-4 overflow-y-auto p-5 [scrollbar-gutter:stable]"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-3.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-gradient-to-br from-violet to-blush text-white rounded-br-md shadow-lg shadow-violet/20"
                      : "glass-light border border-border text-foreground rounded-bl-md"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.content}</p>
                  {m.provider && m.provider !== "fallback" && (
                    <p className="mt-2 text-[10px] uppercase tracking-wider opacity-40">
                      via {m.provider}
                    </p>
                  )}
                  {m.recommendations && m.recommendations.length > 0 && (
                    <div className="mt-5 space-y-3">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted/60">Recommended for you</p>
                      {m.recommendations.map((rec) => (
                        <div
                          key={`${rec.salonId}-${rec.serviceId}`}
                          className="rounded-xl border border-border bg-surface-2 p-4 text-left shadow-sm"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-base">🏠</span>
                            <p className="font-semibold text-foreground text-sm">{rec.salonName}</p>
                          </div>
                          <p className="text-xs text-blush font-medium">{rec.serviceName}</p>
                          <p className="mt-1.5 text-xs text-muted leading-relaxed">{rec.reason}</p>
                          <Link
                            href={`/salon/${rec.salonId}`}
                            className="mt-3 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blush to-rose-gold py-2.5 text-xs font-semibold text-white shadow-md transition-all hover:opacity-90 active:scale-95"
                          >
                            Book now →
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="glass-light rounded-2xl rounded-bl-md border border-border px-4 py-3.5">
                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-blush [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-violet [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-blush" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="border-t border-border/50 p-4">
            {/* Quick starters */}
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="text-[10px] text-muted/60 self-center font-semibold uppercase tracking-wider">Try:</span>
              {STARTERS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  disabled={loading}
                  className="rounded-full border border-border bg-surface-2 px-3.5 py-1.5 text-left text-[11px] text-muted hover:border-blush/40 hover:text-blush transition-all disabled:opacity-40"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Input form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your hair, event, area, budget..."
                disabled={loading}
                className="flex-1 rounded-2xl border border-border bg-surface-2 px-4 py-3 text-sm text-foreground outline-none focus:border-violet focus:ring-2 focus:ring-violet/10 transition placeholder:text-muted/50 disabled:opacity-50"
                aria-label="Chat message"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="shrink-0 rounded-2xl bg-gradient-to-r from-violet to-blush px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet/20 transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}