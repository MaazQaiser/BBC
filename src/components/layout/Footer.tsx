import Link from "next/link";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <p className="text-sm font-semibold text-[var(--color-text)] mb-2">BBC</p>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            Honest used cars at straightforward prices. Every fault declared.
          </p>
        </div>

        {/* Contact */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-faint)] mb-3">
            Contact
          </p>
          <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
            <li className="flex items-start gap-2">
              <MapPin size={14} className="mt-0.5 shrink-0 text-[var(--color-text-faint)]" />
              <span>123 Example Road, Leigh, WN7 0AA</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={14} className="shrink-0 text-[var(--color-text-faint)]" />
              <a href="tel:+441942000000" className="num hover:text-[var(--color-accent)] transition-colors">
                01942 000000
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle size={14} className="shrink-0 text-[var(--color-text-faint)]" />
              <a
                href="https://wa.me/441942000000"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-accent)] transition-colors"
              >
                WhatsApp us
              </a>
            </li>
          </ul>
        </div>

        {/* Opening hours */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-faint)] mb-3">
            Opening Hours
          </p>
          <ul className="space-y-1 text-sm text-[var(--color-text-muted)]">
            <li className="flex items-center gap-2">
              <Clock size={14} className="shrink-0 text-[var(--color-text-faint)]" />
              <span>Mon–Fri <span className="num">9am–6pm</span></span>
            </li>
            <li className="flex items-center gap-2">
              <Clock size={14} className="shrink-0 text-[var(--color-text-faint)]" />
              <span>Saturday <span className="num">9am–5pm</span></span>
            </li>
            <li className="flex items-center gap-2">
              <Clock size={14} className="shrink-0 text-[var(--color-text-faint)]" />
              <span>Sunday — Closed</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--color-text-faint)]">
          <p>© {new Date().getFullYear()} BBC. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-[var(--color-text-muted)] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[var(--color-text-muted)] transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
