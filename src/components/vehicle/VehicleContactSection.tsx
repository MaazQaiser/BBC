"use client";

import { Phone, Calendar } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { SITE_CONTACT } from "@/lib/site-contact";
import { buildVehicleWhatsAppHref } from "@/lib/contact-links";
import { useVehicleContact } from "@/components/vehicle/VehicleContactContext";
import {
  CONTACT_ACTION_ACCENT,
  CONTACT_ACTION_GRID,
  CONTACT_ACTION_OUTLINE,
} from "@/lib/contact-action-styles";

export function VehicleContactSection({ embedded = false }: { embedded?: boolean }) {
  const { vehicleTitle, registration, pageUrl, openAppointment } =
    useVehicleContact();

  const whatsappHref = buildVehicleWhatsAppHref({
    vehicleTitle,
    registration,
    pageUrl,
  });

  const actions = (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 min-w-0">
        <a
          href={whatsappHref}
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
        >
          <Phone size={16} aria-hidden="true" />
          Call
        </a>

        <button
          type="button"
          onClick={openAppointment}
          className={[CONTACT_ACTION_GRID, CONTACT_ACTION_OUTLINE].join(" ")}
        >
          <Calendar size={16} aria-hidden="true" />
          Book a look
        </button>
      </div>
  );

  if (embedded) return actions;

  return (
    <section aria-labelledby="contact-heading">
      <h2 id="contact-heading" className="type-h3 mb-4">
        Contact
      </h2>
      {actions}
    </section>
  );
}
