import type { ReactNode } from "react";

export interface EmptyStateProps {
  icon?:        ReactNode;
  title:        string;
  description?: string;
  action?:      ReactNode;
  className?:   string;
}

export function EmptyState({ icon, title, description, action, className = "" }: EmptyStateProps) {
  return (
    <div
      className={[
        "flex flex-col items-center text-center py-16 px-6",
        className,
      ].join(" ")}
      role="status"
    >
      {icon && (
        <div className="w-14 h-14 rounded-[var(--radius-xl)] bg-[var(--color-surface-2)] flex items-center justify-center text-[var(--color-text-faint)] mb-4">
          {icon}
        </div>
      )}
      <h3 className="font-semibold text-base text-[var(--color-text)] mb-2">{title}</h3>
      {description && (
        <p className="type-small text-[var(--color-text-muted)] max-w-xs leading-relaxed mb-5">
          {description}
        </p>
      )}
      {action}
    </div>
  );
}
