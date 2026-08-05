import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Navbar }  from "@/components/navigation/Navbar";
import { Footer }  from "@/components/navigation/Footer";
import { Container } from "@/components/layout/Container";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { OPENING_HOURS, SITE_CONTACT } from "@/lib/site-contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Bury Bargain Cars. Call, WhatsApp, or visit us in Bury.",
};

type ContactIcon = "whatsapp" | "phone" | "email" | "address";

const CONTACT_BLOCKS: {
  label:     string;
  icon:      ContactIcon;
  lines:     string[];
  href:      string;
  linkLabel: string;
  external?: boolean;
  linkClass?: string;
}[] = [
  {
    label:       "WhatsApp",
    icon:        "whatsapp",
    lines:       ["Usually the fastest response — we reply during opening hours."],
    href:        SITE_CONTACT.whatsappHref,
    linkLabel:   "Open WhatsApp",
    external:    true,
  },
  {
    label:       "Phone",
    icon:        "phone",
    lines:       ["Call us during opening hours."],
    href:        SITE_CONTACT.phoneHref,
    linkLabel:   SITE_CONTACT.phone,
    linkClass:   "num",
  },
  {
    label:       "Email",
    icon:        "email",
    lines:       ["For non-urgent enquiries."],
    href:        SITE_CONTACT.emailHref,
    linkLabel:   SITE_CONTACT.email,
  },
  {
    label:       "Address",
    icon:        "address",
    lines:       [SITE_CONTACT.addressLine1, SITE_CONTACT.addressLine2],
    href:        SITE_CONTACT.directionsHref,
    linkLabel:   "Get directions →",
    external:    true,
  },
];

function ContactBlockLabel({ icon, label }: { icon: ContactIcon; label: string }) {
  const iconClass = "shrink-0 text-[var(--color-accent)]";

  return (
    <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-faint)] mb-3">
      {icon === "whatsapp" && <WhatsAppIcon size={16} className={iconClass} />}
      {icon === "phone"    && <Phone size={16} className={iconClass} strokeWidth={2} aria-hidden="true" />}
      {icon === "email"    && <Mail size={16} className={iconClass} strokeWidth={2} aria-hidden="true" />}
      {icon === "address"  && <MapPin size={16} className={iconClass} strokeWidth={2} aria-hidden="true" />}
      {label}
    </p>
  );
}

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1 bg-white">
        <Container className="py-14 lg:py-20">
          {/* Hero row — heading left, contact grid right */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-12 lg:gap-20 xl:gap-28 items-start">
            <div className="lg:pt-4">
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08] font-bold text-[var(--color-text)] tracking-tight mb-6">
                Contact us
              </h1>
              <p className="text-base sm:text-lg text-[var(--color-text-muted)] leading-relaxed max-w-md">
                We&apos;re happy to answer any questions. The quickest way to reach us is WhatsApp.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10 lg:gap-y-12">
              {CONTACT_BLOCKS.map(({ label, icon, lines, href, linkLabel, external, linkClass }) => (
                <div key={label}>
                  <ContactBlockLabel icon={icon} label={label} />
                  <div className="space-y-1 text-[15px] leading-relaxed text-[var(--color-text-muted)]">
                    {lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className={[
                      "inline-block mt-3 text-[15px] font-medium text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors",
                      linkClass ?? "",
                    ].join(" ")}
                  >
                    {linkLabel}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom row — hours + image */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-12 lg:gap-20 xl:gap-28 mt-16 lg:mt-24 items-end">
            <div>
              <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-faint)] mb-4">
                <Clock size={16} className="shrink-0 text-[var(--color-accent)]" strokeWidth={2} aria-hidden="true" />
                Opening hours
              </p>
              <ul className="space-y-3">
                {OPENING_HOURS.map(({ day, time }) => (
                  <li key={day} className="flex items-baseline justify-between gap-6 text-[15px]">
                    <span className="text-[var(--color-text-muted)]">{day}</span>
                    <span className="num font-medium text-[var(--color-text)] shrink-0">{time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative aspect-[16/10] sm:aspect-[5/3] lg:aspect-[16/9] overflow-hidden rounded-[var(--radius-2xl)] bg-[var(--color-surface-2)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/lifestyle/buying.png?v=1"
                alt="Customers browsing used cars on the forecourt"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </>
  );
}
