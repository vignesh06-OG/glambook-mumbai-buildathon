import Link from "next/link";
import { AiFinder } from "@/components/AiFinder";
import { GlamBookAIStylist } from "@/components/GlamBookAIStylist";
import { PendingReviewBanner } from "@/components/PendingReviewBanner";
import { SalonExplorer } from "@/components/SalonExplorer";
import { SITE_CONFIG } from "@/lib/config";
import { SALONS } from "@/lib/salons";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-400 via-fuchsia-400 to-pink-500 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.08%22%3E%3Cpath d=%22M20 20h20v20H20zM0 0h20v20H0z%22/%3E%3C/g%3E%3C/svg%3E')]" />
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-fuchsia-300/20 blur-2xl" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-xs font-medium backdrop-blur">
            <span>💅</span> Trusted by women across Mumbai
          </p>
          <h1 className="font-display mt-6 max-w-2xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Your beauty ritual,{" "}
            <span className="text-rose-100">one tap away</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-rose-50/95 leading-relaxed">
            {SITE_CONFIG.tagline}. Bridal glam, spa days, nails & hair — book verified salons and
            share honest reviews after every visit.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#salons"
              className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-rose-600 shadow-xl shadow-rose-900/10 hover:bg-rose-50 transition"
            >
              Explore {SALONS.length} salons
            </Link>
            <Link
              href="#ai-stylist"
              className="rounded-full border border-white/50 bg-white/10 px-7 py-3.5 text-sm font-semibold backdrop-blur hover:bg-white/20 transition"
            >
              ✨ AI Stylist
            </Link>
          </div>
          <dl className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4 max-w-2xl">
            <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
              <dt className="font-display text-2xl font-semibold">{SALONS.length}+</dt>
              <dd className="text-xs text-rose-100">Curated salons</dd>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
              <dt className="font-display text-2xl font-semibold">★ 4.7</dt>
              <dd className="text-xs text-rose-100">Guest-loved</dd>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
              <dt className="font-display text-2xl font-semibold">Reviews</dt>
              <dd className="text-xs text-rose-100">After every visit</dd>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
              <dt className="font-display text-2xl font-semibold">Ride</dt>
              <dd className="text-xs text-rose-100">Uber · Ola · Rapido</dd>
            </div>
          </dl>
        </div>
      </section>

      <div className="pt-8">
        <PendingReviewBanner />
      </div>

      <GlamBookAIStylist />
      <AiFinder salons={SALONS} />
      <SalonExplorer salons={SALONS} />

      <section className="border-t border-rose-100/80 py-16">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h2 className="font-display text-2xl font-semibold text-stone-900 sm:text-3xl">
            Ready to feel fabulous?
          </h2>
          <p className="mt-3 text-stone-600 max-w-md mx-auto">
            Book today. After your appointment, rate your visit — help salons improve and help
            other women choose with confidence.
          </p>
          <Link
            href="#salons"
            className="mt-8 inline-block rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500 px-10 py-3.5 text-sm font-semibold text-white shadow-lg shadow-rose-200/50"
          >
            Find your salon
          </Link>
        </div>
      </section>
    </>
  );
}
