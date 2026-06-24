"use client";

import Link from "next/link";
import { useState } from "react";
import { SITE_CONFIG } from "@/lib/config";

const NAV_LINKS = [
  { href: "/beauty-analysis", label: "AI Beauty", emoji: "🔬" },
  { href: "/budget-optimizer", label: "Budget Planner", emoji: "💰" },
  { href: "/occasion-planner", label: "Occasion AI", emoji: "🗓️" },
  { href: "/#salons", label: "Salons", emoji: "💅" },
  { href: "/dashboard", label: "Dashboard", emoji: "📊" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="glass sticky top-0 z-50 border-b border-blush-soft/50">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blush via-blush-bright to-rose-gold text-xl shadow-lg shadow-blush/25 transition-transform duration-300 group-hover:scale-110">
            ✨
          </div>
          <div className="leading-tight">
            <p className="font-display text-base font-bold tracking-tight text-foreground">
              {SITE_CONFIG.brand}
            </p>
            <p className="text-xs text-muted font-medium">India's Beauty AI</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-muted transition-all duration-200 hover:bg-blush-soft/30 hover:text-foreground"
            >
              <span>{link.emoji}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/beauty-analysis"
            className="hidden sm:flex items-center gap-2.5 rounded-full bg-gradient-to-r from-blush to-rose-gold px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blush/25 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-glow-primary"
          >
            <span>🔬</span>
            <span>Try AI</span>
          </Link>
          <Link
            href="/#salons"
            className="rounded-full border border-blush/30 bg-blush-soft/30 px-4 py-2.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-all duration-200 hover:bg-blush hover:text-white hover:border-blush"
          >
            Book Now
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex h-11 w-11 items-center justify-center rounded-xl border border-border/50 text-muted transition-all duration-200 hover:border-blush hover:text-blush"
            aria-label="Toggle menu"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border/50 glass-light">
          <div className="px-5 py-5 space-y-1.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-semibold text-muted transition-all duration-200 hover:bg-blush-soft/30 hover:text-foreground"
              >
                <span>{link.emoji}</span>
                <span>{link.label}</span>
              </Link>
            ))}
            <div className="pt-4 border-t border-border/50 mt-3">
              <Link
                href="/beauty-analysis"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blush to-rose-gold py-4 text-base font-bold text-white shadow-lg"
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