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
      className="anim-fade-up group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 glass-card transition-all duration-300 hover:-translate-y-1 hover:border-blush/30 hover:shadow-2xl hover:shadow-blush/5"
      style={{ animationDelay: `${Math.min(index, 12) * 55}ms` }}
    >
      {/* Image section */}
      <Link href={`/salon/${salon.id}`} className="block relative">
        <div className="relative h-48 w-full overflow-hidden bg-surface-2">
          {/* Gradient placeholder while loading */}
          {!imageLoaded && hasImage && (
            <div className="absolute inset-0 bg-gradient-to-br from-blush/10 via-surface-2 to-violet/10 animate-pulse" />
          )}

          {hasImage ? (
            <Image
              src={salon.image}
              alt={`${salon.name} — ${salon.tags.slice(0, 2).join(" & ")} salon in ${salon.area}, Mumbai`}
              fill
              className={`object-cover object-center transition-all duration-500 group-hover:scale-[1.04] ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onLoad={() => setImageLoaded(true)}
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-4xl text-blush/20">🏠</span>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent pointer-events-none" />

          {/* Top badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-2">
            <VerifiedBadge />
            {salon.homeService && (
              <span className="w-fit rounded-full bg-emerald/20 border border-emerald/30 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold text-emerald">
                🏠 Home service
              </span>
            )}
          </div>

          {/* Top right badges */}
          <div className="absolute right-3 top-3 flex flex-col gap-2 items-end">
            {salon.priceLevel === 3 && (
              <span className="rounded-full bg-gold-soft border border-gold/30 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold text-gold">
                👑 Premium
              </span>
            )}
            {distanceKm !== undefined && (
              <span className="rounded-full bg-surface/80 backdrop-blur-sm border border-border/50 px-2.5 py-1 text-[10px] font-semibold text-foreground/80">
                📍 {formatDistance(distanceKm)}
              </span>
            )}
          </div>

          {/* Rating pill */}
          <div className="absolute bottom-3 right-3">
            <span className="rounded-full bg-gold-soft/90 backdrop-blur-sm border border-gold/30 px-3 py-1 text-sm font-bold text-gold">
              ★ {salon.rating}
            </span>
          </div>
        </div>

        {/* Card content */}
        <div className="flex flex-1 flex-col p-4 pb-3">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-[15px] font-semibold text-foreground transition-colors duration-300 group-hover:text-blush">
                {salon.name}
              </h3>
              <p className="text-xs text-muted mt-0.5">{salon.area}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {salon.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-blush-soft/50 border border-blush/20 px-2 py-0.5 text-[10px] font-medium text-blush"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Price */}
          <div className="mt-auto flex items-center gap-2 pt-2">
            <p className="text-sm text-muted">
              From{" "}
              <span className="font-semibold gradient-text">{formatPrice(minPrice)}</span>
            </p>
            <span className="text-xs text-border">{priceLevelLabel(salon.priceLevel)}</span>
            <span className="ml-auto text-xs text-muted/60">
              {salon.reviewCount}+ reviews
            </span>
          </div>
        </div>
      </Link>

      {/* Actions footer */}
      <div className="mt-auto border-t border-border/50 px-3 pb-3 pt-2.5">
        <SalonActions salon={salon} variant="card" />
      </div>

      {/* Hover glow border */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-blush/5 to-violet/5" />
    </article>
  );
}