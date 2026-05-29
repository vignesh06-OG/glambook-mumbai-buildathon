import type { Salon } from "./types";

export type RideProvider = "uber" | "ola" | "rapido";

export type RideLink = {
  id: RideProvider;
  name: string;
  color: string;
  description: string;
  appUrl: string;
  webFallback: string;
};

/** Deep links with drop-off pre-filled (Mumbai salons) */
export function getRideLinks(salon: Salon): RideLink[] {
  const { lat, lng, name, address } = salon;
  const dropName = encodeURIComponent(name);
  const dropAddr = encodeURIComponent(address);

  return [
    {
      id: "uber",
      name: "Uber",
      color: "#000000",
      description: "Auto / Moto / Cab",
      appUrl: `uber://?action=setPickup&dropoff[latitude]=${lat}&dropoff[longitude]=${lng}&dropoff[nickname]=${dropName}`,
      webFallback: `https://m.uber.com/ul/?action=setPickup&dropoff[latitude]=${lat}&dropoff[longitude]=${lng}&dropoff[nickname]=${dropName}`,
    },
    {
      id: "ola",
      name: "Ola",
      color: "#1a9e2d",
      description: "Mini / Prime / Bike",
      appUrl: `olacabs://app/launch?landing_page=book&drop_lat=${lat}&drop_lng=${lng}&drop_name=${dropName}`,
      webFallback: `https://book.olacabs.com/?drop_lat=${lat}&drop_lng=${lng}&drop_name=${dropName}`,
    },
    {
      id: "rapido",
      name: "Rapido",
      color: "#ffca28",
      description: "Bike / Auto",
      appUrl: `rapido://book?dropLat=${lat}&dropLng=${lng}&dropAddress=${dropAddr}`,
      webFallback: `https://play.google.com/store/apps/details?id=com.rapido.passenger`,
    },
  ];
}

/** Try app deep link; fallback to web after short delay on mobile */
export function openRideApp(link: RideLink): void {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isMobile) {
    const start = Date.now();
    window.location.href = link.appUrl;
    setTimeout(() => {
      if (Date.now() - start < 2500) {
        window.open(link.webFallback, "_blank", "noopener,noreferrer");
      }
    }, 1500);
  } else {
    window.open(link.webFallback, "_blank", "noopener,noreferrer");
  }
}
