import Link from "next/link";
import Image from "next/image";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/layout/Container";

const HOURS = [
  { day: "Monday – Friday", time: "9:00am – 6:00pm" },
  { day: "Saturday",        time: "9:00am – 5:00pm" },
  { day: "Sunday",          time: "Closed"           },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-[var(--color-dark)] text-white">
      <Container className="py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <Image
              src="/logos/mcy_plate.svg"
              alt="Bury Bargain Cars"
              width={120}
              height={48}
              className="h-10 w-auto mb-4"
            />
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Vehicles with honest descriptions, clear photography and transparent condition reporting.
            </p>
          </div>

          {/* Browse */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">Browse</p>
            <ul className="space-y-2">
              {[
                { href: "/search",  label: "Browse Cars"    },
                { href: "/trade",   label: "Trade Vehicles" },
                { href: "/contact", label: "Contact"        },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">Contact</p>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="mt-0.5 shrink-0 text-white/40" />
                <address className="not-italic leading-relaxed">
                  123 Bury New Road<br />Bury, BL9 0AA
                </address>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="shrink-0 text-white/40" />
                <a href="tel:+441614000000" className="num hover:text-white transition-colors">
                  0161 400 0000
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle size={14} className="shrink-0 text-white/40" />
                <a
                  href="https://wa.me/441614000000"
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
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">Opening Hours</p>
            <ul className="space-y-2">
              {HOURS.map(({ day, time }) => (
                <li key={day} className="flex items-start gap-2.5">
                  <Clock size={13} className="mt-0.5 shrink-0 text-white/40" />
                  <div className="text-sm">
                    <span className="text-white/60">{day}</span>
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
          <p className="text-xs text-white/40">
            © <span className="num">{year}</span> Bury Bargain Cars. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {[
              { href: "/privacy", label: "Privacy Policy"     },
              { href: "/terms",   label: "Terms & Conditions" },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="text-xs text-white/40 hover:text-white/70 transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
}
