"use client";

import { useState } from "react";
import Link from "next/link";
import type { Salon } from "@/lib/types";
import { getDirectionsUrl, getMapViewUrl } from "@/lib/maps";
import { BookRideModal } from "./BookRideModal";

type Props = {
  salon: Salon;
  variant?: "card" | "detail";
};

export function SalonActions({ salon, variant = "detail" }: Props) {
  const [rideOpen, setRideOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const compact = variant === "card";

  function openMap() {
    window.open(getMapViewUrl(salon), "_blank", "noopener,noreferrer");
  }

  function openDirections() {
    window.open(getDirectionsUrl(salon), "_blank", "noopener,noreferrer");
  }

  function shareSalon() {
    const url = `${window.location.origin}/salon/${salon.id}`;
    if (navigator.share) {
      navigator.share({
        title: salon.name,
        text: `Check out ${salon.name} on GlamBook AI — Mumbai's beauty marketplace`,
        url,
      }).catch(() => copyLink(url));
    } else {
      copyLink(url);
    }
  }

  function copyLink(url: string) {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const btnBase = compact
    ? "flex-1 rounded-xl border border-border bg-surface-2 px-2 py-2 text-[10px] font-semibold text-muted hover:border-blush/40 hover:text-blush transition-all active:scale-95"
    : "flex items-center justify-center gap-2 rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm font-semibold text-muted hover:border-blush/40 hover:text-blush transition-all active:scale-95";

  return (
    <>
      <div className={compact ? "flex gap-1.5" : "grid grid-cols-2 gap-2 sm:grid-cols-4"}>
        <button type="button" onClick={openMap} className={btnBase} aria-label="View on map">
          {compact ? "🗺️" : "🗺️ Map"}
        </button>
        <button type="button" onClick={openDirections} className={btnBase} aria-label="Get directions">
          {compact ? "🧭" : "🧭 Route"}
        </button>
        <button
          type="button"
          onClick={() => setRideOpen(true)}
          className={`${btnBase} ${!compact ? "border-gold/20 bg-gold-soft/50 text-gold hover:bg-gold/20" : ""}`}
          aria-label="Book a ride"
        >
          {compact ? "🛵" : "🛵 Ride"}
        </button>
        {salon.phone && (
          <a href={`tel:${salon.phone}`} className={btnBase} aria-label="Call salon">
            {compact ? "📞" : "📞 Call"}
          </a>
        )}
      </div>

      {!compact && (
        <div className="mt-3 flex flex-wrap gap-2">
          {salon.whatsapp && (
            <a
              href={`https://wa.me/${salon.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-emerald/20 bg-emerald/10 px-4 py-2 text-xs font-semibold text-emerald hover:bg-emerald/20 transition"
            >
              💬 WhatsApp
            </a>
          )}
          <button
            type="button"
            onClick={shareSalon}
            className={`rounded-full border border-violet/20 bg-violet/10 px-4 py-2 text-xs font-semibold transition-all ${
              copied ? "border-emerald/30 bg-emerald/20 text-emerald" : "border-violet/20 text-violet hover:bg-violet/20"
            }`}
          >
            {copied ? "✓ Link copied!" : "↗ Share salon"}
          </button>
          <Link
            href={`/salon/${salon.id}`}
            className="rounded-full border border-blush/20 bg-blush-soft/30 px-4 py-2 text-xs font-semibold text-blush hover:bg-blush/20 transition"
          >
            → Full profile
          </Link>
        </div>
      )}

      <BookRideModal salon={salon} open={rideOpen} onClose={() => setRideOpen(false)} />
    </>
  );
}