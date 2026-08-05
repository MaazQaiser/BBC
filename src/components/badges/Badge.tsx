import type { ReactNode } from "react";

/* ─── Types ──────────────────────────────────────────────────────────── */

/**
 * Semantic variants map to the design token palette.
 * Vehicle-specific variants (video, serviceHistory, mot, faultCount, trade)
 * have dedicated visual treatments.
 */
export type BadgeVariant =
  // Vehicle-specific
  | "video"
  | "serviceHistory"
  | "mot"
  | "faultCount"
  | "trade"
  // Semantic
  | "success"
  | "warning"
  | "error"
  | "info"
  | "neutral"
  | "accent";

export type BadgeSize = "sm" | "md";

export interface BadgeProps {
  variant?:  BadgeVariant;
  size?:     BadgeSize;
  icon?:     ReactNode;
  children:  ReactNode;
  className?: string;
}

/* ─── Variant styles ─────────────────────────────────────────────────── */
const VARIANT: Record<BadgeVariant, string> = {
  // ── Vehicle-specific ──────────────────────────────────────────────
  video: [
    "bg-[var(--color-accent-light)] text-[var(--color-accent)]",
    "border border-[var(--color-accent-muted)]",
  ].join(" "),

  serviceHistory: [
    "bg-[var(--color-success-bg)] text-[var(--color-success-text)]",
    "border border-[var(--color-success-border)]",
  ].join(" "),

  mot: [
    "bg-[var(--color-info-bg)] text-[var(--color-info-text)]",
    "border border-[var(--color-info-border)]",
  ].join(" "),

  faultCount: [
    "bg-[var(--color-warning-bg)] text-[var(--color-warning-text)]",
    "border border-[var(--color-warning-border)]",
  ].join(" "),

  trade: [
    "bg-[var(--color-surface-3)] text-[var(--color-text-muted)]",
    "border border-[var(--color-border-strong)]",
  ].join(" "),

  // ── Semantic ──────────────────────────────────────────────────────
  success: [
    "bg-[var(--color-success-bg)] text-[var(--color-success-text)]",
    "border border-[var(--color-success-border)]",
  ].join(" "),

  warning: [
    "bg-[var(--color-warning-bg)] text-[var(--color-warning-text)]",
    "border border-[var(--color-warning-border)]",
  ].join(" "),

  error: [
    "bg-[var(--color-error-bg)] text-[var(--color-error-text)]",
    "border border-[var(--color-error-border)]",
  ].join(" "),

  info: [
    "bg-[var(--color-info-bg)] text-[var(--color-info-text)]",
    "border border-[var(--color-info-border)]",
  ].join(" "),

  neutral: [
    "bg-[var(--color-surface-2)] text-[var(--color-text-muted)]",
    "border border-[var(--color-border)]",
  ].join(" "),

  accent: [
    "bg-[var(--color-accent-light)] text-[var(--color-accent)]",
    "border border-[var(--color-accent-muted)]",
  ].join(" "),
};

const SIZE: Record<BadgeSize, string> = {
  sm: "px-1.5 py-0.5 text-[10px] gap-1   rounded-[var(--radius-xs)]",
  md: "px-2   py-1   text-xs     gap-1.5 rounded-[var(--radius-sm)]",
};

/* ─── Component ──────────────────────────────────────────────────────── */
export function Badge({
  variant   = "neutral",
  size      = "md",
  icon,
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center font-medium leading-none whitespace-nowrap",
        VARIANT[variant],
        SIZE[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {icon && <span className="shrink-0 [&>svg]:block">{icon}</span>}
      {children}
    </span>
  );
}

/* ─── Convenience wrappers ───────────────────────────────────────────── */

import { Video, BookOpen, Calendar, AlertTriangle, Tag } from "lucide-react";

export function VideoBadge({ size }: { size?: BadgeSize }) {
  return (
    <Badge variant="video" size={size} icon={<Video size={10} />}>
      Video
    </Badge>
  );
}

export function ServiceHistoryBadge({ size }: { size?: BadgeSize }) {
  return (
    <Badge variant="serviceHistory" size={size} icon={<BookOpen size={10} />}>
      Full History
    </Badge>
  );
}

export function MotBadge({ months, size }: { months: number; size?: BadgeSize }) {
  return (
    <Badge variant="mot" size={size} icon={<Calendar size={10} />}>
      <span className="num">{months}m</span> MOT
    </Badge>
  );
}

export function FaultCountBadge({ count, size }: { count: number; size?: BadgeSize }) {
  return (
    <Badge variant={count > 0 ? "faultCount" : "success"} size={size} icon={<AlertTriangle size={10} />}>
      <span className="num">{count}</span> {count === 1 ? "fault" : "faults"}
    </Badge>
  );
}

export function TradeBadge({ size }: { size?: BadgeSize }) {
  return (
    <Badge variant="trade" size={size} icon={<Tag size={10} />}>
      Trade
    </Badge>
  );
}
