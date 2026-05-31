import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-rose-100/60 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-400 via-fuchsia-400 to-rose-500 text-lg shadow-lg shadow-rose-200/80">
            ✨
          </span>
          <div className="leading-tight">
            <p className="font-display text-sm font-semibold text-stone-900">
              {SITE_CONFIG.brand}
            </p>
            <p className="text-[11px] text-rose-500/90">{SITE_CONFIG.city} · for her</p>
          </div>
        </Link>
        <nav className="flex items-center gap-3 text-sm font-medium text-stone-600 sm:gap-5">
          <Link href="/#salons" className="hidden sm:inline hover:text-rose-600 transition-colors">
            Salons
          </Link>
          <Link href="/#ai-stylist" className="hidden sm:inline hover:text-rose-600 transition-colors">
            AI Stylist
          </Link>
          <Link
            href="/my-bookings"
            className="hover:text-rose-600 transition-colors text-xs sm:text-sm"
          >
            My bookings
          </Link>
          <Link
            href="/#salons"
            className="rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-rose-200/60 transition-transform active:scale-95 sm:text-sm"
          >
            Book now
          </Link>
        </nav>
      </div>
    </header>
  );
}
