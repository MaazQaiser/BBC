"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, LayoutGrid, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { TopBar } from "@/components/navigation/TopBar";
import { Wordmark } from "@/components/brand/Wordmark";
import { SITE_CONTACT } from "@/lib/site-contact";
import { useSiteAppointment } from "@/components/site/SiteAppointmentProvider";

const NAV_LINKS = [
  { href: "/",        label: "Home"    },
  { href: "/search",  label: "Stock"   },
  { href: "/contact", label: "Contact" },
];

interface NavbarProps {
  variant?: "solid" | "overlay";
}

export function Navbar({ variant = "solid" }: NavbarProps) {
  const pathname = usePathname();
  const { openAppointment } = useSiteAppointment();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  function handleBookAppointment() {
    setOpen(false);
    openAppointment();
  }

  function isActive(href: string): boolean {
    if (href === "/") return pathname === "/";
    if (href === "/search") {
      return pathname === "/search" || pathname.startsWith("/vehicles/");
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function navLinkClass(href: string, mobile = false): string {
    const active = isActive(href);
    if (mobile) {
      return [
        "flex items-center h-11 text-[15px] font-medium px-1 transition-colors",
        active ? "text-white" : "text-white/90 hover:text-white",
      ].join(" ");
    }
    return [
      "text-[15px] font-medium transition-colors duration-[var(--duration-hover)]",
      active
        ? "text-white underline underline-offset-[6px] decoration-white/50"
        : "text-white hover:text-white/90",
    ].join(" ");
  }

  const isOverlay = variant === "overlay";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOverlay) return;
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isOverlay]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

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
        "top-0 left-0 right-0 z-[var(--z-overlay)] w-full min-w-0",
        "transition-[background-color] duration-200",
      ].join(" ")}
    >
      <TopBar className={topBarBg} />

      <div className={["border-b", barBg].join(" ")}>
        <Container>
          <div className="h-16 flex items-center gap-3 sm:gap-6 lg:gap-10 min-w-0">
            <Wordmark reversed asLink />

            {/* Nav — desktop */}
            <nav
              className="hidden lg:flex flex-1 items-center justify-center gap-8 xl:gap-10"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={navLinkClass(href)}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Actions — right */}
            <div className="flex flex-1 lg:flex-none items-center justify-end gap-3 sm:gap-4">
              <a
                href={SITE_CONTACT.phoneHref}
                className="hidden md:inline-flex items-center gap-2 h-10 px-5 rounded-[var(--radius-md)] border border-white/25 text-[14px] font-medium text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                <Phone size={16} strokeWidth={2} aria-hidden="true" />
                Call Us
              </a>

              <button
                type="button"
                onClick={handleBookAppointment}
                className="hidden sm:inline-flex items-center h-10 px-5 rounded-[var(--radius-md)] bg-[var(--color-accent)] text-white text-[14px] font-semibold hover:bg-[var(--color-accent-hover)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                Book Appointment
              </button>

              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-nav"
                className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-[var(--radius-md)] border border-white/25 text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                {open ? <X size={20} strokeWidth={2} /> : <LayoutGrid size={18} strokeWidth={2} />}
              </button>
            </div>
          </div>
        </Container>

        {open && (
          <div
            id="mobile-nav"
            className="lg:hidden border-t border-white/10 bg-[rgba(22,30,26,0.97)] backdrop-blur-md overflow-x-hidden overscroll-contain max-h-[calc(100dvh-var(--site-header-height))] overflow-y-auto"
          >
            <Container className="py-4 min-w-0">
              <nav aria-label="Mobile navigation" className="space-y-0.5">
                {NAV_LINKS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(href) ? "page" : undefined}
                    className={navLinkClass(href, true)}
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              <div className="mt-3 pt-3 border-t border-white/10">
                <Link
                  href="/trade"
                  onClick={() => setOpen(false)}
                  className="flex items-center h-10 text-sm font-medium text-white/55 hover:text-white/80 px-1 transition-colors"
                >
                  Trade Vehicles
                </Link>
              </div>

              <div className="pt-4 mt-4 flex flex-col gap-3 border-t border-white/10 min-w-0">
                <button
                  type="button"
                  onClick={handleBookAppointment}
                  className="w-full flex items-center justify-center h-11 px-4 rounded-[var(--radius-md)] bg-[var(--color-accent)] text-white text-sm font-semibold hover:bg-[var(--color-accent-hover)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  Book an appointment
                </button>
                <a
                  href={SITE_CONTACT.phoneHref}
                  className="w-full flex items-center justify-center gap-2 h-11 px-4 rounded-[var(--radius-md)] border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  <Phone size={15} aria-hidden="true" /> Call Us
                </a>
              </div>
            </Container>
          </div>
        )}
      </div>
    </header>
  );
}
