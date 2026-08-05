import type { Vehicle } from "@/lib/types";
import { VehicleCard } from "./VehicleCard";

interface VehicleGridProps {
  vehicles: Vehicle[];
  emptyMessage?: string;
  tradeLinks?: boolean;
}

export function VehicleGrid({ vehicles, emptyMessage, tradeLinks }: VehicleGridProps) {
  if (vehicles.length === 0) {
    return (
      <div className="py-16 text-center text-[var(--color-text-muted)]">
        <p className="text-base">{emptyMessage ?? "No vehicles match your search."}</p>
        <p className="text-sm mt-1 text-[var(--color-text-faint)]">Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          href={tradeLinks ? `/trade/vehicles/${vehicle.id}` : `/vehicles/${vehicle.id}`}
        />
      ))}
    </div>
  );
}
