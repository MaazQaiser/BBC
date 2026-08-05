import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { VEHICLE_IMAGES } from "@/lib/vehicle-images";

export function HomeCTA() {
  return (
    <section className="py-16 lg:py-20" aria-labelledby="cta-heading">
      <div className="max-w-[1280px] mx-auto px-[64px]">
        <div className="relative rounded-[var(--radius-3xl)] bg-[var(--color-accent)] overflow-hidden min-h-[280px] flex items-center">
          {/* Car image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={VEHICLE_IMAGES.car07}
            alt=""
            className="absolute right-0 bottom-0 w-[55%] max-w-[480px] object-contain object-bottom hidden md:block"
          />

          <div className="relative z-10 p-8 lg:p-12 max-w-lg">
            <h2 id="cta-heading" className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
              Find Your Next Car Today
            </h2>
            <p className="text-white/85 text-base mb-8">
              Browse current stock or speak with our team to arrange a viewing.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/search"
                className="inline-flex items-center justify-center h-12 px-8 rounded-[var(--radius-2xl)] bg-white text-[var(--color-accent)] font-semibold text-[15px] hover:bg-white/90 transition-colors"
              >
                Browse stock
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-[var(--radius-2xl)] border-2 border-white text-white font-semibold text-[15px] hover:bg-white/10 transition-colors"
              >
                Contact us
              </Link>
              <a
                href="https://wa.me/441614000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-[var(--radius-2xl)] text-white/90 text-sm font-medium hover:text-white transition-colors sm:hidden"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
