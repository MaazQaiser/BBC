import Link from "next/link";

export interface WordmarkProps {
  /** Light text for dark backgrounds (header overlay, footer) */
  reversed?: boolean;
  /** Render as home link */
  asLink?: boolean;
  className?: string;
}

/**
 * Manchester Car Yard wordmark — text treatment only, no badge or icon.
 *
 * MANCHESTER
 * Car Yard
 */
export function Wordmark({ reversed = false, asLink = false, className = "" }: WordmarkProps) {
  const topColor = reversed ? "text-white/70" : "text-[var(--color-text-muted)]";
  const bottomColor = reversed ? "text-white" : "text-[var(--color-text)]";

  const mark = (
    <span className={["inline-flex flex-col leading-none select-none", className].join(" ")}>
      <span
        className={[
          "text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em]",
          topColor,
        ].join(" ")}
      >
        Manchester
      </span>
      <span
        className={[
          "mt-0.5 text-lg sm:text-xl font-semibold tracking-[-0.02em]",
          bottomColor,
        ].join(" ")}
      >
        Car Yard
      </span>
    </span>
  );

  if (asLink) {
    return (
      <Link
        href="/"
        className="inline-flex shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2 rounded-[var(--radius-sm)]"
        aria-label="Manchester Car Yard — home"
      >
        {mark}
      </Link>
    );
  }

  return mark;
}
