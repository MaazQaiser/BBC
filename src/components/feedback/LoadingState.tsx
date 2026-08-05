/**
 * Skeleton loaders — composable primitives for consistent loading UI.
 * Use these instead of spinners to reduce perceived wait time.
 */

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={[
        "rounded-[var(--radius-sm)] bg-[var(--color-surface-2)] animate-pulse",
        className,
      ].join(" ")}
      aria-hidden="true"
    />
  );
}

/** Skeleton for a single VehicleCard */
export function VehicleCardSkeleton() {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
      <Skeleton className="aspect-vehicle w-full rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-3.5 w-3/5" />
        <div className="flex gap-4">
          <Skeleton className="h-3.5 w-16" />
          <Skeleton className="h-3.5 w-16" />
          <Skeleton className="h-3.5 w-16" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <Skeleton className="h-7 w-24" />
      </div>
    </div>
  );
}

/** Grid of vehicle card skeletons */
export function VehicleGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <VehicleCardSkeleton key={i} />
      ))}
    </div>
  );
}

/** Generic text block skeleton */
export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={["h-4", i === lines - 1 ? "w-3/4" : "w-full"].join(" ")}
        />
      ))}
    </div>
  );
}

export { Skeleton };
