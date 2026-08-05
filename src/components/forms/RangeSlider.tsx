"use client";

import { useId } from "react";

export interface RangeSliderProps {
  label?:       string;
  min:          number;
  max:          number;
  step?:        number;
  value:        [number, number];
  onChange:     (value: [number, number]) => void;
  formatValue?: (v: number) => string;
  className?:   string;
}

export function RangeSlider({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  formatValue = String,
  className = "",
}: RangeSliderProps) {
  const id = useId();
  const [low, high] = value;

  const lowPct  = ((low  - min) / (max - min)) * 100;
  const highPct = ((high - min) / (max - min)) * 100;

  return (
    <div className={["w-full select-none", className].join(" ")}>
      {label && (
        <div className="flex items-center justify-between mb-2">
          <span className="type-small font-medium text-[var(--color-text)]">{label}</span>
          <span className="type-small num text-[var(--color-text-muted)]">
            {formatValue(low)} – {formatValue(high)}
          </span>
        </div>
      )}

      <div className="relative h-5 flex items-center">
        {/* Track */}
        <div className="absolute w-full h-1 rounded-full bg-[var(--color-border)]" />
        {/* Active fill */}
        <div
          className="absolute h-1 rounded-full bg-[var(--color-accent)]"
          style={{ left: `${lowPct}%`, right: `${100 - highPct}%` }}
        />

        {/* Low thumb */}
        <input
          id={`${id}-low`}
          type="range"
          min={min}
          max={max}
          step={step}
          value={low}
          onChange={(e) => {
            const next = Math.min(Number(e.target.value), high - step);
            onChange([next, high]);
          }}
          className="absolute w-full appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--color-accent)] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-[var(--shadow-sm)] [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[var(--color-accent)] [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-[var(--shadow-sm)]"
          aria-label={label ? `${label} minimum` : "Minimum value"}
        />

        {/* High thumb */}
        <input
          id={`${id}-high`}
          type="range"
          min={min}
          max={max}
          step={step}
          value={high}
          onChange={(e) => {
            const next = Math.max(Number(e.target.value), low + step);
            onChange([low, next]);
          }}
          className="absolute w-full appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--color-accent)] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-[var(--shadow-sm)] [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[var(--color-accent)] [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-[var(--shadow-sm)]"
          aria-label={label ? `${label} maximum` : "Maximum value"}
        />
      </div>
    </div>
  );
}
