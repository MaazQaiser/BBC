"use client";

import { useId } from "react";

export interface ToggleProps {
  checked:    boolean;
  onChange:   (checked: boolean) => void;
  label?:     string;
  description?: string;
  size?:      "sm" | "md";
  disabled?:  boolean;
  id?:        string;
}

const SIZE = {
  sm: { track: "w-8  h-[18px]", thumb: "w-3.5 h-3.5", translate: "translate-x-[18px]" },
  md: { track: "w-10 h-5",      thumb: "w-4   h-4",   translate: "translate-x-5" },
};

export function Toggle({
  checked,
  onChange,
  label,
  description,
  size = "md",
  disabled = false,
  id,
}: ToggleProps) {
  const autoId = useId();
  const toggleId = id ?? autoId;
  const s = SIZE[size];

  return (
    <div
      className={["flex items-start gap-3", disabled ? "opacity-50" : ""].join(" ")}
    >
      <button
        id={toggleId}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={[
          "relative shrink-0 rounded-full border-2 border-transparent",
          "transition-colors duration-[var(--duration-base)] cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2",
          "disabled:pointer-events-none",
          checked ? "bg-[var(--color-accent)]" : "bg-[var(--color-border-strong)]",
          s.track,
        ].join(" ")}
      >
        <span
          className={[
            "pointer-events-none block rounded-full bg-white shadow-[var(--shadow-sm)]",
            "transition-transform duration-[var(--duration-base)]",
            checked ? s.translate : "translate-x-0",
            s.thumb,
          ].join(" ")}
        />
      </button>

      {(label || description) && (
        <label
          htmlFor={toggleId}
          className="cursor-pointer select-none flex-1 min-w-0"
        >
          {label && (
            <span className="text-sm font-medium text-[var(--color-text)]">{label}</span>
          )}
          {description && (
            <p className="type-caption text-[var(--color-text-muted)] mt-0.5">{description}</p>
          )}
        </label>
      )}
    </div>
  );
}
