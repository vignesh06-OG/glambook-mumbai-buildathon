import type { Salon } from "./types";

/** Opens Google Maps at salon (search / pin) */
export function getMapViewUrl(salon: Salon): string {
  const q = encodeURIComponent(`${salon.name}, ${salon.address}, Mumbai`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

/** Opens Google Maps directions to salon */
export function getDirectionsUrl(salon: Salon): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${salon.lat},${salon.lng}&destination_place_id=${encodeURIComponent(salon.name)}`;
}

/** Apple Maps fallback */
export function getAppleMapsUrl(salon: Salon): string {
  return `https://maps.apple.com/?daddr=${salon.lat},${salon.lng}&q=${encodeURIComponent(salon.name)}`;
}
