import Image from "next/image";
import { Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { HERO_IMAGES } from "@/lib/hero-images";

const TRUST_INDICATORS = [
  "Clear weekly rates",
  "MOT status on every listing",
  "Arrange collection in person",
];

interface RentHeroSectionProps {
  vehicleCount: number;
}

export function RentHeroSection({ vehicleCount }: RentHeroSectionProps) {
  return (
    <section
      className="relative w-full min-w-0 bg-[var(--color-dark)] min-h-[22rem] sm:min-h-[26rem] lg:min-h-[30rem]"
      aria-labelledby="rent-hero-heading"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <Image
          src={HERO_IMAGES.forecourt}
          alt=""
          fill
          priority
          className="object-cover"
          style={{ objectPosition: "72% 58%" }}
          sizes="100vw"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: [
              "linear-gradient(to right, rgba(17,17,17,0.94) 0%, rgba(17,17,17,0.78) 32%, rgba(17,17,17,0.35) 52%, rgba(17,17,17,0.1) 68%, transparent 82%)",
              "linear-gradient(to bottom, rgba(17,17,17,0.4) 0%, transparent 45%, transparent 100%)",
            ].join(", "),
          }}
        />
      </div>

      <Container className="relative z-10 min-w-0">
        <div className="box-border w-full min-w-0 max-w-full lg:max-w-2xl pt-[calc(var(--site-header-height)+1.5rem)] sm:pt-[calc(var(--site-header-height)+2rem)] pb-24 sm:pb-28 lg:pb-32">
          <p className="type-section-label text-white/60 mb-4">Weekly car hire</p>

          <h1
            id="rent-hero-heading"
            className="max-w-full text-3xl sm:text-4xl lg:text-[3.25rem] font-bold text-white mb-5 tracking-tight leading-[1.15] lg:leading-[1.12] break-words [overflow-wrap:anywhere]"
          >
            Available
            <br />
            for hire
          </h1>

          <p className="w-full max-w-full sm:max-w-lg text-base sm:text-lg text-white/75 mb-6 leading-relaxed break-words [overflow-wrap:anywhere]">
            <span className="num font-semibold text-white">{vehicleCount}</span> vehicles ready to go.
            Browse clear weekly rates and MOT expiry dates — then call, WhatsApp or visit us in Bury
            to arrange hire.
          </p>

          <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-x-8 gap-y-3">
            {TRUST_INDICATORS.map((label) => (
              <li key={label} className="flex items-center gap-2 text-sm text-white/90 min-w-0">
                <span className="check-icon w-5 h-5 shrink-0">
                  <Check
                    size={12}
                    className="text-[var(--color-text)]"
                    strokeWidth={3}
                    aria-hidden="true"
                  />
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
