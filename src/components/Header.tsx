import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-rose-100/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-fuchsia-600 text-lg font-bold text-white shadow-md shadow-rose-200">
            M
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold text-stone-900">{SITE_CONFIG.brand}</p>
            <p className="text-xs text-stone-500">{SITE_CONFIG.city}</p>
          </div>
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium text-stone-600">
          <Link href="/#salons" className="hover:text-rose-600 transition-colors">
            Browse
          </Link>
          <Link href="/#ai" className="hover:text-rose-600 transition-colors">
            AI Finder
          </Link>
          <Link
            href="/#salons"
            className="rounded-full bg-rose-600 px-4 py-2 text-white shadow-sm hover:bg-rose-700 transition-colors"
          >
            Book Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
