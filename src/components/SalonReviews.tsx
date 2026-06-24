"use client";

import { useEffect, useState } from "react";
import type { Salon } from "@/lib/types";
import type { SalonInsights, StoredReview } from "@/lib/storage-types";
import {
  computeSalonInsights,
  getReviewsBySalon,
  getSalonRatingStatsFromReviews,
} from "@/lib/reviews";

type Props = { salon: Salon };

export function SalonReviews({ salon }: Props) {
  const [reviews, setReviews] = useState<StoredReview[]>([]);
  const [stats, setStats] = useState({ average: 0, count: 0 });
  const [insights, setInsights] = useState<SalonInsights | null>(null);
  const [showInsights, setShowInsights] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await getReviewsBySalon(salon.id);
        if (!cancelled) {
          setReviews(list);
          setStats(getSalonRatingStatsFromReviews(list));
          setInsights(computeSalonInsights(salon.id, list));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [salon.id]);

  const displayRating = stats.count > 0 ? stats.average.toFixed(1) : salon.rating.toFixed(1);
  const displayCount = stats.count > 0 ? stats.count : salon.reviewCount;

  return (
    <section className="glass-card rounded-3xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="font-display text-xl font-semibold text-foreground">Guest Reviews</h2>
          <p className="mt-1 text-sm text-muted">
            <span className="text-gold font-semibold">★ {displayRating}</span>
            <span className="text-muted"> · </span>
            {displayCount} review{displayCount !== 1 ? "s" : ""}
            {stats.count > 0 && (
              <span className="ml-2 rounded-full bg-emerald/20 px-2 py-0.5 text-[10px] font-semibold text-emerald">
                Firestore · live
              </span>
            )}
          </p>
        </div>
        {stats.count > 0 && insights && (
          <button
            type="button"
            onClick={() => setShowInsights(!showInsights)}
            className="rounded-full border border-violet/20 bg-violet/10 px-4 py-2 text-xs font-semibold text-violet hover:bg-violet/20 transition"
          >
            {showInsights ? "Hide" : "View"} feedback insights
          </button>
        )}
      </div>

      {showInsights && insights && stats.count > 0 && (
        <div className="glass-light rounded-2xl border border-border p-5 mb-6">
          <h3 className="text-sm font-bold text-foreground mb-1 flex items-center gap-2">
            <span>🤖</span> Salon Feedback Dashboard
          </h3>
          <p className="text-xs text-muted mb-4">Based on real guest ratings from Firestore</p>

          {insights.suggestions.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gold mb-2">💡 AI Suggestions</p>
              <ul className="space-y-2">
                {insights.suggestions.map((s, i) => (
                  <li key={i} className="flex gap-2 rounded-xl bg-gold-soft/30 border border-gold/10 px-3 py-2 text-xs text-foreground/80">
                    <span className="text-gold shrink-0">→</span>{s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            {insights.needsImprovement.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-rose-400 mb-2">Needs Improvement (≤3★)</p>
                <ul className="space-y-2">
                  {insights.needsImprovement.map((item) => (
                    <li key={item.text} className="rounded-lg bg-rose-400/10 border border-rose-400/10 px-3 py-2 text-xs text-muted">
                      "{item.text}" <span className="text-rose-400 ml-1">×{item.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {insights.appreciated.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald mb-2">Loved (4–5★)</p>
                <ul className="space-y-2">
                  {insights.appreciated.map((item) => (
                    <li key={item.text} className="rounded-lg bg-emerald/10 border border-emerald/10 px-3 py-2 text-xs text-muted">
                      "{item.text}" <span className="text-emerald ml-1">×{item.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-center text-sm text-muted py-6">Loading reviews…</p>
      ) : reviews.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-3xl mb-3">⭐</p>
          <p className="text-sm text-muted leading-relaxed">
            Be the first to review after your visit — book & rate to help other women choose with confidence ✨
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {reviews.slice(0, 6).map((r) => (
            <li key={r.id} className="glass-light rounded-2xl p-4 border border-border/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blush to-violet flex items-center justify-center text-xs font-bold text-white">
                    {r.customerName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{r.customerName}</p>
                    <p className="text-[10px] text-muted">
                      {new Date(r.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className={`text-sm ${s <= r.rating ? "text-gold" : "text-border"}`}>★</span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted leading-relaxed">
                {r.rating <= 3 ? r.improveFeedback : r.appreciateFeedback}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}