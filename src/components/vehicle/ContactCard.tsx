import type { ReactNode } from "react";
import { Phone, MessageCircle, Mail } from "lucide-react";
import { SITE_CONTACT } from "@/lib/site-contact";

export interface ContactMethod {
  icon:        ReactNode;
  label:       string;
  description: string;
  href:        string;
  ctaLabel:    string;
  external?:   boolean;
}

interface ContactCardProps {
  method: ContactMethod;
}

export function ContactCard({ method }: ContactCardProps) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 flex items-start gap-4">
      <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-accent-light)] flex items-center justify-center text-[var(--color-accent)] shrink-0">
        {method.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold type-small text-[var(--color-text)] mb-0.5">{method.label}</p>
        <p className="type-caption text-[var(--color-text-muted)] mb-2">{method.description}</p>
        <a
          href={method.href}
          target={method.external ? "_blank" : undefined}
          rel={method.external ? "noopener noreferrer" : undefined}
          className="type-small font-medium text-[var(--color-accent)] hover:underline"
        >
          {method.ctaLabel}
        </a>
      </div>
    </div>
  );
}

/* ─── Pre-built contact methods ──────────────────────────────────────── */
export const CONTACT_METHODS: ContactMethod[] = [
  {
    icon:        <MessageCircle size={18} />,
    label:       "WhatsApp",
    description: "Fastest response — usually within the hour during opening hours.",
    href:        SITE_CONTACT.whatsappHref,
    ctaLabel:    "Open WhatsApp",
    external:    true,
  },
  {
    icon:        <Phone size={18} />,
    label:       "Phone",
    description: "Call us during opening hours.",
    href:        SITE_CONTACT.phoneHref,
    ctaLabel:    SITE_CONTACT.phone,
  },
  {
    icon:        <Mail size={18} />,
    label:       "Email",
    description: "For non-urgent enquiries.",
    href:        SITE_CONTACT.emailHref,
    ctaLabel:    SITE_CONTACT.email,
  },
];
