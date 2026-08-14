"use client";

import { useEffect, useState } from "react";
import { Clock, MapPin } from "lucide-react";
import { LocationMap } from "@/components/vehicle/LocationMap";
import { DirectionsButton } from "@/components/vehicle/DirectionsButton";
import { SiteContactActions } from "@/components/site/SiteContactActions";
import { OPENING_HOURS, SITE_CONTACT, SITE_LOCATION } from "@/lib/site-contact";
import { getTodayOpenStatus } from "@/lib/opening-hours";

export interface YardLocationContentProps {
  /** Show approximate travel times from nearby areas */
  showTravelTimes?: boolean;
  /** Show today's open/closed status */
  showOpenStatus?: boolean;
  /** Slightly shorter map aspect ratio for the contact page */
  compactMap?: boolean;
  /** full = directions plus call / WhatsApp / appointment; directions = map helper only */
  contactActions?: "full" | "directions";
}

export function YardLocationContent({
  showTravelTimes = false,
  showOpenStatus = false,
  compactMap = false,
  contactActions = "full",
}: YardLocationContentProps) {
  const [openStatus, setOpenStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!showOpenStatus) return;
    setOpenStatus(getTodayOpenStatus());
  }, [showOpenStatus]);

  return (
    <div className="space-y-6 min-w-0">
      <LocationMap compact={compactMap} />

      <address className="not-italic type-small text-[var(--color-text-body)] leading-relaxed break-words">
        <span className="flex items-start gap-2">
          <MapPin
            size={16}
            className="shrink-0 mt-0.5 text-[var(--color-text-muted)]"
            aria-hidden="true"
          />
          <span>
            {SITE_CONTACT.addressLine1}
            <br />
            {SITE_CONTACT.addressLine2}
          </span>
        </span>
      </address>

      {openStatus ? (
        <p className="type-small text-[var(--color-text-muted)]">{openStatus}</p>
      ) : null}

      <div>
        <p className="type-section-label mb-3">Opening hours</p>
        <ul className="space-y-2 border-t border-[var(--color-border)] pt-3">
          {OPENING_HOURS.map(({ day, time }) => (
            <li
              key={day}
              className="flex items-baseline justify-between gap-4 type-small min-w-0"
            >
              <span className="flex items-center gap-2 text-[var(--color-text-muted)] min-w-0">
                <Clock size={13} className="shrink-0" aria-hidden="true" />
                <span className="break-words">{day}</span>
              </span>
              <span className="num font-medium text-[var(--color-text)] shrink-0">
                {time}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {showTravelTimes ? (
        <ul className="space-y-1">
          {SITE_LOCATION.travelTimes.map(({ from, time }) => (
            <li key={from} className="type-small text-[var(--color-text-muted)]">
              <span className="num">{time}</span> from {from}
            </li>
          ))}
        </ul>
      ) : null}

      <p className="type-caption text-[var(--color-text-muted)] break-words">
        {SITE_LOCATION.parkingNote}
      </p>

      {contactActions === "full" ? (
        <div className="space-y-3">
          <DirectionsButton grid />
          <SiteContactActions />
        </div>
      ) : (
        <DirectionsButton grid className="sm:max-w-xs" />
      )}
    </div>
  );
}
