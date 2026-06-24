"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/salons";

type Props = {
  bookingId: string;
  salon: string;
  salonId: string;
  service: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  price: number;
};

export function BookingConfirmedClient({
  bookingId, salon, salonId, service, date, time, name, phone, price,
}: Props) {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6">
      <div className="mx-auto max-w-lg">
        {/* Success animation */}
        <div className="text-center mb-10">
          <div className="relative mx-auto mb-8 h-24 w-24">
            {/* Animated rings */}
            <div className="absolute inset-0 rounded-full border-2 border-blush/20 animate-ping" style={{ animationDuration: "3s" }} />
            <div className="absolute inset-2 rounded-full border border-emerald/20 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.5s" }} />
            {/* Center icon */}
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald/20 to-blush/20 text-5xl shadow-xl shadow-emerald/10 border border-emerald/20">
              ✅
            </div>
          </div>

          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
            You&apos;re all set, {name.split(" ")[0]}!
          </h1>
          <p className="text-muted leading-relaxed">
            Your beauty appointment at <strong className="text-foreground">{salon}</strong> is confirmed.
          </p>
        </div>

        {/* Booking details card */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-blush-soft flex items-center justify-center text-lg">
              📅
            </div>
            <div>
              <p className="text-xs text-muted uppercase tracking-wider font-semibold">Booking Details</p>
              <p className="text-xs text-muted/60 mt-0.5">Confirmed · Cloud synced</p>
            </div>
          </div>

          <dl className="space-y-4">
            {[
              { label: "Service", value: service, icon: "💅" },
              { label: "Date & Time", value: `${date} at ${time}`, icon: "🗓️" },
              { label: "Phone", value: phone, icon: "📞", isLink: true, href: `tel:${phone}` },
              { label: "Salon", value: salon, icon: "🏠" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0 last:pb-0">
                <div className="flex items-center gap-2">
                  <span className="text-base">{item.icon}</span>
                  <span className="text-xs text-muted uppercase tracking-wider font-semibold">{item.label}</span>
                </div>
                {item.isLink && item.href ? (
                  <a href={item.href} className="text-sm font-semibold text-blush hover:underline">{item.value}</a>
                ) : (
                  <span className="text-sm font-semibold text-foreground text-right">{item.value}</span>
                )}
              </div>
            ))}
            {price > 0 && (
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-2">
                  <span className="text-base">💰</span>
                  <span className="text-xs text-muted uppercase tracking-wider font-semibold">Amount</span>
                </div>
                <span className="font-display text-xl font-bold gradient-text">{formatPrice(price)}</span>
              </div>
            )}
          </dl>
        </div>

        {/* After visit prompt */}
        <div className="glass-light rounded-2xl border border-gold/20 p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="text-3xl shrink-0">⭐</div>
            <div className="flex-1">
              <p className="font-semibold text-foreground text-sm mb-1">After your visit</p>
              <p className="text-xs text-muted leading-relaxed">
                Come back and rate your experience. ≤3★ — share what could improve. 4–5★ — tell us what made it special!
              </p>
            </div>
          </div>
          <Link
            href={`/review/${bookingId}`}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blush to-rose-gold py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:opacity-90 active:scale-95"
          >
            ★ Rate after your visit
          </Link>
        </div>

        {/* Navigation */}
        <div className="glass-light rounded-2xl p-5">
          <p className="text-xs text-muted/60 text-center mb-4">Quick actions</p>
          <div className="grid grid-cols-3 gap-3">
            <Link href="/my-bookings" className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-surface-2 p-3 transition-all hover:border-blush/30 hover:bg-blush-soft/10">
              <span className="text-lg">📅</span>
              <span className="text-[10px] text-muted font-semibold">Bookings</span>
            </Link>
            <Link href={`/salon/${salonId}`} className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-surface-2 p-3 transition-all hover:border-blush/30 hover:bg-blush-soft/10">
              <span className="text-lg">🏠</span>
              <span className="text-[10px] text-muted font-semibold">Salon</span>
            </Link>
            <Link href="/beauty-analysis" className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-surface-2 p-3 transition-all hover:border-blush/30 hover:bg-blush-soft/10">
              <span className="text-lg">🔬</span>
              <span className="text-[10px] text-muted font-semibold">AI Analysis</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}