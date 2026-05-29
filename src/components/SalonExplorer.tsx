"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Salon, SortMode } from "@/lib/types";
import { MUMBAI_CENTER } from "@/lib/geo";
import { attachDistances, applySortMode } from "@/lib/salon-sort";
import { QuickFilters } from "./QuickFilters";
import { SalonCard } from "./SalonCard";

type Props = { salons: Salon[] };

const AREAS = ["All", "Bandra West", "Andheri East", "Colaba", "Juhu", "Powai", "Thane West"];
const CATEGORIES = ["All", "hair", "skin", "nails", "bridal", "grooming"] as const;

export function SalonExplorer({ salons }: Props) {
  const [search, setSearch] = useState("");
  const [area, setArea] = useState("All");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [homeOnly, setHomeOnly] = useState(false);
  const [sortMode, setSortMode] = useState<SortMode>("default");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locStatus, setLocStatus] = useState<"idle" | "loading" | "ok" | "denied">("idle");

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocStatus("denied");
      return;
    }
    setLocStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocStatus("ok");
        setSortMode((m) => (m === "default" ? "nearby" : m));
      },
      () => setLocStatus("denied"),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  const filtered = useMemo(() => {
    let list = salons.filter((salon) => {
      if (homeOnly && !salon.homeService) return false;
      if (area !== "All" && salon.area !== area) return false;
      if (category !== "All" && !salon.services.some((s) => s.category === category))
        return false;
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        salon.name.toLowerCase().includes(q) ||
        salon.area.toLowerCase().includes(q) ||
        salon.address.toLowerCase().includes(q) ||
        salon.tags.some((t) => t.toLowerCase().includes(q))
      );
    });

    const withDist = attachDistances(
      list,
      userLocation ?? (sortMode === "nearby" ? MUMBAI_CENTER : null)
    );
    return applySortMode(withDist, sortMode);
  }, [salons, search, area, category, homeOnly, sortMode, userLocation]);

  return (
    <section id="salons" className="scroll-mt-20 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold text-stone-900 sm:text-3xl">
              Salons women love in Mumbai
            </h2>
            <p className="mt-2 text-stone-600">
              Filter, book, ride & review — your complete beauty journey in one place.
            </p>
          </div>
          {locStatus === "ok" && userLocation && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-800">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Location on — nearby sorting enabled
            </span>
          )}
          {locStatus === "denied" && (
            <button
              type="button"
              onClick={requestLocation}
              className="text-xs font-medium text-rose-600 hover:underline"
            >
              Enable location for nearby salons
            </button>
          )}
        </div>

        <div className="mt-6">
          <QuickFilters
            active={sortMode}
            onChange={setSortMode}
            locationEnabled={locStatus === "ok" || locStatus === "loading"}
          />
        </div>

        <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-rose-100 bg-white p-4 shadow-sm sm:flex-row sm:flex-wrap sm:items-end">
          <label className="min-w-[200px] flex-1">
            <span className="text-xs font-medium text-stone-500">Search</span>
            <input
              type="search"
              placeholder="Salon, area, address..."
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
          {sortMode !== "default" && (
            <span className="text-rose-600"> · sorted by {sortMode.replace("-", " ")}</span>
          )}
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((salon, idx) => (
            <SalonCard
              key={salon.id}
              salon={salon}
              distanceKm={salon.distanceKm}
              index={idx}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-8 text-center text-stone-500">
            No salons match your filters. Try another quick filter or clear search.
          </p>
        )}
      </div>
    </section>
  );
}
