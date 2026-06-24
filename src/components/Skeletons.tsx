// ─── Premium Loading Skeletons ────────────────────────────────────────────────

function SkeletonBlock({
  className = "",
  width,
  height,
  rounded = "xl",
}: {
  className?: string;
  width?: string;
  height?: string;
  rounded?: string;
}) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-surface-3 via-surface-2 to-surface-3 bg-[length:200%_100%] anim-shimmer ${rounded} ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}

export function SalonCardSkeleton() {
  return (
    <div className="glass-card rounded-3xl border border-blush-soft/20 overflow-hidden" aria-label="Loading salon...">
      <SkeletonBlock height="208px" className="w-full rounded-none" />
      <div className="p-5 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2.5 flex-1">
            <SkeletonBlock width="70%" height="18px" />
            <SkeletonBlock width="40%" height="14px" />
          </div>
          <SkeletonBlock width="56px" height="28px" rounded="full" />
        </div>
        <div className="flex gap-2.5">
          <SkeletonBlock width="70px" height="24px" rounded="full" />
          <SkeletonBlock width="70px" height="24px" rounded="full" />
        </div>
        <SkeletonBlock width="60%" height="16px" />
      </div>
    </div>
  );
}

export function SalonCardGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <SalonCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function DetailPageSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-5 py-10 space-y-10">
      {/* Header */}
      <div className="flex items-center gap-4">
        <SkeletonBlock width="100px" height="16px" />
      </div>
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="space-y-8">
          <SkeletonBlock height="320px" className="w-full rounded-3xl" />
          <SkeletonBlock height="220px" className="w-full rounded-3xl" />
          <SkeletonBlock height="160px" className="w-full rounded-3xl" />
        </div>
        <div className="space-y-6">
          <SkeletonBlock height="450px" className="w-full rounded-3xl" />
        </div>
      </div>
    </div>
  );
}

export function AIResultSkeleton({ type = "analysis" }: { type?: "analysis" | "package" | "plan" }) {
  if (type === "analysis") {
    return (
      <div className="space-y-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card rounded-2xl p-5 flex items-center gap-5">
              <SkeletonBlock width="56px" height="56px" rounded="2xl" />
              <div className="space-y-2.5 flex-1">
                <SkeletonBlock width="60%" height="14px" />
                <SkeletonBlock width="80%" height="24px" />
                <SkeletonBlock width="50%" height="12px" />
              </div>
            </div>
          ))}
        </div>
        <div className="glass-card rounded-2xl p-8 space-y-5">
          <SkeletonBlock width="40%" height="24px" />
          <SkeletonBlock width="100%" height="16px" />
          <SkeletonBlock width="85%" height="16px" />
          <SkeletonBlock width="70%" height="16px" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="glass-card rounded-2xl p-6 space-y-4">
              <div className="flex justify-between">
                <SkeletonBlock width="48px" height="48px" rounded="xl" />
                <SkeletonBlock width="90px" height="28px" rounded="full" />
              </div>
              <SkeletonBlock width="70%" height="18px" />
              <SkeletonBlock width="100%" height="14px" />
              <SkeletonBlock width="90%" height="14px" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="glass-card rounded-3xl overflow-hidden">
          <div className="p-6 bg-surface-2">
            <SkeletonBlock width="140px" height="18px" className="mb-3" />
            <SkeletonBlock width="65%" height="28px" />
          </div>
          <div className="p-6 space-y-4">
            {[1, 2].map((j) => (
              <div key={j} className="glass-light rounded-xl p-5 flex items-center gap-4">
                <SkeletonBlock width="40px" height="40px" rounded="lg" />
                <div className="flex-1">
                  <SkeletonBlock width="65%" height="16px" />
                  <SkeletonBlock width="45%" height="12px" className="mt-1.5" />
                </div>
                <SkeletonBlock width="70px" height="16px" />
              </div>
            ))}
            <SkeletonBlock height="70px" className="w-full mt-5 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}