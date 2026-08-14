import Link from "next/link";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Wordmark } from "@/components/brand/Wordmark";
import { SITE_NAME } from "@/lib/site-brand";
import { OPENING_HOURS, SITE_CONTACT } from "@/lib/site-contact";

const PRIMARY_NAV = [
  { href: "/",        label: "Home"    },
  { href: "/search",  label: "Stock"   },
  { href: "/contact", label: "Contact" },
];

export function Footer({ className = "" }: { className?: string }) {
  const year = new Date().getFullYear();

  return (
    <footer className={["mt-auto bg-[var(--color-dark)] text-white", className].filter(Boolean).join(" ")}>
      <Container className="py-12 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 min-w-0">

          {/* Brand */}
          <div className="min-w-0">
            <Wordmark reversed className="mb-4" />
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Vehicles with honest descriptions, clear photography and transparent condition reporting.
            </p>
          </div>

          {/* Primary navigation */}
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
              Navigation
            </p>
            <ul className="space-y-2">
              {PRIMARY_NAV.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li className="pt-2 mt-2 border-t border-white/10">
                <Link
                  href="/trade"
                  className="text-sm text-white/45 hover:text-white/70 transition-colors"
                >
                  Trade Vehicles
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
              Contact
            </p>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2.5 min-w-0">
                <MapPin size={14} className="mt-0.5 shrink-0 text-white/40" />
                <address className="not-italic leading-relaxed break-words">
                  {SITE_CONTACT.addressLine1}
                  <br />
                  {SITE_CONTACT.addressLine2}
                </address>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="shrink-0 text-white/40" />
                <a href={SITE_CONTACT.phoneHref} className="num hover:text-white transition-colors">
                  {SITE_CONTACT.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle size={14} className="shrink-0 text-white/40" />
                <a
                  href={SITE_CONTACT.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp us
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
              Opening hours
            </p>
            <ul className="space-y-2">
              {OPENING_HOURS.map(({ day, time }) => (
                <li key={day} className="flex items-start gap-2.5 min-w-0">
                  <Clock size={13} className="mt-0.5 shrink-0 text-white/40" />
                  <div className="text-sm min-w-0">
                    <span className="text-white/60 break-words">{day}</span>
                    <br />
                    <span className="num text-white/90">{time}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-[var(--color-dark-border)]">
        <Container className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40 text-center sm:text-left">
            © <span className="num">{year}</span> {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {[
              { href: "/privacy", label: "Privacy Policy"     },
              { href: "/terms",   label: "Terms & Conditions" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-xs text-white/40 hover:text-white/70 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
}
