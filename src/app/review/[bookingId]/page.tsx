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
    return () => { cancelled = true; };
  }, [bookingId]);

  if (booking === undefined && !loadError) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="flex justify-center gap-1 mb-4">
            <span className="h-3 w-3 animate-bounce rounded-full bg-blush [animation-delay:-0.3s]" />
            <span className="h-3 w-3 animate-bounce rounded-full bg-violet [animation-delay:-0.15s]" />
            <span className="h-3 w-3 animate-bounce rounded-full bg-gold [animation-delay:0s]" />
          </div>
          <p className="text-sm text-muted">Loading your booking...</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass-card rounded-3xl p-10 text-center max-w-md">
          <div className="text-5xl mb-5">🔍</div>
          <h2 className="font-display text-xl font-bold text-foreground mb-2">
            {loadError ? "Connection issue" : "Booking not found"}
          </h2>
          <p className="text-sm text-muted mb-6">
            {loadError
              ? "Could not load your booking. Please check your connection."
              : "We couldn't find this booking. It may have been deleted."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/my-bookings" className="rounded-2xl bg-gradient-to-r from-blush to-rose-gold px-6 py-3 text-sm font-semibold text-white shadow-lg hover:opacity-90 transition">
              My Bookings
            </Link>
            <Link href="/" className="rounded-2xl border border-border bg-surface-2 px-6 py-3 text-sm font-semibold text-muted hover:border-blush hover:text-blush transition">
              Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (booking.reviewed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass-card rounded-3xl p-12 text-center max-w-md">
          <div className="relative mx-auto mb-8 h-20 w-20">
            <div className="absolute inset-0 rounded-full bg-emerald/20 animate-pulse-glow" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald/20 text-4xl">💕</div>
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Already reviewed!</h2>
          <p className="text-muted mb-8">Thank you for sharing your experience. Your feedback helps the salon grow.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={`/salon/${booking.salonId}`} className="rounded-2xl bg-gradient-to-r from-blush to-rose-gold px-6 py-3 text-sm font-semibold text-white shadow-lg hover:opacity-90 transition">
              View {booking.salonName.split(" ")[0]}
            </Link>
            <Link href="/my-bookings" className="rounded-2xl border border-border bg-surface-2 px-6 py-3 text-sm font-semibold text-muted hover:border-blush hover:text-blush transition">
              My Bookings
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <ReviewFlow booking={booking} />
      </div>
    </div>
  );
}