"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getPendingReviewBookings } from "@/lib/bookings";
import type { StoredBooking } from "@/lib/storage-types";

export function PendingReviewBanner() {
  const [pending, setPending] = useState<StoredBooking[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await getPendingReviewBookings();
        if (!cancelled) setPending(list.slice(0, 3));
      } catch { /* silent */ }
    })();
    return () => { cancelled = true; };
  }, []);

  if (pending.length === 0) return null;

  return (
    <div className="glass-card rounded-2xl p-4 mx-4 sm:mx-0 border border-gold/20 bg-gold-soft/20">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="text-2xl">⭐</div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">
            You have {pending.length} unreviewed {pending.length === 1 ? "booking" : "bookings"}
          </p>
          <p className="text-xs text-muted mt-0.5">
            Rate your visits — help salons improve and other women choose wisely ✨
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          {pending.slice(0, 2).map((b) => (
            <Link
              key={b.id}
              href={`/review/${b.id}`}
              className="rounded-full bg-gradient-to-r from-blush to-rose-gold px-4 py-2 text-xs font-semibold text-white shadow"
            >
              ★ Rate {b.salonName.split(" ")[0]}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}