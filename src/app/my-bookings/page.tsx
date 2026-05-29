import Link from "next/link";
import { MyBookingsList } from "@/components/MyBookingsList";

export default function MyBookingsPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-100/60 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <Link href="/" className="text-sm text-rose-600 hover:underline">
          ← Home
        </Link>
        <h1 className="font-display mt-4 text-3xl font-semibold text-stone-900">
          My bookings
        </h1>
        <p className="mt-2 text-stone-600">
          Rate your visits and help salons — and other women — choose with confidence.
        </p>
        <div className="mt-8">
          <MyBookingsList />
        </div>
      </div>
    </div>
  );
}
