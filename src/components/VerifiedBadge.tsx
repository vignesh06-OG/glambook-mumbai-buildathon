type Props = {
  label?: string;
  size?: "sm" | "md";
};

export function VerifiedBadge({ label = "Verified Pro", size = "sm" }: Props) {
  const cls =
    size === "md"
      ? "px-3 py-1 text-xs"
      : "px-2.5 py-0.5 text-[11px]";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-rose-200/70 bg-white/95 ${cls} font-semibold text-rose-700 shadow-sm backdrop-blur`}
      title="Trusted & verified on GlamBook"
    >
      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-fuchsia-500 text-[10px] text-white shadow-sm">
        ✓
      </span>
      {label}
    </span>
  );
}

