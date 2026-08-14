import { buildOpenStreetMapEmbedUrl } from "@/lib/contact-links";
import { SITE_CONTACT } from "@/lib/site-contact";

interface LocationMapProps {
  /** Shorter aspect ratio — contact page */
  compact?: boolean;
}

export function LocationMap({ compact = false }: LocationMapProps) {
  const embedUrl = buildOpenStreetMapEmbedUrl();

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden bg-[var(--color-surface-2)] min-w-0">
      <div
        className={[
          "relative",
          compact ? "aspect-[16/10]" : "aspect-[16/10] sm:aspect-[21/9]",
        ].join(" ")}
      >
        <iframe
          title={`Map showing ${SITE_CONTACT.name} location`}
          src={embedUrl}
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
