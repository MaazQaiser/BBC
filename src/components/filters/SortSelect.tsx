"use client";

import { ChevronDown } from "lucide-react";
import type { SortOption } from "@/lib/types";
import { SORT_OPTIONS } from "@/lib/sort";

interface SortSelectProps {
  value: SortOption;
  onChange: (sort: SortOption) => void;
  className?: string;
}

export function SortSelect({ value, onChange, className = "" }: SortSelectProps) {
  const selected = SORT_OPTIONS.find((o) => o.value === value);

  return (
    <div className={["relative inline-flex items-center w-full sm:w-auto min-w-0", className].join(" ")}>
      <label htmlFor="sort-select" className="sr-only">
        Sort results
      </label>
      <select
        id="sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="appearance-none h-10 w-full sm:w-auto max-w-full pl-3 pr-9 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white text-sm font-medium text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] cursor-pointer"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className="absolute right-2.5 pointer-events-none text-[var(--color-text-faint)]"
        aria-hidden="true"
      />
      <span className="sr-only">Currently sorted by {selected?.label}</span>
    </div>
  );
}
