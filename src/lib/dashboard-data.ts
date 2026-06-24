import type { SalonDashboard, RevenueDataPoint, ServiceAnalytics, CustomerTrend } from "./types";

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

export function generateMockDashboard(salonId: string, salonName: string): SalonDashboard {
  const seed = salonId.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const r = (offset: number) => seededRandom(seed + offset);

  // Revenue last 7 days
  const revenueData: RevenueDataPoint[] = [
    { label: "Mon", value: Math.round(8000 + r(1) * 7000) },
    { label: "Tue", value: Math.round(5000 + r(2) * 4000) },
    { label: "Wed", value: Math.round(9000 + r(3) * 6000) },
    { label: "Thu", value: Math.round(12000 + r(4) * 8000) },
    { label: "Fri", value: Math.round(15000 + r(5) * 10000) },
    { label: "Sat", value: Math.round(20000 + r(6) * 12000) },
    { label: "Sun", value: Math.round(14000 + r(7) * 9000) },
  ];

  const totalRevenue = revenueData.reduce((sum, d) => sum + d.value, 0);
  const totalBookings = Math.round(totalRevenue / 1200);

  // Service analytics
  const serviceNames = ["Haircut & Styling", "Facial", "Bridal Makeup", "Hair Coloring", "Manicure", "Massage"];
  const popularServices: ServiceAnalytics[] = serviceNames.map((name, i) => ({
    serviceName: name,
    bookings: Math.round(10 + r(i + 10) * 30),
    revenue: Math.round(5000 + r(i + 20) * 15000),
    avgRating: parseFloat((4.0 + r(i + 30) * 1.0).toFixed(1)),
    trend: (r(i + 40) > 0.5 ? "up" : r(i + 40) > 0.3 ? "stable" : "down") as "up" | "down" | "stable",
  })).sort((a, b) => b.bookings - a.bookings);

  // Customer trends - 6 months
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const customerTrends: CustomerTrend[] = months.map((month, i) => ({
    month,
    newCustomers: Math.round(20 + r(i + 50) * 40),
    returningCustomers: Math.round(30 + r(i + 60) * 50),
    totalRevenue: Math.round(150000 + r(i + 70) * 100000),
  }));

  // Demand forecast - next 5 days
  const days = ["Today", "Tomorrow", "Day 3", "Day 4", "Day 5"];
  const demandForecast = days.map((day, i) => ({
    day,
    predictedBookings: Math.round(15 + r(i + 80) * 20),
  }));

  // Recent reviews
  const reviewNames = ["Priya S.", "Ananya K.", "Riya M.", "Sneha P.", "Meera D.", "Kavya T.", "Aisha B."];
  const reviewComments = [
    "Absolutely loved my bridal look! The team was professional and the makeup lasted all day. Highly recommend!",
    "Best spa experience in Mumbai. The massage was heavenly and the ambiance was perfect.",
    "Great haircut and styling. Exactly what I wanted. Will definitely come back.",
    "Amazing nail art! The designs were intricate and the polish lasted 3 weeks. Very impressed.",
    "The keratin treatment transformed my hair. So smooth and manageable now! Worth every rupee.",
    "Beautiful facial — my skin was glowing for days after. The products they use are premium.",
    "Perfect for a quick touch-up before my date. Fast service and lovely result!",
  ];
  const recentReviews = reviewNames.slice(0, 5).map((name, i) => ({
    customerName: name,
    rating: Math.round(4 + r(i + 90) * 1),
    comment: reviewComments[i],
    date: `${Math.round(1 + r(i + 100) * 29)} days ago`,
  }));

  // AI-generated insights
  const insights = [
    `Friday & Saturday generate 45% of weekly revenue. Consider peak-hour promotions.`,
    `Bridal Makeup is your highest-margin service — upsell hair styling with every bridal booking.`,
    `3 customers mentioned long wait times in recent reviews. Consider buffer slots.`,
    `Hair Coloring revenue has increased 23% over last month — keep the momentum with seasonal promotions.`,
    `Your returning customer rate is 62%. A loyalty program could boost this to 75%+.`,
    `Most bookings happen 2-3 days in advance. SMS reminders 7 days before could increase advance bookings.`,
  ].slice(0, 4 + Math.floor(r(110) * 3));

  return {
    salonId,
    salonName,
    totalRevenue,
    revenueChange: parseFloat(((r(120) * 30) - 10).toFixed(1)),
    totalBookings,
    bookingsChange: parseFloat(((r(121) * 20) - 5).toFixed(1)),
    avgRating: parseFloat((4.2 + r(122) * 0.8).toFixed(1)),
    totalReviews: Math.round(50 + r(123) * 200),
    popularServices,
    customerTrends,
    demandForecast,
    recentReviews,
    insights,
    occupancyRate: parseFloat((55 + r(124) * 30).toFixed(1)),
  };
}

export function formatRevenue(amount: number): string {
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
  return `₹${amount}`;
}