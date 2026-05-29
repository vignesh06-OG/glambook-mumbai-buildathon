"use client";

import { useMemo, useState } from "react";
import type { Salon } from "@/lib/types";
import { SalonCard } from "./SalonCard";

type Props = { salons: Salon[] };

const AREAS = ["All", "Bandra West", "Andheri East", "Colaba", "Juhu", "Powai", "Thane West"];
const CATEGORIES = ["All", "hair", "skin", "nails", "bridal", "grooming"] as const;

export function SalonExplorer({ salons }: Props) {
  const [search, setSearch] = useState("");
  const [area, setArea] = useState("All");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [homeOnly, setHomeOnly] = useState(false);

  const filtered = useMemo(() => {
    return salons.filter((salon) => {
      if (homeOnly && !salon.homeService) return false;
      if (area !== "All" && salon.area !== area) return false;
      if (category !== "All" && !salon.services.some((s) => s.category === category))
        return false;
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        salon.name.toLowerCase().includes(q) ||
        salon.area.toLowerCase().includes(q) ||
        salon.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [salons, search, area, category, homeOnly]);

  return (
    <section id="salons" className="scroll-mt-20 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
          Explore salons in Mumbai
        </h2>
        <p className="mt-2 text-stone-600">
          Filter by area, service type, or home visits — book in minutes.
        </p>

        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-rose-100 bg-white p-4 shadow-sm sm:flex-row sm:flex-wrap sm:items-end">
          <label className="flex-1 min-w-[200px]">
            <span className="text-xs font-medium text-stone-500">Search</span>
            <input
              type="search"
              placeholder="Salon name, area, tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
            />
          </label>
          <label>
            <span className="text-xs font-medium text-stone-500">Area</span>
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="mt-1 block w-full rounded-xl border border-stone-200 px-3 py-2 text-sm sm:w-40"
            >
              {AREAS.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="text-xs font-medium text-stone-500">Service</span>
            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as (typeof CATEGORIES)[number])
              }
              className="mt-1 block w-full rounded-xl border border-stone-200 px-3 py-2 text-sm capitalize sm:w-36"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 pb-2 sm:pb-0">
            <input
              type="checkbox"
              checked={homeOnly}
              onChange={(e) => setHomeOnly(e.target.checked)}
              className="rounded border-stone-300 text-rose-600 focus:ring-rose-500"
            />
            <span className="text-sm text-stone-700">Home service only</span>
          </label>
        </div>

        <p className="mt-4 text-sm text-stone-500">
          {filtered.length} salon{filtered.length !== 1 ? "s" : ""} found
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((salon) => (
            <SalonCard key={salon.id} salon={salon} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-8 text-center text-stone-500">
            No salons match your filters. Try clearing search or area.
          </p>
        )}
      </div>
    </section>
  );
}
