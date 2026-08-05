interface MapEmbedProps {
  lat: number;
  lng: number;
  label?: string;
}

export function MapEmbed({ label = "BBC Cars" }: MapEmbedProps) {
  return (
    <section aria-labelledby="map-heading">
      <h2 id="map-heading" className="text-lg font-semibold text-[var(--color-text)] mb-4">
        Location
      </h2>
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden aspect-[16/7] bg-[var(--color-surface-2)] flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-10 h-10 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center mx-auto mb-2 text-[var(--color-accent)]">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
            </svg>
          </div>
          <p className="font-medium text-[var(--color-text)] text-sm">{label}</p>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">123 Example Road, Leigh, WN7 0AA</p>
          <a
            href="https://maps.google.com/?q=Leigh,WN7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-xs font-medium text-[var(--color-accent)] hover:underline"
          >
            Open in Google Maps →
          </a>
        </div>
      </div>
    </section>
  );
}
