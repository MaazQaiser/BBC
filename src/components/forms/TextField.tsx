"use client";

import { forwardRef } from "react";
import type { InputHTMLAttributes, LabelHTMLAttributes, ReactNode } from "react";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label:       string;
  hint?:       string;
  error?:      string;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  rightSlot?:  ReactNode;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, hint, error, labelProps, rightSlot, className = "", id, ...props }, ref) => {
    const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={className}>
        <label
          htmlFor={fieldId}
          className="block type-small font-medium text-[var(--color-text)] mb-1.5"
          {...labelProps}
        >
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            id={fieldId}
            className={[
              "w-full h-[52px] px-4 rounded-[var(--radius-md)] border bg-white text-[var(--color-text)]",
              "placeholder:text-[var(--color-text-faint)]",
              "transition-colors duration-[var(--duration-hover)]",
              "focus:outline-none focus:border-[var(--color-accent)]",
              "disabled:bg-[var(--color-disabled-bg)] disabled:text-[var(--color-disabled-text)]",
              error ? "border-[var(--color-error)]" : "border-[var(--color-border)]",
              rightSlot ? "pr-10" : "",
            ].join(" ")}
            {...props}
          />
          {rightSlot && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightSlot}</div>
          )}
        </div>
        {hint && !error && (
          <p className="mt-1.5 type-caption text-[var(--color-text-faint)]">{hint}</p>
        )}
        {error && (
          <p className="mt-1.5 type-caption text-[var(--color-error)]">{error}</p>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";
