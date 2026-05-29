import { SITE_CONFIG } from "@/lib/config";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-rose-100/80 bg-gradient-to-t from-rose-50/50 to-transparent py-12">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <p className="font-display text-lg font-semibold text-stone-800">{SITE_CONFIG.brand}</p>
        <p className="mt-1 text-sm text-stone-500">
          Built for SuperXgen AI Startup Buildathon 2026
        </p>
        <p className="mt-4 text-xs text-stone-400">
          © {new Date().getFullYear()} · {SITE_CONFIG.city} beauty marketplace demo
        </p>
      </div>
    </footer>
  );
}
