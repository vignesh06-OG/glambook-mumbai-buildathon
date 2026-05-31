import type { AIConsultantResponse } from "./ai-consultant-types";
import type { Salon } from "./types";

const KEYWORDS: Record<string, string[]> = {
  bridal: ["bridal", "wedding", "engagement", "makeup", "mehendi", "dulhan"],
  grooming: ["men", "beard", "haircut", "groom", "shave", "barber"],
  budget: ["cheap", "affordable", "budget", "low"],
  home: ["home", "at home", "doorstep", "ghar"],
  luxury: ["luxury", "premium", "best", "top"],
};

export function recommendSalons(query: string, salons: Salon[]): Salon[] {
  const q = query.toLowerCase().trim();
  if (!q) return salons.slice(0, 3);

  const scored = salons.map((salon) => {
    let score = 0;
    const haystack = [
      salon.name,
      salon.area,
      ...salon.tags,
      ...salon.services.map((s) => s.name),
      ...salon.services.map((s) => s.category),
    ]
      .join(" ")
      .toLowerCase();

    if (haystack.includes(q)) score += 10;

    for (const [intent, words] of Object.entries(KEYWORDS)) {
      if (words.some((w) => q.includes(w))) {
        if (intent === "bridal" && salon.tags.some((t) => /bridal|makeup|mehendi/i.test(t)))
          score += 8;
        if (intent === "grooming" && salon.tags.some((t) => /men|groom|beard/i.test(t)))
          score += 8;
        if (intent === "budget" && salon.priceLevel === 1) score += 6;
        if (intent === "home" && salon.homeService) score += 8;
        if (intent === "luxury" && salon.priceLevel === 3) score += 6;
      }
    }

    score += salon.rating * 0.5;
    return { salon, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .filter((x) => x.score > 0)
    .map((x) => x.salon)
    .slice(0, 4);
}

export function buildConsultantFallback(
  userQuery: string,
  salons: Salon[]
): AIConsultantResponse {
  const matches = recommendSalons(userQuery, salons).slice(0, 2);
  const recommendations = matches.map((s) => {
    const svc = s.services[0];
    return {
      salonId: s.id,
      salonName: s.name,
      serviceId: svc.id,
      serviceName: svc.name,
      reason: `Strong match for your request in ${s.area} (★${s.rating}).`,
    };
  });
  return {
    reply:
      recommendations.length > 0
        ? `Based on your needs, I've picked the best matches from our Mumbai catalog — book in one tap below.`
        : "Tell me more about your hair, event, area in Mumbai, or budget — I'll find the perfect salon.",
    recommendations,
    provider: "fallback",
  };
}
