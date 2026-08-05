"use client";

import { useRouter } from "next/navigation";
import { getPopularSearches, filtersToParams } from "@/lib/filters";
import { DEFAULT_FILTERS } from "@/lib/types";
import type { Vehicle } from "@/lib/types";

interface PopularSearchesProps {
  vehicles: Vehicle[];
}

export function PopularSearches({ vehicles }: PopularSearchesProps) {
  const router = useRouter();
  const searches = getPopularSearches(vehicles);
  if (searches.length === 0) return null;

  const handleClick = (params: typeof DEFAULT_FILTERS) => {
    const p = filtersToParams({ ...DEFAULT_FILTERS, ...params });
    router.push(`/search?${p.toString()}`);
  };

  return (
    <section aria-labelledby="popular-searches-heading">
      <h2 id="popular-searches-heading" className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-faint)] mb-3">
        Popular Searches
      </h2>
      <div className="flex flex-wrap gap-2">
        {searches.map(({ label, params }) => (
          <button
            key={label}
            type="button"
            onClick={() => handleClick(params as typeof DEFAULT_FILTERS)}
            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}
