import Link from "next/link";
import { MyBookingsList } from "@/components/MyBookingsList";

export default function MyBookingsPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-blush hover:underline mb-8 inline-block">
          ← Back to Home
        </Link>

        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blush-soft border border-blush-soft px-4 py-1.5 text-xs font-semibold text-blush mb-3">
            📅 Your Booking History
          </span>
          <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            My Bookings
          </h1>
          <p className="mt-3 text-muted max-w-lg">
            Rate your visits and help salons — and other women — choose with confidence.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-8">
          <MyBookingsList />
        </div>

        {/* Quick actions */}
        <div className="mt-8 glass-light rounded-2xl p-6 text-center">
          <p className="text-sm text-muted mb-4">
            Want to discover new beauty services or get personalized recommendations?
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/beauty-analysis" className="rounded-xl bg-gradient-to-r from-blush to-rose-gold px-5 py-2.5 text-sm font-semibold text-white shadow-lg">
              🔬 AI Beauty Analysis
            </Link>
            <Link href="/#salons" className="rounded-xl border border-border bg-surface-2 px-5 py-2.5 text-sm font-semibold text-foreground hover:border-blush hover:text-blush transition">
              💅 Browse Salons
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}