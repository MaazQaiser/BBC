import Link from "next/link";
import { Video } from "lucide-react";
import type { Vehicle } from "@/lib/types";
import { TradeVehicleBadge } from "@/components/trade/TradeVehicleBadge";
import { formatPrice, formatMileage, motRemainingMonths } from "@/lib/filters";
import { getServiceHistoryLabel } from "@/lib/service-history";
import { getFaultCount } from "@/lib/condition-ledger";

export interface VehicleCardProps {
  vehicle:         Vehicle;
  href?:           string;
  size?:           "default" | "compact";
  className?:      string;
  hideTradeBadge?: boolean;
}

export function VehicleCard({
  vehicle,
  href,
  size      = "default",
  className = "",
  hideTradeBadge = false,
}: VehicleCardProps) {
  const linkHref  = href ?? (vehicle.isTrade ? `/trade/vehicles/${vehicle.id}` : `/vehicles/${vehicle.id}`);
  const motMonths = motRemainingMonths(vehicle.motExpiry);
  const faultCount = getFaultCount(vehicle.conditionItems);
  const isSold = vehicle.isSold === true;

  return (
    <Link
      href={linkHref}
      className={[
        "group flex flex-col h-full rounded-[var(--radius-lg)] overflow-hidden",
        "bg-white border border-[var(--color-border)]",
        "shadow-[var(--shadow-card)]",
        "hover:shadow-[var(--shadow-card-hover)] hover:border-[var(--color-border-strong)]",
        "transition-shadow transition-[border-color] duration-[var(--duration-hover)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",
        isSold ? "opacity-75" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="relative aspect-vehicle overflow-hidden bg-[var(--color-surface-2)]">
        {vehicle.images[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={vehicle.images[0]}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : null}

        {isSold && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="px-3 py-1.5 rounded-[var(--radius-sm)] bg-[var(--color-surface-3)] border border-[var(--color-border)] text-sm font-semibold text-[var(--color-text-muted)]">
              Sold
            </span>
          </div>
        )}

        <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
          {vehicle.hasVideo && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-[var(--radius-sm)] bg-black/55 text-white text-[10px] font-medium backdrop-blur-sm">
              <Video size={11} strokeWidth={2.5} aria-hidden="true" />
              Video
            </span>
          )}
          {vehicle.isTrade && !hideTradeBadge && <TradeVehicleBadge size="sm" />}
        </div>
      </div>

      <div className={["flex flex-col flex-1", size === "compact" ? "p-4" : "p-5 sm:p-6"].join(" ")}>
        <h3 className="font-semibold text-[var(--color-text)] text-base leading-snug">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h3>
        <p className="text-sm text-[var(--color-text-muted)] leading-snug mt-1 mb-3 line-clamp-2">
          {vehicle.variant}
        </p>

        <p className="text-sm text-[var(--color-text-body)] num mb-1">
          {formatMileage(vehicle.mileage)}
        </p>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">
          {vehicle.fuelType} · {vehicle.transmission}
        </p>

        <p className="num font-semibold text-xl text-[var(--color-text)] tracking-tight mb-4">
          {formatPrice(vehicle.price)}
        </p>

        <ul className="mt-auto space-y-1 text-xs text-[var(--color-text-muted)]">
          {motMonths > 0 && (
            <li>
              MOT <span className="num">{motMonths}</span> {motMonths === 1 ? "month" : "months"}
            </li>
          )}
          <li>
            <span className="num">{faultCount}</span>{" "}
            {faultCount === 1 ? "fault listed" : "faults listed"}
          </li>
          <li>{getServiceHistoryLabel(vehicle.serviceHistoryStatus)}</li>
        </ul>
      </div>
    </Link>
  );
}
