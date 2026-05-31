import Image from "next/image";
import Link from "next/link";
import type { Salon } from "@/lib/types";
import { formatPrice, priceLevelLabel } from "@/lib/salons";
import { formatDistance } from "@/lib/geo";
import { SalonActions } from "./SalonActions";
import { VerifiedBadge } from "./VerifiedBadge";

type Props = { salon: Salon; distanceKm?: number; index?: number };

export function SalonCard({ salon, distanceKm, index = 0 }: Props) {
  const minPrice = Math.min(...salon.services.map((s) => s.price));
  const hasImage = Boolean(salon.image?.trim());

  return (
    <article
      className="anim-fade-up group flex h-full flex-col overflow-hidden rounded-3xl border border-rose-100/80 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-rose-200/90 hover:shadow-xl"
      style={{ animationDelay: `${Math.min(index, 12) * 55}ms` }}
    >
      <Link href={`/salon/${salon.id}`} className="flex min-h-0 flex-1 flex-col">
        <div className="relative h-48 w-full shrink-0 overflow-hidden bg-gradient-to-br from-rose-100 via-rose-50 to-fuchsia-50">
          {hasImage ? (
            <Image
              src={salon.image}
              alt={`${salon.name} — ${salon.tags.slice(0, 2).join(" & ")} salon in ${salon.area}, Mumbai`}
              fill
              className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div
              className="flex h-full items-center justify-center text-4xl text-rose-300/80"
              aria-hidden
            >
              ✨
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          <div className="absolute left-3 top-3 flex flex-col gap-2">
            <VerifiedBadge />
            {salon.homeService && (
              <span className="w-fit rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 shadow-sm backdrop-blur-sm">
                Home service
              </span>
            )}
          </div>
          {salon.priceLevel === 3 && (
            <span className="absolute right-3 top-3 rounded-full bg-gradient-to-r from-amber-200 to-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-950 shadow-sm backdrop-blur-sm">
              Premium
            </span>
          )}
          {distanceKm !== undefined && (
            <span className="absolute bottom-3 left-3 rounded-full bg-black/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
              📍 {formatDistance(distanceKm)}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-4 pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="truncate text-[15px] font-semibold text-stone-900 transition-colors duration-300 group-hover:text-rose-700">
                {salon.name}
              </h3>
              <p className="text-sm text-stone-500">{salon.area}</p>
            </div>
            <span className="shrink-0 rounded-full bg-amber-50 px-2 py-0.5 text-sm font-semibold text-amber-700">
              ★ {salon.rating}
            </span>
          </div>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {salon.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-rose-50 px-2 py-0.5 text-xs font-medium text-rose-700"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-auto pt-3 text-sm text-stone-600">
            From{" "}
            <span className="font-semibold text-stone-900">{formatPrice(minPrice)}</span>
            <span className="ml-2 text-stone-400">{priceLevelLabel(salon.priceLevel)}</span>
          </p>
        </div>
      </Link>
      <div className="mt-auto border-t border-rose-50/90 px-3 pb-3 pt-2.5">
        <SalonActions salon={salon} variant="card" />
      </div>
    </article>
  );
}
