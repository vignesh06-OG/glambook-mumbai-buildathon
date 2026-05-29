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
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="rounded-3xl border border-rose-100 bg-white p-10 text-center text-stone-400">
        Loading your bookings…
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="rounded-3xl border border-rose-100 bg-white p-10 text-center">
        <p className="text-4xl">💅</p>
        <p className="font-display mt-4 text-lg font-semibold text-stone-900">
          No bookings yet
        </p>
        <p className="mt-2 text-sm text-stone-600">
          Book a salon and after your visit you can rate your experience here.
        </p>
        <Link
          href="/#salons"
          className="mt-6 inline-block rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500 px-8 py-3 text-sm font-semibold text-white"
        >
          Find a salon
        </Link>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {bookings.map((b) => (
        <li
          key={b.id}
          className="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-semibold text-stone-900">{b.salonName}</p>
              <p className="text-sm text-stone-600">{b.serviceName}</p>
              <p className="mt-1 text-xs text-stone-400">
                {b.date} · {b.time} · {formatPrice(b.price)}
              </p>
            </div>
            {b.reviewed ? (
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                ✓ Reviewed
              </span>
            ) : (
              <Link
                href={`/review/${b.id}`}
                className="rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:opacity-95"
              >
                Rate your visit ★
              </Link>
            )}
          </div>
          {!b.reviewed && (
            <p className="mt-3 text-xs text-rose-600">
              Visited the salon? Share your experience — synced to cloud for salon insights.
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}
