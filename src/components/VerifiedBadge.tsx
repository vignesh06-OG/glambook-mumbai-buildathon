type Props = {
  label?: string;
  size?: "sm" | "md";
};

export function VerifiedBadge({ label = "Verified", size = "sm" }: Props) {
  const cls = size === "md" ? "px-3 py-1 text-xs" : "px-2.5 py-0.5 text-[10px]";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-blush/30 bg-blush-soft/50 backdrop-blur-sm ${cls} font-semibold text-blush shadow-sm`}
      title="Trusted & verified on GlamBook AI"
      aria-label="Verified salon"
    >
      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-blush to-rose-gold text-[9px] text-white shadow-sm">
        ✓
      </span>
      {label}
    </span>
  );
}