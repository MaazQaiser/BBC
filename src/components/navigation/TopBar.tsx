import { Clock, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { SITE_CONTACT } from "@/lib/site-contact";

interface TopBarProps {
  className?: string;
}

export function TopBar({ className = "" }: TopBarProps) {
  return (
    <div
      className={[
        "border-b border-white/10 bg-[rgba(14,20,17,0.95)]",
        className,
      ].join(" ")}
    >
      <Container>
        <div className="h-10 flex items-center justify-between gap-4 text-xs sm:text-[13px] text-white/75">
          <div className="flex items-center gap-4 sm:gap-6 min-w-0">
            <a
              href={SITE_CONTACT.phoneHref}
              className="inline-flex items-center gap-1.5 shrink-0 hover:text-white transition-colors"
            >
              <Phone size={13} strokeWidth={2} aria-hidden="true" />
              <span className="num font-medium">{SITE_CONTACT.phone}</span>
            </a>

            <span className="hidden md:inline-flex items-center gap-1.5 min-w-0">
              <MapPin size={13} className="shrink-0" strokeWidth={2} aria-hidden="true" />
              <span className="truncate">{SITE_CONTACT.location}</span>
            </span>

            <span className="hidden lg:inline-flex items-center gap-1.5 shrink-0">
              <Clock size={13} strokeWidth={2} aria-hidden="true" />
              <span className="num">{SITE_CONTACT.hours}</span>
            </span>
          </div>

          <a
            href={SITE_CONTACT.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 shrink-0 font-medium text-white/90 hover:text-white transition-colors"
          >
            <WhatsAppIcon size={14} />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </Container>
    </div>
  );
}
