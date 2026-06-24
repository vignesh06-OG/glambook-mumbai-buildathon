"use client";

import { useState } from "react";

type Props = {
  value: number;
  onChange?: (v: number) => void;
  size?: "sm" | "md" | "lg";
  readOnly?: boolean;
};

export function StarRating({ value, onChange, size = "lg", readOnly = false }: Props) {
  const [hover, setHover] = useState(0);
  const sizes = { sm: "text-lg", md: "text-2xl", lg: "text-4xl" };
  const starSize = sizes[size];
  const activeColor = "text-gold drop-shadow-lg";
  const inactiveColor = "text-border";
  const hoverColor = "text-gold/60";

  return (
    <div
      className="flex justify-center gap-2"
      role={readOnly ? undefined : "group"}
      aria-label={readOnly ? `Rating: ${value} out of 5 stars` : "Select rating"}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= (hover || value);
        const isHovered = star <= hover && star > value;

        return (
          <button
            key={star}
            type="button"
            disabled={readOnly || !onChange}
            onClick={() => onChange?.(star)}
            onMouseEnter={() => !readOnly && setHover(star)}
            onMouseLeave={() => !readOnly && setHover(0)}
            className={`${starSize} transition-all duration-200 ${
              !readOnly && onChange ? "cursor-pointer" : "cursor-default"
            } ${
              filled && !isHovered ? activeColor :
              isHovered ? hoverColor :
              inactiveColor
            } ${!readOnly && onChange ? "hover:scale-110 active:scale-95" : ""}`}
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}