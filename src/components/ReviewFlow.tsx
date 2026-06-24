"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { StoredBooking } from "@/lib/storage-types";
import { markBookingReviewed } from "@/lib/bookings";
import { saveReview } from "@/lib/reviews";
import { StarRating } from "./StarRating";

const ISSUE_TAGS = [
  "Long wait time", "Staff attitude", "Cleanliness",
  "Service quality", "Pricing", "Booking confusion",
];

const LOVE_TAGS = [
  "Amazing stylist", "Relaxing vibe", "Great results",
  "Friendly staff", "Value for money", "Easy booking",
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
  const [error, setError] = useState("");

  const isLow = rating > 0 && rating <= 3;
  const isHigh = rating >= 4;

  function toggleTag(tag: string, prefix: "issue" | "love") {
    const key = `${prefix}:${tag}`;
    setSelectedTags((prev) =>
      prev.includes(key) ? prev.filter((t) => t !== key) : [...prev, key]
    );
  }

  async function submitReview() {
    if (isLow && improveText.trim().length < 10) return;
    if (isHigh && appreciateText.trim().length < 10) return;

    setSubmitting(true);
    setError("");
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
      setError("Could not save your review. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (step === "thanks") {
    return (
      <div className="glass-card rounded-3xl p-8 sm:p-12 text-center anim-pop-in">
        {/* Success animation */}
        <div className="relative mx-auto mb-8 h-24 w-24">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blush/30 to-emerald/20 animate-pulse-glow" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald/20 to-blush/20 text-5xl">
            {isLow ? "🤝" : "💕"}
          </div>
        </div>

        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3">
          Thank you, {booking.customerName.split(" ")[0]}!
        </h1>
        <p className="text-muted leading-relaxed max-w-sm mx-auto">
          Your review helps <strong className="text-foreground">{booking.salonName}</strong> improve
          and guides other women to book with confidence.
        </p>

        {isLow ? (
          <div className="mt-6 rounded-2xl bg-rose-400/10 border border-rose-400/20 p-4 text-left">
            <p className="text-xs font-semibold text-rose-400 mb-1 flex items-center gap-2">
              <span>📝</span> Your feedback is shared with the salon
            </p>
            <p className="text-xs text-muted leading-relaxed">
              They use this to train their team and improve the experience for every guest.
            </p>
          </div>
        ) : (
          <div className="mt-6 rounded-2xl bg-emerald/10 border border-emerald/20 p-4 text-left">
            <p className="text-xs font-semibold text-emerald mb-1 flex items-center gap-2">
              <span>⭐</span> Your appreciation reaches the salon team
            </p>
            <p className="text-xs text-muted leading-relaxed">
              Positive reviews like yours help great salons grow and serve more women.
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => router.push(`/salon/${booking.salonId}`)}
            className="rounded-2xl bg-gradient-to-r from-blush to-rose-gold px-8 py-3.5 text-sm font-semibold text-white shadow-lg hover:opacity-90 transition-all active:scale-95"
          >
            View {booking.salonName.split(" ")[0]}
          </button>
          <button
            type="button"
            onClick={() => router.push("/my-bookings")}
            className="rounded-2xl border border-border bg-surface-2 px-8 py-3.5 text-sm font-semibold text-muted hover:border-blush hover:text-blush transition"
          >
            My bookings
          </button>
        </div>
      </div>
    );
  }

  if (step === "feedback") {
    return (
      <div className="glass-card rounded-3xl p-8 sm:p-10 anim-fade-up">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-sm font-medium text-blush">{isLow ? "Help us improve" : "Share the love"}</span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mt-2">
            {isLow ? "What can we improve?" : "What did you love?"}
          </h1>
          <div className="mt-3 inline-flex items-center gap-2 rounded-xl bg-surface-2 border border-border px-4 py-2">
            <span className="text-sm text-muted">at</span>
            <span className="font-semibold text-foreground">{booking.salonName}</span>
            <span className="text-muted">·</span>
            <span className="text-sm text-muted">{booking.serviceName}</span>
          </div>
        </div>

        {/* Rating display */}
        <div className="mb-6 text-center">
          <StarRating value={rating} readOnly size="md" />
        </div>

        {/* Feedback text */}
        {isLow ? (
          <div className="space-y-4">
            <p className="text-sm text-muted leading-relaxed">
              Thank you for being honest — your feedback directly helps <strong className="text-foreground">{booking.salonName}</strong> serve you better next time.
            </p>
            <textarea
              value={improveText}
              onChange={(e) => setImproveText(e.target.value)}
              placeholder="e.g. The wait was longer than expected, but the haircut itself was perfect..."
              rows={4}
              className="w-full rounded-2xl border border-rose-400/20 bg-surface-2 px-4 py-3 text-sm text-foreground outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-400/10 transition placeholder:text-muted/50 resize-none"
              aria-label="What could be improved"
            />
            <div>
              <p className="text-xs font-semibold text-muted mb-3 uppercase tracking-wider">Quick issues (tap all that apply)</p>
              <div className="flex flex-wrap gap-2">
                {ISSUE_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag, "issue")}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                      selectedTags.includes(`issue:${tag}`)
                        ? "bg-rose-400 text-white shadow-md"
                        : "border border-border text-muted hover:border-rose-400/50 hover:text-rose-400 bg-surface-2"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted leading-relaxed">
              We're thrilled you had a great experience! What stood out most? Your words help other women discover this salon.
            </p>
            <textarea
              value={appreciateText}
              onChange={(e) => setAppreciateText(e.target.value)}
              placeholder="e.g. The team was so welcoming, the result was exactly what I wanted, and the ambiance was incredible..."
              rows={4}
              className="w-full rounded-2xl border border-blush/20 bg-surface-2 px-4 py-3 text-sm text-foreground outline-none focus:border-blush focus:ring-2 focus:ring-blush/10 transition placeholder:text-muted/50 resize-none"
              aria-label="What did you appreciate"
            />
            <div>
              <p className="text-xs font-semibold text-muted mb-3 uppercase tracking-wider">What stood out? (optional)</p>
              <div className="flex flex-wrap gap-2">
                {LOVE_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag, "love")}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                      selectedTags.includes(`love:${tag}`)
                        ? "bg-gradient-to-r from-blush to-rose-gold text-white shadow-md"
                        : "border border-border text-muted hover:border-blush/50 hover:text-blush bg-surface-2"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {error && (
          <p className="mt-4 text-sm text-rose-400 bg-rose-400/10 border border-rose-400/20 rounded-xl px-4 py-3">
            {error}
          </p>
        )}

        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setStep("rating")}
            className="rounded-xl border border-border bg-surface-2 px-5 py-3 text-sm font-medium text-muted hover:border-blush hover:text-blush transition-colors"
          >
            ← Change rating
          </button>
          <button
            type="button"
            disabled={
              submitting ||
              (isLow && improveText.trim().length < 10) ||
              (isHigh && appreciateText.trim().length < 10)
            }
            onClick={submitReview}
            className="flex-1 rounded-2xl bg-gradient-to-r from-blush to-rose-gold py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <span className="animate-spin text-base">⚙️</span>
                Submitting...
              </>
            ) : (
              <>
                Submit review →
              </>
            )}
          </button>
        </div>

        <p className="mt-4 text-center text-[11px] text-muted/60">
          {isLow
            ? `${10 - improveText.trim().length} more characters needed`
            : `${10 - appreciateText.trim().length} more characters needed`}
        </p>
      </div>
    );
  }

  // Rating step
  return (
    <div className="glass-card rounded-3xl p-8 sm:p-10 anim-fade-up">
      <div className="text-center mb-8">
        <span className="text-sm font-medium text-blush">Share your experience</span>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mt-2">
          How was your visit?
        </h1>
        <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-surface-2 border border-border px-4 py-2">
          <span className="font-semibold text-foreground">{booking.salonName}</span>
          <span className="text-muted">·</span>
          <span className="text-sm text-muted">{booking.serviceName}</span>
        </div>
        <p className="text-xs text-muted/60 mt-2">
          {booking.date} at {booking.time}
        </p>
      </div>

      {/* Star Rating */}
      <div className="mb-6">
        <StarRating value={rating} onChange={setRating} size="lg" />
      </div>

      {/* Rating feedback message */}
      {rating > 0 && (
        <div className="text-center mb-6 anim-fade-in">
          <p className="text-sm text-muted">
            {isLow
              ? "We appreciate your honesty. Help us make it right."
              : "So glad you enjoyed it! Tell us what you loved next."}
          </p>
          <div className="mt-3 flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <span
                key={s}
                className={`text-lg ${s <= rating ? "text-gold" : "text-border/50"}`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        disabled={rating < 1}
        onClick={() => setStep("feedback")}
        className="w-full rounded-2xl bg-gradient-to-r from-blush to-rose-gold py-4 text-sm font-semibold text-white shadow-lg transition-all hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:active:scale-100"
      >
        Continue →
      </button>
    </div>
  );
}