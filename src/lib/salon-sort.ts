import { distanceKm, type Coords } from "./geo";
import type { Salon, SortMode } from "./types";

export type SalonWithDistance = Salon & { distanceKm?: number };

function minPrice(salon: Salon): number {
  return Math.min(...salon.services.map((s) => s.price));
}

function serviceScore(salon: Salon): number {
  const avgPrice =
    salon.services.reduce((a, s) => a + s.price, 0) / salon.services.length;
  return salon.rating * 2 + salon.reviewCount / 50 + salon.services.length * 0.5 - avgPrice / 5000;
}

export function attachDistances(
  salons: Salon[],
  user: Coords | null
): SalonWithDistance[] {
  if (!user) return salons;
  return salons.map((s) => ({
    ...s,
    distanceKm: distanceKm(user, { lat: s.lat, lng: s.lng }),
  }));
}

export function applySortMode(
  salons: SalonWithDistance[],
  mode: SortMode
): SalonWithDistance[] {
  const list = [...salons];

  switch (mode) {
    case "nearby":
      return list.sort(
        (a, b) => (a.distanceKm ?? 999) - (b.distanceKm ?? 999)
      );
    case "best-rated":
      return list.sort(
        (a, b) =>
          b.rating - a.rating || b.reviewCount - a.reviewCount
      );
    case "highly-rated":
      return list
        .filter((s) => s.rating >= 4.6)
        .sort((a, b) => b.reviewCount - a.reviewCount);
    case "low-budget":
      return list
        .filter((s) => s.priceLevel <= 2)
        .sort((a, b) => a.priceLevel - b.priceLevel || minPrice(a) - minPrice(b));
    case "premium":
      return list
        .filter((s) => s.priceLevel === 3)
        .sort((a, b) => b.rating - a.rating);
    case "best-services":
      return list.sort((a, b) => serviceScore(b) - serviceScore(a));
    default:
      return list;
  }
}
