"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Salon } from "@/lib/types";
import { saveBooking } from "@/lib/bookings";
import { isFirebaseConfigured } from "@/lib/firebase";
import { formatPrice } from "@/lib/salons";

const TIME_SLOTS = [
  "10:00 AM",
  "11:30 AM",
  "1:00 PM",
  "3:00 PM",
  "5:00 PM",
  "7:00 PM",
];

type Props = { salon: Salon; preselectedServiceId?: string };

export function BookingForm({ salon, preselectedServiceId }: Props) {
  const router = useRouter();
  const [serviceId, setServiceId] = useState(
    preselectedServiceId ?? salon.services[0]?.id ?? ""
  );
  const [date, setDate] = useState("");
  const [time, setTime] = useState(TIME_SLOTS[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const service = salon.services.find((s) => s.id === serviceId);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || phone.length < 10) {
      setError("Please enter your name and a valid 10-digit phone number.");
      return;
    }
    if (!date) {
      setError("Please select a date.");
      return;
    }
    setSubmitting(true);
    setError("");

    try {
      const booking = await saveBooking({
        salonId: salon.id,
        salonName: salon.name,
        serviceId: service?.id ?? serviceId,
        serviceName: service?.name ?? "",
        date,
        time,
        customerName: name.trim(),
        phone,
        price: service?.price ?? 0,
      });

      const params = new URLSearchParams({
        id: booking.id,
        salon: salon.name,
        salonId: salon.id,
        service: service?.name ?? "",
        date,
        time,
        name: name.trim(),
        phone,
        price: String(service?.price ?? 0),
      });
      router.push(`/booking/confirmed?${params.toString()}`);
    } catch {
      setError("Could not save booking. Check your connection and try again.");
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-border bg-surface-1/80 p-6 shadow-lg shadow-blush/10 backdrop-blur-xl"
    >
      <h3 className="font-display text-lg font-semibold text-foreground">
        Book your appointment
      </h3>
      <p className="mt-1 text-xs text-muted">
        {isFirebaseConfigured()
          ? "Saved securely to cloud · Rate after your visit ✨"
          : "Saved on this device · Rate after your visit ✨"}
      </p>

      <label className="mt-4 block">
        <span className="text-xs font-medium text-muted">Service</span>
        <select
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
          className="mt-1 w-full rounded-xl border border-border bg-surface-2 px-3 py-2.5 text-sm text-foreground focus:border-blush focus:outline-none focus:ring-2 focus:ring-blush/20 transition-colors"
        >
          {salon.services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} — {formatPrice(s.price)} ({s.durationMin} min)
            </option>
          ))}
        </select>
      </label>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-medium text-muted">Date</span>
          <input
            type="date"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full rounded-xl border border-border bg-surface-2 px-3 py-2.5 text-sm text-foreground focus:border-blush focus:outline-none transition-colors [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-70"
            required
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-muted">Time</span>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-1 w-full rounded-xl border border-border bg-surface-2 px-3 py-2.5 text-sm text-foreground focus:border-blush focus:outline-none transition-colors"
          >
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-medium text-muted">Your name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Priya Sharma"
            className="mt-1 w-full rounded-xl border border-border bg-surface-2 px-3 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:border-blush focus:outline-none transition-colors"
            required
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-muted">Phone</span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
            placeholder="9876543210"
            className="mt-1 w-full rounded-xl border border-border bg-surface-2 px-3 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:border-blush focus:outline-none transition-colors"
            required
          />
        </label>
      </div>

      {error && (
        <p className="mt-3 text-sm text-rose-400 bg-rose-400/10 border border-rose-400/20 rounded-xl px-3 py-2.5">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full rounded-full bg-gradient-to-r from-blush to-rose-gold py-3.5 text-sm font-semibold text-white shadow-lg shadow-blush/20 transition-all hover:opacity-90 active:scale-95 disabled:opacity-60 disabled:active:scale-100"
      >
        {submitting ? "Saving…" : "Confirm booking"}
        {!submitting && service && ` · ${formatPrice(service.price)}`}
      </button>
    </form>
  );
}
