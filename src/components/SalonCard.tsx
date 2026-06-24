"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Salon } from "@/lib/types";
import { formatPrice, priceLevelLabel } from "@/lib/salons";
import { formatDistance } from "@/lib/geo";
import { SalonActions } from "./SalonActions";
import { VerifiedBadge } from "./VerifiedBadge";

type Props = { salon: Salon; distanceKm?: number; index?: number };

export function SalonCard({ salon, distanceKm, index = 0 }: Props) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const minPrice = Math.min(...salon.services.map((s) => s.price));
  const hasImage = Boolean(salon.image?.trim());

  return (
    <article
      className="anim-fade-up group relative flex h-full flex-col overflow-hidden rounded-3xl border border-blush-soft/30 glass-card transition-all duration-400 hover:-translate-y-2 hover:border-blush/40 hover:shadow-glow-sm"
      style={{ animationDelay: `${Math.min(index, 12) * 60}ms` }}
    >
      {/* Image section */}
      <Link href={`/salon/${salon.id}`} className="block relative">
        <div className="relative h-52 w-full overflow-hidden bg-surface-2">
          {/* Gradient placeholder while loading */}
          {!imageLoaded && hasImage && (
            <div className="absolute inset-0 bg-gradient-to-br from-blush/15 via-surface-2 to-violet/15 animate-pulse" />
          )}

          {hasImage ? (
            <Image
              src={salon.image}
              alt={`${salon.name} — ${salon.tags.slice(0, 2).join(" & ")} salon in ${salon.area}, Mumbai`}
              fill
              className={`object-cover object-center transition-all duration-500 group-hover:scale-[1.05] ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onLoad={() => setImageLoaded(true)}
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-5xl text-blush/25">🏠</span>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent pointer-events-none" />

          {/* Top badges */}
          <div className="absolute left-4 top-4 flex flex-col gap-2.5">
            <VerifiedBadge />
            {salon.homeService && (
              <span className="w-fit rounded-full bg-emerald/20 border border-emerald/30 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-emerald">
                🏠 Home service
              </span>
            )}
          </div>

          {/* Top right badges */}
          <div className="absolute right-4 top-4 flex flex-col gap-2.5 items-end">
            {salon.priceLevel === 3 && (
              <span className="rounded-full bg-gold-soft/80 border border-gold/30 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-gold">
                👑 Premium
              </span>
            )}
            {distanceKm !== undefined && (
              <span className="rounded-full bg-surface/80 backdrop-blur-sm border border-border/50 px-3 py-1.5 text-xs font-semibold text-foreground/90">
                📍 {formatDistance(distanceKm)}
              </span>
            )}
          </div>

          {/* Rating pill */}
          <div className="absolute bottom-4 right-4">
            <span className="rounded-full bg-gold-soft/90 backdrop-blur-sm border border-gold/30 px-4 py-1.5 text-sm font-bold text-gold">
              ★ {salon.rating}
            </span>
          </div>
        </div>

        {/* Card content */}
        <div className="flex flex-1 flex-col p-5 pb-4">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-[17px] font-bold text-foreground transition-colors duration-300 group-hover:text-blush">
                {salon.name}
              </h3>
              <p className="text-sm text-muted mt-1 font-medium">{salon.area}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {salon.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-blush-soft/60 border border-blush/25 px-3 py-1 text-xs font-semibold text-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Price */}
          <div className="mt-auto flex items-center gap-3 pt-3 border-t border-white/5">
            <p className="text-base text-muted">
              From{" "}
              <span className="font-bold gradient-text">{formatPrice(minPrice)}</span>
            </p>
            <span className="text-sm text-muted/60">{priceLevelLabel(salon.priceLevel)}</span>
            <span className="ml-auto text-sm text-muted/60">
              {salon.reviewCount}+ reviews
            </span>
          </div>
        </div>
      </Link>

      {/* Actions footer */}
      <div className="mt-auto border-t border-white/5 px-4 pb-4 pt-3.5">
        <SalonActions salon={salon} variant="card" />
      </div>

      {/* Hover glow border */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-blush/8 to-violet/5" />
    </article>
  );
}