"use client";

import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { ButtonVariant, ButtonSize } from "./Button";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon:         ReactNode;
  variant?:     ButtonVariant;
  size?:        ButtonSize;
  "aria-label": string;
}

const VARIANT: Record<ButtonVariant, string> = {
  primary:
    "bg-[#111111] text-white hover:bg-[#1a1a1a] active:bg-[#2a2a2a] disabled:bg-[var(--color-disabled-bg)] disabled:text-[var(--color-disabled-text)]",
  secondary:
    "bg-white text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-hover)] hover:border-[var(--color-border-strong)] active:bg-[var(--color-pressed)] disabled:bg-[var(--color-disabled-bg)] disabled:text-[var(--color-disabled-text)]",
  ghost:
    "bg-transparent text-[var(--color-text-muted)] hover:bg-[var(--color-hover)] hover:text-[var(--color-text)] active:bg-[var(--color-pressed)] disabled:text-[var(--color-disabled-text)]",
};

const SIZE: Record<ButtonSize, string> = {
  sm: "w-9  h-9  rounded-[var(--radius-md)]",
  md: "w-11 h-11 rounded-[var(--radius-md)]",
  lg: "w-12 h-12 rounded-[var(--radius-md)]",
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, variant = "ghost", size = "md", className = "", ...props }, ref) => (
    <button
      ref={ref}
      className={[
        "inline-flex items-center justify-center shrink-0 cursor-pointer",
        "transition-colors duration-[var(--duration-hover)]",
        "outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:cursor-not-allowed",
        VARIANT[variant],
        SIZE[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {icon}
    </button>
  )
);

IconButton.displayName = "IconButton";
