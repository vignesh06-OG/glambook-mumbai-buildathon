import type { BudgetPackage, Occasion } from "./types";
import { SALONS } from "./salons";

const OCCASION_SERVICE_MAP: Record<Occasion, { categories: string[]; keywords: string[]; budgetMultiplier: number }> = {
  wedding: { categories: ["bridal", "makeup", "hair"], keywords: ["bridal", "wedding", "makeup", "mehendi"], budgetMultiplier: 2.5 },
  engagement: { categories: ["bridal", "makeup", "hair"], keywords: ["engagement", "bridal", "makeup"], budgetMultiplier: 1.8 },
  party: { categories: ["makeup", "nails", "hair"], keywords: ["party", "makeup", "nail", "festival"], budgetMultiplier: 1.0 },
  interview: { categories: ["grooming", "hair", "skin"], keywords: ["interview", "grooming", "clean-up", "styling"], budgetMultiplier: 0.6 },
  festival: { categories: ["makeup", "skin", "hair", "nails"], keywords: ["festival", "holi", "diwali", "makeup", "glow"], budgetMultiplier: 1.2 },
  casual: { categories: ["hair", "skin", "nails"], keywords: ["facial", "haircut", "manicure", "spa"], budgetMultiplier: 0.5 },
  "date-night": { categories: ["makeup", "hair", "nails"], keywords: ["party", "makeup", "styling", "date"], budgetMultiplier: 0.9 },
  photoshoot: { categories: ["makeup", "hair", "bridal"], keywords: ["makeup", "bridal", "styling", "HD"], budgetMultiplier: 1.5 },
  graduation: { categories: ["makeup", "hair", "nails"], keywords: ["party", "makeup", "hair", "styling"], budgetMultiplier: 0.8 },
  office: { categories: ["grooming", "hair", "skin"], keywords: ["grooming", "haircut", "facial", "clean"], budgetMultiplier: 0.5 },
};

const OCCASION_LABELS: Record<Occasion, string> = {
  wedding: "💒 Wedding",
  engagement: "💍 Engagement",
  party: "🎉 Party / Night Out",
  interview: "💼 Interview / Professional",
  festival: "🪔 Festival / Celebration",
  casual: "☀️ Casual / Everyday",
  "date-night": "🌙 Date Night",
  photoshoot: "📸 Photoshoot",
  graduation: "🎓 Graduation",
  office: "🏢 Office / Corporate",
};

export function getOccasionLabel(occasion: string): string {
  return OCCASION_LABELS[occasion as Occasion] ?? occasion;
}

export async function generateBudgetPackages(
  budget: number,
  occasion: Occasion,
  location?: string
): Promise<BudgetPackage[]> {
  // Simulate AI processing
  await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));

  const config = OCCASION_SERVICE_MAP[occasion];
  const maxPerService = budget * 0.6;
  const minPerService = budget * 0.15;

  // Filter salons by location if provided
  const candidates = location
    ? SALONS.filter((s) => s.area.toLowerCase().includes(location.toLowerCase()))
    : SALONS;

  // Find matching services
  const matchedServices: {
    salon: typeof SALONS[0];
    service: typeof SALONS[0]["services"][0];
  }[] = [];

  for (const salon of candidates) {
    for (const service of salon.services) {
      const matchesCategory = config.categories.includes(service.category);
      const matchesKeyword = config.keywords.some((kw) =>
        service.name.toLowerCase().includes(kw) ||
        service.category.toLowerCase().includes(kw)
      );
      if (matchesCategory || matchesKeyword) {
        matchedServices.push({ salon, service });
      }
    }
  }

  // Sort by price ascending
  matchedServices.sort((a, b) => a.service.price - b.service.price);

  // Generate 3 packages
  const packages: BudgetPackage[] = [];

  // Package 1: Budget Essential
  const essentialServices = matchedServices.filter((s) => s.service.price <= maxPerService * 0.5).slice(0, 2);
  if (essentialServices.length >= 1) {
    const totalOriginal = essentialServices.reduce((sum, s) => sum + s.service.price, 0);
    const discounted = Math.round(totalOriginal * 0.85);
    const primary = essentialServices[0];
    packages.push({
      id: "budget-essential",
      name: "Essential Glow",
      description: `The must-have beauty prep for your ${occasion.replace("-", " ")}. Covers the key services to look and feel your best.`,
      services: essentialServices.map((s) => ({
        name: s.service.name,
        duration: `${s.service.durationMin} min`,
        price: s.service.price,
        category: s.service.category,
      })),
      totalOriginalPrice: totalOriginal,
      discountedPrice: discounted,
      savings: totalOriginal - discounted,
      occasion,
      salonName: primary.salon.name,
      salonId: primary.salon.id,
      location: primary.salon.area,
      rating: primary.salon.rating,
      tags: primary.salon.tags.slice(0, 3),
      bestFor: `${occasion.replace("-", " ")} must-haves`,
    });
  }

  // Package 2: Complete Look
  const completeServices = matchedServices
    .filter((s) => s.service.price >= minPerService * 0.3 && s.service.price <= maxPerService * 0.7)
    .slice(0, 3);
  if (completeServices.length >= 2) {
    const totalOriginal = completeServices.reduce((sum, s) => sum + s.service.price, 0);
    const discounted = Math.round(totalOriginal * 0.80);
    const primary = completeServices[0];
    packages.push({
      id: "complete-look",
      name: "Complete Look Package",
      description: `Everything you need for a stunning ${occasion.replace("-", " ")} appearance. Professional combo that covers hair, skin, and makeup.`,
      services: completeServices.map((s) => ({
        name: s.service.name,
        duration: `${s.service.durationMin} min`,
        price: s.service.price,
        category: s.service.category,
      })),
      totalOriginalPrice: totalOriginal,
      discountedPrice: discounted,
      savings: totalOriginal - discounted,
      occasion,
      salonName: primary.salon.name,
      salonId: primary.salon.id,
      location: primary.salon.area,
      rating: primary.salon.rating,
      tags: primary.salon.tags.slice(0, 3),
      bestFor: `Full ${occasion.replace("-", " ")} transformation`,
    });
  }

  // Package 3: Premium Experience
  const premiumServices = matchedServices
    .filter((s) => s.service.price >= maxPerService * 0.4)
    .slice(0, 2);
  if (premiumServices.length >= 1) {
    const totalOriginal = premiumServices.reduce((sum, s) => sum + s.service.price, 0);
    const discounted = Math.round(totalOriginal * 0.75);
    const primary = premiumServices[0];
    packages.push({
      id: "premium-experience",
      name: "Premium Experience",
      description: `Indulge in luxury beauty treatments for your special ${occasion.replace("-", " ")}. Top-tier services that deliver head-turning results.`,
      services: premiumServices.map((s) => ({
        name: s.service.name,
        duration: `${s.service.durationMin} min`,
        price: s.service.price,
        category: s.service.category,
      })),
      totalOriginalPrice: totalOriginal,
      discountedPrice: discounted,
      savings: totalOriginal - discounted,
      occasion,
      salonName: primary.salon.name,
      salonId: primary.salon.id,
      location: primary.salon.area,
      rating: primary.salon.rating,
      tags: primary.salon.tags.slice(0, 3),
      bestFor: `Luxury ${occasion.replace("-", " ")} experience`,
    });
  }

  // Ensure packages are within or close to budget
  return packages.filter((p) => p.discountedPrice <= budget * config.budgetMultiplier).slice(0, 3);
}

export function formatBudget(budget: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(budget);
}