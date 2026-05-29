"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Salon } from "@/lib/types";
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

  const service = salon.services.find((s) => s.id === serviceId);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || phone.length < 10) {
      setError("Please enter your name and a valid 10-digit phone number.");
      return;
    }
    if (!date) {
      setError("Please select a date.");
      return;
    }

    const params = new URLSearchParams({
      salon: salon.name,
      service: service?.name ?? "",
      date,
      time,
      name: name.trim(),
      phone,
      price: String(service?.price ?? 0),
    });
    router.push(`/booking/confirmed?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm"
    >
      <h3 className="text-lg font-semibold text-stone-900">Book appointment</h3>

      <label className="mt-4 block">
        <span className="text-xs font-medium text-stone-500">Service</span>
        <select
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
          className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm"
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
          <span className="text-xs font-medium text-stone-500">Date</span>
          <input
            type="date"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm"
            required
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-stone-500">Time</span>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm"
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
          <span className="text-xs font-medium text-stone-500">Your name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Priya Sharma"
            className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm"
            required
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-stone-500">Phone</span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
            placeholder="9876543210"
            className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm"
            required
          />
        </label>
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        className="mt-6 w-full rounded-xl bg-rose-600 py-3 text-sm font-semibold text-white hover:bg-rose-700 transition-colors"
      >
        Confirm booking
        {service && ` · ${formatPrice(service.price)}`}
      </button>
    </form>
  );
}
