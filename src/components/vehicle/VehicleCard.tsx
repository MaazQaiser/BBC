import Link from "next/link";
import { Fuel, Gauge, AlertCircle, Video, BookOpen } from "lucide-react";
import type { Vehicle } from "@/lib/types";
import { AspectImage } from "@/components/ui/AspectImage";
import { Badge } from "@/components/ui/Badge";
import { formatPrice, formatMileage } from "@/lib/filters";

interface VehicleCardProps {
  vehicle: Vehicle;
  href?: string;
}

export function VehicleCard({ vehicle, href }: VehicleCardProps) {
  const linkHref = href ?? `/vehicles/${vehicle.id}`;

  const faultCount = vehicle.conditionItems.length;
  const hasMajorFault = vehicle.conditionItems.some((c) => c.severity === "major" || c.severity === "mot-fail");

  return (
    <Link
      href={linkHref}
      className="group block bg-[var(--color-surface)] rounded-[var(--radius-lg)] overflow-hidden border border-[var(--color-border)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:border-[var(--color-border-2)] transition-all duration-200"
    >
      {/* Image */}
      <AspectImage
        src={undefined}
        alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
        aspectRatio="16/10"
        className="group-hover:scale-[1.02] transition-transform duration-300"
      />

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-[var(--color-text)] text-base leading-snug mb-0.5 group-hover:text-[var(--color-accent)] transition-colors">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h3>
        <p className="text-sm text-[var(--color-text-muted)] mb-3 truncate">{vehicle.variant}</p>

        {/* Key specs row */}
        <div className="flex items-center gap-3 text-sm text-[var(--color-text-muted)] mb-3">
          <span className="flex items-center gap-1 num">
            <Gauge size={13} className="shrink-0" />
            {formatMileage(vehicle.mileage)}
          </span>
          <span className="flex items-center gap-1">
            <Fuel size={13} className="shrink-0" />
            {vehicle.fuelType}
          </span>
          <span className="text-[var(--color-text-faint)] truncate">{vehicle.transmission}</span>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-1.5 flex-wrap mb-3 min-h-[22px]">
          {vehicle.serviceHistoryPresent && (
            <Badge variant="success">
              <BookOpen size={11} />
              Service History
            </Badge>
          )}
          {vehicle.hasVideo && (
            <Badge variant="default">
              <Video size={11} />
              Video
            </Badge>
          )}
          {faultCount > 0 && (
            <Badge variant={hasMajorFault ? "warn" : "muted"}>
              <AlertCircle size={11} />
              {faultCount} {faultCount === 1 ? "fault" : "faults"} declared
            </Badge>
          )}
        </div>

        {/* Price */}
        <p className="num font-semibold text-xl text-[var(--color-text)]">{formatPrice(vehicle.price)}</p>
      </div>
    </Link>
  );
}
