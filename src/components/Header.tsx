"use client";

import Link from "next/link";
import { useState } from "react";
import { SITE_CONFIG } from "@/lib/config";

const NAV_LINKS = [
  { href: "/beauty-analysis", label: "AI Beauty", emoji: "🔬" },
  { href: "/budget-optimizer", label: "Budget Planner", emoji: "💰" },
  { href: "/occasion-planner", label: "Occasion AI", emoji: "🗓️" },
  { href: "/#salons", label: "Salons", emoji: "💅" },
  { href: "/dashboard", label: "Salon Dashboard", emoji: "📊" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="glass sticky top-0 z-50 border-b border-blush-soft">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blush via-blush to-rose-gold text-lg shadow-lg transition-transform group-hover:scale-105">
            ✨
          </div>
          <div className="leading-tight">
            <p className="font-display text-sm font-semibold tracking-tight text-foreground">
              {SITE_CONFIG.brand}
            </p>
            <p className="text-[11px] text-muted">India&apos;s Beauty AI</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-medium text-muted transition-all hover:bg-blush-soft hover:text-blush"
            >
              <span>{link.emoji}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/beauty-analysis"
            className="hidden sm:flex items-center gap-2 rounded-full bg-gradient-to-r from-blush to-rose-gold px-4 py-2 text-xs font-semibold text-white shadow-lg transition-all hover:opacity-90 hover:scale-105 active:scale-95"
          >
            <span>🔬</span>
            <span>Try AI Analysis</span>
          </Link>
          <Link
            href="/#salons"
            className="rounded-full border border-blush-soft bg-blush-soft px-4 py-2 text-xs font-semibold text-blush backdrop-blur-sm transition-all hover:bg-blush hover:text-white"
          >
            Book Now
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted transition-colors hover:border-blush hover:text-blush"
            aria-label="Toggle menu"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border glass-light">
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-muted transition-all hover:bg-blush-soft hover:text-blush"
              >
                <span>{link.emoji}</span>
                <span>{link.label}</span>
              </Link>
            ))}
            <div className="pt-3 border-t border-border">
              <Link
                href="/beauty-analysis"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blush to-rose-gold py-3 text-sm font-semibold text-white"
              >
                🔬 Try AI Beauty Analysis — Free
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}