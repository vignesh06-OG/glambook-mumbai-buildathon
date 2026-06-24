import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingForm } from "@/components/BookingForm";
import { SalonInfoPanel } from "@/components/SalonInfoPanel";
import { SalonReviews } from "@/components/SalonReviews";
import { formatPrice, getSalonById, priceLevelLabel } from "@/lib/salons";
import { getMapViewUrl } from "@/lib/maps";
import type { Metadata } from "next";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const salon = getSalonById(id);
  if (!salon) return { title: "Salon Not Found" };
  return {
    title: `${salon.name} · ${salon.area} | GlamBook AI`,
    description: `Book ${salon.name} in ${salon.area}. ${salon.tags.join(", ")} services. ★ ${salon.rating} rating with ${salon.reviewCount} reviews.`,
  };
}

export default async function SalonPage({ params }: Props) {
  const { id } = await params;
  const salon = getSalonById(id);
  if (!salon) notFound();

  const mapUrl = getMapViewUrl(salon);
  const minPrice = Math.min(...salon.services.map((s) => s.price));

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <Link href="/#salons" className="text-sm text-blush hover:underline mb-6 inline-flex items-center gap-1">
          ← Back to salons
        </Link>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left column */}
          <div className="space-y-6">
            {/* Hero image */}
            <div className="relative h-64 sm:h-80 rounded-3xl overflow-hidden glass-card">
              {salon.image ? (
                <Image
                  src={salon.image}
                  alt={`${salon.name} — ${salon.tags.slice(0, 2).join(", ")} in ${salon.area}, Mumbai`}
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-6xl text-blush/20">🏠</div>
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface/40 via-transparent to-transparent" />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-emerald/20 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-emerald border border-emerald/20">
                  ✓ Verified
                </span>
                {salon.homeService && (
                  <span className="rounded-full bg-surface/60 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-foreground border border-border/50">
                    🏠 Home Service
                  </span>
                )}
                {salon.priceLevel === 3 && (
                  <span className="rounded-full bg-gold-soft backdrop-blur-sm px-3 py-1 text-xs font-semibold text-gold border border-gold/20">
                    👑 Premium
                  </span>
                )}
              </div>
              {/* Rating overlay */}
              <div className="absolute bottom-4 right-4 rounded-full bg-surface/70 backdrop-blur-sm px-3 py-1.5 text-sm font-bold text-foreground border border-border/30">
                ★ {salon.rating} · {salon.reviewCount} reviews
              </div>
            </div>

            {/* Before/After gallery */}
            {salon.beforeAfter && salon.beforeAfter.length > 0 && (
              <div className="glass-card rounded-3xl p-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-2xl">✨</span> Before & After Transformations
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {salon.beforeAfter.map((item, i) => (
                    <div key={i} className="relative rounded-2xl overflow-hidden">
                      <div className="grid grid-cols-2">
                        <div className="relative h-40 bg-surface-2">
                          <Image src={item.before} alt={`${item.caption} - Before`} fill className="object-cover" sizes="150px" />
                          <div className="absolute bottom-1 left-1 rounded-full bg-surface/80 backdrop-blur-sm px-2 py-0.5 text-[10px] font-semibold text-foreground">Before</div>
                        </div>
                        <div className="relative h-40 bg-surface-2">
                          <Image src={item.after} alt={`${item.caption} - After`} fill className="object-cover" sizes="150px" />
                          <div className="absolute bottom-1 right-1 rounded-full bg-blush/20 backdrop-blur-sm px-2 py-0.5 text-[10px] font-semibold text-blush">After</div>
                        </div>
                      </div>
                      <p className="text-xs text-muted mt-2 text-center">{item.caption}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery strip */}
            {salon.gallery && salon.gallery.length > 0 && (
              <div className="glass-card rounded-3xl p-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">Gallery</h3>
                <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                  {salon.gallery.map((img, i) => (
                    <div key={i} className="relative h-28 w-40 shrink-0 rounded-2xl overflow-hidden glass-light border border-border">
                      <Image src={img} alt={`${salon.name} gallery ${i + 1}`} fill className="object-cover" sizes="160px" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Salon info */}
            <div className="glass-card rounded-3xl p-6">
              <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">{salon.name}</h1>
              <div className="flex items-center gap-3 mt-2 mb-4">
                <span className="text-sm text-muted">{salon.area}</span>
                <span className="text-muted">·</span>
                <span className="text-sm text-muted">{priceLevelLabel(salon.priceLevel)}</span>
              </div>
              {salon.description && (
                <p className="text-sm text-muted leading-relaxed mb-4">{salon.description}</p>
              )}
              {salon.specialization && (
                <div className="rounded-xl bg-blush-soft/30 border border-blush/10 p-3 mb-4">
                  <p className="text-xs text-blush font-semibold mb-1">Specialty</p>
                  <p className="text-sm text-foreground">{salon.specialization}</p>
                </div>
              )}
              {salon.established && (
                <p className="text-xs text-muted">🏢 Established {salon.established} · Mumbai</p>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                {salon.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-blush-soft px-3 py-1 text-xs font-medium text-blush">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="glass-card rounded-3xl p-6">
              <h2 className="font-display text-xl font-semibold text-foreground mb-1">
                Services & Pricing
              </h2>
              <p className="text-sm text-muted mb-6">
                Starting from <span className="font-semibold gradient-text">{formatPrice(minPrice)}</span>
              </p>
              <div className="space-y-3">
                {salon.services.map((service) => {
                  const catIcons: Record<string, string> = {
                    hair: "💇", skin: "✨", nails: "💅", bridal: "👰",
                    grooming: "🧔", spa: "🧖", makeup: "💄",
                  };
                  return (
                    <div key={service.id} className="glass-light rounded-2xl p-4 border border-border flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-blush-soft flex items-center justify-center text-xl shrink-0">
                          {catIcons[service.category] ?? "✨"}
                        </div>
                        <div>
                          <p className="font-display text-sm font-semibold text-foreground">{service.name}</p>
                          <p className="text-xs text-muted capitalize mt-0.5">{service.category} · {service.durationMin} min</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-display text-base font-bold gradient-text">{formatPrice(service.price)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Location & contact */}
            <div className="glass-card rounded-3xl p-6">
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">📍 Location & Hours</h2>
              <div className="space-y-4">
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-border bg-surface-2 p-4 transition hover:border-blush/30 hover:bg-blush-soft/20"
                >
                  <div>
                    <p className="font-semibold text-foreground text-sm">{salon.address}</p>
                    <p className="text-xs text-muted mt-1">{salon.area} · Mumbai</p>
                  </div>
                  <span className="shrink-0 text-blush font-semibold text-sm">Open in Maps →</span>
                </a>
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-light rounded-xl p-4">
                    <p className="text-xs text-muted mb-1">Hours</p>
                    <p className="text-sm font-semibold text-foreground">{salon.openHours}</p>
                  </div>
                  <div className="glass-light rounded-xl p-4">
                    <p className="text-xs text-muted mb-1">Phone</p>
                    <a href={`tel:${salon.phone}`} className="text-sm font-semibold text-blush hover:underline">
                      {salon.phone}
                    </a>
                  </div>
                </div>
                {salon.amenities && salon.amenities.length > 0 && (
                  <div>
                    <p className="text-xs text-muted mb-2">Amenities</p>
                    <div className="flex flex-wrap gap-2">
                      {salon.amenities.map((a) => (
                        <span key={a} className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs text-muted">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Reviews */}
            <SalonReviews salon={salon} />
          </div>

          {/* Right column — sticky booking form */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
            <div className="glass-card rounded-3xl p-6">
              <BookingForm salon={salon} />
            </div>

            {/* Quick stats */}
            <div className="glass-light rounded-2xl p-5 space-y-3">
              <h4 className="font-display text-sm font-semibold text-foreground">This Salon at a Glance</h4>
              {[
                { icon: "⭐", label: "Rating", value: `${salon.rating} / 5.0` },
                { icon: "📝", label: "Reviews", value: `${salon.reviewCount}+` },
                { icon: "💰", label: "Starting price", value: formatPrice(minPrice) },
                { icon: "🕐", label: "Open hours", value: salon.openHours.split("–")[0].trim() },
                { icon: "🏠", label: "Home service", value: salon.homeService ? "Available" : "Not available" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <span className="text-sm text-muted flex items-center gap-2">
                    <span>{item.icon}</span> {item.label}
                  </span>
                  <span className="text-sm font-semibold text-foreground">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Book via AI recommendation */}
            <div className="glass-light rounded-2xl p-5 border border-blush/10">
              <p className="text-xs text-muted mb-3">AI recommendation · Based on your profile</p>
              <Link
                href="/beauty-analysis"
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blush to-rose-gold py-3 text-sm font-semibold text-white shadow-lg hover:opacity-90 transition"
              >
                🔬 Get AI Beauty Analysis First
              </Link>
              <p className="text-xs text-muted mt-2 text-center">
                Know your perfect look → get matched to this salon
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}