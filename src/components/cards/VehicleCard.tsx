import Link from "next/link";
import { Gauge, Fuel, Cog } from "lucide-react";
import type { Vehicle } from "@/lib/types";
import {
  VideoBadge,
  ServiceHistoryBadge,
  FaultCountBadge,
} from "@/components/badges/Badge";
import { TradeVehicleBadge } from "@/components/trade/TradeVehicleBadge";
import { formatPrice, formatMileage, motRemainingMonths } from "@/lib/filters";

/* ─── Types ──────────────────────────────────────────────────────────── */
export interface VehicleCardProps {
  vehicle:    Vehicle;
  href?:      string;
  size?:      "default" | "compact";
  className?: string;
}

/* ─── Image placeholder ──────────────────────────────────────────────── */
function VehicleImagePlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-surface-2)]">
      <svg
        viewBox="0 0 80 50"
        fill="none"
        className="w-16 opacity-20"
        aria-hidden="true"
      >
        <path
          d="M8 34h64v5H8v-5zm4 0 8-13h32l8 13M20 20l4-8h24l4 8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="20" cy="37" r="3.5" stroke="currentColor" strokeWidth="2" />
        <circle cx="60" cy="37" r="3.5" stroke="currentColor" strokeWidth="2" />
      </svg>
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────────────────────
   Card spec:
   • White background
   • 16px border radius
   • 1px solid #E8E8E8 border
   • Shadow: 0 4px 20px rgba(0,0,0,.05)
   • Hover shadow: 0 12px 32px rgba(0,0,0,.08)
   • 24px padding
   • Image: 16:10 aspect ratio
────────────────────────────────────────────────────────────────────────── */
export function VehicleCard({
  vehicle,
  href,
  size      = "default",
  className = "",
}: VehicleCardProps) {
  const linkHref  = href ?? (vehicle.isTrade ? `/trade/vehicles/${vehicle.id}` : `/vehicles/${vehicle.id}`);
  const motMonths = motRemainingMonths(vehicle.motExpiry);

  return (
    <Link
      href={linkHref}
      className={[
        "group flex flex-col h-full rounded-[var(--radius-lg)] overflow-hidden",
        "bg-white border border-[var(--color-border)]",
        "shadow-[var(--shadow-card)]",
        "hover:shadow-[var(--shadow-card-hover)] hover:border-[var(--color-border-strong)]",
        "transition-shadow transition-[border-color] duration-[var(--duration-hover)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* ── Image — 16:10 ─────────────────────────────────────────── */}
      <div className="relative aspect-vehicle overflow-hidden bg-[var(--color-surface-2)]">
        {vehicle.images[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={vehicle.images[0]}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <VehicleImagePlaceholder />
        )}

        {/* Badges — top-right */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
          {vehicle.hasVideo && <VideoBadge />}
          {vehicle.isTrade  && <TradeVehicleBadge size="sm" />}
        </div>
      </div>

      {/* ── Content — 24px padding ───────────────────────────────── */}
      <div className={["flex flex-col flex-1", size === "compact" ? "p-4" : "p-6"].join(" ")}>

        {/* Title + variant */}
        <h3 className="font-semibold text-[var(--color-text)] text-base leading-snug mb-1 line-clamp-2">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h3>
        <p className="text-sm text-[var(--color-text-muted)] leading-snug mb-4 line-clamp-2 min-h-[2.5rem]">
          {vehicle.variant}
        </p>

        {/* Key specs — 2-column grid avoids clipping on narrow cards */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs text-[var(--color-text-muted)] mb-4">
          <span className="flex items-center gap-1.5 min-w-0">
            <Gauge size={13} className="shrink-0" aria-hidden="true" />
            <span className="num truncate">{formatMileage(vehicle.mileage)}</span>
          </span>
          <span className="flex items-center gap-1.5 min-w-0">
            <Fuel size={13} className="shrink-0" aria-hidden="true" />
            <span className="truncate">{vehicle.fuelType}</span>
          </span>
          <span className="flex items-center gap-1.5 min-w-0 col-span-2">
            <Cog size={13} className="shrink-0" aria-hidden="true" />
            <span className="truncate">{vehicle.transmission}</span>
          </span>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-1.5 mb-4 min-h-[22px]">
          {vehicle.serviceHistoryPresent && <ServiceHistoryBadge />}
          <FaultCountBadge count={vehicle.conditionItems.length} />
          {motMonths > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-[var(--radius-sm)] bg-[var(--color-info-bg)] text-[var(--color-info-text)] border border-[var(--color-info-border)] text-[10px] font-medium">
              <span className="num">{motMonths}m</span>&nbsp;MOT
            </span>
          )}
        </div>

        {/* Price — pinned to bottom */}
        <p className="num font-semibold text-xl text-[var(--color-text)] tracking-tight mt-auto">
          {formatPrice(vehicle.price)}
        </p>
      </div>
    </Link>
  );
}
