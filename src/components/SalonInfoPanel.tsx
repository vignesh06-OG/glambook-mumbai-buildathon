import type { Salon } from "@/lib/types";
import { SalonActions } from "./SalonActions";

type Props = { salon: Salon };

export function SalonInfoPanel({ salon }: Props) {
  return (
    <div className="rounded-2xl border border-rose-100 bg-gradient-to-br from-white to-rose-50/40 p-6">
      <h2 className="text-lg font-semibold text-stone-900">Contact & location</h2>

      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-stone-400">Address</dt>
          <dd className="mt-0.5 text-stone-800">{salon.address}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-stone-400">Phone</dt>
          <dd>
            <a href={`tel:${salon.phone}`} className="font-medium text-rose-600 hover:underline">
              {salon.phone}
            </a>
          </dd>
        </div>
        {salon.email && (
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-stone-400">Email</dt>
            <dd>
              <a href={`mailto:${salon.email}`} className="text-rose-600 hover:underline">
                {salon.email}
              </a>
            </dd>
          </div>
        )}
        {salon.website && (
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-stone-400">Website</dt>
            <dd>
              <a
                href={salon.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-rose-600 hover:underline"
              >
                Visit website →
              </a>
            </dd>
          </div>
        )}
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-stone-400">Hours</dt>
          <dd className="text-stone-800">{salon.openHours}</dd>
        </div>
        {salon.amenities && salon.amenities.length > 0 && (
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-stone-400">Amenities</dt>
            <dd className="mt-1 flex flex-wrap gap-1.5">
              {salon.amenities.map((a) => (
                <span
                  key={a}
                  className="rounded-full bg-white px-2.5 py-0.5 text-xs text-stone-600 border border-stone-200"
                >
                  {a}
                </span>
              ))}
            </dd>
          </div>
        )}
      </dl>

      <div className="mt-6">
        <SalonActions salon={salon} variant="detail" />
      </div>
    </div>
  );
}
