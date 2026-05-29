"use client";

type Props = {
  value: number;
  onChange: (v: number) => void;
  size?: "md" | "lg";
};

export function StarRating({ value, onChange, size = "lg" }: Props) {
  const starSize = size === "lg" ? "text-4xl" : "text-2xl";

  return (
    <div className="flex justify-center gap-2" role="group" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={`${starSize} transition transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-rose-300 rounded`}
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
        >
          <span className={star <= value ? "text-amber-400 drop-shadow-sm" : "text-stone-200"}>
            ★
          </span>
        </button>
      ))}
    </div>
  );
}
