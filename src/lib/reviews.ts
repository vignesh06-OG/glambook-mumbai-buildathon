import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { getDb, isFirebaseConfigured } from "./firebase";
import { readLocalJson, writeLocalJson } from "./local-persistence";
import type { SalonInsights, StoredReview } from "./storage-types";

const COLLECTION = "reviews";
const LOCAL_KEY = "msm_reviews";
const LEGACY_KEY = "msm_reviews";
const MIGRATED_KEY = "msm_reviews_firestore_migrated";

function docToReview(id: string, data: Record<string, unknown>): StoredReview {
  return {
    id,
    bookingId: String(data.bookingId),
    salonId: String(data.salonId),
    salonName: String(data.salonName),
    customerName: String(data.customerName),
    rating: Number(data.rating),
    improveFeedback: data.improveFeedback ? String(data.improveFeedback) : undefined,
    appreciateFeedback: data.appreciateFeedback
      ? String(data.appreciateFeedback)
      : undefined,
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : undefined,
    createdAt: String(data.createdAt),
  };
}

function readLocalReviews(): StoredReview[] {
  const fromKey = readLocalJson<StoredReview[]>(LOCAL_KEY, []);
  if (fromKey.length > 0) return fromKey;
  return readLocalJson<StoredReview[]>(LEGACY_KEY, []);
}

function writeLocalReviews(list: StoredReview[]): void {
  writeLocalJson(LOCAL_KEY, list);
}

async function migrateLegacyReviews(): Promise<void> {
  if (typeof window === "undefined" || !isFirebaseConfigured()) return;
  if (localStorage.getItem(MIGRATED_KEY)) return;

  try {
    const raw = localStorage.getItem(LEGACY_KEY) ?? localStorage.getItem(LOCAL_KEY);
    if (!raw) {
      localStorage.setItem(MIGRATED_KEY, "1");
      return;
    }
    const legacy = JSON.parse(raw) as StoredReview[];
    const db = getDb();

    for (const r of legacy) {
      const ref = doc(db, COLLECTION, r.id);
      await setDoc(ref, { ...r }, { merge: true });
    }
    localStorage.removeItem(LEGACY_KEY);
    localStorage.setItem(MIGRATED_KEY, "1");
  } catch (e) {
    console.warn("[reviews] legacy migration skipped:", e);
  }
}

export async function saveReview(
  data: Omit<StoredReview, "id" | "createdAt">
): Promise<StoredReview> {
  const id = crypto.randomUUID();
  const review: StoredReview = {
    ...data,
    id,
    createdAt: new Date().toISOString(),
  };

  if (isFirebaseConfigured()) {
    try {
      await setDoc(doc(getDb(), COLLECTION, id), { ...review });
      return review;
    } catch (e) {
      console.warn("[reviews] Firestore save failed, using local storage:", e);
    }
  }

  const list = readLocalReviews();
  list.push(review);
  writeLocalReviews(list);
  return review;
}

export async function getReviewsBySalon(salonId: string): Promise<StoredReview[]> {
  if (isFirebaseConfigured()) {
    try {
      await migrateLegacyReviews();
      const q = query(collection(getDb(), COLLECTION), where("salonId", "==", salonId));
      const snap = await getDocs(q);
      return snap.docs
        .map((d) => docToReview(d.id, d.data() as Record<string, unknown>))
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (e) {
      console.warn("[reviews] Firestore read failed, using local:", e);
    }
  }

  return readLocalReviews()
    .filter((r) => r.salonId === salonId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getSalonRatingStatsFromReviews(reviews: StoredReview[]): {
  average: number;
  count: number;
} {
  if (reviews.length === 0) return { average: 0, count: 0 };
  const sum = reviews.reduce((a, r) => a + r.rating, 0);
  return { average: sum / reviews.length, count: reviews.length };
}

export async function getSalonRatingStats(salonId: string): Promise<{
  average: number;
  count: number;
}> {
  const reviews = await getReviewsBySalon(salonId);
  return getSalonRatingStatsFromReviews(reviews);
}

function countPhrases(items: string[]): { text: string; count: number }[] {
  const map = new Map<string, number>();
  for (const item of items) {
    const key = item.trim().slice(0, 120);
    if (!key) continue;
    map.set(key, (map.get(key) ?? 0) + 1);
  }
  return [...map.entries()]
    .map(([text, count]) => ({ text, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
}

export function computeSalonInsights(
  salonId: string,
  reviews: StoredReview[]
): SalonInsights {
  const low = reviews.filter((r) => r.rating <= 3);
  const high = reviews.filter((r) => r.rating >= 4);

  const needsImprovement = countPhrases(
    low.flatMap((r) => [
      r.improveFeedback ?? "",
      ...(r.tags?.filter((t) => t.startsWith("issue:")) ?? []).map((t) =>
        t.replace("issue:", "")
      ),
    ])
  );

  const appreciated = countPhrases(
    high.flatMap((r) => [
      r.appreciateFeedback ?? "",
      ...(r.tags?.filter((t) => t.startsWith("love:")) ?? []).map((t) =>
        t.replace("love:", "")
      ),
    ])
  );

  const suggestions: string[] = [];
  if (low.length >= 2) {
    suggestions.push(
      `${low.length} guests rated 3★ or below — prioritise staff training & wait-time management.`
    );
  }
  if (needsImprovement.some((n) => /wait|time|delay/i.test(n.text))) {
    suggestions.push("Reduce wait times: add buffer slots or SMS arrival alerts.");
  }
  if (needsImprovement.some((n) => /clean|hygiene/i.test(n.text))) {
    suggestions.push("Refresh cleanliness checklist before peak hours.");
  }
  if (needsImprovement.some((n) => /price|expensive|cost/i.test(n.text))) {
    suggestions.push("Consider value bundles or transparent pricing on popular services.");
  }
  if (high.length >= 3 && appreciated.length > 0) {
    suggestions.push(
      `Keep doing more of: "${appreciated[0].text.slice(0, 60)}…" — guests love this.`
    );
  }
  if (suggestions.length === 0 && reviews.length > 0) {
    suggestions.push("Great momentum — keep collecting feedback after every booking.");
  }
  if (reviews.length === 0) {
    suggestions.push("No app reviews yet — encourage guests to rate after their visit.");
  }

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length
      : 0;

  return {
    salonId,
    totalReviews: reviews.length,
    averageRating,
    needsImprovement,
    appreciated,
    suggestions,
  };
}

export async function getSalonInsights(salonId: string): Promise<SalonInsights> {
  const reviews = await getReviewsBySalon(salonId);
  return computeSalonInsights(salonId, reviews);
}
