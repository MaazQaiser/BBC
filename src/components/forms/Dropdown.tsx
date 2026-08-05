"use client";

import { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

export interface DropdownOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface DropdownProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  options:     DropdownOption[];
  placeholder?: string;
  size?:       "sm" | "md" | "lg";
  label?:      string;
  error?:      string;
}

const SIZE = {
  sm: "h-9  pl-3  pr-8  text-sm  rounded-[var(--radius-sm)]",
  md: "h-11 pl-3  pr-9  text-sm  rounded-[var(--radius-md)]",
  lg: "h-12 pl-4  pr-10 text-base rounded-[var(--radius-md)]",
};

const ICON_SIZE = { sm: 14, md: 15, lg: 16 };
const ICON_RIGHT = { sm: "right-2", md: "right-2.5", lg: "right-3" };

export const Dropdown = forwardRef<HTMLSelectElement, DropdownProps>(
  (
    { options, placeholder, size = "md", label, error, className = "", id, ...props },
    ref
  ) => {
    const inputId = id ?? `dropdown-${Math.random().toString(36).slice(2, 8)}`;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="type-small font-medium text-[var(--color-text)]"
          >
            {label}
          </label>
        )}

        <div className="relative w-full">
          <select
            ref={ref}
            id={inputId}
            className={[
              "w-full appearance-none border",
              "bg-[var(--color-surface)] text-[var(--color-text)]",
              "transition-colors duration-[var(--duration-fast)]",
              "focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent-light)]",
              "disabled:bg-[var(--color-disabled-bg)] disabled:text-[var(--color-disabled-text)] disabled:cursor-not-allowed",
              error
                ? "border-[var(--color-error)]"
                : "border-[var(--color-border)]",
              SIZE[size],
              className,
            ].join(" ")}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>

          <ChevronDown
            size={ICON_SIZE[size]}
            className={[
              "absolute top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-text-faint)]",
              ICON_RIGHT[size],
            ].join(" ")}
            aria-hidden="true"
          />
        </div>

        {error && (
          <p className="type-caption text-[var(--color-error)]" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";
