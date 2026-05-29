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
];

type Props = { salons: Salon[] };

export function AiFinder({ salons }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Salon[] | null>(null);

  function runSearch(q: string = query) {
    setQuery(q);
    setResults(recommendSalons(q, salons));
  }

  return (
    <section id="ai" className="scroll-mt-20 bg-gradient-to-b from-rose-50/80 to-white py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-semibold text-violet-700">
            AI-powered
          </span>
        </div>
        <h2 className="font-display mt-2 text-2xl font-semibold text-stone-900 sm:text-3xl">
          Your AI beauty concierge
        </h2>
        <p className="mt-2 max-w-xl text-stone-600">
          Tell us your dream look — bridal, spa, nails or budget-friendly — and we&apos;ll find
          the perfect Mumbai salon for you.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runSearch()}
            placeholder="e.g. luxury bridal makeup with home service"
            className="flex-1 rounded-2xl border border-violet-200 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
          />
          <button
            type="button"
            onClick={() => runSearch()}
            className="rounded-2xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-violet-700 transition-colors"
          >
            Find salons
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => runSearch(s)}
              className="rounded-full border border-violet-200 bg-white px-3 py-1 text-xs text-violet-700 hover:bg-violet-50"
            >
              {s}
            </button>
          ))}
        </div>

        {results !== null && (
          <div className="mt-10">
            <p className="mb-4 text-sm font-medium text-stone-600">
              {results.length > 0
                ? `Top ${results.length} matches for “${query}”`
                : `No strong matches — showing popular picks`}
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {(results.length > 0 ? results : salons.slice(0, 4)).map((salon) => (
                <SalonCard key={salon.id} salon={salon} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
