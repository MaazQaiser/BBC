import type { ReactNode } from "react";

export interface FilterCardProps {
  title?:     string;
  children:   ReactNode;
  className?: string;
  /** Render children without the title divider above */
  flush?:     boolean;
}

/**
 * Container for a single filter group (e.g. Make, Price, Fuel).
 * Provides consistent padding and title treatment.
 */
export function FilterCard({ title, children, className = "", flush }: FilterCardProps) {
  return (
    <div
      className={[
        flush ? "" : "border-t border-[var(--color-border)] pt-4",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {title && (
        <p className="type-section-label mb-3">{title}</p>
      )}
      {children}
    </div>
  );
}
