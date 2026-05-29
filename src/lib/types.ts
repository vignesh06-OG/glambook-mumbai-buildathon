export type Service = {
  id: string;
  name: string;
  durationMin: number;
  price: number;
  category: "hair" | "skin" | "nails" | "bridal" | "grooming";
};

export type Salon = {
  id: string;
  name: string;
  area: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  whatsapp?: string;
  email?: string;
  website?: string;
  rating: number;
  reviewCount: number;
  priceLevel: 1 | 2 | 3;
  image: string;
  tags: string[];
  openHours: string;
  services: Service[];
  homeService: boolean;
  amenities?: string[];
};

export type SortMode =
  | "default"
  | "nearby"
  | "best-rated"
  | "highly-rated"
  | "low-budget"
  | "premium"
  | "best-services";

export type Booking = {
  salonId: string;
  salonName: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  customerName: string;
  phone: string;
};
