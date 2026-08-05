"use client";

import { forwardRef, useId } from "react";
import type { InputHTMLAttributes } from "react";

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label:       string;
  description?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, description, className = "", id, checked, ...props }, ref) => {
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
            type="radio"
            checked={checked}
            className="peer sr-only"
            {...props}
          />
          <div
            className={[
              "w-4 h-4 rounded-full border-2 transition-colors duration-[var(--duration-fast)]",
              "flex items-center justify-center",
              checked
                ? "border-[var(--color-accent)]"
                : "border-[var(--color-border-strong)] group-hover:border-[var(--color-accent)]",
            ].join(" ")}
            aria-hidden="true"
          >
            {checked && (
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <span className="text-sm text-[var(--color-text)]">{label}</span>
          {description && (
            <p className="type-caption text-[var(--color-text-muted)] mt-0.5">{description}</p>
          )}
        </div>
      </label>
    );
  }
);

Radio.displayName = "Radio";
