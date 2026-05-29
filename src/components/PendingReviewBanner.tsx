"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getPendingReviewBookings } from "@/lib/bookings";

export function PendingReviewBanner() {
  const [pending, setPending] = useState(0);
  const [firstId, setFirstId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await getPendingReviewBookings();
        if (!cancelled) {
          setPending(list.length);
          setFirstId(list[0]?.id ?? null);
        }
      } catch {
        /* Firebase not configured */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (pending === 0) return null;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 -mb-6 relative z-10">
      <div className="flex flex-col gap-3 rounded-2xl border border-fuchsia-200 bg-gradient-to-r from-rose-50 to-fuchsia-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-stone-800">
          <span className="font-semibold text-fuchsia-800">✨ {pending} visit{pending > 1 ? "s" : ""}</span>{" "}
          waiting for your review — help salons shine!
        </p>
        <div className="flex gap-2">
          {firstId && (
            <Link
              href={`/review/${firstId}`}
              className="rounded-full bg-fuchsia-600 px-4 py-2 text-xs font-semibold text-white"
            >
              Rate now
            </Link>
          )}
          <Link
            href="/my-bookings"
            className="rounded-full border border-fuchsia-200 bg-white px-4 py-2 text-xs font-semibold text-fuchsia-800"
          >
            My bookings
          </Link>
        </div>
      </div>
    </div>
  );
}
