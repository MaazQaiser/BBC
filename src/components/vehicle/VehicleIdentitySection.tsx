import type { Vehicle } from "@/lib/types";
import { buildKeySpecWithMileage } from "@/lib/vehicle-detail";

interface VehicleIdentitySectionProps {
  vehicle: Vehicle;
}

export function VehicleIdentitySection({ vehicle }: VehicleIdentitySectionProps) {
  const { mileage, specLine } = buildKeySpecWithMileage(vehicle);

  return (
    <section aria-labelledby="vehicle-title" className="space-y-2">
      <h1
        id="vehicle-title"
        className="text-2xl sm:text-3xl font-semibold text-[var(--color-text)] tracking-tight leading-tight"
      >
        {vehicle.year} {vehicle.make} {vehicle.model}
      </h1>

      <p className="text-base sm:text-lg text-[var(--color-text-body)] leading-snug">
        {vehicle.variant}
      </p>

      <p className="text-sm sm:text-base text-[var(--color-text-muted)]">
        <span className="num">{mileage}</span>
        <span aria-hidden="true"> · </span>
        {specLine}
      </p>
    </section>
  );
}
