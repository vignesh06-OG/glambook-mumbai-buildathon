"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { StoredBooking } from "@/lib/storage-types";
import { markBookingReviewed } from "@/lib/bookings";
import { saveReview } from "@/lib/reviews";
import { StarRating } from "./StarRating";

const ISSUE_TAGS = [
  "Long wait time",
  "Staff attitude",
  "Cleanliness",
  "Service quality",
  "Pricing",
  "Booking confusion",
];

const LOVE_TAGS = [
  "Amazing stylist",
  "Relaxing vibe",
  "Great results",
  "Friendly staff",
  "Value for money",
  "Easy booking",
];

type Step = "rating" | "feedback" | "thanks";

type Props = { booking: StoredBooking };

export function ReviewFlow({ booking }: Props) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("rating");
  const [rating, setRating] = useState(0);
  const [improveText, setImproveText] = useState("");
  const [appreciateText, setAppreciateText] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const isLow = rating > 0 && rating <= 3;
  const isHigh = rating >= 4;

  function toggleTag(tag: string, prefix: "issue" | "love") {
    const key = `${prefix}:${tag}`;
    setSelectedTags((prev) =>
      prev.includes(key) ? prev.filter((t) => t !== key) : [...prev, key]
    );
  }

  function goToFeedback() {
    if (rating < 1) return;
    setStep("feedback");
  }

  async function submitReview() {
    if (isLow && improveText.trim().length < 10) return;
    if (isHigh && appreciateText.trim().length < 10) return;

    setSubmitting(true);
    try {
      await saveReview({
        bookingId: booking.id,
        salonId: booking.salonId,
        salonName: booking.salonName,
        customerName: booking.customerName,
        rating,
        improveFeedback: isLow ? improveText.trim() : undefined,
        appreciateFeedback: isHigh ? appreciateText.trim() : undefined,
        tags: selectedTags.length > 0 ? selectedTags : undefined,
      });
      await markBookingReviewed(booking.id);
      setStep("thanks");
    } catch {
      alert("Could not save your review. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (step === "thanks") {
    return (
      <div className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-rose-100 to-fuchsia-100 text-4xl">
          💕
        </div>
        <h1 className="font-display mt-6 text-2xl font-semibold text-stone-900">
          Thank you, {booking.customerName.split(" ")[0]}!
        </h1>
        <p className="mt-3 text-stone-600 leading-relaxed">
          Your voice helps <strong>{booking.salonName}</strong> glow brighter and helps
          other women book with confidence.
        </p>
        {isLow && (
          <p className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-800">
            We&apos;ve shared your feedback with the salon so they can improve your
            next visit.
          </p>
        )}
        {isHigh && (
          <p className="mt-4 rounded-xl bg-fuchsia-50 px-4 py-3 text-sm text-fuchsia-900">
            So glad you loved it! Your appreciation means the world to the team.
          </p>
        )}
        <button
          type="button"
          onClick={() => router.push(`/salon/${booking.salonId}`)}
          className="mt-8 rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-200"
        >
          Back to salon
        </button>
        <button
          type="button"
          onClick={() => router.push("/my-bookings")}
          className="mt-3 block w-full text-sm text-rose-600 hover:underline"
        >
          View my bookings
        </button>
      </div>
    );
  }

  if (step === "feedback") {
    return (
      <div className="rounded-3xl border border-rose-100 bg-white/90 p-6 shadow-xl shadow-rose-100/50 backdrop-blur sm:p-8">
        <p className="text-center text-sm font-medium text-rose-600">
          {isLow ? "We want to make it right" : "We'd love to hear more"}
        </p>
        <h1 className="font-display mt-2 text-center text-2xl font-semibold text-stone-900">
          {isLow ? "What can we improve?" : "Tell us what you loved"}
        </h1>

        {isLow ? (
          <>
            <p className="mt-3 text-center text-sm text-stone-600">
              Thank you for being honest — your feedback helps the salon fix issues
              for every guest.
            </p>
            <textarea
              value={improveText}
              onChange={(e) => setImproveText(e.target.value)}
              placeholder="e.g. Wait was long, staff seemed rushed, room could be cleaner..."
              rows={4}
              className="mt-5 w-full rounded-2xl border border-rose-200 bg-rose-50/30 px-4 py-3 text-sm outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
            />
            <p className="mt-4 text-xs font-medium text-stone-500">Quick issues (tap all that apply)</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {ISSUE_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag, "issue")}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    selectedTags.includes(`issue:${tag}`)
                      ? "bg-rose-600 text-white"
                      : "bg-stone-100 text-stone-600 hover:bg-rose-50"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="mt-3 text-center text-sm text-stone-600">
              Thank you for the wonderful rating! What did you appreciate most about
              your experience?
            </p>
            <textarea
              value={appreciateText}
              onChange={(e) => setAppreciateText(e.target.value)}
              placeholder="e.g. My stylist understood exactly what I wanted, salon felt so luxurious and welcoming..."
              rows={4}
              className="mt-5 w-full rounded-2xl border border-fuchsia-200 bg-fuchsia-50/30 px-4 py-3 text-sm outline-none focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-100"
            />
            <p className="mt-4 text-xs font-medium text-stone-500">What stood out? (optional tags)</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {LOVE_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag, "love")}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    selectedTags.includes(`love:${tag}`)
                      ? "bg-fuchsia-600 text-white"
                      : "bg-stone-100 text-stone-600 hover:bg-fuchsia-50"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </>
        )}

        <button
          type="button"
          disabled={
            submitting ||
            (isLow && improveText.trim().length < 10) ||
            (isHigh && appreciateText.trim().length < 10)
          }
          onClick={submitReview}
          className="mt-6 w-full rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500 py-3.5 text-sm font-semibold text-white shadow-md disabled:opacity-50"
        >
          Submit feedback
        </button>
        <button
          type="button"
          onClick={() => setStep("rating")}
          className="mt-3 w-full text-center text-xs text-stone-400 hover:text-rose-600"
        >
          Change rating
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-rose-100 bg-white/90 p-6 shadow-xl shadow-rose-100/50 backdrop-blur sm:p-8">
      <p className="text-center text-sm text-rose-600 font-medium">How was your visit?</p>
      <h1 className="font-display mt-2 text-center text-2xl font-semibold text-stone-900">
        Rate your experience
      </h1>
      <p className="mt-2 text-center text-sm text-stone-600">
        <strong>{booking.salonName}</strong> · {booking.serviceName}
      </p>
      <p className="text-center text-xs text-stone-400 mt-1">
        {booking.date} at {booking.time}
      </p>

      <div className="mt-8">
        <StarRating value={rating} onChange={setRating} />
      </div>

      {rating > 0 && (
        <p className="mt-4 text-center text-sm text-stone-500">
          {isLow
            ? "We'll ask how we can improve — thank you for helping us grow."
            : "We're so glad you enjoyed it! Tell us what you appreciated next."}
        </p>
      )}

      <button
        type="button"
        disabled={rating < 1}
        onClick={goToFeedback}
        className="mt-8 w-full rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500 py-3.5 text-sm font-semibold text-white shadow-md disabled:opacity-50"
      >
        Continue
      </button>
    </div>
  );
}
