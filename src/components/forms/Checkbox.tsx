"use client";

import { forwardRef, useId } from "react";
import type { InputHTMLAttributes } from "react";
import { Check, Minus } from "lucide-react";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?:         string;
  description?:   string;
  indeterminate?:  boolean;
  count?:         number;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, indeterminate, count, className = "", id, checked, ...props }, ref) => {
    const autoId = useId();
    const inputId = id ?? autoId;

    return (
      <label
        htmlFor={inputId}
        className={[
          "group flex items-start gap-3 cursor-pointer select-none",
          props.disabled ? "opacity-50 pointer-events-none" : "",
          className,
        ].join(" ")}
      >
        <div className="relative mt-0.5 shrink-0">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            checked={checked}
            className="peer sr-only"
            {...props}
          />
          <div
            className={[
              "w-4 h-4 rounded-[var(--radius-xs)] border-2 transition-colors duration-[var(--duration-fast)]",
              "flex items-center justify-center",
              checked || indeterminate
                ? "bg-[var(--color-accent)] border-[var(--color-accent)]"
                : "bg-[var(--color-surface)] border-[var(--color-border-strong)] group-hover:border-[var(--color-accent)]",
            ].join(" ")}
            aria-hidden="true"
          >
            {indeterminate ? (
              <Minus size={10} className="text-white" />
            ) : checked ? (
              <Check size={10} className="text-white" strokeWidth={3} />
            ) : null}
          </div>
        </div>

        {(label || description) && (
          <div className="flex-1 min-w-0">
            {label && (
              <span className="flex items-center gap-1.5 text-sm text-[var(--color-text)]">
                <span className="truncate-1">{label}</span>
                {count !== undefined && (
                  <span className="num text-xs text-[var(--color-text-faint)] shrink-0">
                    {count}
                  </span>
                )}
              </span>
            )}
            {description && (
              <p className="type-caption text-[var(--color-text-muted)] mt-0.5">{description}</p>
            )}
          </div>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
