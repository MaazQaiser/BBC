import Link from "next/link";
import { ArrowRight, Video } from "lucide-react";
import type { Vehicle } from "@/lib/types";
import { formatPrice, formatMileage } from "@/lib/filters";
import { getTradeConditionSummary } from "@/lib/condition-ledger";
import { TradeVehicleBadge } from "@/components/trade/TradeVehicleBadge";

interface TradeVehicleCardProps {
  vehicle: Vehicle;
}

export function TradeVehicleCard({ vehicle }: TradeVehicleCardProps) {
  const href = `/trade/vehicles/${vehicle.id}`;
  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  const summary = getTradeConditionSummary(vehicle.conditionItems);

  return (
    <article
      className={[
        "flex flex-col h-full rounded-[var(--radius-lg)] overflow-hidden",
        "bg-white border border-[var(--color-border-strong)]",
        "shadow-[var(--shadow-card)]",
      ].join(" ")}
    >
      <div className="relative aspect-vehicle overflow-hidden bg-[var(--color-surface-2)]">
        {vehicle.images[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={vehicle.images[0]}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : null}

        <div className="absolute top-3 left-3">
          <TradeVehicleBadge size="sm" />
        </div>

        {vehicle.hasVideo && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-1 rounded-[var(--radius-sm)] bg-black/55 text-white text-[10px] font-medium backdrop-blur-sm">
            <Video size={11} strokeWidth={2.5} aria-hidden="true" />
            Video
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)] num mb-1">
          {vehicle.registration ? `${vehicle.registration} · ${vehicle.year}` : vehicle.year}
        </p>
        <h3 className="font-semibold text-[var(--color-text)] text-base leading-snug">
          {vehicle.make} {vehicle.model}
        </h3>
        <p className="text-sm text-[var(--color-text-muted)] mt-0.5 mb-3 line-clamp-1">
          {vehicle.variant}
        </p>

        <p className="text-sm text-[var(--color-text-body)] num mb-0.5">
          {formatMileage(vehicle.mileage)}
        </p>
        <p className="text-sm text-[var(--color-text-muted)] mb-3">
          {vehicle.fuelType} · {vehicle.transmission}
        </p>

        <p className="num font-semibold text-xl text-[var(--color-text)] tracking-tight mb-3">
          {formatPrice(vehicle.price)}
        </p>

        <p className="text-xs text-[var(--color-text-muted)] leading-relaxed line-clamp-2 mb-4">
          {summary}
        </p>

        <Link
          href={href}
          className={[
            "mt-auto inline-flex items-center justify-center gap-2 h-11 px-4",
            "rounded-[var(--radius-md)] bg-[var(--color-accent)] text-white",
            "text-sm font-semibold hover:bg-[var(--color-accent-hover)] transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2",
          ].join(" ")}
        >
          View Car
          <ArrowRight size={15} strokeWidth={2.5} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
