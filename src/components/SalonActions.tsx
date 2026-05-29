"use client";

import { useState } from "react";
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
        text: `Check out ${salon.name} on Mumbai Salon Marketplace`,
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

  const btn =
    compact
      ? "flex-1 rounded-lg border border-stone-200 bg-white px-2 py-2 text-[11px] font-semibold text-stone-700 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-700"
      : "flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-semibold text-stone-700 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-700 transition";

  return (
    <>
      <div className={compact ? "flex gap-1.5" : "grid grid-cols-2 gap-3 sm:grid-cols-4"}>
        <button type="button" onClick={openMap} className={btn}>
          {compact ? "🗺️ Map" : "🗺️ View on map"}
        </button>
        <button type="button" onClick={openDirections} className={btn}>
          {compact ? "🧭 Route" : "🧭 Get directions"}
        </button>
        <button type="button" onClick={() => setRideOpen(true)} className={`${btn} ${!compact ? "border-amber-200 bg-amber-50 text-amber-900 hover:bg-amber-100" : ""}`}>
          {compact ? "🛵 Ride" : "🛵 Book ride"}
        </button>
        {salon.phone && (
          <a href={`tel:${salon.phone}`} className={btn}>
            {compact ? "📞 Call" : "📞 Call salon"}
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
              className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-100"
            >
              WhatsApp
            </a>
          )}
          <button
            type="button"
            onClick={shareSalon}
            className="rounded-full bg-violet-50 px-4 py-2 text-xs font-semibold text-violet-800 hover:bg-violet-100"
          >
            {copied ? "Link copied!" : "Share salon link"}
          </button>
        </div>
      )}

      <BookRideModal salon={salon} open={rideOpen} onClose={() => setRideOpen(false)} />
    </>
  );
}
