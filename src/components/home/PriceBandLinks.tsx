"use client";

import Link from "next/link";
import { getHomepagePriceBands } from "@/lib/filters";
import type { Vehicle } from "@/lib/types";

interface PriceBandLinksProps {
  vehicles: Vehicle[];
}

export function PriceBandLinks({ vehicles }: PriceBandLinksProps) {
  const bands = getHomepagePriceBands(vehicles);
  if (bands.length === 0) return null;

  return (
    <section aria-labelledby="price-bands-heading" className="mt-8">
      <h2
        id="price-bands-heading"
        className="text-sm font-semibold text-[var(--color-text)] mb-3"
      >
        Browse by price
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {bands.map(({ max, count }) => (
          <Link
            key={max}
            href={`/?pmax=${max}`}
            className="snap-start shrink-0 min-w-[120px] px-4 py-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-light)] transition-colors duration-[var(--duration-hover)]"
          >
            <span className="block text-sm font-semibold text-[var(--color-text)] whitespace-nowrap">
              Under £{max.toLocaleString("en-GB")}
            </span>
            <span className="block text-xs text-[var(--color-text-muted)] num mt-0.5">
              {count} {count === 1 ? "car" : "cars"}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
