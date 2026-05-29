"use client";

import { useEffect } from "react";
import type { Salon } from "@/lib/types";
import { getRideLinks, openRideApp } from "@/lib/rides";

type Props = {
  salon: Salon;
  open: boolean;
  onClose: () => void;
};

export function BookRideModal({ salon, open, onClose }: Props) {
  const links = getRideLinks(salon);

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

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-4 sm:items-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ride-modal-title"
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="ride-modal-title" className="text-lg font-bold text-stone-900">
          Book a ride
        </h2>
        <p className="mt-1 text-sm text-stone-600">
          Destination auto-filled to <strong>{salon.name}</strong>
        </p>
        <p className="mt-1 rounded-lg bg-stone-50 px-3 py-2 text-xs text-stone-500">
          📍 {salon.address}
        </p>

        <div className="mt-5 space-y-3">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => openRideApp(link)}
              className="flex w-full items-center gap-4 rounded-xl border border-stone-200 p-4 text-left transition hover:border-stone-300 hover:bg-stone-50"
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold text-white"
                style={{ backgroundColor: link.color }}
              >
                {link.name[0]}
              </span>
              <div className="flex-1">
                <p className="font-semibold text-stone-900">{link.name}</p>
                <p className="text-xs text-stone-500">{link.description}</p>
              </div>
              <span className="text-stone-400">→</span>
            </button>
          ))}
        </div>

        <p className="mt-4 text-center text-[11px] text-stone-400">
          Opens Uber / Ola / Rapido app on your phone with drop-off set. Install app if prompted.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full rounded-xl border border-stone-200 py-2.5 text-sm font-medium text-stone-600 hover:bg-stone-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
