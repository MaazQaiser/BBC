import type { ReactNode } from "react";

type BadgeVariant = "default" | "success" | "mot-fail" | "warn" | "muted";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default:    "bg-[var(--color-badge-bg)] text-[var(--color-badge-text)]",
  success:    "bg-green-50 text-green-700",
  "mot-fail": "bg-red-50 text-[var(--color-mot-fail)]",
  warn:       "bg-amber-50 text-amber-700",
  muted:      "bg-[var(--color-surface-2)] text-[var(--color-text-muted)]",
};

export function Badge({ variant = "default", children, className = "" }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium leading-none",
        variantClasses[variant],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
