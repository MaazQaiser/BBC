"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, MessageCircle, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/search", label: "Browse Cars" },
  { href: "/trade", label: "Trade Cars" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          {/* Logo / wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0 text-[var(--color-accent)] font-semibold text-lg tracking-tight"
            aria-label="BBC — Budget Buyer Cars, home"
          >
            <LogoMark />
            <span>BBC</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[var(--color-text-muted)]">
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} className="hover:text-[var(--color-text)] transition-colors">
                {label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <a
              href="tel:+441942000000"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors px-2 py-1"
              aria-label="Call us"
            >
              <Phone size={16} />
              <span className="num">01942 000000</span>
            </a>
            <a
              href="https://wa.me/441942000000"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium bg-[var(--color-accent-light)] text-[var(--color-accent)] px-3 py-1.5 rounded-[var(--radius-sm)] hover:bg-[var(--color-accent)] hover:text-white transition-colors"
              aria-label="WhatsApp us"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden p-2 rounded text-[var(--color-text-muted)] hover:bg-[var(--color-surface-2)] transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile nav panel */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 space-y-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="block px-2 py-2.5 text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors rounded-[var(--radius-sm)]"
              >
                {label}
              </Link>
            ))}
            <div className="pt-2 flex items-center gap-2 border-t border-[var(--color-border)] mt-2">
              <a
                href="tel:+441942000000"
                className="flex-1 inline-flex items-center justify-center gap-2 py-2 border border-[var(--color-border)] rounded-[var(--radius-sm)] text-sm text-[var(--color-text)]"
              >
                <Phone size={15} />
                <span className="num">Call</span>
              </a>
              <a
                href="https://wa.me/441942000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-2 bg-[var(--color-accent)] text-white rounded-[var(--radius-sm)] text-sm font-medium"
              >
                <MessageCircle size={15} />
                WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

function LogoMark() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="28" height="28" rx="6" fill="currentColor" />
      <path
        d="M6 18h16v2H6v-2zm2-6 3-5h10l3 5"
        stroke="white"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="9" cy="20" r="2" stroke="white" strokeWidth="1.8" fill="none" />
      <circle cx="19" cy="20" r="2" stroke="white" strokeWidth="1.8" fill="none" />
    </svg>
  );
}
