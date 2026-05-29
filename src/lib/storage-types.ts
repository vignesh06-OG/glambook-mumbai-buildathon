export type StoredBooking = {
  id: string;
  deviceId: string;
  salonId: string;
  salonName: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  customerName: string;
  phone: string;
  price: number;
  createdAt: string;
  reviewed: boolean;
};

export type StoredReview = {
  id: string;
  bookingId: string;
  salonId: string;
  salonName: string;
  customerName: string;
  rating: number;
  /** 1–3 stars: improvement feedback */
  improveFeedback?: string;
  /** 4–5 stars: what they appreciated */
  appreciateFeedback?: string;
  /** Optional quick tags */
  tags?: string[];
  createdAt: string;
};

export type SalonInsights = {
  salonId: string;
  totalReviews: number;
  averageRating: number;
  needsImprovement: { text: string; count: number }[];
  appreciated: { text: string; count: number }[];
  suggestions: string[];
};
