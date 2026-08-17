import Link from "next/link";
import type { Vehicle } from "@/lib/types";
import { formatPrice } from "@/lib/filters";
import { AspectImage } from "@/components/ui/AspectImage";
import { Badge } from "@/components/ui/Badge";
import {
  formatMotExpiryShort,
  motStatusTone,
} from "@/lib/rent-format";

interface RentVehicleCardProps {
  vehicle: Vehicle;
  /** Green card styling for dark homepage hire section */
  variant?: "default" | "accent";
}

export function RentVehicleCard({ vehicle, variant = "default" }: RentVehicleCardProps) {
  const weeklyRent = vehicle.weeklyRent ?? vehicle.price;
  const motTone = motStatusTone(vehicle.motExpiry);
  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  const isAccent = variant === "accent";

  return (
    <Link
      href="/contact"
      className={[
        "group block rounded-[var(--radius-lg)] overflow-hidden transition-all duration-200",
        isAccent
          ? "bg-[var(--color-accent)] border border-white/15 shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:bg-[var(--color-accent-hover)] hover:border-white/25 hover:shadow-[0_12px_32px_rgba(0,0,0,0.28)]"
          : "bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:border-[var(--color-border-2)]",
      ].join(" ")}
    >
      <div className="relative">
        <AspectImage
          src={vehicle.images[0]}
          alt={title}
          aspectRatio="16/10"
          className="group-hover:scale-[1.02] transition-transform duration-300"
        />
        <Badge
          variant="default"
          className={[
            "absolute top-3 right-3 border-0 shadow-sm",
            isAccent
              ? "bg-white/95 text-[var(--color-accent)]"
              : "bg-[var(--color-dark)] text-white",
          ].join(" ")}
        >
          Available for hire
        </Badge>
      </div>

      <div className="p-4 sm:p-5">
        <h3
          className={[
            "font-semibold text-base sm:text-lg leading-snug mb-1 transition-colors",
            isAccent
              ? "text-white group-hover:text-white/90"
              : "text-[var(--color-text)] group-hover:text-[var(--color-accent)]",
          ].join(" ")}
        >
          {title}
        </h3>
        <p
          className={[
            "text-xs sm:text-sm uppercase tracking-wide mb-4",
            isAccent ? "text-white/75" : "text-[var(--color-text-muted)]",
          ].join(" ")}
        >
          {vehicle.year} · {vehicle.fuelType} · {vehicle.transmission}
        </p>

        <p
          className={[
            "num font-semibold text-xl tracking-tight mb-3",
            isAccent ? "text-white" : "text-[var(--color-text)]",
          ].join(" ")}
        >
          {formatPrice(weeklyRent)}
          <span
            className={[
              "text-base font-medium",
              isAccent ? "text-white/70" : "text-[var(--color-text-muted)]",
            ].join(" ")}
          >
            /wk
          </span>
        </p>

        <p
          className={[
            "flex items-center gap-2 text-sm",
            isAccent ? "text-white/75" : "text-[var(--color-text-muted)]",
          ].join(" ")}
        >
          <span
            className={[
              "inline-block w-2 h-2 rounded-full shrink-0",
              isAccent
                ? motTone === "ok"
                  ? "bg-emerald-200"
                  : "bg-amber-200"
                : motTone === "ok"
                  ? "bg-green-500"
                  : "bg-amber-500",
            ].join(" ")}
            aria-hidden="true"
          />
          {formatMotExpiryShort(vehicle.motExpiry)}
        </p>
      </div>
    </Link>
  );
}
