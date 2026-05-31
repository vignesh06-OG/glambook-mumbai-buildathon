import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingForm } from "@/components/BookingForm";
import { SalonInfoPanel } from "@/components/SalonInfoPanel";
import { SalonReviews } from "@/components/SalonReviews";
import { formatPrice, getSalonById, priceLevelLabel } from "@/lib/salons";
import { getMapViewUrl } from "@/lib/maps";

type Props = { params: Promise<{ id: string }> };

export default async function SalonPage({ params }: Props) {
  const { id } = await params;
  const salon = getSalonById(id);
  if (!salon) notFound();

  const mapUrl = getMapViewUrl(salon);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Link href="/#salons" className="text-sm text-rose-600 hover:text-rose-700">
        ← Back to salons
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div>
          <div className="relative h-56 overflow-hidden rounded-3xl bg-gradient-to-br from-rose-100 to-fuchsia-50 sm:h-64 lg:aspect-video lg:h-auto lg:min-h-[280px]">
            <Image
              src={salon.image}
              alt={salon.name}
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>

          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-between rounded-xl border border-rose-200 bg-rose-50/50 px-4 py-3 text-sm transition hover:bg-rose-50"
          >
            <span className="text-stone-700">
              <span className="font-semibold text-stone-900">📍 {salon.area}</span>
              <span className="mt-0.5 block text-xs text-stone-500 line-clamp-1">
                {salon.address}
              </span>
            </span>
            <span className="shrink-0 font-semibold text-rose-600">Open in Maps →</span>
          </a>

          <h1 className="mt-6 text-3xl font-bold text-stone-900">{salon.name}</h1>
          <p className="mt-1 text-stone-600">
            {salon.area} · {priceLevelLabel(salon.priceLevel)} · ★ {salon.rating} (
            {salon.reviewCount} reviews)
          </p>
          <p className="mt-2 text-sm text-stone-500">Open: {salon.openHours}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {salon.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700"
              >
                {tag}
              </span>
            ))}
            {salon.homeService && (
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                Home service available
              </span>
            )}
          </div>

          <div className="mt-8">
            <SalonInfoPanel salon={salon} />
          </div>

          <h2 className="mt-8 text-lg font-semibold text-stone-900">Services</h2>
          <ul className="mt-3 space-y-3">
            {salon.services.map((service) => (
              <li
                key={service.id}
                className="flex items-center justify-between rounded-xl border border-rose-100 bg-white px-4 py-3"
              >
                <div>
                  <p className="font-medium text-stone-900">{service.name}</p>
                  <p className="text-xs capitalize text-stone-500">
                    {service.category} · {service.durationMin} min
                  </p>
                </div>
                <p className="font-semibold text-stone-900">{formatPrice(service.price)}</p>
              </li>
            ))}
          </ul>

          <SalonReviews salon={salon} />
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <BookingForm salon={salon} />
        </div>
      </div>
    </div>
  );
}
