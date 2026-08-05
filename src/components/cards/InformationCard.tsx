import type { ReactNode } from "react";

export interface InformationCardProps {
  icon?:      ReactNode;
  label?:     string;
  title:      string;
  body?:      string;
  footer?:    ReactNode;
  className?: string;
  children?:  ReactNode;
}

/**
 * General-purpose information card.
 * Used for feature callouts, informational panels, and trust items.
 */
export function InformationCard({
  icon,
  label,
  title,
  body,
  footer,
  className = "",
  children,
}: InformationCardProps) {
  return (
    <div
      className={[
        "rounded-[var(--radius-lg)] border border-[var(--color-border)]",
        "bg-[var(--color-surface)] p-5 flex flex-col gap-3",
        className,
      ].join(" ")}
    >
      {icon && (
        <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-accent-light)] flex items-center justify-center text-[var(--color-accent)] shrink-0">
          {icon}
        </div>
      )}

      <div className="flex-1">
        {label && (
          <p className="type-section-label mb-1">{label}</p>
        )}
        <h3 className="font-semibold text-[var(--color-text)] text-base leading-snug mb-1.5">
          {title}
        </h3>
        {body && (
          <p className="type-small text-[var(--color-text-muted)] leading-relaxed">{body}</p>
        )}
        {children}
      </div>

      {footer && <div className="mt-auto pt-2">{footer}</div>}
    </div>
  );
}
