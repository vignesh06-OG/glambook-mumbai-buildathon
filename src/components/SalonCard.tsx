import Image from "next/image";
import Link from "next/link";
import type { Salon } from "@/lib/types";
import { formatPrice, priceLevelLabel } from "@/lib/salons";
import { formatDistance } from "@/lib/geo";
import { SalonActions } from "./SalonActions";

type Props = { salon: Salon; distanceKm?: number };

export function SalonCard({ salon, distanceKm }: Props) {
  const minPrice = Math.min(...salon.services.map((s) => s.price));

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-rose-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-rose-100">
      <Link href={`/salon/${salon.id}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-rose-50">
          <Image
            src={salon.image}
            alt={salon.name}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {salon.homeService && (
            <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-emerald-700 shadow-sm">
              Home service
            </span>
          )}
          {salon.priceLevel === 3 && (
            <span className="absolute right-3 top-3 rounded-full bg-amber-400/95 px-2.5 py-1 text-xs font-semibold text-amber-950 shadow-sm">
              Premium
            </span>
          )}
          {distanceKm !== undefined && (
            <span className="absolute bottom-3 left-3 rounded-full bg-black/70 px-2.5 py-1 text-xs font-medium text-white">
              📍 {formatDistance(distanceKm)}
            </span>
          )}
        </div>
        <div className="p-4 pb-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-stone-900 group-hover:text-rose-700">
                {salon.name}
              </h3>
              <p className="text-sm text-stone-500">{salon.area}</p>
            </div>
            <span className="shrink-0 text-sm font-medium text-amber-600">
              ★ {salon.rating}
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {salon.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-rose-50 px-2 py-0.5 text-xs text-rose-700"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-2 text-sm text-stone-600">
            From{" "}
            <span className="font-semibold text-stone-900">{formatPrice(minPrice)}</span>
            <span className="ml-2 text-stone-400">{priceLevelLabel(salon.priceLevel)}</span>
          </p>
        </div>
      </Link>
      <div className="border-t border-rose-50 px-3 pb-3 pt-2">
        <SalonActions salon={salon} variant="card" />
      </div>
    </article>
  );
}
