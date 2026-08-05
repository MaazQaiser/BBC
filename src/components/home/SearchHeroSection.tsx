import { Check } from "lucide-react";
import { HeroImageCarousel } from "@/components/home/HeroImageCarousel";
import { HomeSearchBar } from "@/components/home/HomeSearchBar";

const TRUST_INDICATORS = [
  "Faults clearly listed",
  "Full MOT history",
  "Video walkaround",
];

/**
 * Carento-style cinematic hero.
 * Copy and search card share one inset — left-aligned with wide side gutters.
 */
export function SearchHeroSection() {
  return (
    <section className="relative bg-[var(--color-dark)]" aria-labelledby="hero-heading">
      <HeroImageCarousel />

      <div className="relative z-10 w-full mx-auto px-[64px]">
        {/* Hero copy — left-aligned above search card */}
        <div className="max-w-2xl pt-32 pb-48 sm:pt-36 sm:pb-52 lg:pt-40 lg:pb-56">
          <h1
            id="hero-heading"
            className="text-3xl sm:text-4xl lg:text-[3.5rem] lg:leading-[1.12] font-bold text-white mb-6 tracking-tight"
          >
            Search Our
            <br />
            Current Stock
          </h1>

          <p className="text-base sm:text-lg text-white/75 mb-8 max-w-lg leading-relaxed">
            Browse vehicles by price, mileage, make or model. Every listing
            includes clear photography, a condition report and a walkaround
            video where available.
          </p>

          <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-x-8 gap-y-3">
            {TRUST_INDICATORS.map((label) => (
              <li key={label} className="flex items-center gap-2 text-sm text-white/90">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#B8F040] shrink-0">
                  <Check size={12} className="text-[var(--color-text)]" strokeWidth={3} aria-hidden="true" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Search card — centered, narrower than full bleed */}
        <div className="absolute bottom-0 left-5 right-5 sm:left-10 sm:right-10 md:left-16 md:right-16 lg:left-[160px] lg:right-[160px] xl:left-[192px] xl:right-[192px] translate-y-1/2 flex justify-center">
          <div className="w-full max-w-[1040px]">
            <HomeSearchBar />
          </div>
        </div>
      </div>
    </section>
  );
}
