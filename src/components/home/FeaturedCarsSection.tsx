"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Gauge,
  Cog,
  Fuel,
  Users,
} from "lucide-react";
import type { Vehicle } from "@/lib/types";
import { formatPrice, formatMileage } from "@/lib/filters";

interface FeaturedCarsSectionProps {
  vehicles: Vehicle[];
}

function FeaturedCarCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Link
      href={`/vehicles/${vehicle.id}`}
      className="group flex flex-col shrink-0 w-[min(18.75rem,calc(100vw-2.5rem))] sm:w-[320px] snap-start rounded-[var(--radius-2xl)] bg-white border border-[var(--color-border)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-[var(--duration-hover)] overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] bg-[var(--color-surface-2)] overflow-hidden">
        {vehicle.images[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={vehicle.images[0]}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[var(--duration-hover)]"
          />
        ) : null}

        {/* Price pill */}
        <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-[var(--radius-pill)] bg-white shadow-[var(--shadow-sm)]">
          <span className="num text-sm font-bold text-[var(--color-text)]">
            {formatPrice(vehicle.price)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-[var(--color-text)] text-base leading-snug mb-2 line-clamp-2">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h3>
        <p className="text-xs text-[var(--color-text-muted)] mb-3 line-clamp-1">{vehicle.variant}</p>

        <p className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] mb-4">
          <MapPin size={14} className="shrink-0" strokeWidth={2} aria-hidden="true" />
          Bury, Greater Manchester
        </p>

        <div className="border-t border-[var(--color-border)] pt-4 grid grid-cols-2 gap-x-4 gap-y-3">
          <span className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] min-w-0">
            <Gauge size={14} className="shrink-0 text-[var(--color-text-faint)]" aria-hidden="true" />
            <span className="num truncate">{formatMileage(vehicle.mileage)}</span>
          </span>
          <span className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] min-w-0">
            <Cog size={14} className="shrink-0 text-[var(--color-text-faint)]" aria-hidden="true" />
            <span className="truncate">{vehicle.transmission}</span>
          </span>
          <span className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] min-w-0">
            <Fuel size={14} className="shrink-0 text-[var(--color-text-faint)]" aria-hidden="true" />
            <span className="truncate">{vehicle.fuelType}</span>
          </span>
          <span className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] min-w-0">
            <Users size={14} className="shrink-0 text-[var(--color-text-faint)]" aria-hidden="true" />
            <span className="num truncate">{vehicle.seats} seats</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

export function FeaturedCarsSection({ vehicles }: FeaturedCarsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = 340;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  if (!vehicles.length) return null;

  return (
    <section className="py-16 lg:py-20 bg-[var(--color-surface-2)]" aria-labelledby="featured-heading">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-[64px]">
        {/* Header */}
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <h2
              id="featured-heading"
              className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] mb-2"
            >
              Featured Cars
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-text-muted)]">
              Hand-picked from our current stock
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Scroll featured cars left"
              className="w-10 h-10 inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-border-strong)] transition-colors"
            >
              <ChevronLeft size={20} strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Scroll featured cars right"
              className="w-10 h-10 inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-border-strong)] transition-colors"
            >
              <ChevronRight size={20} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {vehicles.map((vehicle) => (
            <FeaturedCarCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
}
