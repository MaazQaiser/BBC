"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/buttons/Button";

export interface NoResultsProps {
  query?:    string;
  onClear?:  () => void;
}

export function NoResults({ query, onClear }: NoResultsProps) {
  return (
    <div className="flex flex-col items-center text-center py-16 px-6" role="status">
      <div className="w-14 h-14 rounded-[var(--radius-xl)] bg-[var(--color-surface-2)] flex items-center justify-center text-[var(--color-text-faint)] mb-4">
        <Search size={22} />
      </div>

      <h3 className="font-semibold text-base text-[var(--color-text)] mb-2">
        No vehicles found
      </h3>

      <p className="type-small text-[var(--color-text-muted)] max-w-xs leading-relaxed mb-5">
        {query
          ? `No results for "${query}". Try adjusting your search or removing filters.`
          : "No vehicles match your current filters. Try widening your search."}
      </p>

      {onClear && (
        <Button variant="secondary" size="sm" onClick={onClear}>
          Clear all filters
        </Button>
      )}
    </div>
  );
}
