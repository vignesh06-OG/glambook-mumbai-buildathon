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
  rating: number;
  reviewCount: number;
  priceLevel: 1 | 2 | 3;
  image: string;
  tags: string[];
  openHours: string;
  services: Service[];
  homeService: boolean;
};

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
