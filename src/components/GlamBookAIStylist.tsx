"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { AIConsultantResponse, ConsultantMessage } from "@/lib/ai-consultant-types";

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
      content:
        "Hi gorgeous! I'm your GlamBook AI Stylist — tell me about your hair, skin, event, or area in Mumbai, and I'll curate the perfect salon pick for you. ✨",
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
      const data = (await res.json()) as AIConsultantResponse & { error?: string };
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
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I couldn't reach the stylist right now. Check your connection and try again.",
        },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" }), 100);
    }
  }

  return (
    <section id="ai-stylist" className="scroll-mt-20 py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-100 to-fuchsia-100 px-4 py-1.5 text-xs font-semibold text-violet-800">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
            </span>
            Generative AI · Live
          </span>
          <h2 className="font-display mt-4 text-3xl font-semibold text-stone-900 sm:text-4xl">
            GlamBook AI Stylist
          </h2>
          <p className="mt-2 text-stone-600">
            Real AI beauty consultant — powered by LLM, trained on our Mumbai salon catalog.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-xl shadow-rose-100/60">
          <div className="border-b border-rose-50 bg-gradient-to-r from-rose-50 via-fuchsia-50 to-rose-50 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-400 to-fuchsia-500 text-xl text-white shadow-md">
                ✨
              </div>
              <div>
                <p className="font-semibold text-stone-900">Mumbai Beauty Consultant</p>
                <p className="text-xs text-stone-500">Personalized picks · Book in one tap</p>
              </div>
            </div>
          </div>

          <div
            ref={listRef}
            className="flex max-h-[min(420px,55vh)] flex-col gap-4 overflow-y-auto p-5"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-gradient-to-br from-rose-500 to-fuchsia-500 text-white rounded-br-md"
                      : "bg-stone-50 text-stone-800 rounded-bl-md border border-stone-100"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.content}</p>
                  {m.provider && m.provider !== "fallback" && (
                    <p className="mt-2 text-[10px] uppercase tracking-wide opacity-60">
                      via {m.provider}
                    </p>
                  )}
                  {m.recommendations && m.recommendations.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {m.recommendations.map((rec) => (
                        <div
                          key={`${rec.salonId}-${rec.serviceId}`}
                          className="rounded-xl border border-rose-100 bg-white p-3 text-left shadow-sm"
                        >
                          <p className="font-semibold text-stone-900">{rec.salonName}</p>
                          <p className="text-xs text-rose-600">{rec.serviceName}</p>
                          <p className="mt-1 text-xs text-stone-500">{rec.reason}</p>
                          <Link
                            href={`/salon/${rec.salonId}`}
                            className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500 py-2 text-xs font-semibold text-white"
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
                <div className="rounded-2xl rounded-bl-md border border-stone-100 bg-stone-50 px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-rose-400 [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-fuchsia-400 [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-rose-400" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-rose-50 bg-rose-50/30 p-4">
            <div className="mb-3 flex flex-wrap gap-2">
              {STARTERS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  disabled={loading}
                  className="rounded-full border border-rose-200 bg-white px-3 py-1.5 text-left text-[11px] text-stone-600 hover:border-rose-300 hover:bg-rose-50 disabled:opacity-50"
                >
                  {s}
                </button>
              ))}
            </div>
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
                className="flex-1 rounded-2xl border border-rose-200 bg-white px-4 py-3 text-sm outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="shrink-0 rounded-2xl bg-gradient-to-r from-rose-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow-md disabled:opacity-50"
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
