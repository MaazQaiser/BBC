import { Check } from "lucide-react";
import { Container } from "@/components/layout/Container";

const TRADE_POINTS = [
  "Trade Clearance",
  "For Motor Trade Buyers Only",
  "Sold on a Trade Basis",
];

export function TradeHeroSection() {
  return (
    <section
      className="relative w-full min-w-0 bg-[var(--color-dark)]"
      aria-labelledby="trade-hero-heading"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(17,17,17,1) 0%, rgba(17,17,17,0.92) 55%, rgba(17,17,17,0.78) 100%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="box-border w-full max-w-2xl pt-[calc(var(--site-header-height)+1.5rem)] sm:pt-[calc(var(--site-header-height)+2rem)] pb-10 sm:pb-12 lg:pb-14">
          <p className="type-section-label text-white/55 mb-4">Cars to Trade</p>

          <h1
            id="trade-hero-heading"
            className="text-3xl sm:text-4xl lg:text-[3.25rem] font-bold text-white mb-4 tracking-tight leading-[1.15]"
          >
            Trade Clearance
          </h1>

          <p className="text-base sm:text-lg text-white/75 mb-6 leading-relaxed max-w-lg">
            Opportunity stock sold as seen for motor trade buyers. Vehicles may
            not be roadworthy and are not prepared for retail sale.
          </p>

          <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-x-8 gap-y-3">
            {TRADE_POINTS.map((label) => (
              <li key={label} className="flex items-center gap-2 text-sm text-white/90">
                <span className="check-icon w-5 h-5 shrink-0">
                  <Check size={12} className="text-[var(--color-text)]" strokeWidth={3} aria-hidden="true" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
