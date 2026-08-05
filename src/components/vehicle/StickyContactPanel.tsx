"use client";

import Link from "next/link";
import { Phone, MessageCircle, Calendar } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { formatPrice } from "@/lib/filters";
import { SITE_CONTACT } from "@/lib/site-contact";

export interface StickyContactPanelProps {
  vehicleTitle: string;
  price:        number;
  isTrade?:     boolean;
  enquiryHref?: string;
}

/**
 * Fixed bottom bar on vehicle detail pages (mobile-first).
 * WhatsApp, telephone, and book an appointment.
 */
export function StickyContactPanel({ vehicleTitle, price, isTrade, enquiryHref }: StickyContactPanelProps) {
  const waText = encodeURIComponent(
    `Hi, I'm interested in the ${isTrade ? "[Trade] " : ""}${vehicleTitle}`
  );

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[var(--z-sticky)] bg-[var(--color-surface)] border-t border-[var(--color-border)] shadow-[var(--shadow-sticky)] lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <Container className="py-3">
        <div className="flex items-center gap-2 mb-2 sm:hidden">
          <p className="num font-bold text-lg text-[var(--color-text)]">{formatPrice(price)}</p>
          {isTrade && (
            <p className="type-caption text-[var(--color-warning-text)]">Trade — sold as seen</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`${SITE_CONTACT.whatsappHref}?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 h-10 px-3 rounded-[var(--radius-md)] bg-[var(--color-accent)] text-white text-xs font-medium hover:bg-[var(--color-accent-hover)] transition-colors"
          >
            <MessageCircle size={15} aria-hidden="true" />
            WhatsApp
          </a>
          <a
            href={SITE_CONTACT.phoneHref}
            className="flex-1 inline-flex items-center justify-center gap-1.5 h-10 px-3 rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] text-xs font-medium text-[var(--color-text)] hover:bg-[var(--color-hover)] transition-colors num"
          >
            <Phone size={15} aria-hidden="true" />
            Call
          </a>
          <Link
            href={enquiryHref ?? "/contact"}
            className="flex-1 inline-flex items-center justify-center gap-1.5 h-10 px-3 rounded-[var(--radius-md)] bg-[#B8F040] text-[var(--color-text)] text-xs font-semibold hover:bg-[#a8dc30] transition-colors"
          >
            <Calendar size={15} aria-hidden="true" />
            {isTrade ? "Enquire" : "Book"}
          </Link>
        </div>
      </Container>
    </div>
  );
}
