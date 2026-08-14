import type { ReactNode } from "react";

export interface VehicleDetailSectionProps {
  id?: string;
  title: string;
  description?: string;
  badge?: string;
  children: ReactNode;
  className?: string;
}

/** Unified card shell for vehicle detail content blocks. */
export function VehicleDetailSection({
  id,
  title,
  description,
  badge,
  children,
  className = "",
}: VehicleDetailSectionProps) {
  const headingId = id ?? `${title.toLowerCase().replace(/\s+/g, "-")}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={[
        "rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white",
        "p-5 sm:p-6 shadow-[var(--shadow-sm)] min-w-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <header className="mb-5 pb-4 border-b border-[var(--color-border)]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h2 id={headingId} className="type-h4 tracking-tight">
            {title}
          </h2>
          {badge ? (
            <span className="num shrink-0 rounded-[var(--radius-pill)] bg-[var(--color-surface-2)] px-2.5 py-1 text-xs font-medium text-[var(--color-text-muted)]">
              {badge}
            </span>
          ) : null}
        </div>
        {description ? (
          <p className="type-small text-[var(--color-text-muted)] mt-2 leading-relaxed max-w-prose">
            {description}
          </p>
        ) : null}
      </header>

      <div className="min-w-0">{children}</div>
    </section>
  );
}
