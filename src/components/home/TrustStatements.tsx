import { Check } from "lucide-react";

const STATEMENTS = [
  "Faults listed on every advert",
  "Full MOT history shown",
  "Video where available",
];

export function TrustStatements() {
  return (
    <ul
      className="mt-8 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row sm:flex-wrap gap-x-8 gap-y-3"
      aria-label="How we list vehicles"
    >
      {STATEMENTS.map((text) => (
        <li key={text} className="flex items-center gap-2.5 text-sm text-[var(--color-text-body)]">
          <span className="check-icon w-5 h-5 shrink-0">
            <Check size={12} strokeWidth={3} aria-hidden="true" />
          </span>
          {text}
        </li>
      ))}
    </ul>
  );
}
