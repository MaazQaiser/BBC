"use client";

import type { ButtonHTMLAttributes } from "react";

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  count?: number;
}

export function Chip({ active, count, children, className = "", ...props }: ChipProps) {
  return (
    <button
      type="button"
      className={[
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium leading-none transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1 disabled:opacity-40 disabled:pointer-events-none cursor-pointer",
        active
          ? "bg-[var(--color-accent)] text-white"
          : "bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
      {count !== undefined && (
        <span
          className={[
            "num text-xs",
            active ? "opacity-80" : "text-[var(--color-text-muted)]",
          ].join(" ")}
        >
          ({count})
        </span>
      )}
    </button>
  );
}

interface StaticChipProps {
  children: React.ReactNode;
  className?: string;
}

export function StaticChip({ children, className = "" }: StaticChipProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium leading-none",
        "bg-[var(--color-badge-bg)] text-[var(--color-badge-text)]",
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
