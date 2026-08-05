"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, LayoutGrid, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { TopBar } from "@/components/navigation/TopBar";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { SITE_CONTACT } from "@/lib/site-contact";

const NAV_LINKS = [
  { href: "/",        label: "Home"            },
  { href: "/search",  label: "Stock"           },
  { href: "/trade",   label: "Trade Vehicles"  },
  { href: "/contact", label: "Contact"         },
];

interface NavbarProps {
  variant?: "solid" | "overlay";
}

export function Navbar({ variant = "solid" }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isOverlay = variant === "overlay";

  useEffect(() => {
    if (!isOverlay) return;
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isOverlay]);

  const barBg =
    isOverlay && !scrolled && !open
      ? "bg-[rgba(22,30,26,0.55)] backdrop-blur-md border-white/10"
      : "bg-[rgba(22,30,26,0.92)] backdrop-blur-md border-white/10";

  const topBarBg =
    isOverlay && !scrolled && !open
      ? "bg-[rgba(14,20,17,0.75)] backdrop-blur-md border-white/10"
      : "bg-[rgba(14,20,17,0.95)] border-white/10";

  return (
    <header
      className={[
        isOverlay ? "fixed" : "sticky",
        "top-0 left-0 right-0 z-[var(--z-sticky)]",
        "transition-[background-color] duration-200",
      ].join(" ")}
    >
      <TopBar className={topBarBg} />

      <div className={["border-b", barBg].join(" ")}>
        <Container>
          <div className="h-20 flex items-center gap-6 lg:gap-10">
            {/* Logo */}
            <Link
              href="/"
              className="inline-flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-[var(--radius-sm)]"
              aria-label="Bury Bargain Cars — home"
            >
              <Image
                src="/logos/mcy_plate.svg"
                alt="Bury Bargain Cars"
                width={96}
                height={38}
                priority
                className="h-9 w-auto"
              />
            </Link>

            {/* Nav — desktop */}
            <nav
              className="hidden lg:flex flex-1 items-center justify-center gap-8 xl:gap-10"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-[15px] font-medium text-white hover:text-white/90 transition-colors duration-[var(--duration-hover)]"
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Actions — right */}
            <div className="flex flex-1 lg:flex-none items-center justify-end gap-3 sm:gap-4">
              <a
                href={SITE_CONTACT.phoneHref}
                className="hidden md:inline-flex items-center gap-2 h-10 px-5 rounded-[var(--radius-pill)] border border-white/25 text-[14px] font-medium text-white hover:bg-white/10 transition-colors"
              >
                <Phone size={16} strokeWidth={2} aria-hidden="true" />
                Call Us
              </a>

              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center h-10 px-5 rounded-[var(--radius-pill)] bg-white text-[var(--color-text)] text-[14px] font-semibold hover:bg-white/90 transition-colors"
              >
                Book Appointment
              </Link>

              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-nav"
                className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)] bg-[#B8F040] text-[var(--color-text)] hover:bg-[#a8dc30] transition-colors"
              >
                {open ? <X size={20} strokeWidth={2} /> : <LayoutGrid size={18} strokeWidth={2} />}
              </button>
            </div>
          </div>
        </Container>

        {open && (
          <div
            id="mobile-nav"
            className="lg:hidden border-t border-white/10 bg-[rgba(22,30,26,0.97)] backdrop-blur-md"
          >
            <Container className="py-4">
              {/* Mobile contact strip */}
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/70 mb-4 pb-4 border-b border-white/10">
                <a href={SITE_CONTACT.phoneHref} className="num hover:text-white transition-colors">
                  {SITE_CONTACT.phone}
                </a>
                <span>{SITE_CONTACT.location}</span>
                <span className="num">{SITE_CONTACT.hours}</span>
              </div>

              <nav aria-label="Mobile navigation" className="space-y-0.5 mb-4">
                {NAV_LINKS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="flex items-center h-11 text-[15px] font-medium text-white/90 hover:text-white px-1 transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 border-t border-white/10">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="flex-1 inline-flex items-center justify-center h-11 rounded-[var(--radius-pill)] bg-white text-[var(--color-text)] text-sm font-semibold"
                >
                  Book Appointment
                </Link>
                <a
                  href={SITE_CONTACT.phoneHref}
                  className="flex-1 inline-flex items-center justify-center gap-2 h-11 rounded-[var(--radius-pill)] border border-white/20 text-white text-sm font-medium"
                >
                  <Phone size={15} /> Call Us
                </a>
                <a
                  href={SITE_CONTACT.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 h-11 rounded-[var(--radius-pill)] border border-white/35 text-white text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  <WhatsAppIcon size={18} /> WhatsApp
                </a>
              </div>
            </Container>
          </div>
        )}
      </div>
    </header>
  );
}
