import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { LIFESTYLE_IMAGES } from "@/lib/lifestyle-images";
import { VEHICLE_IMAGES } from "@/lib/vehicle-images";

const BENEFITS = [
  "Condition reports on every vehicle",
  "Clear pricing with no hidden fees",
  "Full MOT history on every listing",
];

const COLLAGE = [
  {
    src:       LIFESTYLE_IMAGES.buying,
    alt:       "Couple browsing used cars on the forecourt",
    className: "row-span-2 min-h-[280px] sm:min-h-[320px] rounded-2xl",
  },
  {
    src:       LIFESTYLE_IMAGES.owning,
    alt:       "Family with their used car and keys",
    className: "min-h-[130px] sm:min-h-[150px] rounded-xl",
  },
  {
    src:       VEHICLE_IMAGES.car02,
    alt:       "Used car interior detail",
    className: "min-h-[130px] sm:min-h-[150px] rounded-xl",
  },
  {
    src:       LIFESTYLE_IMAGES.handover,
    alt:       "Mechanic inspecting a vehicle before handover",
    className: "min-h-[130px] sm:min-h-[150px] rounded-2xl",
  },
  {
    src:       VEHICLE_IMAGES.car03,
    alt:       "Used family car on display",
    className: "min-h-[130px] sm:min-h-[150px] rounded-xl",
  },
];

export function TrustedListingsSection() {
  return (
    <section className="py-16 lg:py-24 bg-[var(--color-surface-2)]" aria-labelledby="trusted-heading">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-[64px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — copy */}
          <div className="max-w-xl">
            <span className="type-section-label mb-6">
              Honest Listings
            </span>

            <h2
              id="trusted-heading"
              className="text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12] font-bold text-[var(--color-text)] tracking-tight mb-5"
            >
              Find your next car with nothing to hide
            </h2>

            <p className="text-base text-[var(--color-text-muted)] leading-relaxed mb-8">
              Browse used vehicles with clear photography, declared faults and
              complete MOT history before you arrange a viewing.
            </p>

            <ul className="space-y-4 mb-10">
              {BENEFITS.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="check-icon w-6 h-6 shrink-0">
                    <Check size={14} strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span className="text-sm sm:text-base font-medium text-[var(--color-text)]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <Link href="/search" className="link-cta">
              Browse Stock
              <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
            </Link>
          </div>

          {/* Right — spaced image grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              {COLLAGE.map(({ src, alt, className }) => (
                <div
                  key={src}
                  className={`${className} overflow-hidden border border-[var(--color-border)] rounded-[var(--radius-lg)]`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={alt}
                    className="w-full h-full min-h-[inherit] object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
