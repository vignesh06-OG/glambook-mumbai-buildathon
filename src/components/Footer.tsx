"use client";

import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config";

const FOOTER_LINKS = [
  {
    title: "AI Features",
    links: [
      { href: "/beauty-analysis", label: "AI Beauty Analysis" },
      { href: "/budget-optimizer", label: "AI Budget Optimizer" },
      { href: "/occasion-planner", label: "AI Occasion Planner" },
      { href: "/dashboard", label: "Salon Dashboard" },
    ],
  },
  {
    title: "Platform",
    links: [
      { href: "/#salons", label: "Browse Salons" },
      { href: "/my-bookings", label: "My Bookings" },
      { href: "/profile", label: "My Profile" },
      { href: "/beauty-analysis", label: "Get Started Free" },
    ],
  },
  {
    title: "About",
    links: [
      { href: "#", label: "Our Mission" },
      { href: "#", label: "For Salons" },
      { href: "#", label: "Privacy Policy" },
      { href: "#", label: "Terms of Service" },
    ],
  },
];

const TECH_STACK = [
  { name: "Next.js 16", category: "Frontend Framework" },
  { name: "TypeScript", category: "Language" },
  { name: "Tailwind CSS v4", category: "Styling" },
  { name: "Firebase", category: "Database" },
  { name: "Groq API", category: "AI Engine" },
  { name: "Vercel", category: "Deployment" },
];

export function Footer() {
  return (
    <footer className="border-t border-blush-soft/20 bg-surface/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        {/* Top section */}
        <div className="grid gap-12 lg:grid-cols-2 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blush to-rose-gold text-xl shadow-lg shadow-blush/20">
                ✨
              </div>
              <div>
                <p className="font-display text-lg font-semibold text-foreground">
                  {SITE_CONFIG.brand}
                </p>
                <p className="text-sm text-muted">{SITE_CONFIG.tagline}</p>
              </div>
            </div>
            <p className="max-w-sm text-sm text-muted leading-relaxed mb-6">
              {SITE_CONFIG.description}
            </p>
            {/* Tech stack */}
            <div className="mb-6">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted/60 mb-3">Built with</p>
              <div className="flex flex-wrap gap-2">
                {TECH_STACK.map((tech) => (
                  <span
                    key={tech.name}
                    className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs text-muted"
                    title={tech.category}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-blush-soft/50 bg-blush-soft/20 px-3 py-1 text-xs text-blush font-semibold">
                🏆 {SITE_CONFIG.hackathon}
              </span>
              <span className="rounded-full border border-gold-soft/50 bg-gold-soft/20 px-3 py-1 text-xs text-gold font-semibold">
                🤖 AI-Powered
              </span>
              <span className="rounded-full border border-emerald/20 bg-emerald/10 px-3 py-1 text-xs text-emerald font-semibold">
                ✅ Built with Next.js
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-3 gap-8">
            {FOOTER_LINKS.map((group) => (
              <div key={group.title}>
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-blush">
                  {group.title}
                </p>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted transition-colors hover:text-blush"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Team section */}
        <div className="glass-light rounded-2xl p-6 mb-12 border border-blush/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex -space-x-3">
              {["A", "P", "S", "R"].map((initial, i) => (
                <div
                  key={i}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-surface text-sm font-bold text-white shadow-md"
                  style={{
                    background: ["#e879f9", "#ff6b4f", "#8b5cf6", "#10b981"][i],
                    zIndex: 4 - i,
                  }}
                >
                  {initial}
                </div>
              ))}
            </div>
            <div className="flex-1">
              <p className="font-display text-sm font-semibold text-foreground mb-1">
                GlamBook AI Team
              </p>
              <p className="text-xs text-muted leading-relaxed">
                4-person indie team · Software engineer, product designer, AI researcher, and growth lead.
                Passionate about making AI-powered beauty accessible to every woman in India.
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-[10px] text-muted/60 uppercase tracking-wider font-semibold">Founded</p>
              <p className="text-sm font-semibold text-foreground">{SITE_CONFIG.launchYear}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-4 border-t border-border/50 pt-8 text-center sm:flex-row sm:justify-between">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {SITE_CONFIG.brand} · {SITE_CONFIG.city} · Built for{" "}
            {SITE_CONFIG.hackathon}
          </p>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-[10px] text-muted/60 border border-border">
              Demo · Mock AI · Not a funded product
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}