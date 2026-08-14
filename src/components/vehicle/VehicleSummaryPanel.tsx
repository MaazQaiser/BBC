"use client";

import { Check, Phone, Calendar, Gauge, Fuel, Settings2, Car, Palette } from "lucide-react";
import type { Vehicle } from "@/lib/types";
import { formatPrice } from "@/lib/filters";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { SITE_CONTACT } from "@/lib/site-contact";
import { buildVehicleWhatsAppHref } from "@/lib/contact-links";
import {
  buildKeySpecWithMileage,
  buildPriceExplanation,
} from "@/lib/vehicle-detail";
import { useVehicleContactOptional } from "@/components/vehicle/VehicleContactContext";
import {
  CONTACT_ACTION_ACCENT,
  CONTACT_ACTION_BASE,
  CONTACT_ACTION_GRID,
  CONTACT_ACTION_OUTLINE,
} from "@/lib/contact-action-styles";

export interface VehicleSummaryPanelProps {
  vehicle: Vehicle;
  whatsIncluded: string[];
  hideContact?: boolean;
  sticky?: boolean;
}

function SpecItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Gauge;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5 min-w-0">
      <Icon size={15} className="shrink-0 text-[var(--color-text-faint)] mt-0.5" aria-hidden="true" />
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wide text-[var(--color-text-faint)]">
          {label}
        </p>
        <p className="text-sm font-medium text-[var(--color-text)] truncate">{value}</p>
      </div>
    </div>
  );
}

export function VehicleSummaryPanel({
  vehicle,
  whatsIncluded,
  hideContact = false,
  sticky = false,
}: VehicleSummaryPanelProps) {
  const contact = useVehicleContactOptional();
  const { mileage, specLine } = buildKeySpecWithMileage(vehicle);
  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  const explanation = buildPriceExplanation();

  const whatsappHref = contact
    ? buildVehicleWhatsAppHref({
        vehicleTitle: contact.vehicleTitle,
        registration: contact.registration,
        pageUrl: contact.pageUrl,
      })
    : buildVehicleWhatsAppHref({
        vehicleTitle: title,
        registration: vehicle.registration,
        pageUrl: "",
      });

  const openAppointment = contact?.openAppointment;

  return (
    <div
      className={[
        "rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white",
        "p-5 sm:p-6 shadow-[var(--shadow-md)] min-w-0",
        sticky ? "lg:sticky lg:top-[calc(var(--site-header-height)+1.25rem)]" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="space-y-5">
        <div className="space-y-1.5">
          <h1 className="text-xl sm:text-2xl font-semibold text-[var(--color-text)] tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-[var(--color-text-body)] leading-snug">
            {vehicle.variant}
          </p>
          {vehicle.registration ? (
            <p className="num text-xs text-[var(--color-text-faint)] tracking-wide">
              {vehicle.registration}
            </p>
          ) : null}
        </div>

        <p className="num text-3xl font-semibold text-[var(--color-text)] tracking-tight">
          {formatPrice(vehicle.price)}
        </p>

        <div className="grid grid-cols-2 gap-x-4 gap-y-4 pt-1">
          <SpecItem icon={Gauge} label="Mileage" value={mileage} />
          <SpecItem icon={Fuel} label="Fuel" value={vehicle.fuelType} />
          <SpecItem icon={Settings2} label="Transmission" value={vehicle.transmission} />
          <SpecItem icon={Car} label="Body" value={vehicle.bodyType} />
          <SpecItem icon={Car} label="Doors" value={`${vehicle.doors} doors`} />
          <SpecItem icon={Palette} label="Colour" value={vehicle.colour} />
        </div>

        <p className="text-xs text-[var(--color-text-muted)] leading-relaxed border-t border-[var(--color-border)] pt-4">
          {specLine}
          <span aria-hidden="true"> · </span>
          {explanation}
        </p>

        {whatsIncluded.length > 0 ? (
          <ul className="space-y-2 border-t border-[var(--color-border)] pt-4">
            {whatsIncluded.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-text-body)]">
                <Check size={14} className="shrink-0 text-[var(--color-accent)] mt-0.5" strokeWidth={2.5} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {!hideContact ? (
          <div className="space-y-2.5 border-t border-[var(--color-border)] pt-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={[CONTACT_ACTION_BASE, CONTACT_ACTION_ACCENT, "w-full"].join(" ")}
            >
              <WhatsAppIcon size={18} />
              WhatsApp about this car
            </a>

            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={SITE_CONTACT.phoneHref}
                className={[CONTACT_ACTION_GRID, CONTACT_ACTION_OUTLINE, "num h-11 px-3"].join(" ")}
              >
                <Phone size={16} aria-hidden="true" />
                Call
              </a>

              <button
                type="button"
                onClick={openAppointment}
                className={[CONTACT_ACTION_GRID, CONTACT_ACTION_OUTLINE, "h-11 px-3"].join(" ")}
              >
                <Calendar size={16} aria-hidden="true" />
                Book a look
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
