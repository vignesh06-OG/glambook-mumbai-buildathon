"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { generateMockDashboard, formatRevenue } from "@/lib/dashboard-data";
import { SALONS } from "@/lib/salons";
import { useCountUp } from "@/hooks/useCountUp";
import type { SalonDashboard } from "@/lib/types";

// ─── CSS Bar Chart Component ──────────────────────────────────────────────────
function BarChart({
  data,
  maxValue,
  height = 160,
  color = "from-blush to-rose-gold",
}: {
  data: { label: string; value: number }[];
  maxValue: number;
  height?: number;
  color?: string;
}) {
  return (
    <div className="flex items-end gap-3 h-full min-h-[160px]">
      {data.map((item, i) => {
        const pct = (item.value / maxValue) * 100;
        return (
          <div key={i} className="flex flex-col items-center gap-2 flex-1">
            <div className="w-full relative" style={{ height: `${height}px` }}>
              <div
                className="absolute bottom-0 left-0 right-0 rounded-t-xl bg-gradient-to-t from-blush/60 to-blush/20 transition-all duration-700"
                style={{
                  height: `${pct}%`,
                  animationDelay: `${i * 100}ms`,
                }}
              />
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-muted whitespace-nowrap">
                {formatRevenue(item.value)}
              </span>
            </div>
            <span className="text-[10px] text-muted">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Trend Badge ──────────────────────────────────────────────────────────────
function TrendBadge({ trend }: { trend: "up" | "down" | "stable" }) {
  if (trend === "up") return <span className="text-emerald text-xs font-semibold">↑ Up</span>;
  if (trend === "down") return <span className="text-rose-400 text-xs font-semibold">↓ Down</span>;
  return <span className="text-muted text-xs font-semibold">→ Stable</span>;
}

// ─── Metric Card with Count-up ───────────────────────────────────────────────
function MetricCard({
  label,
  value,
  rawValue,
  change,
  icon,
  prefix = "",
  suffix = "",
  duration = 1200,
}: {
  label: string;
  value: string;
  rawValue?: number;
  change: number;
  icon: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const positive = change >= 0;
  const counted = useCountUp(rawValue ?? 0, duration);
  const displayValue = rawValue !== undefined
    ? `${prefix}${counted}${suffix}`
    : value;

  return (
    <div className="glass-light rounded-2xl border border-border/50 p-5 hover:border-blush/20 transition-all">
      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${positive ? "bg-emerald/20 text-emerald" : "bg-rose-400/20 text-rose-400"}`}>
          {positive ? "+" : ""}{change}%
        </span>
      </div>
      <p className="font-display text-2xl font-bold text-foreground">{displayValue}</p>
      <p className="text-xs text-muted mt-1">{label}</p>
    </div>
  );
}

// ─── Star Rating Display ──────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className="text-sm">
          {star <= Math.round(rating) ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

// ─── Main Dashboard Page ──────────────────────────────────────────────────────
export default function DashboardPage() {
  const [selectedSalonId, setSelectedSalonId] = useState<string>("glam-studio-bandra");
  const [activeTab, setActiveTab] = useState<"overview" | "services" | "customers" | "reviews">("overview");

  const dashboard = useMemo(
    () => generateMockDashboard(selectedSalonId, SALONS.find((s) => s.id === selectedSalonId)?.name ?? "Salon"),
    [selectedSalonId]
  );

  const maxRevenue = Math.max(...dashboard.popularServices.map((s) => s.revenue));
  const maxBookings = Math.max(...dashboard.popularServices.map((s) => s.bookings));

  return (
    <div className="min-h-screen py-14 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between mb-12">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-blush-soft border border-blush/20 px-5 py-2 text-sm font-semibold text-blush mb-5">
              📊 Salon Owner Dashboard · AI-Powered Analytics
            </span>
            <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl tracking-tight">
              Salon{" "}
              <span className="gradient-text-bright">Dashboard</span>
            </h1>
            <p className="mt-4 text-lg text-muted">
              Real-time insights, revenue analytics, and AI-powered recommendations
            </p>
          </div>

          {/* Salon selector */}
          <div className="glass-light rounded-xl border border-border p-3 flex items-center gap-3">
            <span className="text-sm text-muted">Viewing:</span>
            <select
              value={selectedSalonId}
              onChange={(e) => setSelectedSalonId(e.target.value)}
              className="bg-transparent text-sm font-semibold text-foreground outline-none cursor-pointer"
            >
              {SALONS.slice(0, 15).map((salon) => (
                <option key={salon.id} value={salon.id} className="bg-surface-2 text-foreground">
                  {salon.name} — {salon.area}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-8">
          <MetricCard
            icon="💰"
            label="Weekly Revenue"
            value={formatRevenue(dashboard.totalRevenue)}
            rawValue={Math.round(dashboard.totalRevenue / 1000)}
            prefix="₹"
            suffix="K"
            change={dashboard.revenueChange}
            duration={1400}
          />
          <MetricCard
            icon="📅"
            label="Total Bookings"
            value={dashboard.totalBookings.toString()}
            rawValue={dashboard.totalBookings}
            change={dashboard.bookingsChange}
            duration={1000}
          />
          <MetricCard
            icon="⭐"
            label="Average Rating"
            value={`${dashboard.avgRating}★`}
            rawValue={Math.round(dashboard.avgRating * 10)}
            prefix=""
            suffix="/5"
            change={2.3}
            duration={800}
          />
          <MetricCard
            icon="📝"
            label="Total Reviews"
            value={dashboard.totalReviews.toString()}
            rawValue={dashboard.totalReviews}
            change={5.1}
            duration={1200}
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 overflow-x-auto scrollbar-hide">
          {(["overview", "services", "customers", "reviews"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                activeTab === tab
                  ? "bg-gradient-to-r from-blush to-rose-gold text-white shadow-lg"
                  : "border border-border text-muted hover:border-blush hover:text-foreground"
              }`}
            >
              {tab === "overview" && "📊 "}
              {tab === "services" && "💅 "}
              {tab === "customers" && "👥 "}
              {tab === "reviews" && "⭐ "}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* ── Overview Tab ─────────────────────────────────────────────────── */}
        {activeTab === "overview" && (
          <div className="space-y-8 anim-fade-up">
            {/* Revenue chart */}
            <div className="glass-card rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    📈 Revenue Analytics — Last 7 Days
                  </h3>
                  <p className="text-xs text-muted mt-1">Real-time data · Updated hourly</p>
                </div>
                <span className="rounded-full bg-emerald/20 px-3 py-1 text-xs font-semibold text-emerald">
                  +{dashboard.revenueChange}% vs last week
                </span>
              </div>
              <div className="glass-light rounded-2xl p-6 h-56">
                <BarChart
                  data={dashboard.popularServices.slice(0, 6).map((s) => ({
                    label: s.serviceName.split(" ").slice(0, 2).join(" "),
                    value: s.revenue,
                  }))}
                  maxValue={maxRevenue}
                  height={160}
                />
              </div>
            </div>

            {/* AI Insights */}
            <div className="glass-card rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet to-blush text-lg">
                  🤖
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    AI Business Insights
                  </h3>
                  <p className="text-xs text-muted">Generated daily based on your salon data</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {dashboard.insights.map((insight, i) => (
                  <div key={i} className="glass-light rounded-xl p-4 border border-border/50">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 text-blush text-sm">💡</span>
                      <p className="text-sm text-muted leading-relaxed">{insight}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Demand forecast */}
            <div className="glass-card rounded-3xl p-8">
              <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                📅 Demand Forecast — Next 5 Days
              </h3>
              <p className="text-xs text-muted mb-6">AI-predicted bookings based on historical trends</p>
              <div className="flex items-end gap-3 h-40">
                {dashboard.demandForecast.map((d, i) => {
                  const maxPred = Math.max(...dashboard.demandForecast.map((x) => x.predictedBookings));
                  const pct = (d.predictedBookings / maxPred) * 100;
                  return (
                    <div key={i} className="flex flex-col items-center gap-2 flex-1">
                      <div className="w-full flex flex-col items-center h-full justify-end">
                        <span className="text-xs font-semibold text-foreground mb-1">{d.predictedBookings}</span>
                        <div
                          className="w-full rounded-t-xl bg-gradient-to-t from-gold/50 to-gold/20 transition-all"
                          style={{ height: `${pct}%`, animationDelay: `${i * 150}ms` }}
                        />
                      </div>
                      <span className="text-[10px] text-muted">{d.day}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── Services Tab ─────────────────────────────────────────────────── */}
        {activeTab === "services" && (
          <div className="anim-fade-up space-y-8">
            <div className="glass-card rounded-3xl p-8">
              <h3 className="font-display text-lg font-semibold text-foreground mb-6">
                💅 Service Performance Analytics
              </h3>
              <div className="space-y-4">
                {dashboard.popularServices.map((svc, i) => {
                  const bookingsPct = (svc.bookings / maxBookings) * 100;
                  const revenuePct = (svc.revenue / maxRevenue) * 100;
                  return (
                    <div key={i} className="glass-light rounded-2xl p-5 border border-border/50">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-display text-base font-semibold text-foreground">{svc.serviceName}</h4>
                          <p className="text-xs text-muted mt-1">{svc.bookings} bookings · {formatRevenue(svc.revenue)} revenue</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <StarRating rating={svc.avgRating} />
                          <TrendBadge trend={svc.trend} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-3">
                        <div>
                          <div className="flex justify-between text-xs text-muted mb-1">
                            <span>Bookings</span>
                            <span>{Math.round(bookingsPct)}%</span>
                          </div>
                          <div className="h-2 rounded-full bg-surface-3 overflow-hidden">
                            <div className="h-full rounded-full bg-gradient-to-r from-blush to-rose-gold" style={{ width: `${bookingsPct}%` }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs text-muted mb-1">
                            <span>Revenue</span>
                            <span>{Math.round(revenuePct)}%</span>
                          </div>
                          <div className="h-2 rounded-full bg-surface-3 overflow-hidden">
                            <div className="h-full rounded-full bg-gradient-to-r from-gold to-rose-gold" style={{ width: `${revenuePct}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Occupancy rate */}
            <div className="glass-card rounded-3xl p-8">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                🏃 Salon Occupancy Rate
              </h3>
              <div className="flex items-center gap-6">
                <div className="relative h-28 w-28">
                  <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                    <circle
                      cx="18" cy="18" r="14" fill="none"
                      stroke="url(#grad)"
                      strokeWidth="4"
                      strokeDasharray={`${dashboard.occupancyRate} 100`}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#e879f9" />
                        <stop offset="100%" stopColor="#ff6b4f" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-xl font-bold text-foreground">{dashboard.occupancyRate}%</span>
                  </div>
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-foreground">
                    {dashboard.occupancyRate > 70 ? "High demand day" : dashboard.occupancyRate > 40 ? "Moderate occupancy" : "Light day — promote!"}
                  </p>
                  <p className="text-sm text-muted mt-1">
                    Based on current bookings vs available slots
                  </p>
                  <div className="mt-3 rounded-xl bg-gold-soft px-3 py-1.5 text-xs text-gold inline-block">
                    💡 AI Suggestion: Offer a flash discount to boost off-peak bookings
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Customers Tab ────────────────────────────────────────────────── */}
        {activeTab === "customers" && (
          <div className="anim-fade-up space-y-8">
            <div className="glass-card rounded-3xl p-8">
              <h3 className="font-display text-lg font-semibold text-foreground mb-6">
                👥 Customer Trends — Last 6 Months
              </h3>
              <div className="space-y-4">
                {dashboard.customerTrends.map((trend, i) => (
                  <div key={i} className="glass-light rounded-xl p-4 border border-border/50">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-display text-base font-semibold text-foreground">{trend.month}</span>
                      <span className="text-sm text-muted font-semibold">{formatRevenue(trend.totalRevenue)}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between text-xs text-muted mb-1">
                          <span>New Customers</span>
                          <span className="font-semibold text-foreground">{trend.newCustomers}</span>
                        </div>
                        <div className="h-2 rounded-full bg-surface-3 overflow-hidden">
                          <div className="h-full rounded-full bg-blush/60" style={{ width: `${(trend.newCustomers / 60) * 100}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-muted mb-1">
                          <span>Returning</span>
                          <span className="font-semibold text-foreground">{trend.returningCustomers}</span>
                        </div>
                        <div className="h-2 rounded-full bg-surface-3 overflow-hidden">
                          <div className="h-full rounded-full bg-emerald/60" style={{ width: `${(trend.returningCustomers / 80) * 100}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Reviews Tab ──────────────────────────────────────────────────── */}
        {activeTab === "reviews" && (
          <div className="anim-fade-up space-y-6">
            <div className="glass-card rounded-3xl p-8">
              <h3 className="font-display text-lg font-semibold text-foreground mb-6">
                ⭐ Recent Client Reviews
              </h3>
              <div className="space-y-4">
                {dashboard.recentReviews.map((review, i) => (
                  <div key={i} className="glass-light rounded-2xl p-5 border border-border/50">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blush to-violet flex items-center justify-center text-sm font-bold text-white">
                          {review.customerName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-sm">{review.customerName}</p>
                          <p className="text-xs text-muted">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <span key={s} className={`text-sm ${s <= review.rating ? "text-gold" : "text-border"}`}>★</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Rating summary */}
            <div className="glass-card rounded-3xl p-8">
              <h3 className="font-display text-lg font-semibold text-foreground mb-6">
                📊 Rating Distribution
              </h3>
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <p className="font-display text-5xl font-bold gradient-text">{dashboard.avgRating}</p>
                  <StarRating rating={dashboard.avgRating} />
                  <p className="text-xs text-muted mt-1">{dashboard.totalReviews} reviews</p>
                </div>
                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = Math.round(dashboard.totalReviews * (star === 5 ? 0.45 : star === 4 ? 0.30 : star === 3 ? 0.15 : star === 2 ? 0.07 : 0.03));
                    const pct = (count / dashboard.totalReviews) * 100;
                    return (
                      <div key={star} className="flex items-center gap-3">
                        <span className="text-sm text-muted w-4">{star}</span>
                        <div className="h-2 flex-1 rounded-full bg-surface-3 overflow-hidden">
                          <div className="h-full rounded-full bg-gold" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs text-muted w-8">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="mt-10 glass-light rounded-2xl p-6 text-center">
          <p className="text-sm text-muted mb-4">
            This is a hackathon demo dashboard. In production, this would connect to real booking & review data.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/#salons" className="rounded-xl bg-gradient-to-r from-blush to-rose-gold px-5 py-2.5 text-sm font-semibold text-white shadow-lg">
              💅 View This Salon
            </Link>
            <Link href="/beauty-analysis" className="rounded-xl border border-blush-soft bg-blush-soft px-5 py-2.5 text-sm font-semibold text-blush">
              🔬 Try AI Beauty Analysis
            </Link>
            <Link href="/budget-optimizer" className="rounded-xl border border-gold-soft bg-gold-soft px-5 py-2.5 text-sm font-semibold text-gold">
              💰 AI Budget Optimizer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}