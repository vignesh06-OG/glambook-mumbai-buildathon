"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllBookings } from "@/lib/bookings";
import type { StoredBooking } from "@/lib/storage-types";
import { formatPrice } from "@/lib/salons";

export function MyBookingsList() {
  const [bookings, setBookings] = useState<StoredBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await getAllBookings();
        if (!cancelled) setBookings(list);
      } catch { /* handled gracefully */ }
      finally { if (!cancelled) setLoading(false); }
    })();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div className="glass-card rounded-3xl p-12 text-center">
        <div className="flex justify-center gap-1 mb-4">
          <span className="h-2 w-2 animate-bounce rounded-full bg-blush [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-blush [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-blush" />
        </div>
        <p className="text-sm text-muted">Loading your bookings...</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="glass-card rounded-3xl p-14 text-center">
        <div className="text-6xl mb-5">💅</div>
        <h3 className="font-display text-xl font-bold text-foreground mb-2">
          No bookings yet
        </h3>
        <p className="text-muted max-w-sm mx-auto mb-8 leading-relaxed">
          Book your first salon appointment and after your visit, rate your experience to help other women choose wisely.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/beauty-analysis"
            className="rounded-2xl bg-gradient-to-r from-blush to-rose-gold px-6 py-3 text-sm font-semibold text-white shadow-lg hover:opacity-90 transition"
          >
            🔬 Get AI Beauty Analysis
          </Link>
          <Link
            href="/#salons"
            className="rounded-2xl border border-border bg-surface-2 px-6 py-3 text-sm font-semibold text-foreground hover:border-blush hover:text-blush transition"
          >
            💅 Browse Mumbai Salons
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {bookings.map((b, i) => (
        <li
          key={b.id}
          className="glass-light rounded-2xl border border-border/50 p-5 transition-all hover:border-blush/20"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-3 min-w-0">
              <div className="h-10 w-10 rounded-xl bg-blush-soft flex items-center justify-center text-lg shrink-0">
                💅
              </div>
              <div className="min-w-0">
                <p className="font-display text-sm font-semibold text-foreground">{b.salonName}</p>
                <p className="text-xs text-muted mt-0.5">{b.serviceName}</p>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="text-[10px] text-muted/70 rounded-full bg-surface-2 px-2 py-0.5 border border-border/50">
                    📅 {b.date}
                  </span>
                  <span className="text-[10px] text-muted/70 rounded-full bg-surface-2 px-2 py-0.5 border border-border/50">
                    🕐 {b.time}
                  </span>
                  {b.price > 0 && (
                    <span className="text-[10px] gradient-text font-semibold rounded-full bg-blush-soft/30 px-2 py-0.5 border border-blush/20">
                      {formatPrice(b.price)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {b.reviewed ? (
                <span className="rounded-full bg-emerald/20 border border-emerald/30 px-3 py-1 text-xs font-semibold text-emerald flex items-center gap-1.5">
                  <span>✓</span> Reviewed
                </span>
              ) : (
                <Link
                  href={`/review/${b.id}`}
                  className="rounded-full bg-gradient-to-r from-blush to-rose-gold px-4 py-2 text-xs font-semibold text-white shadow-lg hover:opacity-90 transition"
                >
                  ★ Rate visit
                </Link>
              )}
            </div>
          </div>

          {!b.reviewed && (
            <div className="mt-3 pt-3 border-t border-border/50 flex items-center gap-2 text-[11px] text-blush/80">
              <span>✨</span>
              <span>Share your experience — synced to cloud for salon insights</span>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}