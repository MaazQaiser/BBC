import type { ReactNode } from "react";

export interface TrustCardProps {
  icon:       ReactNode;
  title:      string;
  body:       string;
  className?: string;
}

/**
 * Trust signal card — used in the 3-panel trust section.
 * Intentionally minimal: icon, statement title, one sentence body.
 * No CTA, no decoration.
 */
export function TrustCard({ icon, title, body, className = "" }: TrustCardProps) {
  return (
    <div className={["flex flex-col gap-3", className].join(" ")}>
      <div
        className="w-11 h-11 rounded-[var(--radius-md)] bg-[var(--color-accent-light)] flex items-center justify-center text-[var(--color-accent)]"
        aria-hidden="true"
      >
        {icon}
      </div>
      <div>
        <p className="font-semibold text-[var(--color-text)] text-base mb-1.5 leading-snug">
          {title}
        </p>
        <p className="type-small text-[var(--color-text-muted)] leading-relaxed">{body}</p>
      </div>
    </div>
  );
}
