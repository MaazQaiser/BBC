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
    <section className="py-16 lg:py-24 bg-[#F5F5F5]" aria-labelledby="trusted-heading">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-[64px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — copy */}
          <div className="max-w-xl">
            <span className="inline-block px-4 py-1.5 mb-6 rounded-[var(--radius-pill)] bg-white border border-[var(--color-border)] text-xs font-semibold text-[var(--color-text-muted)] shadow-[var(--shadow-sm)]">
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
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#B8F040] shrink-0">
                    <Check size={14} className="text-[var(--color-text)]" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span className="text-sm sm:text-base font-medium text-[var(--color-text)]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/search"
              className="inline-flex items-center gap-2 h-12 px-7 rounded-[var(--radius-pill)] bg-[#B8F040] text-[var(--color-text)] text-sm font-bold hover:bg-[#a8dc30] transition-colors duration-[var(--duration-hover)]"
            >
              Browse Stock
              <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
            </Link>
          </div>

          {/* Right — spaced image grid */}
          <div className="relative">
            <div
              className="absolute inset-6 rounded-[2rem] bg-[#D4EDB8] opacity-60 -z-10"
              aria-hidden="true"
            />

            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              {COLLAGE.map(({ src, alt, className }) => (
                <div
                  key={src}
                  className={`${className} overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.08)]`}
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
