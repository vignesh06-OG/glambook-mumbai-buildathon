import type { Salon } from "./types";

export const SALONS: Salon[] = [
  {
    id: "glam-studio-bandra",
    name: "Glam Studio Bandra",
    area: "Bandra West",
    rating: 4.8,
    reviewCount: 312,
    priceLevel: 3,
    image:
      "https://images.unsplash.com/photo-1560066984-138d9834a973?w=800&q=80",
    tags: ["Luxury", "Hair", "Bridal"],
    openHours: "10:00 AM – 9:00 PM",
    homeService: false,
    services: [
      { id: "s1", name: "Haircut & Styling", durationMin: 60, price: 1200, category: "hair" },
      { id: "s2", name: "Keratin Treatment", durationMin: 120, price: 4500, category: "hair" },
      { id: "s3", name: "Bridal Makeup Trial", durationMin: 90, price: 3500, category: "bridal" },
    ],
  },
  {
    id: "lotus-spa-andheri",
    name: "Lotus Spa & Salon",
    area: "Andheri East",
    rating: 4.6,
    reviewCount: 189,
    priceLevel: 2,
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    tags: ["Spa", "Skin", "Relaxation"],
    openHours: "9:00 AM – 8:30 PM",
    homeService: true,
    services: [
      { id: "s1", name: "Facial Glow", durationMin: 45, price: 899, category: "skin" },
      { id: "s2", name: "Manicure & Pedicure", durationMin: 75, price: 1299, category: "nails" },
      { id: "s3", name: "Full Body Massage", durationMin: 60, price: 1999, category: "skin" },
    ],
  },
  {
    id: "urban-groom-colaba",
    name: "Urban Groom Colaba",
    area: "Colaba",
    rating: 4.7,
    reviewCount: 156,
    priceLevel: 2,
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80",
    tags: ["Men", "Grooming", "Beard"],
    openHours: "11:00 AM – 10:00 PM",
    homeService: false,
    services: [
      { id: "s1", name: "Premium Haircut", durationMin: 45, price: 699, category: "grooming" },
      { id: "s2", name: "Beard Sculpt & Trim", durationMin: 30, price: 499, category: "grooming" },
      { id: "s3", name: "Head Massage + Shave", durationMin: 40, price: 599, category: "grooming" },
    ],
  },
  {
    id: "bridal-bliss-juhu",
    name: "Bridal Bliss Juhu",
    area: "Juhu",
    rating: 4.9,
    reviewCount: 428,
    priceLevel: 3,
    image:
      "https://images.unsplash.com/photo-1487412948497-a4ef3d4ae13f?w=800&q=80",
    tags: ["Bridal", "Makeup", "Mehendi"],
    openHours: "9:00 AM – 7:00 PM",
    homeService: true,
    services: [
      { id: "s1", name: "Bridal Makeup Package", durationMin: 180, price: 15000, category: "bridal" },
      { id: "s2", name: "Engagement Look", durationMin: 90, price: 6000, category: "bridal" },
      { id: "s3", name: "Mehendi (Hands)", durationMin: 120, price: 2500, category: "bridal" },
    ],
  },
  {
    id: "nail-bar-powai",
    name: "Nail Bar Powai",
    area: "Powai",
    rating: 4.5,
    reviewCount: 98,
    priceLevel: 1,
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80",
    tags: ["Nails", "Affordable", "Quick"],
    openHours: "10:00 AM – 8:00 PM",
    homeService: false,
    services: [
      { id: "s1", name: "Gel Manicure", durationMin: 40, price: 599, category: "nails" },
      { id: "s2", name: "Acrylic Extensions", durationMin: 90, price: 1499, category: "nails" },
      { id: "s3", name: "Nail Art Add-on", durationMin: 20, price: 299, category: "nails" },
    ],
  },
  {
    id: "home-glam-thane",
    name: "Home Glam Thane",
    area: "Thane West",
    rating: 4.4,
    reviewCount: 76,
    priceLevel: 2,
    image:
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80",
    tags: ["Home Service", "Hair", "Skin"],
    openHours: "8:00 AM – 8:00 PM",
    homeService: true,
    services: [
      { id: "s1", name: "At-Home Haircut", durationMin: 50, price: 799, category: "hair" },
      { id: "s2", name: "At-Home Facial", durationMin: 60, price: 999, category: "skin" },
      { id: "s3", name: "Party Makeup", durationMin: 75, price: 2500, category: "bridal" },
    ],
  },
];

export function getSalonById(id: string): Salon | undefined {
  return SALONS.find((s) => s.id === id);
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function priceLevelLabel(level: 1 | 2 | 3): string {
  return "₹".repeat(level) + "·".repeat(3 - level);
}
