import { Clock, MapPin, Phone } from "lucide-react";
import { OPENING_HOURS, SITE_CONTACT } from "@/lib/site-contact";

interface LocationSectionProps {
  label?:     string;
  className?: string;
}

export function LocationSection({ label = "Bury Bargain Cars", className = "" }: LocationSectionProps) {
  return (
    <section aria-labelledby="location-heading" className={className}>
      <h2 id="location-heading" className="type-h3 mb-4">Location &amp; Directions</h2>

      <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] overflow-hidden">
        <div className="aspect-[16/9] sm:aspect-[21/9] bg-[var(--color-surface-2)] flex items-center justify-center">
          <div className="text-center px-6 py-8">
            <div className="w-12 h-12 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center mx-auto mb-3 text-[var(--color-accent)]">
              <MapPin size={22} aria-hidden="true" />
            </div>
            <p className="font-semibold type-small text-[var(--color-text)] mb-1">{label}</p>
            <address className="not-italic type-caption text-[var(--color-text-muted)] mb-3 leading-relaxed">
              {SITE_CONTACT.addressLine1}<br />
              {SITE_CONTACT.addressLine2}
            </address>
            <a
              href={SITE_CONTACT.directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="type-small font-medium text-[var(--color-accent)] hover:underline"
            >
              Get directions →
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="p-5">
            <p className="type-section-label mb-3">Opening hours</p>
            <ul className="space-y-2">
              {OPENING_HOURS.map(({ day, time }) => (
                <li key={day} className="flex items-baseline justify-between gap-4 type-small">
                  <span className="flex items-center gap-2 text-[var(--color-text-muted)]">
                    <Clock size={13} className="shrink-0" aria-hidden="true" />
                    {day}
                  </span>
                  <span className="num font-medium text-[var(--color-text)] shrink-0">{time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 flex flex-col justify-center gap-3">
            <a
              href={SITE_CONTACT.phoneHref}
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-hover)] transition-colors num"
            >
              <Phone size={16} aria-hidden="true" />
              {SITE_CONTACT.phone}
            </a>
            <a
              href={SITE_CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-[var(--radius-md)] bg-[var(--color-accent)] text-white text-sm font-medium hover:bg-[var(--color-accent-hover)] transition-colors"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
