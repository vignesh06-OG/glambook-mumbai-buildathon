"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getAllBookings } from "@/lib/bookings";
import { getReviewsBySalon } from "@/lib/reviews";
import type { StoredBooking } from "@/lib/storage-types";
import { formatPrice } from "@/lib/salons";

const SAVED_LOOKS = [
  { id: "1", title: "Soft Glam Wedding Look", category: "makeup", saved: "2 days ago" },
  { id: "2", title: "Long Layers with Balayage", category: "hair", saved: "1 week ago" },
  { id: "3", title: "Golden Hour Festival Glow", category: "skin", saved: "2 weeks ago" },
];

const SAVED_SALONS = [
  { id: "bridal-bliss-juhu", name: "Bridal Bliss Juhu", area: "Juhu", rating: 4.9, tags: ["Bridal", "Makeup"] },
  { id: "color-lab-andheri", name: "The Color Lab", area: "Andheri West", rating: 4.8, tags: ["Color Experts", "Balayage"] },
  { id: "serene-spa-juhu", name: "Serene Spa & Wellness", area: "Juhu", rating: 4.7, tags: ["Spa", "Relaxation"] },
];

const PROFILE_STATS = [
  { label: "Total Bookings", value: "12", icon: "📅" },
  { label: "Reviews Written", value: "8", icon: "⭐" },
  { label: "Saved Salons", value: "5", icon: "❤️" },
  { label: "Saved Looks", value: "3", icon: "✨" },
];

export default function ProfilePage() {
  const [bookings, setBookings] = useState<StoredBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"bookings" | "saved" | "looks">("bookings");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await getAllBookings();
        if (!cancelled) setBookings(list);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="min-h-screen py-14 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        {/* Profile header */}
        <div className="glass-card rounded-3xl p-10 mb-10">
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blush to-rose-gold flex items-center justify-center text-3xl font-bold text-white shadow-lg shrink-0">
              P
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="font-display text-2xl font-bold text-foreground">Priya Sharma</h1>
                <span className="rounded-full bg-emerald/20 px-2.5 py-0.5 text-[10px] font-semibold text-emerald">
                  ✓ Verified
                </span>
              </div>
              <p className="text-sm text-muted">priya.sharma@gmail.com · Mumbai, India</p>
              <p className="text-xs text-muted mt-1">
                Member since {new Date().getFullYear() - 1} · 4 AI analyses completed
              </p>
            </div>
            <Link
              href="/beauty-analysis"
              className="shrink-0 rounded-xl border border-blush-soft bg-blush-soft px-4 py-2 text-xs font-semibold text-blush transition hover:bg-blush hover:text-white"
            >
              🔬 New Analysis
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-4 gap-4">
            {PROFILE_STATS.map((stat) => (
              <div key={stat.label} className="glass-light rounded-2xl p-4 text-center">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {([
            { key: "bookings", label: "📅 My Bookings", count: bookings.length },
            { key: "saved", label: "❤️ Saved Salons", count: SAVED_SALONS.length },
            { key: "looks", label: "✨ Saved Looks", count: SAVED_LOOKS.length },
          ] as const).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                activeTab === tab.key
                  ? "bg-gradient-to-r from-blush to-rose-gold text-white shadow-lg"
                  : "border border-border text-muted hover:border-blush hover:text-foreground"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Bookings tab */}
        {activeTab === "bookings" && (
          <div className="anim-fade-up">
            {loading ? (
              <div className="glass-card rounded-3xl p-12 text-center text-muted">
                Loading your bookings...
              </div>
            ) : bookings.length === 0 ? (
              <div className="glass-card rounded-3xl p-12 text-center">
                <div className="text-5xl mb-4">📅</div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">No bookings yet</h3>
                <p className="text-muted mb-6">Book a salon and your appointments will appear here</p>
                <Link href="/#salons" className="rounded-2xl bg-gradient-to-r from-blush to-rose-gold px-6 py-3 text-sm font-semibold text-white shadow-lg">
                  💅 Browse Mumbai Salons
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="glass-light rounded-2xl p-5 border border-border flex items-center justify-between gap-4">
                    <div>
                      <p className="font-display text-base font-semibold text-foreground">{booking.salonName}</p>
                      <p className="text-sm text-muted mt-1">{booking.serviceName}</p>
                      <p className="text-xs text-muted mt-1">
                        {booking.date} · {booking.time} · {formatPrice(booking.price)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {booking.reviewed ? (
                        <span className="rounded-full bg-emerald/20 px-3 py-1 text-xs font-semibold text-emerald">
                          ✓ Reviewed
                        </span>
                      ) : (
                        <Link
                          href={`/review/${booking.id}`}
                          className="rounded-full bg-gradient-to-r from-blush to-rose-gold px-4 py-2 text-xs font-semibold text-white"
                        >
                          ★ Rate
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
                <Link href="/my-bookings" className="block text-center text-sm text-blush font-semibold mt-4 hover:underline">
                  View all bookings →
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Saved salons tab */}
        {activeTab === "saved" && (
          <div className="anim-fade-up grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SAVED_SALONS.map((salon) => (
              <Link
                key={salon.id}
                href={`/salon/${salon.id}`}
                className="glass-light rounded-2xl p-5 border border-border group transition-all hover:border-blush/30"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-display text-sm font-semibold text-foreground group-hover:text-blush transition-colors">
                      {salon.name}
                    </h4>
                    <p className="text-xs text-muted mt-1">{salon.area}</p>
                  </div>
                  <span className="rounded-full bg-gold-soft px-2 py-0.5 text-xs font-semibold text-gold">
                    ★ {salon.rating}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {salon.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-blush-soft px-2.5 py-0.5 text-[10px] text-blush">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-3 text-xs text-blush font-semibold group-hover:underline">
                  View salon →
                </div>
              </Link>
            ))}
            <div className="glass-light rounded-2xl p-5 border border-dashed border-border flex items-center justify-center">
              <p className="text-sm text-muted">💅 Save your favorite salons here</p>
            </div>
          </div>
        )}

        {/* Saved looks tab */}
        {activeTab === "looks" && (
          <div className="anim-fade-up grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SAVED_LOOKS.map((look) => {
              const catIcons: Record<string, string> = {
                makeup: "💄",
                hair: "💇",
                skin: "✨",
              };
              return (
                <div key={look.id} className="glass-light rounded-2xl p-5 border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-xl bg-blush-soft flex items-center justify-center text-2xl">
                      {catIcons[look.category] ?? "✨"}
                    </div>
                    <div>
                      <p className="font-display text-sm font-semibold text-foreground">{look.title}</p>
                      <p className="text-xs text-muted capitalize">{look.category}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted mb-4">Saved {look.saved}</p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="rounded-lg border border-blush/30 bg-blush-soft px-3 py-1.5 text-xs font-semibold text-blush"
                    >
                      Find Salons
                    </button>
                    <button
                      type="button"
                      className="rounded-lg border border-border px-3 py-1.5 text-xs text-muted"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
            <Link
              href="/beauty-analysis"
              className="glass-light rounded-2xl p-5 border border-dashed border-border flex items-center justify-center text-center hover:border-blush/30 transition"
            >
              <div>
                <div className="text-3xl mb-2">🔬</div>
                <p className="text-sm text-muted">Get AI-powered look recommendations</p>
              </div>
            </Link>
          </div>
        )}

        {/* AI features reminder */}
        <div className="mt-10 glass-card rounded-3xl p-8 text-center">
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="font-display text-xl font-bold text-foreground mb-2">
            Discover More with GlamBook AI
          </h3>
          <p className="text-muted mb-6 max-w-sm mx-auto">
            Explore all our AI features and get personalized beauty recommendations.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/beauty-analysis" className="rounded-xl bg-gradient-to-r from-blush to-rose-gold px-5 py-2.5 text-sm font-semibold text-white shadow-lg">
              🔬 AI Beauty Analysis
            </Link>
            <Link href="/budget-optimizer" className="rounded-xl border border-gold-soft bg-gold-soft px-5 py-2.5 text-sm font-semibold text-gold">
              💰 Budget Optimizer
            </Link>
            <Link href="/occasion-planner" className="rounded-xl border border-violet/20 bg-violet/10 px-5 py-2.5 text-sm font-semibold text-violet">
              🗓️ Occasion Planner
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}