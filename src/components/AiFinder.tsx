"use client";

import { useState } from "react";
import type { Salon } from "@/lib/types";
import { recommendSalons } from "@/lib/ai-recommend";
import { SalonCard } from "./SalonCard";

const SUGGESTIONS = [
  "bridal makeup near Juhu",
  "affordable nails Powai",
  "men grooming Colaba",
  "home facial Thane",
  "luxury spa Bandra",
  "keratin treatment Andheri",
];

type Props = { salons: Salon[] };

export function AiFinder({ salons }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Salon[] | null>(null);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);

  function runSearch(q: string = query) {
    if (!q.trim()) return;
    setQuery(q);
    setSearching(true);
    setSearched(true);
    // Simulate AI processing
    setTimeout(() => {
      setResults(recommendSalons(q, salons));
      setSearching(false);
    }, 800 + Math.random() * 600);
  }

  return (
    <section id="ai" className="scroll-mt-20 py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-soft border border-violet/20 px-4 py-1.5 text-xs font-semibold text-violet mb-4">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-violet" />
            </span>
            AI-Powered · Smart Matching
          </span>
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Your AI Beauty <span className="gradient-text">Concierge</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-muted leading-relaxed">
            Describe your dream look — bridal, spa, nails, or budget-friendly — and our AI finds
            the perfect Mumbai salon for you, matched by service, area, and rating.
          </p>
        </div>

        {/* Search input */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl pointer-events-none">🔍</div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && runSearch()}
              placeholder="e.g. luxury bridal makeup with home service in Bandra under ₹8000..."
              className="w-full rounded-2xl border border-border bg-surface-2 px-5 py-4 pl-14 text-base text-foreground outline-none focus:border-violet focus:ring-2 focus:ring-violet/10 transition placeholder:text-muted/50 shadow-lg"
              aria-label="Search for salons"
            />
            <button
              type="button"
              onClick={() => runSearch()}
              disabled={searching || !query.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl bg-gradient-to-r from-violet to-blush px-5 py-2 text-sm font-semibold text-white shadow-md transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
            >
              {searching ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin text-sm">⚙️</span>
                  AI finding...
                </span>
              ) : (
                "Find salons"
              )}
            </button>
          </div>

          {/* Suggestions */}
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            <span className="text-xs text-muted/60 self-center">Try:</span>
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => runSearch(s)}
                className="rounded-full border border-border/50 bg-surface-2/50 px-3.5 py-1.5 text-xs text-muted hover:border-violet/40 hover:text-violet transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {searching && (
          <div className="max-w-2xl mx-auto">
            <div className="glass-card rounded-3xl p-8 text-center mb-8">
              <div className="text-4xl mb-4 anim-float">🤖</div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">AI is searching...</h3>
              <p className="text-sm text-muted">Matching {salons.length}+ services across 32+ Mumbai salons</p>
              <div className="mt-6 flex justify-center gap-3">
                {["Analyzing keywords", "Checking ratings", "Matching services"].map((step, i) => (
                  <div key={step} className="glass-light rounded-xl px-4 py-2 text-xs text-muted flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet animate-pulse" style={{ animationDelay: `${i * 300}ms` }} />
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!searching && results !== null && (
          <div className="anim-fade-up">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted">
                {results.length > 0 ? (
                  <>
                    Found <strong className="text-foreground">{results.length}</strong> matches for{' '}
                    <strong className="text-violet">"{query}"</strong>
                  </>
                ) : (
                  <>No strong matches for <strong className="text-foreground">"{query}"</strong> — showing popular picks</>
                )}
              </p>
              <button
                type="button"
                onClick={() => { setResults(null); setQuery(""); setSearched(false); }}
                className="text-xs text-muted hover:text-blush transition"
              >
                Clear results
              </button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {(results.length > 0 ? results : salons.slice(0, 4)).map((salon, idx) => (
                <SalonCard key={salon.id} salon={salon} index={idx} />
              ))}
            </div>
          </div>
        )}

        {!searching && !searched && (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {salons.slice(0, 4).map((salon, idx) => (
              <SalonCard key={salon.id} salon={salon} index={idx} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}