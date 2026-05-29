"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/salons";

type Props = {
  bookingId: string;
  salon: string;
  salonId: string;
  service: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  price: number;
};

export function BookingConfirmedClient({
  bookingId,
  salon,
  salonId,
  service,
  date,
  time,
  name,
  phone,
  price,
}: Props) {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-rose-100 to-fuchsia-100 text-4xl shadow-inner">
        ✨
      </div>
      <h1 className="font-display mt-6 text-2xl font-semibold text-stone-900">
        You&apos;re all set, {name.split(" ")[0]}!
      </h1>
      <p className="mt-2 text-stone-600">
        Your glow-up at <strong>{salon}</strong> is booked.
      </p>

      <dl className="mt-8 rounded-3xl border border-rose-100 bg-white p-6 text-left text-sm shadow-sm">
        <div className="flex justify-between border-b border-rose-50 py-3">
          <dt className="text-stone-500">Service</dt>
          <dd className="font-medium text-stone-900">{service}</dd>
        </div>
        <div className="flex justify-between border-b border-rose-50 py-3">
          <dt className="text-stone-500">Date & time</dt>
          <dd className="font-medium">
            {date} at {time}
          </dd>
        </div>
        <div className="flex justify-between border-b border-rose-50 py-3">
          <dt className="text-stone-500">Phone</dt>
          <dd className="font-medium">{phone}</dd>
        </div>
        <div className="flex justify-between py-3">
          <dt className="text-stone-500">Amount</dt>
          <dd className="font-semibold text-rose-600">
            {price > 0 ? formatPrice(price) : "—"}
          </dd>
        </div>
      </dl>

      <div className="mt-8 rounded-2xl border border-fuchsia-100 bg-fuchsia-50/50 p-5 text-left">
        <p className="text-sm font-semibold text-fuchsia-900">After your visit</p>
        <p className="mt-1 text-xs text-stone-600 leading-relaxed">
          Once you&apos;re done at the salon, come back and rate your experience.
          ≤3★ — we&apos;ll ask what to improve. 4–5★ — tell us what you loved!
        </p>
        <Link
          href={`/review/${bookingId}`}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500 py-3 text-sm font-semibold text-white shadow-md"
        >
          Rate after visit ★
        </Link>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <Link
          href="/my-bookings"
          className="text-sm text-rose-600 hover:underline"
        >
          View my bookings
        </Link>
        <Link href={`/salon/${salonId}`} className="text-sm text-stone-500 hover:text-rose-600">
          Back to salon
        </Link>
        <Link href="/" className="text-sm text-stone-500 hover:text-rose-600">
          Home
        </Link>
      </div>
    </div>
  );
}
