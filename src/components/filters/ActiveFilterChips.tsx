"use client";

import type { FilterState, Vehicle } from "@/lib/types";
import { DEFAULT_FILTERS } from "@/lib/types";
import { buildActiveFilterChips } from "@/lib/filters";
import { FilterChipRemoveIcon, FilterPanelClearButton } from "@/components/filters/FilterPanel";

interface ActiveFilterChipsProps {
  filters: FilterState;
  onChange: (next: FilterState) => void;
  onClearAll?: () => void;
  allVehicles?: Vehicle[];
}

export function ActiveFilterChips({ filters, onChange, onClearAll, allVehicles }: ActiveFilterChipsProps) {
  const chips = buildActiveFilterChips(filters, allVehicles);
  if (chips.length === 0) return null;

  const handleClearAll = () => {
    if (onClearAll) onClearAll();
    else onChange(DEFAULT_FILTERS);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-[var(--color-text-muted)] shrink-0">Filters:</span>
      {chips.map((chip) => (
        <button
          key={chip.id}
          type="button"
          onClick={() => onChange(chip.remove(filters))}
          className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-[var(--radius-md)] text-xs font-medium border border-[var(--color-border)] bg-white text-[var(--color-text)] hover:border-[var(--color-border-strong)] transition-colors"
        >
          {chip.label}
          <FilterChipRemoveIcon />
          <span className="sr-only">Remove {chip.label}</span>
        </button>
      ))}
      <FilterPanelClearButton onClear={handleClearAll} />
    </div>
  );
}
