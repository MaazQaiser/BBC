/** Shared contact action button styles — header, contact page, vehicle pages */
export const CONTACT_ACTION_BASE = [
  "inline-flex items-center justify-center gap-2 h-12 px-4 rounded-[var(--radius-md)]",
  "type-small font-medium transition-colors",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2",
  "w-full sm:w-auto min-w-0",
].join(" ");

/** Full-width variant for equal columns in action grids */
export const CONTACT_ACTION_GRID = [
  "inline-flex items-center justify-center gap-2 h-12 px-4 rounded-[var(--radius-md)]",
  "type-small font-medium transition-colors",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2",
  "w-full min-w-0",
].join(" ");

/** Equal-width buttons in the mobile sticky contact bar */
export const CONTACT_ACTION_STICKY = [
  "inline-flex items-center justify-center gap-1 sm:gap-1.5",
  "flex-1 min-w-0 h-11 px-1.5 sm:px-3",
  "rounded-[var(--radius-md)] text-[12px] sm:text-sm font-medium",
  "transition-colors",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2",
].join(" ");

export const CONTACT_ACTION_ACCENT = [
  "bg-[var(--color-accent)] text-white!",
  "hover:bg-[var(--color-accent-hover)] hover:text-white!",
].join(" ");

export const CONTACT_ACTION_OUTLINE = [
  "border border-[var(--color-border-strong)] bg-[var(--color-surface)]",
  "text-[var(--color-text)] hover:bg-[var(--color-hover)]",
].join(" ");
