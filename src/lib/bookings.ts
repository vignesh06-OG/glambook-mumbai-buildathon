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
import { readLocalJson, writeLocalJson } from "./local-persistence";
import type { StoredBooking } from "./storage-types";

const COLLECTION = "bookings";
const LOCAL_KEY = "msm_bookings";
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

function sortBookings(list: StoredBooking[]): StoredBooking[] {
  return [...list].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

function readLocalBookings(): StoredBooking[] {
  const fromKey = readLocalJson<StoredBooking[]>(LOCAL_KEY, []);
  if (fromKey.length > 0) return fromKey;
  return readLocalJson<StoredBooking[]>(LEGACY_KEY, []);
}

function writeLocalBookings(list: StoredBooking[]): void {
  writeLocalJson(LOCAL_KEY, list);
}

function getLocalBooking(id: string): StoredBooking | null {
  return readLocalBookings().find((b) => b.id === id) ?? null;
}

function saveLocalBooking(booking: StoredBooking): StoredBooking {
  const list = readLocalBookings().filter((b) => b.id !== booking.id);
  list.push(booking);
  writeLocalBookings(list);
  return booking;
}

function updateLocalBooking(
  id: string,
  patch: Partial<Pick<StoredBooking, "reviewed">>
): void {
  const list = readLocalBookings();
  const idx = list.findIndex((b) => b.id === id);
  if (idx === -1) return;
  list[idx] = { ...list[idx], ...patch };
  writeLocalBookings(list);
}

/** One-time migration from localStorage → Firestore */
async function migrateLegacyBookings(): Promise<void> {
  if (typeof window === "undefined" || !isFirebaseConfigured()) return;
  if (localStorage.getItem(MIGRATED_KEY)) return;

  try {
    const raw = localStorage.getItem(LEGACY_KEY) ?? localStorage.getItem(LOCAL_KEY);
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
  const deviceId = getDeviceId();
  const booking: StoredBooking = {
    ...data,
    id: crypto.randomUUID(),
    deviceId,
    createdAt: new Date().toISOString(),
    reviewed: false,
  };

  if (isFirebaseConfigured()) {
    try {
      await setDoc(doc(getDb(), COLLECTION, booking.id), { ...booking });
      return booking;
    } catch (e) {
      console.warn("[bookings] Firestore save failed, using local storage:", e);
    }
  }

  return saveLocalBooking(booking);
}

export async function getBooking(id: string): Promise<StoredBooking | null> {
  if (isFirebaseConfigured()) {
    try {
      await migrateLegacyBookings();
      const snap = await getDoc(doc(getDb(), COLLECTION, id));
      if (snap.exists()) {
        return docToBooking(snap.id, snap.data() as Record<string, unknown>);
      }
    } catch (e) {
      console.warn("[bookings] Firestore read failed, trying local:", e);
    }
  }

  return getLocalBooking(id);
}

export async function getAllBookings(): Promise<StoredBooking[]> {
  const deviceId = getDeviceId();

  if (isFirebaseConfigured()) {
    try {
      await migrateLegacyBookings();
      const q = query(collection(getDb(), COLLECTION), where("deviceId", "==", deviceId));
      const snap = await getDocs(q);
      return sortBookings(
        snap.docs.map((d) => docToBooking(d.id, d.data() as Record<string, unknown>))
      );
    } catch (e) {
      console.warn("[bookings] Firestore list failed, using local:", e);
    }
  }

  return sortBookings(readLocalBookings().filter((b) => b.deviceId === deviceId));
}

export async function getPendingReviewBookings(): Promise<StoredBooking[]> {
  const all = await getAllBookings();
  return all.filter((b) => !b.reviewed);
}

export async function markBookingReviewed(bookingId: string): Promise<void> {
  if (isFirebaseConfigured()) {
    try {
      await updateDoc(doc(getDb(), COLLECTION, bookingId), { reviewed: true });
      return;
    } catch (e) {
      console.warn("[bookings] Firestore update failed, using local:", e);
    }
  }

  updateLocalBooking(bookingId, { reviewed: true });
}
