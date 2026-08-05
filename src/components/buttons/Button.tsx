"use client";

import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

/* ─── Types ──────────────────────────────────────────────────────────── */
export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize    = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:   ButtonVariant;
  size?:      ButtonSize;
  leftIcon?:  ReactNode;
  rightIcon?: ReactNode;
  loading?:   boolean;
  fullWidth?: boolean;
}

/* ─── Variant styles ─────────────────────────────────────────────────────
   Primary   → dark (#111111) background, white text.  Accent is NOT
               used on primary buttons — it is reserved for links,
               focus rings and interactive state indicators.
   Secondary → white background with a 1px border.
   Ghost     → transparent, text only.
────────────────────────────────────────────────────────────────────────── */
const VARIANT: Record<ButtonVariant, string> = {
  primary: [
    "bg-[#111111] text-white",
    "hover:bg-[#1a1a1a]",
    "active:bg-[#2a2a2a]",
    "disabled:bg-[var(--color-disabled-bg)] disabled:text-[var(--color-disabled-text)]",
  ].join(" "),

  secondary: [
    "bg-white text-[var(--color-text)]",
    "border border-[var(--color-border)]",
    "hover:bg-[var(--color-hover)] hover:border-[var(--color-border-strong)]",
    "active:bg-[var(--color-pressed)]",
    "disabled:bg-[var(--color-disabled-bg)] disabled:text-[var(--color-disabled-text)]",
    "disabled:border-[var(--color-disabled-border)]",
  ].join(" "),

  ghost: [
    "bg-transparent text-[var(--color-text)]",
    "hover:bg-[var(--color-hover)]",
    "active:bg-[var(--color-pressed)]",
    "disabled:text-[var(--color-disabled-text)]",
  ].join(" "),
};

/* ─── Size styles ────────────────────────────────────────────────────────
   Heights: sm 40px · md 48px (spec default) · lg 56px
   Button text: 15px (spec: 15/20).
   Radius: 12px (spec: buttons 12px = --radius-md).
────────────────────────────────────────────────────────────────────────── */
const SIZE: Record<ButtonSize, string> = {
  sm: "h-10 px-4  gap-1.5 text-[13px] rounded-[var(--radius-md)]",
  md: "h-12 px-5  gap-2   text-[15px] rounded-[var(--radius-md)]",
  lg: "h-14 px-6  gap-2.5 text-[15px] rounded-[var(--radius-md)]",
};

/* ─── Component ──────────────────────────────────────────────────────── */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant   = "primary",
      size      = "md",
      leftIcon,
      rightIcon,
      loading   = false,
      fullWidth = false,
      disabled,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={[
          "inline-flex items-center justify-center font-medium leading-none",
          "select-none cursor-pointer",
          "transition-colors duration-[var(--duration-hover)]",
          "outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:cursor-not-allowed",
          VARIANT[variant],
          SIZE[size],
          fullWidth ? "w-full" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {loading ? (
          <SpinnerIcon size={size === "sm" ? 13 : 15} />
        ) : leftIcon ? (
          <span className="shrink-0">{leftIcon}</span>
        ) : null}

        {children && <span>{children}</span>}

        {!loading && rightIcon && (
          <span className="shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

/* ─── Inline spinner ─────────────────────────────────────────────────── */
function SpinnerIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 15 15"
      fill="none"
      className="animate-spin"
      aria-hidden="true"
    >
      <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" />
      <path d="M13.5 7.5A6 6 0 0 0 7.5 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
