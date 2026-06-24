"use client";

import type { SortMode } from "@/lib/types";

const FILTERS: { id: SortMode; label: string; icon: string }[] = [
  { id: "nearby", label: "Nearby", icon: "📍" },
  { id: "best-rated", label: "Best rated", icon: "⭐" },
  { id: "highly-rated", label: "Highly rated", icon: "🔥" },
  { id: "low-budget", label: "Low budget", icon: "💰" },
  { id: "premium", label: "Premium", icon: "💎" },
  { id: "best-services", label: "Best services", icon: "✨" },
];

type Props = {
  active: SortMode;
  onChange: (mode: SortMode) => void;
  locationEnabled: boolean;
};

export function QuickFilters({ active, onChange, locationEnabled }: Props) {
  return (
    <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide">
      <button
        type="button"
        onClick={() => onChange("default")}
        className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition duration-200 ${
          active === "default"
            ? "bg-gradient-to-r from-blush via-blush-bright to-rose-gold text-white shadow-lg shadow-blush/20"
            : "glass-light border border-border/50 text-muted hover:border-blush/50 hover:text-foreground"
        }`}
      >
        All salons
      </button>
      {FILTERS.map((f) => (
        <button
          key={f.id}
          type="button"
          onClick={() => onChange(f.id)}
          disabled={f.id === "nearby" && !locationEnabled}
          title={f.id === "nearby" && !locationEnabled ? "Enable location to sort by distance" : undefined}
          className={`shrink-0 flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition duration-200 ${
            active === f.id
              ? "bg-gradient-to-r from-blush via-blush-bright to-rose-gold text-white shadow-lg shadow-blush/20"
              : "glass-light border border-border/50 text-muted hover:border-blush/50 hover:text-foreground"
          } ${f.id === "nearby" && !locationEnabled ? "opacity-40 cursor-not-allowed" : ""}`}
        >
          <span>{f.icon}</span>
          {f.label}
        </button>
      ))}
    </div>
  );
}