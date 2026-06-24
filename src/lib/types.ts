// ─── Salon & Booking Types ────────────────────────────────────────────────────

export type Service = {
  id: string;
  name: string;
  durationMin: number;
  price: number;
  category: "hair" | "skin" | "nails" | "bridal" | "grooming" | "spa" | "makeup";
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
  gallery?: string[];
  beforeAfter?: { before: string; after: string; caption: string }[];
  tags: string[];
  openHours: string;
  services: Service[];
  homeService: boolean;
  amenities?: string[];
  description?: string;
  established?: number;
  specialization?: string;
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

// ─── AI Beauty Analysis Types ─────────────────────────────────────────────────

export type FaceShape = "oval" | "round" | "square" | "heart" | "oblong" | "diamond" | "pear" | "rectangle";

export type SkinTone = "fair" | "light" | "medium" | "olive" | "tan" | "deep" | "dark";

export type SkinType = "dry" | "oily" | "combination" | "sensitive" | "normal" | "acne-prone";

export type HairType = "straight" | "wavy" | "curly" | "coily" | "mixed";

export type HairTexture = "fine" | "medium" | "thick";

export type HairCondition = "healthy" | "damaged" | "color-treated" | "greasy" | "dry" | "frizzy";

export type AIBeautyAnalysis = {
  faceShape: FaceShape;
  faceShapeConfidence: number;
  skinTone: SkinTone;
  skinToneHex: string;
  skinType: SkinType;
  undertone: "warm" | "cool" | "neutral";
  hairType: HairType;
  hairTexture: HairTexture;
  hairCondition: HairCondition;
  keyFeatures: string[];
  faceShapeReasoning: string;
};

export type AILookRecommendation = {
  id: string;
  category: "hairstyle" | "makeup" | "hair-color" | "grooming";
  title: string;
  description: string;
  difficulty: "easy" | "moderate" | "expert";
  occasion: string[];
  icon: string;
  salonServices: string[];
  estimatedPrice: string;
  confidence: number;
};

export type AIAnalysisResult = {
  analysis: AIBeautyAnalysis;
  lookRecommendations: AILookRecommendation[];
  generatedAt: string;
  sessionId: string;
};

// ─── AI Budget Optimizer Types ────────────────────────────────────────────────

export type Occasion =
  | "wedding"
  | "engagement"
  | "party"
  | "interview"
  | "festival"
  | "casual"
  | "date-night"
  | "photoshoot"
  | "graduation"
  | "office";

export type BudgetPackage = {
  id: string;
  name: string;
  description: string;
  services: {
    name: string;
    duration: string;
    price: number;
    category: string;
  }[];
  totalOriginalPrice: number;
  discountedPrice: number;
  savings: number;
  occasion: Occasion;
  salonName: string;
  salonId: string;
  location: string;
  rating: number;
  tags: string[];
  bestFor: string;
};

// ─── AI Occasion Planner Types ────────────────────────────────────────────────

export type TimelineStep = {
  daysBefore: number;
  title: string;
  description: string;
  services: string[];
  tip: string;
  icon: string;
};

export type OccasionPlan = {
  occasion: string;
  subOccasion?: string;
  timeline: TimelineStep[];
  estimatedTotalBudget: string;
  difficulty: "simple" | "moderate" | "elaborate";
  preparationDays: number;
  keyServices: { name: string; category: string; priceRange: string }[];
  salonRecommendations: { name: string; area: string; rating: number; specialty: string }[];
  dos: string[];
  donts: string[];
};

// ─── Salon Owner Dashboard Types ──────────────────────────────────────────────

export type RevenueDataPoint = {
  label: string;
  value: number;
};

export type ServiceAnalytics = {
  serviceName: string;
  bookings: number;
  revenue: number;
  avgRating: number;
  trend: "up" | "down" | "stable";
};

export type CustomerTrend = {
  month: string;
  newCustomers: number;
  returningCustomers: number;
  totalRevenue: number;
};

export type SalonDashboard = {
  salonId: string;
  salonName: string;
  totalRevenue: number;
  revenueChange: number;
  totalBookings: number;
  bookingsChange: number;
  avgRating: number;
  totalReviews: number;
  popularServices: ServiceAnalytics[];
  customerTrends: CustomerTrend[];
  demandForecast: { day: string; predictedBookings: number }[];
  recentReviews: {
    customerName: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  insights: string[];
  occupancyRate: number;
};