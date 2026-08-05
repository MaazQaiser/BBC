"use client";

import { forwardRef, useRef, useImperativeHandle } from "react";
import type { InputHTMLAttributes } from "react";
import { Search, X } from "lucide-react";

export interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  onClear?: () => void;
  size?:    "sm" | "md" | "lg";
}

/* ─── Size presets ───────────────────────────────────────────────────────
   Spec: height 52px · radius 12px · border 1px · focus accent border.
   No glowing ring effects.
────────────────────────────────────────────────────────────────────────── */
const SIZE = {
  sm: { wrapper: "h-10",      input: "pl-9  pr-8  text-sm",  icon: 15 },
  md: { wrapper: "h-[52px]",  input: "pl-11 pr-10 text-base", icon: 16 },
  lg: { wrapper: "h-[52px]",  input: "pl-12 pr-11 text-base", icon: 18 },
};

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ size = "md", value, onClear, className = "", ...props }, ref) => {
    const internalRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => internalRef.current!);

    const s        = SIZE[size];
    const hasValue = Boolean(value);

    return (
      <div className={["relative flex items-center w-full", s.wrapper, className].join(" ")}>
        <Search
          size={s.icon}
          className="absolute left-3.5 shrink-0 text-[var(--color-text-faint)] pointer-events-none"
          aria-hidden="true"
        />

        <input
          ref={internalRef}
          type="search"
          value={value}
          className={[
            "w-full h-full",
            "rounded-[var(--radius-md)] border border-[var(--color-border)]",
            "bg-white text-[var(--color-text)]",
            "placeholder:text-[var(--color-text-faint)]",
            "transition-colors duration-[var(--duration-hover)]",
            /* Focus: accent border only — no ring glow (spec) */
            "focus:outline-none focus:border-[var(--color-accent)]",
            "disabled:bg-[var(--color-disabled-bg)] disabled:text-[var(--color-disabled-text)] disabled:cursor-not-allowed",
            s.input,
          ].join(" ")}
          {...props}
        />

        {hasValue && onClear && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear search"
            className="absolute right-3 p-1 rounded-[var(--radius-sm)] text-[var(--color-text-faint)] hover:text-[var(--color-text)] hover:bg-[var(--color-hover)] transition-colors duration-[var(--duration-hover)]"
          >
            <X size={s.icon - 2} />
          </button>
        )}
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";
