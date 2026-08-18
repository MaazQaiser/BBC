"use client";

import Link from "next/link";
import { Calendar, Phone, PoundSterling } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { Container } from "@/components/layout/Container";
import { SITE_CONTACT } from "@/lib/site-contact";
import {
  CONTACT_ACTION_ACCENT,
  CONTACT_ACTION_OUTLINE,
  CONTACT_ACTION_STICKY,
} from "@/lib/contact-action-styles";
import { buildVehicleWhatsAppHref } from "@/lib/contact-links";
import { useVehicleContactOptional } from "@/components/vehicle/VehicleContactContext";

export interface StickyContactPanelProps {
  /** Fallback when used outside VehicleContactProvider (e.g. legacy) */
  vehicleTitle?:  string;
  registration?:  string;
  pageUrl?:         string;
  isTrade?:         boolean;
  offerHref?:       string;
  /** @deprecated Use offerHref */
  enquiryHref?:     string;
}

/**
 * Fixed bottom bar on vehicle detail pages (mobile only).
 * Retail: WhatsApp, Call, Book a look.
 * Trade: Make an Offer, Book a Viewing, WhatsApp.
 */
export function StickyContactPanel({
  vehicleTitle: fallbackTitle = "",
  registration: fallbackRegistration,
  pageUrl: fallbackPageUrl = "",
  isTrade,
  offerHref,
  enquiryHref,
}: StickyContactPanelProps) {
  const contact = useVehicleContactOptional();

  const vehicleTitle = contact?.vehicleTitle ?? fallbackTitle;
  const registration = contact?.registration ?? fallbackRegistration;
  const pageUrl = contact?.pageUrl ?? fallbackPageUrl;
  const openAppointment = contact?.openAppointment;
  const tradeOfferHref = offerHref ?? enquiryHref;

  const whatsappHref = buildVehicleWhatsAppHref({
    vehicleTitle: isTrade ? `[Trade] ${vehicleTitle}` : vehicleTitle,
    registration,
    pageUrl,
  });

  const actionClass = CONTACT_ACTION_STICKY;

  if (isTrade && tradeOfferHref) {
    return (
      <div
        className="fixed bottom-0 left-0 right-0 z-[var(--z-raised)] bg-[var(--color-surface)] border-t border-[var(--color-border)] shadow-[var(--shadow-sticky)] lg:hidden"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        role="region"
        aria-label="Trade actions"
      >
        <Container className="pt-3">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <Link
              href={tradeOfferHref}
              className={[actionClass, CONTACT_ACTION_ACCENT].join(" ")}
            >
              <PoundSterling size={16} className="shrink-0" aria-hidden="true" />
              <span className="truncate">Offer</span>
            </Link>

            <button
              type="button"
              onClick={openAppointment}
              className={[actionClass, CONTACT_ACTION_OUTLINE].join(" ")}
            >
              <Calendar size={16} className="shrink-0" aria-hidden="true" />
              <span className="truncate">Viewing</span>
            </button>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={[actionClass, CONTACT_ACTION_OUTLINE].join(" ")}
            >
              <WhatsAppIcon size={16} className="shrink-0" />
              <span className="truncate">WhatsApp</span>
            </a>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[var(--z-raised)] bg-[var(--color-surface)] border-t border-[var(--color-border)] shadow-[var(--shadow-sticky)] lg:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      role="region"
      aria-label="Contact actions"
    >
      <Container className="pt-3">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={[actionClass, CONTACT_ACTION_ACCENT].join(" ")}
          >
            <WhatsAppIcon size={16} className="shrink-0" />
            <span className="truncate">WhatsApp</span>
          </a>

          <a
            href={SITE_CONTACT.phoneHref}
            className={[actionClass, CONTACT_ACTION_OUTLINE, "num"].join(" ")}
          >
            <Phone size={16} className="shrink-0" aria-hidden="true" />
            <span className="truncate">Call</span>
          </a>

          <button
            type="button"
            onClick={openAppointment}
            className={[actionClass, CONTACT_ACTION_OUTLINE].join(" ")}
          >
            <Calendar size={16} className="shrink-0" aria-hidden="true" />
            <span className="truncate">
              <span className="sm:hidden">Book</span>
              <span className="hidden sm:inline">Book a look</span>
            </span>
          </button>
        </div>
      </Container>
    </div>
  );
}
