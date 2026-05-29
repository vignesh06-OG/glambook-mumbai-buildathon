import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDb, isFirebaseConfigured } from "./firebase";
import { getDeviceId } from "./device-id";
import type { StoredBooking } from "./storage-types";

const COLLECTION = "bookings";
const LEGACY_KEY = "msm_bookings";
const MIGRATED_KEY = "msm_firestore_migrated";

function docToBooking(id: string, data: Record<string, unknown>): StoredBooking {
  return {
    id,
    deviceId: String(data.deviceId ?? ""),
    salonId: String(data.salonId),
    salonName: String(data.salonName),
    serviceId: String(data.serviceId),
    serviceName: String(data.serviceName),
    date: String(data.date),
    time: String(data.time),
    customerName: String(data.customerName),
    phone: String(data.phone),
    price: Number(data.price),
    createdAt: String(data.createdAt),
    reviewed: Boolean(data.reviewed),
  };
}

/** One-time migration from localStorage → Firestore */
async function migrateLegacyBookings(): Promise<void> {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(MIGRATED_KEY)) return;

  try {
    const raw = localStorage.getItem(LEGACY_KEY);
    if (!raw) {
      localStorage.setItem(MIGRATED_KEY, "1");
      return;
    }
    const legacy = JSON.parse(raw) as StoredBooking[];
    const db = getDb();
    const deviceId = getDeviceId();

    for (const b of legacy) {
      const ref = doc(db, COLLECTION, b.id);
      const existing = await getDoc(ref);
      if (!existing.exists()) {
        await setDoc(ref, {
          ...b,
          deviceId: b.deviceId ?? deviceId,
        });
      }
    }
    localStorage.removeItem(LEGACY_KEY);
    localStorage.setItem(MIGRATED_KEY, "1");
  } catch (e) {
    console.warn("[bookings] legacy migration skipped:", e);
  }
}

export async function saveBooking(
  data: Omit<StoredBooking, "id" | "createdAt" | "reviewed" | "deviceId">
): Promise<StoredBooking> {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase not configured");
  }

  const db = getDb();
  const deviceId = getDeviceId();
  const id = crypto.randomUUID();
  const booking: StoredBooking = {
    ...data,
    id,
    deviceId,
    createdAt: new Date().toISOString(),
    reviewed: false,
  };

  await setDoc(doc(db, COLLECTION, id), { ...booking });
  return booking;
}

export async function getBooking(id: string): Promise<StoredBooking | null> {
  if (!isFirebaseConfigured()) return null;

  await migrateLegacyBookings();
  const snap = await getDoc(doc(getDb(), COLLECTION, id));
  if (!snap.exists()) return null;
  return docToBooking(snap.id, snap.data() as Record<string, unknown>);
}

export async function getAllBookings(): Promise<StoredBooking[]> {
  if (!isFirebaseConfigured()) return [];

  await migrateLegacyBookings();
  const deviceId = getDeviceId();
  const q = query(collection(getDb(), COLLECTION), where("deviceId", "==", deviceId));
  const snap = await getDocs(q);

  return snap.docs
    .map((d) => docToBooking(d.id, d.data() as Record<string, unknown>))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getPendingReviewBookings(): Promise<StoredBooking[]> {
  const all = await getAllBookings();
  return all.filter((b) => !b.reviewed);
}

export async function markBookingReviewed(bookingId: string): Promise<void> {
  if (!isFirebaseConfigured()) return;

  await updateDoc(doc(getDb(), COLLECTION, bookingId), { reviewed: true });
}
