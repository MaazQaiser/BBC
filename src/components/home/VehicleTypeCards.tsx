import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BodyType } from "@/lib/types";
import { retailVehicles } from "@/lib/mock-data/vehicles";
import { VEHICLE_IMAGES } from "@/lib/vehicle-images";
import { Container } from "@/components/layout/Container";

/** 8 cards — 4×2 grid, matching Carento Browse by Type layout */
const BODY_TYPES: {
  label: BodyType;
  image: string;
}[] = [
  { label: "SUV",         image: VEHICLE_IMAGES.car05 },
  { label: "Hatchback",   image: VEHICLE_IMAGES.car03 },
  { label: "Saloon",      image: VEHICLE_IMAGES.car04 },
  { label: "Estate",      image: VEHICLE_IMAGES.car10 },
  { label: "MPV",         image: VEHICLE_IMAGES.car09 },
  { label: "Coupe",       image: VEHICLE_IMAGES.car06 },
  { label: "Convertible", image: VEHICLE_IMAGES.car07 },
  { label: "Van",         image: VEHICLE_IMAGES.car08 },
];

function countByBodyType(bodyType: BodyType) {
  return retailVehicles.filter((v) => v.bodyType === bodyType).length;
}

export function VehicleTypeCards() {
  const types = BODY_TYPES.map(({ label, image }) => ({
    label,
    image,
    count: countByBodyType(label),
    href: `/search?body=${encodeURIComponent(label)}`,
  }));

  return (
    <section className="py-16 lg:py-24 bg-white" aria-labelledby="types-heading">
      <Container>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-12">
          <div>
            <h2
              id="types-heading"
              className="text-[2rem] lg:text-[2.25rem] leading-tight font-bold text-[var(--color-text)] mb-2"
            >
              Browse by Body Type
            </h2>
            <p className="text-base text-[var(--color-text-muted)]">
              Find the perfect car for your needs
            </p>
          </div>

          <Link
            href="/search"
            className="link-cta shrink-0 self-start sm:self-auto"
          >
            View More
            <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
          </Link>
        </div>

        {/* 4 × 2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {types.map(({ label, image, count, href }) => (
            <Link
              key={label}
              href={href}
              className="group flex flex-col rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)] transition-shadow duration-[var(--duration-hover)]"
            >
              <div className="mb-5 overflow-hidden rounded-[var(--radius-xl)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt={label}
                  className="w-full aspect-[4/3] object-cover object-center group-hover:scale-[1.04] transition-transform duration-[var(--duration-hover)]"
                />
              </div>

              {/* Title + badge + arrow */}
              <div className="flex items-end justify-between gap-3 mt-auto">
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-[var(--color-text)] leading-snug mb-2.5">
                    {label}
                  </h3>
                  <span className="inline-block px-3 py-1 rounded-[var(--radius-pill)] bg-[#F3F4F6] text-xs font-medium text-[var(--color-text-muted)]">
                    <span className="num">{count}</span>{" "}
                    {count === 1 ? "Vehicle" : "Vehicles"}
                  </span>
                </div>

                <span
                  className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#F3F4F6] text-[var(--color-text)] group-hover:bg-[#E8E8E8] transition-colors duration-[var(--duration-hover)]"
                  aria-hidden="true"
                >
                  <ArrowRight size={15} strokeWidth={2} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
