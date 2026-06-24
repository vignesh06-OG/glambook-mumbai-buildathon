"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Salon, SortMode } from "@/lib/types";
import { MUMBAI_CENTER } from "@/lib/geo";
import { attachDistances, applySortMode } from "@/lib/salon-sort";
import { QuickFilters } from "./QuickFilters";
import { SalonCard } from "./SalonCard";
import { SalonCardGridSkeleton } from "./Skeletons";
import { AREAS, SERVICE_CATEGORIES } from "@/lib/salons";

type Props = { salons: Salon[] };

export function SalonExplorer({ salons }: Props) {
  const [search, setSearch] = useState("");
  const [area, setArea] = useState("All Areas");
  const [category, setCategory] = useState<string>("all");
  const [homeOnly, setHomeOnly] = useState(false);
  const [sortMode, setSortMode] = useState<SortMode>("default");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locStatus, setLocStatus] = useState<"idle" | "loading" | "ok" | "denied">("idle");
  const [loaded, setLoaded] = useState(false);

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
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, [requestLocation]);

  const filtered = useMemo(() => {
    let list = salons.filter((salon) => {
      if (homeOnly && !salon.homeService) return false;
      if (area !== "All Areas" && salon.area !== area) return false;
      if (category !== "all" && !salon.services.some((s) => s.category === category)) return false;
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
    <section id="salons" className="scroll-mt-20 py-28 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between mb-10">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-blush-soft border border-blush/20 px-4 py-2 text-sm font-semibold text-blush mb-5">
              💅 {salons.length}+ Curated Salons
            </span>
            <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl tracking-tight">
              Salons women love in <span className="gradient-text-bright">Mumbai</span>
            </h2>
            <p className="mt-4 text-lg text-muted max-w-xl leading-relaxed">
              AI-matched to your needs · Filter, book, and review — your complete beauty journey.
            </p>
          </div>
          {locStatus === "ok" && userLocation && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald/10 border border-emerald/20 px-4 py-2 text-xs font-medium text-emerald shrink-0">
              <span className="h-2 w-2 rounded-full bg-emerald animate-pulse" />
              Location active · Nearby sorting on
            </span>
          )}
          {locStatus === "denied" && (
            <button
              type="button"
              onClick={requestLocation}
              className="text-xs font-medium text-blush hover:underline shrink-0"
            >
              Enable location for nearby salons
            </button>
          )}
        </div>

        {/* Quick filters */}
        <div className="mb-6">
          <QuickFilters
            active={sortMode}
            onChange={setSortMode}
            locationEnabled={locStatus === "ok" || locStatus === "loading"}
          />
        </div>

        {/* Advanced filters */}
        <div className="glass-light rounded-2xl border border-border p-4 mb-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
          <label className="min-w-[180px] flex-1">
            <span className="text-[10px] font-semibold text-muted uppercase tracking-wider block mb-1.5">Search</span>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">🔍</span>
              <input
                type="search"
                placeholder="Salon name, area, service..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-border bg-surface-2 px-4 py-2.5 pl-9 text-sm text-foreground outline-none focus:border-blush focus:ring-2 focus:ring-blush/10 transition placeholder:text-muted/50"
              />
            </div>
          </label>

          <label className="min-w-[150px]">
            <span className="text-[10px] font-semibold text-muted uppercase tracking-wider block mb-1.5">Area</span>
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface-2 px-3 py-2.5 text-sm text-foreground outline-none focus:border-blush"
            >
              {AREAS.map((a) => (
                <option key={a} value={a} className="bg-surface-2">{a}</option>
              ))}
            </select>
          </label>

          <label className="min-w-[150px]">
            <span className="text-[10px] font-semibold text-muted uppercase tracking-wider block mb-1.5">Service</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface-2 px-3 py-2.5 text-sm text-foreground outline-none focus:border-blush capitalize"
            >
              {SERVICE_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value} className="bg-surface-2">{c.label}</option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-2.5 pb-1 sm:pb-0">
            <input
              type="checkbox"
              checked={homeOnly}
              onChange={(e) => setHomeOnly(e.target.checked)}
              className="h-4 w-4 rounded border-border bg-surface-2 text-blush focus:ring-blush/20 accent-blush"
            />
            <span className="text-sm text-foreground font-medium">🏠 Home service</span>
          </label>

          {(search || area !== "All Areas" || category !== "all" || homeOnly) && (
            <button
              type="button"
              onClick={() => { setSearch(""); setArea("All Areas"); setCategory("all"); setHomeOnly(false); }}
              className="rounded-xl border border-blush/20 bg-blush-soft/30 px-4 py-2.5 text-xs font-semibold text-blush hover:bg-blush/20 transition shrink-0"
            >
              ✕ Clear filters
            </button>
          )}
        </div>

        {/* Results count */}
        <p className="mb-6 text-sm text-muted">
          <span className="font-semibold text-foreground">{filtered.length}</span> salon{filtered.length !== 1 ? "s" : ""} found
          {sortMode !== "default" && (
            <span className="ml-2 text-blush">· sorted by {sortMode.replace("-", " ")}</span>
          )}
        </p>

        {/* Salon grid */}
        {!loaded ? (
          <SalonCardGridSkeleton count={8} />
        ) : filtered.length === 0 ? (
          <div className="glass-card rounded-3xl p-16 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">No salons match your filters</h3>
            <p className="text-muted max-w-sm mx-auto mb-6 leading-relaxed">
              Try adjusting your filters or search terms. We have 32+ salons across Mumbai!
            </p>
            <button
              type="button"
              onClick={() => { setSearch(""); setArea("All Areas"); setCategory("all"); setHomeOnly(false); setSortMode("default"); }}
              className="rounded-2xl bg-gradient-to-r from-blush to-rose-gold px-6 py-3 text-sm font-semibold text-white shadow-lg hover:opacity-90 transition"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((salon, idx) => (
              <SalonCard
                key={salon.id}
                salon={salon}
                distanceKm={salon.distanceKm}
                index={idx}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}