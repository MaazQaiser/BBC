import { SITE_NAME } from "@/lib/site-brand";

interface MapCardProps {
  lat?:       number;
  lng?:       number;
  label?:     string;
  className?: string;
}

export function MapCard({ label = SITE_NAME, className = "" }: MapCardProps) {
  return (
    <section aria-labelledby="map-heading" className={className}>
      <h2 id="map-heading" className="type-h3 mb-4">Location</h2>
      <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] overflow-hidden">
        {/* Placeholder — swap for actual map embed when API key available */}
        <div className="aspect-[16/7] bg-[var(--color-surface-2)] flex items-center justify-center">
          <div className="text-center px-6 py-8">
            <div className="w-12 h-12 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center mx-auto mb-3 text-[var(--color-accent)]">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
              </svg>
            </div>
            <p className="font-semibold type-small text-[var(--color-text)] mb-1">{label}</p>
            <p className="type-caption text-[var(--color-text-muted)] mb-3">
              123 Bury New Road, Bury, BL9 0AA
            </p>
            <a
              href="https://maps.google.com/?q=123+Bury+New+Road,+Bury,+BL9+0AA"
              target="_blank"
              rel="noopener noreferrer"
              className="type-small font-medium text-[var(--color-accent)] hover:underline"
            >
              Open in Google Maps →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
