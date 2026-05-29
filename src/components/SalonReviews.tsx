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
    return () => {
      cancelled = true;
    };
  }, [salon.id]);

  const displayRating =
    stats.count > 0 ? stats.average.toFixed(1) : salon.rating.toFixed(1);
  const displayCount = stats.count > 0 ? stats.count : salon.reviewCount;

  return (
    <section className="mt-10 rounded-3xl border border-rose-100 bg-gradient-to-br from-white to-rose-50/50 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-semibold text-stone-900">
            Guest reviews
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            <span className="text-amber-500 font-semibold">★ {displayRating}</span>
            <span className="text-stone-400"> · </span>
            {displayCount} review{displayCount !== 1 ? "s" : ""}
            {stats.count > 0 && (
              <span className="ml-2 rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-semibold text-rose-700">
                Firestore · live
              </span>
            )}
          </p>
        </div>
        {stats.count > 0 && insights && (
          <button
            type="button"
            onClick={() => setShowInsights(!showInsights)}
            className="rounded-full border border-fuchsia-200 bg-fuchsia-50 px-4 py-2 text-xs font-semibold text-fuchsia-800 hover:bg-fuchsia-100"
          >
            {showInsights ? "Hide" : "Salon"} feedback dashboard
          </button>
        )}
      </div>

      {showInsights && insights && stats.count > 0 && (
        <div className="mt-6 rounded-2xl border border-fuchsia-100 bg-white p-5">
          <h3 className="text-sm font-bold text-fuchsia-900">
            💡 Insights for {salon.name} (salon owner view)
          </h3>
          <p className="mt-1 text-xs text-stone-500">
            Based on real guest ratings from Firestore
          </p>

          {insights.suggestions.length > 0 && (
            <ul className="mt-4 space-y-2">
              {insights.suggestions.map((s, i) => (
                <li
                  key={i}
                  className="flex gap-2 rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-900"
                >
                  <span>→</span>
                  {s}
                </li>
              ))}
            </ul>
          )}

          {insights.needsImprovement.length > 0 && (
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-rose-600">
                Issues to fix (≤3★)
              </p>
              <ul className="mt-2 space-y-2">
                {insights.needsImprovement.map((item) => (
                  <li
                    key={item.text}
                    className="rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-900"
                  >
                    “{item.text}” <span className="text-rose-400">×{item.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {insights.appreciated.length > 0 && (
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                Guests appreciate (4–5★)
              </p>
              <ul className="mt-2 space-y-2">
                {insights.appreciated.map((item) => (
                  <li
                    key={item.text}
                    className="rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-900"
                  >
                    “{item.text}” <span className="text-emerald-400">×{item.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {loading ? (
        <p className="mt-6 text-center text-sm text-stone-400 py-6">Loading reviews…</p>
      ) : reviews.length === 0 ? (
        <p className="mt-6 text-center text-sm text-stone-500 py-6">
          Be the first to review after your visit — book & rate to help other women choose wisely ✨
        </p>
      ) : (
        <ul className="mt-6 space-y-4">
          {reviews.slice(0, 6).map((r) => (
            <li
              key={r.id}
              className="rounded-2xl border border-rose-50 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-stone-800">{r.customerName}</p>
                <span className="text-amber-500 text-sm">
                  {"★".repeat(r.rating)}
                  <span className="text-stone-300">{"★".repeat(5 - r.rating)}</span>
                </span>
              </div>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                {r.rating <= 3 ? r.improveFeedback : r.appreciateFeedback}
              </p>
              <p className="mt-2 text-[10px] text-stone-400">
                {new Date(r.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
