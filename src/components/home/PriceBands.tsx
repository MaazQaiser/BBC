"use client";

import Link from "next/link";
import { getPriceBands } from "@/lib/filters";
import type { Vehicle } from "@/lib/types";

interface PriceBandsProps {
  vehicles: Vehicle[];
}

export function PriceBands({ vehicles }: PriceBandsProps) {
  const bands = getPriceBands(vehicles);
  if (bands.length === 0) return null;

  return (
    <section aria-labelledby="price-bands-heading">
      <h2 id="price-bands-heading" className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-faint)] mb-3">
        Browse by Budget
      </h2>
      <div className="flex flex-wrap gap-2">
        {bands.map(({ max, count }) => (
          <Link
            key={max}
            href={`/search?pmax=${max}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
          >
            Under £{max.toLocaleString("en-GB")}
            <span className="num text-xs text-[var(--color-text-muted)]">({count})</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
