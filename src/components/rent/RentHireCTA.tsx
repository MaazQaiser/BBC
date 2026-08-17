import Link from "next/link";
import { Phone, MapPin } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { SITE_CONTACT } from "@/lib/site-contact";
import { buildHireWhatsAppHref } from "@/lib/contact-links";
import {
  CONTACT_ACTION_ACCENT,
  CONTACT_ACTION_GRID,
  CONTACT_ACTION_OUTLINE,
} from "@/lib/contact-action-styles";

export function RentHireCTA() {
  return (
    <section
      className="mt-12 sm:mt-16 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white overflow-hidden"
      aria-labelledby="rent-cta-heading"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 p-6 sm:p-8 lg:p-10 items-center">
        <div className="min-w-0 text-center lg:text-left">
          <h2 id="rent-cta-heading" className="type-h3 text-[var(--color-text)] mb-2">
            Need a car for the week?
          </h2>
          <p className="type-body text-[var(--color-text-muted)] leading-relaxed max-w-xl mx-auto lg:mx-0">
            Hire is arranged in person — no online booking. WhatsApp or call us to confirm
            availability, discuss terms and arrange collection from our yard in Bury.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-3 w-full lg:w-auto lg:min-w-[20rem] xl:min-w-[28rem] shrink-0">
          <a
            href={buildHireWhatsAppHref()}
            target="_blank"
            rel="noopener noreferrer"
            className={[CONTACT_ACTION_GRID, CONTACT_ACTION_ACCENT].join(" ")}
          >
            <WhatsAppIcon size={18} />
            WhatsApp
          </a>

          <a
            href={SITE_CONTACT.phoneHref}
            className={[CONTACT_ACTION_GRID, CONTACT_ACTION_OUTLINE, "num"].join(" ")}
            aria-label={`Call ${SITE_CONTACT.phone}`}
          >
            <Phone size={16} aria-hidden="true" />
            Call
          </a>

          <Link
            href="/contact"
            className={[CONTACT_ACTION_GRID, CONTACT_ACTION_OUTLINE].join(" ")}
          >
            <MapPin size={16} aria-hidden="true" />
            Visit us
          </Link>
        </div>
      </div>
    </section>
  );
}
