"use client";

import type { Salon } from "@/lib/types";
import { SalonActions } from "./SalonActions";

type Props = { salon: Salon };

export function SalonInfoPanel({ salon }: Props) {
  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8">
      <h2 className="font-display text-xl font-semibold text-foreground mb-1 flex items-center gap-2">
        <span>📍</span> Contact & Location
      </h2>
      <p className="text-xs text-muted mb-6">Verified salon information</p>

      <dl className="space-y-4">
        {[
          { label: "Address", value: salon.address, icon: "🏠" },
          { label: "Phone", value: salon.phone, href: `tel:${salon.phone}`, icon: "📞", isLink: true },
          ...(salon.email ? [{ label: "Email", value: salon.email, href: `mailto:${salon.email}`, icon: "✉️", isLink: true }] : []),
          ...(salon.website ? [{ label: "Website", value: "Visit website →", href: salon.website, icon: "🌐", isLink: true, external: true }] : []),
          { label: "Hours", value: salon.openHours, icon: "🕐" },
        ].map((item) => (
          <div key={item.label} className="flex items-start gap-3 py-3 border-b border-border/50 last:border-0">
            <span className="text-lg mt-0.5">{item.icon}</span>
            <div className="flex-1 min-w-0">
              <dt className="text-[10px] font-semibold uppercase tracking-widest text-muted mb-1">{item.label}</dt>
              {item.isLink ? (
                <a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="text-sm font-medium text-blush hover:underline transition-colors truncate block"
                >
                  {item.value}
                </a>
              ) : (
                <dd className="text-sm text-foreground">{item.value}</dd>
              )}
            </div>
          </div>
        ))}

        {salon.amenities && salon.amenities.length > 0 && (
          <div className="pt-4 border-t border-border/50">
            <dt className="text-[10px] font-semibold uppercase tracking-widest text-muted mb-3 flex items-center gap-2">
              <span>✨</span> Amenities
            </dt>
            <dd className="flex flex-wrap gap-2">
              {salon.amenities.map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs text-muted"
                >
                  {a}
                </span>
              ))}
            </dd>
          </div>
        )}
      </dl>

      <div className="mt-6 pt-6 border-t border-border/50">
        <SalonActions salon={salon} variant="detail" />
      </div>
    </div>
  );
}