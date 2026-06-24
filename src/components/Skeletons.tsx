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
      className={`animate-pulse bg-surface-3 ${rounded} ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}

export function SalonCardSkeleton() {
  return (
    <div className="glass-light rounded-3xl border border-border overflow-hidden" aria-label="Loading salon...">
      <SkeletonBlock height="192px" className="w-full" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <div className="space-y-2 flex-1">
            <SkeletonBlock width="70%" height="16px" />
            <SkeletonBlock width="40%" height="12px" />
          </div>
          <SkeletonBlock width="48px" height="24px" rounded="full" />
        </div>
        <div className="flex gap-2">
          <SkeletonBlock width="60px" height="20px" rounded="full" />
          <SkeletonBlock width="60px" height="20px" rounded="full" />
        </div>
        <SkeletonBlock width="50%" height="14px" />
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
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SkeletonBlock width="80px" height="14px" />
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <SkeletonBlock height="300px" className="w-full rounded-3xl" />
          <SkeletonBlock height="200px" className="w-full rounded-3xl" />
          <SkeletonBlock height="150px" className="w-full rounded-3xl" />
        </div>
        <div className="space-y-4">
          <SkeletonBlock height="400px" className="w-full rounded-3xl" />
        </div>
      </div>
    </div>
  );
}

export function AIResultSkeleton({ type = "analysis" }: { type?: "analysis" | "package" | "plan" }) {
  if (type === "analysis") {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-light rounded-2xl p-4 flex items-center gap-4">
              <SkeletonBlock width="48px" height="48px" rounded="xl" />
              <div className="space-y-2 flex-1">
                <SkeletonBlock width="60%" height="12px" />
                <SkeletonBlock width="80%" height="20px" />
                <SkeletonBlock width="50%" height="10px" />
              </div>
            </div>
          ))}
        </div>
        <div className="glass-light rounded-2xl p-6 space-y-4">
          <SkeletonBlock width="40%" height="20px" />
          <SkeletonBlock width="100%" height="14px" />
          <SkeletonBlock width="85%" height="14px" />
          <SkeletonBlock width="70%" height="14px" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="glass-light rounded-2xl p-5 space-y-3">
              <div className="flex justify-between">
                <SkeletonBlock width="40px" height="40px" rounded="xl" />
                <SkeletonBlock width="80px" height="24px" rounded="full" />
              </div>
              <SkeletonBlock width="70%" height="16px" />
              <SkeletonBlock width="100%" height="12px" />
              <SkeletonBlock width="90%" height="12px" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="glass-card rounded-3xl overflow-hidden">
          <div className="p-6 bg-surface-2">
            <SkeletonBlock width="120px" height="16px" className="mb-2" />
            <SkeletonBlock width="60%" height="24px" />
          </div>
          <div className="p-6 space-y-3">
            {[1, 2].map((j) => (
              <div key={j} className="glass-light rounded-xl p-4 flex items-center gap-3">
                <SkeletonBlock width="32px" height="32px" rounded="lg" />
                <div className="flex-1">
                  <SkeletonBlock width="60%" height="14px" />
                  <SkeletonBlock width="40%" height="10px" className="mt-1" />
                </div>
                <SkeletonBlock width="60px" height="14px" />
              </div>
            ))}
            <SkeletonBlock height="60px" className="w-full mt-4 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}