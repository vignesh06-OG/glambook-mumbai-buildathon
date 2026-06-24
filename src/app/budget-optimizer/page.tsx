"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { generateBudgetPackages, formatBudget, getOccasionLabel } from "@/lib/ai-budget-optimizer";
import { ALL_OCCASIONS } from "@/lib/ai-occasion-planner";
import type { BudgetPackage, Occasion } from "@/lib/types";

const BUDGET_PRESETS = [1000, 2000, 3000, 5000, 8000, 15000];

const LOCATION_PRESETS = ["Bandra West", "Juhu", "Andheri West", "Powai", "Colaba", "Thane West"];

export default function BudgetOptimizerPage() {
  const [budget, setBudget] = useState<number>(3000);
  const [occasion, setOccasion] = useState<Occasion>("party");
  const [location, setLocation] = useState<string>("");
  const [packages, setPackages] = useState<BudgetPackage[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<BudgetPackage | null>(null);

  const handleGenerate = useCallback(async () => {
    setLoading(true);
    setPackages(null);
    setSelectedPackage(null);
    try {
      const result = await generateBudgetPackages(budget, occasion, location);
      setPackages(result);
    } finally {
      setLoading(false);
    }
  }, [budget, occasion, location]);

  return (
    <div className="min-h-screen py-14 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-gold-soft border border-gold/20 px-5 py-2 text-sm font-semibold text-gold mb-6">
            💰 AI-Powered · Smart Savings
          </span>
          <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl tracking-tight">
            AI Budget{" "}
            <span className="gradient-text-bright">Optimizer</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted leading-relaxed">
            Tell us your budget and occasion — our AI finds the best beauty packages and salon
            combinations optimized for maximum value.
          </p>
        </div>

        {/* ── Input Form ────────────────────────────────────────────────────── */}
        <div className="glass-card rounded-3xl p-8 sm:p-10 mb-10">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Budget */}
            <div>
              <label className="block mb-3">
                <span className="font-display text-sm font-semibold text-foreground flex items-center gap-2">
                  <span>💰</span> Your Budget (₹)
                </span>
                <span className="text-xs text-muted mt-1 block">Select how much you want to spend</span>
              </label>
              <div className="mb-3 flex items-center justify-between">
                <input
                  type="range"
                  min="500"
                  max="25000"
                  step="500"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full accent-blush"
                />
              </div>
              <div className="mb-4 rounded-xl bg-surface-2 px-4 py-3 text-center">
                <p className="font-display text-3xl font-bold gradient-text">{formatBudget(budget)}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {BUDGET_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setBudget(preset)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                      budget === preset
                        ? "bg-gradient-to-r from-blush to-rose-gold text-white"
                        : "border border-border text-muted hover:border-blush hover:text-blush"
                    }`}
                  >
                    ₹{preset.toLocaleString("en-IN")}
                  </button>
                ))}
              </div>
            </div>

            {/* Occasion */}
            <div>
              <label className="block mb-3">
                <span className="font-display text-sm font-semibold text-foreground flex items-center gap-2">
                  <span>🗓️</span> Occasion
                </span>
                <span className="text-xs text-muted mt-1 block">What's the beauty prep for?</span>
              </label>
              <div className="space-y-2">
                {ALL_OCCASIONS.map((occ) => (
                  <button
                    key={occ.value}
                    type="button"
                    onClick={() => setOccasion(occ.value)}
                    className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all ${
                      occasion === occ.value
                        ? "bg-gradient-to-r from-blush/20 to-rose-gold/10 border border-blush/30 text-blush"
                        : "border border-border text-muted hover:border-blush/20 hover:text-foreground"
                    }`}
                  >
                    <span className="text-lg">{occ.icon}</span>
                    {occ.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Location & Action */}
            <div>
              <label className="block mb-3">
                <span className="font-display text-sm font-semibold text-foreground flex items-center gap-2">
                  <span>📍</span> Preferred Area (Optional)
                </span>
                <span className="text-xs text-muted mt-1 block">Leave blank for all of Mumbai</span>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Bandra West, Juhu..."
                className="w-full rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm text-foreground outline-none focus:border-blush focus:ring-2 focus:ring-blush/10 transition placeholder:text-muted/50 mb-4"
              />
              <div className="flex flex-wrap gap-2 mb-6">
                {LOCATION_PRESETS.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setLocation(loc)}
                    className={`rounded-lg border px-3 py-1.5 text-xs transition-all ${
                      location === loc
                        ? "border-blush/50 bg-blush-soft text-blush"
                        : "border-border text-muted hover:border-blush/30 hover:text-foreground"
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleGenerate}
                disabled={loading}
                className="w-full rounded-2xl bg-gradient-to-r from-gold to-rose-gold px-6 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:opacity-90 active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="text-lg animate-spin">⚙️</span>
                    <span>AI Optimizing Packages...</span>
                  </>
                ) : (
                  <>
                    <span>💰</span>
                    <span>Find Best Packages</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── Loading State ─────────────────────────────────────────────────── */}
        {loading && (
          <div className="glass-card rounded-3xl p-12 text-center">
            <div className="relative mx-auto mb-8 h-20 w-20">
              <div className="absolute inset-0 rounded-full bg-gold-soft animate-pulse" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gold-soft/50 text-4xl">
                🤖
              </div>
              {/* Processing rings */}
              <div className="absolute inset-0 rounded-full border-2 border-gold/20 animate-ping" style={{ animationDuration: "2s" }} />
            </div>
            <h2 className="font-display text-xl font-bold text-foreground mb-2">AI is optimizing your packages...</h2>
            <p className="text-muted">Analyzing 32+ salons and 200+ services to find the best value</p>
            <div className="mt-8 max-w-md mx-auto">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: "🏷️", label: "Finding discounts" },
                  { icon: "🎯", label: "Matching services" },
                  { icon: "📊", label: "Calculating value" },
                ].map((item, i) => (
                  <div key={item.label} className="glass-light rounded-xl p-4 text-center">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <p className="text-xs text-muted">{item.label}</p>
                    <div className="mt-2 h-0.5 rounded-full bg-surface-3 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-gold to-rose-gold anim-shimmer" style={{ width: `${30 + i * 25}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Skeleton package cards */}
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass-light rounded-3xl overflow-hidden text-left">
                  <div className="p-6 bg-surface-2">
                    <div className="h-4 w-20 rounded-full bg-surface-3 animate-pulse mb-3" />
                    <div className="h-7 w-40 rounded-lg bg-surface-3 animate-pulse" />
                  </div>
                  <div className="p-6 space-y-3">
                    {[1, 2].map((j) => (
                      <div key={j} className="flex items-center gap-3 rounded-xl bg-surface-2/50 p-3">
                        <div className="h-8 w-8 rounded-lg bg-surface-3 animate-pulse shrink-0" />
                        <div className="flex-1 space-y-1">
                          <div className="h-3.5 w-3/4 rounded bg-surface-3 animate-pulse" />
                          <div className="h-2.5 w-1/2 rounded bg-surface-3 animate-pulse" />
                        </div>
                        <div className="h-3 w-16 rounded bg-surface-3 animate-pulse" />
                      </div>
                    ))}
                    <div className="h-10 rounded-xl bg-surface-3 animate-pulse mt-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Results ───────────────────────────────────────────────────────── */}
        {!loading && packages && (
          <div className="anim-fade-up space-y-6">
            <div className="text-center">
              <h2 className="font-display text-2xl font-bold text-foreground">
                {packages.length} Packages Found for {formatBudget(budget)}
              </h2>
              <p className="mt-2 text-muted">AI-optimized for {getOccasionLabel(occasion)} — sorted by best value</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {packages.map((pkg, i) => (
                <div
                  key={pkg.id}
                  className={`glass-card rounded-3xl overflow-hidden transition-all ${
                    selectedPackage?.id === pkg.id ? "border-blush/40" : "hover:border-blush/20"
                  }`}
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  {/* Package header */}
                  <div className={`p-6 ${
                    i === 0 ? "bg-gradient-to-br from-blush/20 to-rose-gold/10" :
                    i === 1 ? "bg-gradient-to-br from-gold/15 to-blush/10" :
                    "bg-surface-2"
                  }`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="rounded-full bg-blush/20 px-2.5 py-0.5 text-[10px] font-semibold text-blush mb-2 inline-block">
                          {i === 0 ? "⭐ Best Value" : i === 1 ? "💎 Popular Pick" : "💡 Budget Smart"}
                        </span>
                        <h3 className="font-display text-xl font-bold text-foreground">{pkg.name}</h3>
                      </div>
                      <div className="text-3xl">
                        {i === 0 ? "👑" : i === 1 ? "✨" : "💡"}
                      </div>
                    </div>
                    <p className="text-sm text-muted leading-relaxed">{pkg.description}</p>
                  </div>

                  {/* Services */}
                  <div className="p-6">
                    <div className="space-y-3 mb-6">
                      {pkg.services.map((svc, j) => (
                        <div key={j} className="flex items-center gap-3 rounded-xl bg-surface-2/50 px-4 py-3">
                          <div className="h-8 w-8 rounded-lg bg-blush-soft flex items-center justify-center text-sm">
                            {svc.category === "hair" ? "💇" : svc.category === "skin" ? "✨" : svc.category === "makeup" ? "💄" : "💅"}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-foreground">{svc.name}</p>
                            <p className="text-xs text-muted">{svc.duration} · {svc.category}</p>
                          </div>
                          <p className="text-sm font-semibold text-muted line-through">
                            ₹{svc.price.toLocaleString("en-IN")}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Pricing */}
                    <div className="glass-light rounded-xl p-4 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted">Original total</span>
                        <span className="text-sm text-muted line-through">
                          {formatBudget(pkg.totalOriginalPrice)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted">AI Discount</span>
                        <span className="text-sm font-semibold text-emerald">
                          Save {formatBudget(pkg.savings)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <span className="font-display text-lg font-bold text-foreground">Total</span>
                        <span className="font-display text-2xl font-bold gradient-text">
                          {formatBudget(pkg.discountedPrice)}
                        </span>
                      </div>
                    </div>

                    {/* Salon info */}
                    <div className="glass-light rounded-xl p-3 mb-4 flex items-center gap-3">
                      <div className="text-xl">🏠</div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{pkg.salonName}</p>
                        <p className="text-xs text-muted">{pkg.location} · ★ {pkg.rating}</p>
                      </div>
                    </div>

                    <Link
                      href={`/salon/${pkg.salonId}`}
                      className="block w-full rounded-2xl bg-gradient-to-r from-blush to-rose-gold py-3 text-center text-sm font-semibold text-white shadow-lg transition-all hover:opacity-90"
                    >
                      Book This Package →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="glass-light rounded-2xl p-6 text-center">
              <p className="text-sm text-muted mb-4">
                Want a different budget or occasion? Adjust and regenerate instantly.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/beauty-analysis" className="rounded-xl border border-blush-soft bg-blush-soft px-5 py-2.5 text-sm font-semibold text-blush transition hover:bg-blush hover:text-white">
                  🔬 AI Beauty Analysis
                </Link>
                <Link href="/occasion-planner" className="rounded-xl border border-violet/20 bg-violet/10 px-5 py-2.5 text-sm font-semibold text-violet transition hover:bg-violet/20">
                  🗓️ AI Occasion Planner
                </Link>
                <Link href="/#salons" className="rounded-xl border border-border bg-surface-2 px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-blush">
                  💅 Browse All Salons
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ── Empty state ───────────────────────────────────────────────────── */}
        {!loading && !packages && (
          <div className="glass-card rounded-3xl p-16 text-center">
            <div className="text-6xl mb-6">💰</div>
            <h2 className="font-display text-2xl font-bold text-foreground">Enter your details above</h2>
            <p className="mt-3 text-muted max-w-sm mx-auto">
              Set your budget, select an occasion, and let our AI find the perfect beauty package for you.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}