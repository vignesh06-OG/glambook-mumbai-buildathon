"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ReviewFlow } from "@/components/ReviewFlow";
import { getBooking } from "@/lib/bookings";
import type { StoredBooking } from "@/lib/storage-types";

export default function ReviewPage() {
  const params = useParams();
  const bookingId = params.bookingId as string;
  const [booking, setBooking] = useState<StoredBooking | null | undefined>(undefined);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const b = await getBooking(bookingId);
        if (!cancelled) setBooking(b);
      } catch {
        if (!cancelled) {
          setLoadError(true);
          setBooking(null);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [bookingId]);

  if (booking === undefined && !loadError) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-stone-400">
        Loading…
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <p className="text-stone-600">
          {loadError
            ? "Could not load booking. Check Firebase configuration."
            : "Booking not found."}
        </p>
        <Link href="/my-bookings" className="mt-4 inline-block text-rose-600 hover:underline">
          My bookings
        </Link>
      </div>
    );
  }

  if (booking.reviewed) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <p className="text-4xl">💕</p>
        <p className="font-display mt-4 text-xl font-semibold">Already reviewed</p>
        <p className="mt-2 text-sm text-stone-600">Thank you for your feedback!</p>
        <Link
          href={`/salon/${booking.salonId}`}
          className="mt-6 inline-block rounded-full bg-rose-600 px-6 py-2 text-sm font-semibold text-white"
        >
          View salon
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-[80vh] overflow-hidden px-4 py-12 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-100/80 via-fuchsia-50/40 to-transparent" />
      <div className="relative mx-auto max-w-lg">
        <ReviewFlow booking={booking} />
      </div>
    </div>
  );
}
