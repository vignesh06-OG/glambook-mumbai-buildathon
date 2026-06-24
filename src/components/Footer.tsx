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
    <footer className="border-t border-blush-soft/30 bg-gradient-to-t from-surface/50 to-transparent">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6">
        {/* Top section */}
        <div className="grid gap-14 lg:grid-cols-2 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blush to-rose-gold text-2xl shadow-lg shadow-blush/25">
                ✨
              </div>
              <div>
                <p className="font-display text-xl font-bold text-foreground">
                  {SITE_CONFIG.brand}
                </p>
                <p className="text-sm text-muted font-medium">{SITE_CONFIG.tagline}</p>
              </div>
            </div>
            <p className="max-w-md text-base text-muted leading-relaxed mb-8">
              {SITE_CONFIG.description}
            </p>
            {/* Tech stack */}
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-widest text-muted/60 mb-4">Built with</p>
              <div className="flex flex-wrap gap-2.5">
                {TECH_STACK.map((tech) => (
                  <span
                    key={tech.name}
                    className="rounded-full border border-border/50 bg-surface-2 px-4 py-1.5 text-sm text-muted font-medium"
                    title={tech.category}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
            {/* Badges */}
            <div className="flex flex-wrap gap-2.5">
              <span className="rounded-full border border-blush-soft/50 bg-blush-soft/20 px-4 py-1.5 text-sm text-blush font-semibold">
                🏆 {SITE_CONFIG.hackathon}
              </span>
              <span className="rounded-full border border-gold-soft/50 bg-gold-soft/20 px-4 py-1.5 text-sm text-gold font-semibold">
                🤖 AI-Powered
              </span>
              <span className="rounded-full border border-emerald/20 bg-emerald/10 px-4 py-1.5 text-sm text-emerald font-semibold">
                ✅ Built with Next.js
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-3 gap-10">
            {FOOTER_LINKS.map((group) => (
              <div key={group.title}>
                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-blush">
                  {group.title}
                </p>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-base text-muted transition-colors duration-200 hover:text-foreground"
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
        <div className="glass-card rounded-2xl p-8 mb-12 border border-blush/15">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <div className="flex -space-x-4">
              {["A", "P", "S", "R"].map((initial, i) => (
                <div
                  key={i}
                  className="flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-surface text-base font-bold text-white shadow-lg"
                  style={{
                    background: ["#f0abfc", "#ff7f5c", "#a78bfa", "#34d399"][i],
                    zIndex: 4 - i,
                  }}
                >
                  {initial}
                </div>
              ))}
            </div>
            <div className="flex-1">
              <p className="font-display text-base font-bold text-foreground mb-2">
                GlamBook AI Team
              </p>
              <p className="text-base text-muted leading-relaxed">
                4-person indie team · Software engineer, product designer, AI researcher, and growth lead.
                Passionate about making AI-powered beauty accessible to every woman in India.
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-xs text-muted/60 uppercase tracking-wider font-bold">Founded</p>
              <p className="text-base font-bold text-foreground">{SITE_CONFIG.launchYear}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-5 border-t border-white/5 pt-10 text-center sm:flex-row sm:justify-between">
          <p className="text-base text-muted">
            © {new Date().getFullYear()} {SITE_CONFIG.brand} · {SITE_CONFIG.city} · Built for{" "}
            {SITE_CONFIG.hackathon}
          </p>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-surface-2 px-3.5 py-1.5 text-xs text-muted/70 border border-border/50 font-medium">
              Demo · Mock AI · Not a funded product
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}