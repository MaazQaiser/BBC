import type { Vehicle } from "@/lib/types";
import { VehicleCard } from "./VehicleCard";

export interface VehicleGridProps {
  vehicles:       Vehicle[];
  emptyMessage?:  string;
  tradeLinks?:    boolean;
  hideTradeBadge?: boolean;
  columns?:       2 | 3 | 4;
  className?:     string;
}

/* ─── Column presets ─────────────────────────────────────────────────────
   Gap: 24px (spec: card gap 24px)
────────────────────────────────────────────────────────────────────────── */
const COLS: Record<2 | 3 | 4, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
};

export function VehicleGrid({
  vehicles,
  emptyMessage,
  tradeLinks,
  hideTradeBadge,
  columns   = 3,
  className = "",
}: VehicleGridProps) {
  if (vehicles.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="type-body text-[var(--color-text-muted)]">
          {emptyMessage ?? "No vehicles found."}
        </p>
      </div>
    );
  }

  return (
    <div
      className={[
        "grid gap-6",   /* 24px — spec: card gap 24px */
        COLS[columns],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {vehicles.map((v) => (
        <VehicleCard
          key={v.id}
          vehicle={v}
          href={tradeLinks ? `/trade/vehicles/${v.id}` : `/vehicles/${v.id}`}
          hideTradeBadge={hideTradeBadge}
          className="h-full"
        />
      ))}
    </div>
  );
}
