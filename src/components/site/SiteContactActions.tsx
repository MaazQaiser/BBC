"use client";

import { Calendar, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { SITE_CONTACT } from "@/lib/site-contact";
import { useSiteAppointment } from "@/components/site/SiteAppointmentProvider";
import {
  CONTACT_ACTION_ACCENT,
  CONTACT_ACTION_GRID,
  CONTACT_ACTION_OUTLINE,
} from "@/lib/contact-action-styles";

/** Yard-level contact actions — Call, WhatsApp, Book appointment */
export function SiteContactActions() {
  const { openAppointment } = useSiteAppointment();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 min-w-0">
      <a
        href={SITE_CONTACT.phoneHref}
        className={[CONTACT_ACTION_GRID, CONTACT_ACTION_OUTLINE, "num"].join(" ")}
      >
        <Phone size={16} aria-hidden="true" />
        Call
      </a>

      <a
        href={SITE_CONTACT.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className={[CONTACT_ACTION_GRID, CONTACT_ACTION_ACCENT].join(" ")}
      >
        <WhatsAppIcon size={18} />
        WhatsApp
      </a>

      <button
        type="button"
        onClick={() => openAppointment()}
        className={[CONTACT_ACTION_GRID, CONTACT_ACTION_OUTLINE].join(" ")}
      >
        <Calendar size={16} aria-hidden="true" />
        Book a look
      </button>
    </div>
  );
}
