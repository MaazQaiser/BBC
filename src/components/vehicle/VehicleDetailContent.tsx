import { Fuel, Gauge, Calendar, Palette, Car, Users, DoorOpen } from "lucide-react";
import type { Vehicle } from "@/lib/types";
import { formatMileage } from "@/lib/filters";
import { buildWhatsIncluded } from "@/lib/vehicle-detail";
import { Gallery } from "@/components/vehicle/Gallery";
import { PriceIncludedSection } from "@/components/vehicle/PriceIncludedSection";
import { VehicleVideoSection } from "@/components/vehicle/VehicleVideoSection";
import { ConditionLedger } from "@/components/vehicle/ConditionLedgerItem";
import { MotHistory } from "@/components/vehicle/MotHistory";
import { DocumentCard } from "@/components/vehicle/DocumentCard";
import { RunningCosts } from "@/components/vehicle/RunningCosts";
import { LocationSection } from "@/components/vehicle/LocationSection";

export interface VehicleDetailContentProps {
  vehicle: Vehicle;
}

function SpecItem({
  icon: Icon,
  label,
  value,
}: {
  icon:  typeof Fuel;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2.5 p-3 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)]">
      <Icon size={15} className="shrink-0 text-[var(--color-text-faint)]" aria-hidden="true" />
      <div className="min-w-0">
        <p className="type-caption text-[var(--color-text-faint)]">{label}</p>
        <p className="type-small font-medium text-[var(--color-text)] num truncate">{value}</p>
      </div>
    </div>
  );
}

/**
 * Shared vehicle detail sections — same order as retail.
 * Do not reorder sections.
 */
export function VehicleDetailContent({ vehicle }: VehicleDetailContentProps) {
  const title         = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  const whatsIncluded = buildWhatsIncluded(vehicle);

  return (
    <article className="max-w-3xl space-y-12">
      {/* 1. Photo Gallery */}
      <Gallery images={vehicle.images} alt={title} />

      {/* 2. Vehicle Title, Derivative & Key Specifications */}
      <section aria-labelledby="vehicle-title">
        <h1 id="vehicle-title" className="type-h2 text-[var(--color-text)] mb-1">
          {title}
        </h1>
        <p className="type-body text-[var(--color-text-muted)] mb-5">{vehicle.variant}</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <SpecItem icon={Calendar} label="Year"     value={String(vehicle.year)} />
          <SpecItem icon={Gauge}    label="Mileage"  value={formatMileage(vehicle.mileage)} />
          <SpecItem icon={Fuel}     label="Fuel"     value={vehicle.fuelType} />
          <SpecItem icon={Car}      label="Gearbox"  value={vehicle.transmission} />
          <SpecItem icon={Car}      label="Body"     value={vehicle.bodyType} />
          <SpecItem icon={Palette}  label="Colour"   value={vehicle.colour} />
          <SpecItem icon={DoorOpen} label="Doors"    value={String(vehicle.doors)} />
          <SpecItem icon={Users}    label="Seats"    value={String(vehicle.seats)} />
          <SpecItem icon={Car}      label="Engine"   value={`${vehicle.engineCC}cc`} />
        </div>
      </section>

      {/* 3. Price & What's Included */}
      <PriceIncludedSection price={vehicle.price} whatsIncluded={whatsIncluded} />

      {/* 4. Vehicle Video */}
      {vehicle.hasVideo && vehicle.videoUrl && (
        <VehicleVideoSection
          src={vehicle.videoUrl}
          posterImage={vehicle.images[0]}
          title={`${title} walkaround video`}
        />
      )}

      {/* 5. Condition Ledger */}
      <ConditionLedger items={vehicle.conditionItems} />

      {/* 6. Full MOT History */}
      <MotHistory history={vehicle.motHistory} />

      {/* 7. Documents & History (includes service history) */}
      <DocumentCard
        vehicle={vehicle}
        serviceRecords={vehicle.serviceRecords}
        serviceHistoryPresent={vehicle.serviceHistoryPresent}
      />

      {/* 8. Running Cost Figures */}
      <RunningCosts
        costs={vehicle.runningCosts}
        formerKeepers={vehicle.formerKeepers ?? 2}
      />

      {/* 9. Location & Directions */}
      <LocationSection />
    </article>
  );
}
