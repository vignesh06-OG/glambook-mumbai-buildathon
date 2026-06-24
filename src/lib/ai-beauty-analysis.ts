import type {
  AIAnalysisResult,
  AIBeautyAnalysis,
  AILookRecommendation,
  FaceShape,
  HairType,
  HairTexture,
  HairCondition,
  SkinTone,
  SkinType,
} from "./types";

// ─── Mock AI Analysis Engine ──────────────────────────────────────────────────
// Simulates realistic AI analysis output for hackathon demo.
// In production, this would call a real CV/AI service.

const FACE_SHAPES: FaceShape[] = ["oval", "round", "square", "heart", "oblong", "diamond", "pear", "rectangle"];
const SKIN_TONES: SkinTone[] = ["fair", "light", "medium", "olive", "tan", "deep", "dark"];
const HAIR_TYPES: HairType[] = ["straight", "wavy", "curly", "coily", "mixed"];
const HAIR_TEXTURES: HairTexture[] = ["fine", "medium", "thick"];
const HAIR_CONDITIONS: HairCondition[] = ["healthy", "damaged", "color-treated", "greasy", "dry", "frizzy"];
const SKIN_TYPES: SkinType[] = ["dry", "oily", "combination", "sensitive", "normal", "acne-prone"];
const UNDERTONES = ["warm", "cool", "neutral"] as const;

const SKIN_TONE_MAP: Record<SkinTone, string> = {
  fair: "#FDEBD0",
  light: "#FAD7A0",
  medium: "#D4A574",
  olive: "#B8966B",
  tan: "#8D6346",
  deep: "#6B4226",
  dark: "#4A2C17",
};

const FACE_SHAPE_REASONS: Record<FaceShape, string> = {
  oval: "Your face length is about 1.5x your width, with gently curved sides. This is the most versatile face shape — almost every hairstyle and makeup technique flatters you!",
  round: "Your face has soft angles with width and length nearly equal. The goal with styling is to create the illusion of length and define your cheekbones.",
  square: "Your forehead, cheeks, and jawline are nearly equal in width with a strong angular jaw. Soft, layered cuts and rounded makeup techniques complement your strong features.",
  heart: "Your forehead is wider than your jaw, creating a heart-like shape. Wispy bangs and side parts balance your proportions beautifully.",
  oblong: "Your face is longer than it is wide with a straight cheek line. Adding width through waves, curls, or makeup contouring creates perfect balance.",
  diamond: "Your cheekbones are the widest feature, with a narrower forehead and chin. Soft layers and side-swept styles showcase your stunning bone structure.",
  pear: "Your jawline is wider than your forehead. Volumized tops and layers above the jawline create beautiful harmony.",
  rectangle: "Similar to oblong but more angular at the jaw. Soft waves and textured layers break up the strong angles.",
};

function seededRandom(seed: string, index: number, max: number): number {
  const val = seed.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) + index;
  return ((val * 9301 + 49297) % 233280) / 233280 * max;
}

function pickFrom<T>(arr: readonly T[], seed: string, index: number): T {
  return arr[Math.floor(seededRandom(seed, index, arr.length))];
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ─── Main Analysis Function ──────────────────────────────────────────────────

export async function analyzeBeauty(imageDataUrl: string): Promise<AIAnalysisResult> {
  // Simulate AI processing delay (1.5–3 seconds)
  const delay = 1500 + Math.random() * 1500;
  await new Promise((r) => setTimeout(r, delay));

  // Derive a "seed" from the image data to make analysis deterministic per session
  const sessionId = crypto.randomUUID();
  const seed = imageDataUrl.slice(-20);

  const faceShape = pickFrom(FACE_SHAPES, seed, 1);
  const skinTone = pickFrom(SKIN_TONES, seed, 2);
  const hairType = pickFrom(HAIR_TYPES, seed, 3);
  const hairTexture = pickFrom(HAIR_TEXTURES, seed, 4);
  const hairCondition = pickFrom(HAIR_CONDITIONS, seed, 5);
  const skinType = pickFrom(SKIN_TYPES, seed, 6);
  const undertone = pickFrom(UNDERTONES, seed, 7);

  const analysis: AIBeautyAnalysis = {
    faceShape,
    faceShapeConfidence: 78 + Math.round(seededRandom(seed, 8, 18)),
    skinTone,
    skinToneHex: SKIN_TONE_MAP[skinTone],
    skinType,
    undertone,
    hairType,
    hairTexture,
    hairCondition,
    keyFeatures: generateKeyFeatures(faceShape, skinTone, hairType, skinType),
    faceShapeReasoning: FACE_SHAPE_REASONS[faceShape],
  };

  const recommendations = generateRecommendations(analysis, seed);

  return {
    analysis,
    lookRecommendations: recommendations,
    generatedAt: new Date().toISOString(),
    sessionId,
  };
}

function generateKeyFeatures(
  faceShape: FaceShape,
  skinTone: SkinTone,
  hairType: HairType,
  skinType: SkinType
): string[] {
  const features: string[] = [];
  const shapeFeatures: Record<FaceShape, string[]> = {
    oval: ["Balanced proportions", "Soft cheekbones", "Versatile bone structure"],
    round: ["Softened jawline", "Full cheeks", "Wide mid-face"],
    square: ["Strong jawline", "Angular features", "Broad forehead"],
    heart: ["Defined cheekbones", "Narrow chin", "Widest at forehead"],
    oblong: ["Elongated face", "Flat cheek placement", "High forehead"],
    diamond: ["Prominent cheekbones", "Narrow forehead & chin", "Narrow jawline"],
    pear: ["Wide jawline", "Narrow forehead", "Full lower face"],
    rectangle: ["Long face", "Angular jawline", "Strong forehead"],
  };
  features.push(...shapeFeatures[faceShape]);

  if (skinTone === "fair" || skinTone === "light") {
    features.push("Light complexion — suits cool & warm tones equally");
  } else if (skinTone === "deep" || skinTone === "dark") {
    features.push("Deep complexion — bold colors and metallics enhance naturally");
  } else {
    features.push(`${capitalize(skinTone)} complexion — versatile for most color families`);
  }

  features.push(`${capitalize(hairType)} hair texture`);
  features.push(`${capitalize(skinType)} skin — recommend targeted care`);

  return features.slice(0, 5);
}

function generateRecommendations(analysis: AIBeautyAnalysis, seed: string): AILookRecommendation[] {
  const { faceShape, hairType, undertone, skinTone } = analysis;
  const recs: AILookRecommendation[] = [];
  let idx = 0;

  // Hairstyle recommendations
  const hairstyles: Record<FaceShape, { title: string; desc: string; occ: string[]; diff: "easy" | "moderate" | "expert"; conf: number }[]> = {
    oval: [
      { title: "Long Layers with Soft Waves", desc: "Soft, cascading layers that enhance your natural proportions. Works with any texture.", occ: ["casual", "party", "wedding"], diff: "easy", conf: 96 },
      { title: "Blunt Bob with Micro Bangs", desc: "A bold, modern cut that frames your face beautifully and adds dimension.", occ: ["party", "interview", "casual"], diff: "moderate", conf: 94 },
      { title: "Sleek High Ponytail", desc: "Polished and powerful. A sleek finish that accentuates your balanced proportions.", occ: ["office", "date-night", "party"], diff: "easy", conf: 92 },
    ],
    round: [
      { title: "Long Asymmetric Layers", desc: "Diagonal lines create the illusion of length, slimming your face visually.", occ: ["casual", "party", "wedding"], diff: "moderate", conf: 94 },
      { title: "Side-Swept Bob", desc: "One-length bob swept to one side adds angle and breaks the circular shape.", occ: ["party", "interview", "casual"], diff: "easy", conf: 93 },
      { title: "Textured Pixie Cut", desc: "Volume on top with choppy layers draws the eye upward, creating length.", occ: ["party", "casual"], diff: "moderate", conf: 91 },
    ],
    square: [
      { title: "Soft Curly Lob", desc: "Curls and waves soften your strong jawline, adding feminine texture throughout.", occ: ["casual", "party", "wedding"], diff: "easy", conf: 95 },
      { title: "Side-Parted Long Layers", desc: "Diagonal side part with long layers softens angular features at the temples.", occ: ["office", "date-night", "party"], diff: "easy", conf: 93 },
      { title: "Wispy Curtain Bangs", desc: "Soft, face-framing fringe breaks up the forehead width and softens angles.", occ: ["casual", "party"], diff: "moderate", conf: 90 },
    ],
    heart: [
      { title: "Soft Shoulder-Length Waves", desc: "Medium-length waves add volume at the jaw to balance a narrower chin.", occ: ["casual", "party", "wedding"], diff: "easy", conf: 95 },
      { title: "Deep Side Part with Volume", desc: "Creates width at the lower face, perfectly balancing your forehead width.", occ: ["party", "office", "date-night"], diff: "easy", conf: 94 },
      { title: "Textured Shag Cut", desc: "A trendy, piece-y cut with layers around the cheeks — adds fullness where needed.", occ: ["casual", "party"], diff: "expert", conf: 89 },
    ],
    oblong: [
      { title: "Voluminous Curls at Mid-Lengths", desc: "Curls add width across the cheeks, reducing the appearance of length.", occ: ["casual", "party", "wedding"], diff: "easy", conf: 94 },
      { title: "Blunt Cut with Side-Swept Fringe", desc: "Horizontal fringe and blunt ends break up the vertical length of your face.", occ: ["party", "casual", "interview"], diff: "easy", conf: 93 },
      { title: "Layered Bob with Wave", desc: "A bob that hits at chin level with a slight wave creates ideal proportions.", occ: ["office", "party", "casual"], diff: "moderate", conf: 91 },
    ],
    diamond: [
      { title: "Side-Swept Bangs + Layers", desc: "Soft fringe covers the forehead while layers add fullness at chin level.", occ: ["casual", "party", "wedding"], diff: "easy", conf: 95 },
      { title: "Chin-Length Bob with Soft Curls", desc: "Adds the illusion of width at forehead and jaw, softening cheekbone prominence.", occ: ["party", "office", "casual"], diff: "easy", conf: 93 },
      { title: "Top-Knot with Wispy Face Fringes", desc: "Pulls hair up and adds softness around the face — perfect for evenings.", occ: ["party", "festival", "wedding"], diff: "easy", conf: 92 },
    ],
    pear: [
      { title: "Side-Swept Updo with Volume", desc: "Pulling volume to the temples and crown balances the wider lower face.", occ: ["wedding", "party", "festival"], diff: "expert", conf: 93 },
      { title: "Long Top Layers with Volume", desc: "Layers starting above the jaw add width to the upper half of your face.", occ: ["casual", "party", "office"], diff: "moderate", conf: 92 },
      { title: "Deep Side Part with Volume", desc: "Creates the illusion of broader forehead and temples, balancing the jaw.", occ: ["party", "casual", "date-night"], diff: "easy", conf: 90 },
    ],
    rectangle: [
      { title: "Wavy Lob (Long Bob)", desc: "Medium length with soft waves breaks up the length and softens the angular jaw.", occ: ["casual", "party", "office"], diff: "easy", conf: 94 },
      { title: "Curtain Bangs + Soft Layers", desc: "Soft fringe and low layers around the face create width and reduce length.", occ: ["party", "casual", "wedding"], diff: "moderate", conf: 93 },
      { title: "Textured Layers with Side Part", desc: "Diagonal lines from a side part soften the rectangular shape beautifully.", occ: ["office", "date-night", "casual"], diff: "easy", conf: 91 },
    ],
  };

  const hs = hairstyles[faceShape] ?? hairstyles["oval"];
  for (let i = 0; i < 2; i++) {
    const h = hs[i % hs.length];
    recs.push({
      id: `hairstyle-${idx++}`,
      category: "hairstyle",
      title: h.title,
      description: h.desc,
      difficulty: h.diff,
      occasion: h.occ,
      icon: "💇",
      salonServices: ["Haircut & Styling", "Blowdry", "Hair Treatment"],
      estimatedPrice: h.diff === "easy" ? "₹500 – ₹1,500" : "₹1,000 – ₹3,000",
      confidence: h.conf,
    });
  }

  // Makeup recommendation
  const undertoneMakeup: Record<string, { title: string; desc: string; conf: number }> = {
    warm: { title: "Warm Golden Glow Makeup", desc: "Peachy-coral blush, bronze contours, and gold-toned eye makeup enhance your warm undertone beautifully. Nude lips with rose or terracotta tones complete the look.", conf: 95 },
    cool: { title: "Cool Rose & Mauve Glam", desc: "Pink and berry tones in blush and lips create a fresh, luminous look. Cool-toned eyeshadows in grey, taupe and silver-blue make your eyes pop.", conf: 94 },
    neutral: { title: "Sun-Kissed Neutral Glam", desc: "Your versatile undertone lets you play with both warm and cool shades. A soft peach lip, rose blush, and champagne highlight create a universally flattering look.", conf: 96 },
  };

  const makeup = undertoneMakeup[undertone];
  recs.push({
    id: `makeup-${idx++}`,
    category: "makeup",
    title: makeup.title,
    description: makeup.desc,
    difficulty: "moderate",
    occasion: ["party", "date-night", "wedding", "festival"],
    icon: "💄",
    salonServices: ["Party Makeup", "HD Makeup", "Bridal Makeup"],
    estimatedPrice: "₹2,000 – ₹8,000",
    confidence: makeup.conf,
  });

  // Hair color recommendation
  const skinColorRecs: Record<SkinTone, { title: string; desc: string; conf: number }> = {
    fair: { title: "Honey Caramel Balayage", desc: "Warm honey and caramel tones painted onto a fair base create a sun-kissed, multi-dimensional look. Low maintenance and incredibly flattering.", conf: 94 },
    light: { title: "Toasted Vanilla Highlights", desc: "Soft vanilla and pale gold highlights add warmth without looking too brassy. Perfect for light complexions wanting a natural lift.", conf: 93 },
    medium: { title: "Rich Chestnut Brown", desc: "Deep chestnut with subtle auburn undertones enhances medium skin beautifully. Rich, sophisticated and low maintenance.", conf: 95 },
    olive: { title: "Golden Bronze Ombre", desc: "Warm golden-bronze tones from root to tip that harmonize with olive undertones. Creates a radiant, sunlit effect.", conf: 94 },
    tan: { title: "Dark Caramel Dimension", desc: "Dark caramel with warm highlights adds beautiful dimension to tan skin. Neither too light nor too dark — perfectly balanced.", conf: 93 },
    deep: { title: "Rich Burgundy Highlights", desc: "Deep burgundy and wine tones add incredible richness and dimension to deep complexions. Bold, beautiful and head-turning.", conf: 91 },
    dark: { title: "Jet Black with Warm Undertones", desc: "True black with subtle warm undertones enhances dark skin beautifully. Glossy, luxurious and timeless.", conf: 90 },
  };

  const hairColor = skinColorRecs[skinTone];
  recs.push({
    id: `hair-color-${idx++}`,
    category: "hair-color",
    title: hairColor.title,
    description: hairColor.desc,
    difficulty: "expert",
    occasion: ["casual", "party", "wedding", "festival"],
    icon: "🎨",
    salonServices: ["Hair Coloring", "Balayage", "Highlights"],
    estimatedPrice: "₹2,500 – ₹7,000",
    confidence: hairColor.conf,
  });

  // Grooming recommendation
  recs.push({
    id: `grooming-${idx++}`,
    category: "grooming",
    title: "Luminous Skin Care Routine",
    description: `Your ${analysis.skinType} skin needs targeted care. A consistent routine with gentle cleansing, targeted serums, and SPF protection will transform your skin over 4–6 weeks. Consider monthly facials for deep cleansing and hydration.`,
    difficulty: "easy",
    occasion: ["casual", "office", "date-night"],
    icon: "✨",
    salonServices: ["Signature Facial", "HydraFacial", "Skin Consultation"],
    estimatedPrice: "₹800 – ₹2,500",
    confidence: 92,
  });

  return recs;
}

// ─── Get Salon Recommendations based on Analysis ─────────────────────────────

export function recommendSalonsForAnalysis(
  recs: AILookRecommendation[],
  allSalons: import("./types").Salon[]
) {
  const categoryMap: Record<string, string[]> = {
    hairstyle: ["hair"],
    makeup: ["makeup", "bridal"],
    "hair-color": ["hair"],
    grooming: ["skin", "spa"],
  };

  const matchedSalons = allSalons.map((salon) => {
    let score = salon.rating * 10;
    const serviceCats = salon.services.map((s) => s.category);

    for (const rec of recs) {
      const relevantCats = categoryMap[rec.category] ?? [];
      const hasMatch = relevantCats.some((cat) => serviceCats.includes(cat as import("./types").Service["category"]));
      if (hasMatch) score += rec.confidence * 0.3;
    }

    // Boost premium salons for weddings
    if (recs.some((r) => r.occasion.includes("wedding")) && salon.tags.some((t) => /bridal/i.test(t))) {
      score += 20;
    }

    return { ...salon, score };
  });

  return matchedSalons.sort((a, b) => b.score - a.score).slice(0, 6);
}