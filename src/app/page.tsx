import Link from "next/link";
import { AiFinder } from "@/components/AiFinder";
import { SalonExplorer } from "@/components/SalonExplorer";
import { SITE_CONFIG } from "@/lib/config";
import { SALONS } from "@/lib/salons";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-600 via-fuchsia-600 to-violet-700 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.06%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-80" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="text-sm font-medium uppercase tracking-widest text-rose-100">
            SuperXgen Buildathon 2026
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
            {SITE_CONFIG.brand}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-rose-50">{SITE_CONFIG.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#salons"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-rose-700 shadow-lg hover:bg-rose-50 transition-colors"
            >
              Browse {SALONS.length} salons
            </Link>
            <Link
              href="#ai"
              className="rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold backdrop-blur hover:bg-white/20 transition-colors"
            >
              Try AI finder
            </Link>
          </div>
          <dl className="mt-12 grid grid-cols-3 gap-4 max-w-md text-center sm:text-left">
            <div>
              <dt className="text-2xl font-bold">{SALONS.length}+</dt>
              <dd className="text-xs text-rose-100">Verified salons</dd>
            </div>
            <div>
              <dt className="text-2xl font-bold">4.7★</dt>
              <dd className="text-xs text-rose-100">Avg. rating</dd>
            </div>
            <div>
              <dt className="text-2xl font-bold">24/7</dt>
              <dd className="text-xs text-rose-100">Online booking</dd>
            </div>
          </dl>
        </div>
      </section>

      <AiFinder salons={SALONS} />
      <SalonExplorer salons={SALONS} />

      <section className="border-t border-rose-100 bg-rose-50/50 py-12">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h2 className="text-xl font-bold text-stone-900">Ready for your next look?</h2>
          <p className="mt-2 text-stone-600">
            Pick a salon, choose a service, and confirm in under a minute.
          </p>
          <Link
            href="#salons"
            className="mt-6 inline-block rounded-full bg-rose-600 px-8 py-3 text-sm font-semibold text-white hover:bg-rose-700"
          >
            Start booking
          </Link>
        </div>
      </section>
    </>
  );
}
