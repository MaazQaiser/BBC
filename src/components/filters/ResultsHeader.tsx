"use client";

interface ResultsHeaderProps {
  count: number;
  sortControl: React.ReactNode;
  filtersControl?: React.ReactNode;
}

export function ResultsHeader({ count, sortControl, filtersControl }: ResultsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
      <div className="flex items-center gap-3 flex-wrap">
        <p className="text-base font-semibold text-[var(--color-text)] num">
          {count} {count === 1 ? "car" : "cars"}
        </p>
        {filtersControl}
      </div>
      <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto min-w-0">
        <span className="text-sm text-[var(--color-text-muted)] hidden sm:inline">Sort</span>
        {sortControl}
      </div>
    </div>
  );
}
