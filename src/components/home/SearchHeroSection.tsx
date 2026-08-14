"use client";

import { Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { HeroImageCarousel } from "@/components/home/HeroImageCarousel";

const TRUST_INDICATORS = [
  "Faults clearly listed",
  "Full MOT history",
  "Video walkaround",
];

export function SearchHeroSection() {
  return (
    <section
      className="relative w-full min-w-0 bg-[var(--color-dark)] min-h-[30rem] sm:min-h-[32rem] lg:min-h-[40rem]"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <HeroImageCarousel />
      </div>

      <Container className="relative z-10 min-w-0">
        <div className="hero-search-hero-pad box-border w-full min-w-0 max-w-full lg:max-w-2xl pt-[calc(var(--site-header-height)+1.5rem)] sm:pt-[calc(var(--site-header-height)+2rem)] lg:pt-36">
          <h1
            id="hero-heading"
            className="max-w-full text-3xl sm:text-4xl lg:text-[3.5rem] font-bold text-white mb-6 tracking-tight leading-[1.15] lg:leading-[1.12] break-words [overflow-wrap:anywhere]"
          >
            Search Our
            <br />
            Current Stock
          </h1>

          <p className="w-full max-w-full sm:max-w-lg text-base sm:text-lg text-white/75 mb-8 leading-relaxed break-words [overflow-wrap:anywhere] [word-break:break-word]">
            Browse vehicles by price, mileage, make or model. Every listing
            includes clear photography, a condition report and a walkaround
            video where available.
          </p>

          <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-x-8 gap-y-3">
            {TRUST_INDICATORS.map((label) => (
              <li key={label} className="flex items-center gap-2 text-sm text-white/90 min-w-0">
                <span className="check-icon w-5 h-5 shrink-0">
                  <Check size={12} className="text-[var(--color-text)]" strokeWidth={3} aria-hidden="true" />
                </span>
                <span className="min-w-0">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
