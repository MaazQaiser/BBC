"use client";

import Link from "next/link";
import { Calendar, PoundSterling } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { buildVehicleWhatsAppHref } from "@/lib/contact-links";
import {
  CONTACT_ACTION_ACCENT,
  CONTACT_ACTION_GRID,
  CONTACT_ACTION_OUTLINE,
} from "@/lib/contact-action-styles";
import { useVehicleContactOptional } from "@/components/vehicle/VehicleContactContext";

interface TradeDetailActionsProps {
  vehicleId: string;
  vehicleTitle: string;
  registration?: string;
  pageUrl: string;
}

export function TradeDetailActions({
  vehicleId,
  vehicleTitle,
  registration,
  pageUrl,
}: TradeDetailActionsProps) {
  const contact = useVehicleContactOptional();
  const openAppointment = contact?.openAppointment;
  const offerHref = `/trade/vehicles/${vehicleId}/offer`;

  const whatsappHref = buildVehicleWhatsAppHref({
    vehicleTitle: `[Trade] ${vehicleTitle}`,
    registration,
    pageUrl,
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 min-w-0">
      <Link href={offerHref} className={[CONTACT_ACTION_GRID, CONTACT_ACTION_ACCENT].join(" ")}>
        <PoundSterling size={16} aria-hidden="true" />
        Make an Offer
      </Link>

      <button
        type="button"
        onClick={openAppointment}
        className={[CONTACT_ACTION_GRID, CONTACT_ACTION_OUTLINE].join(" ")}
      >
        <Calendar size={16} aria-hidden="true" />
        Book a Viewing
      </button>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className={[CONTACT_ACTION_GRID, CONTACT_ACTION_OUTLINE].join(" ")}
      >
        <WhatsAppIcon size={18} />
        WhatsApp Us
      </a>
    </div>
  );
}
