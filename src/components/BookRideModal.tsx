"use client";

import { useEffect, useRef } from "react";
import type { Salon } from "@/lib/types";
import { getRideLinks, openRideApp } from "@/lib/rides";

type Props = {
  salon: Salon;
  open: boolean;
  onClose: () => void;
};

export function BookRideModal({ salon, open, onClose }: Props) {
  const links = getRideLinks(salon);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  // Focus trap
  useEffect(() => {
    if (open) {
      dialogRef.current?.focus();
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="anim-fade-in fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ride-modal-title"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="anim-pop-in w-full max-w-md rounded-3xl glass-card p-6 shadow-2xl outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-1">
          <h2 id="ride-modal-title" className="font-display text-lg font-bold text-foreground flex items-center gap-2">
            <span>🛵</span> Book a Ride
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-border text-muted hover:border-blush hover:text-blush transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <p className="text-sm text-muted mb-3">
          Destination auto-filled to <strong className="text-foreground">{salon.name}</strong>
        </p>
        <div className="rounded-xl bg-surface-2 border border-border/50 p-3 mb-6">
          <p className="text-xs text-muted flex items-start gap-2">
            <span>📍</span>
            <span>{salon.address}</span>
          </p>
        </div>

        <div className="space-y-3">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => openRideApp(link)}
              className="w-full flex items-center gap-4 rounded-2xl border border-border bg-surface-2 p-4 text-left transition-all duration-200 hover:border-blush/30 hover:bg-blush-soft/10 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl font-bold text-white shadow-md"
                style={{ backgroundColor: link.color }}
                aria-hidden="true"
              >
                {link.name[0]}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground">{link.name}</p>
                <p className="text-xs text-muted mt-0.5">{link.description}</p>
              </div>
              <span className="text-muted text-lg shrink-0">→</span>
            </button>
          ))}
        </div>

        <p className="mt-4 text-center text-[11px] text-muted/60">
          Opens {links.map((l) => l.name).join(" / ")} app with drop-off auto-filled
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full rounded-2xl border border-border bg-surface-2 py-3 text-sm font-medium text-muted hover:border-blush/30 hover:text-foreground transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}