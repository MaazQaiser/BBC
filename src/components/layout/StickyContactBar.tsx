"use client";

import { Phone, MessageCircle } from "lucide-react";
import { formatPrice } from "@/lib/filters";

interface StickyContactBarProps {
  vehicleTitle: string;
  price: number;
}

export function StickyContactBar({ vehicleTitle, price }: StickyContactBarProps) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--color-surface)] border-t border-[var(--color-border)] shadow-[var(--shadow-sticky)] safe-area-inset-bottom"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
        <div className="flex-1 min-w-0 hidden sm:block">
          <p className="text-sm font-medium text-[var(--color-text)] truncate">{vehicleTitle}</p>
          <p className="num text-lg font-semibold text-[var(--color-text)]">{formatPrice(price)}</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <a
            href="tel:+441942000000"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[var(--radius)] border border-[var(--color-border-2)] bg-[var(--color-surface)] text-[var(--color-text)] text-sm font-medium hover:bg-[var(--color-surface-2)] transition-colors"
          >
            <Phone size={16} />
            Call
          </a>
          <a
            href={`https://wa.me/441942000000?text=Hi%2C+I%27m+interested+in+the+${encodeURIComponent(vehicleTitle)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[var(--radius)] bg-[var(--color-accent)] text-white text-sm font-medium hover:bg-[var(--color-accent-hover)] transition-colors"
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
