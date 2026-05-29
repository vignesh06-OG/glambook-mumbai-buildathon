import Link from "next/link";
import { formatPrice } from "@/lib/salons";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function BookingConfirmedPage({ searchParams }: Props) {
  const params = await searchParams;
  const get = (key: string) => {
    const v = params[key];
    return Array.isArray(v) ? v[0] : v ?? "";
  };

  const salon = get("salon");
  const service = get("service");
  const date = get("date");
  const time = get("time");
  const name = get("name");
  const phone = get("phone");
  const price = Number(get("price")) || 0;

  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">
        ✓
      </div>
      <h1 className="mt-6 text-2xl font-bold text-stone-900">Booking confirmed!</h1>
      <p className="mt-2 text-stone-600">
        Hi {name}, your appointment at <strong>{salon}</strong> is reserved.
      </p>

      <dl className="mt-8 rounded-2xl border border-rose-100 bg-white p-6 text-left text-sm">
        <div className="flex justify-between border-b border-stone-100 py-3">
          <dt className="text-stone-500">Service</dt>
          <dd className="font-medium">{service}</dd>
        </div>
        <div className="flex justify-between border-b border-stone-100 py-3">
          <dt className="text-stone-500">Date & time</dt>
          <dd className="font-medium">
            {date} at {time}
          </dd>
        </div>
        <div className="flex justify-between border-b border-stone-100 py-3">
          <dt className="text-stone-500">Phone</dt>
          <dd className="font-medium">{phone}</dd>
        </div>
        <div className="flex justify-between py-3">
          <dt className="text-stone-500">Amount</dt>
          <dd className="font-semibold text-rose-700">
            {price > 0 ? formatPrice(price) : "—"}
          </dd>
        </div>
      </dl>

      <p className="mt-4 text-xs text-stone-400">
        Demo booking — no payment charged. Salon will call to confirm.
      </p>

      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-rose-600 px-8 py-3 text-sm font-semibold text-white hover:bg-rose-700"
      >
        Back to home
      </Link>
    </div>
  );
}
