import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { Container } from "@/components/layout/Container";
import { TradeInformationHero } from "@/components/trade/TradeInformationHero";

export const metadata: Metadata = {
  title: "Trade Vehicles",
  description:
    "Trade vehicles offered for businesses purchasing vehicles for repair, dismantling, export or resale.",
  robots: { index: false, follow: false },
};

export default function TradeInformationPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 py-8 lg:py-12">
        <Container width="narrow">
          <TradeInformationHero />

          <div className="mt-10 lg:mt-12">
            <h1 className="type-h1 text-[var(--color-text)] mb-4">Trade Vehicles</h1>
            <div className="type-body-lg text-[var(--color-text-muted)] space-y-4 leading-relaxed">
              <p>
                These vehicles are offered for businesses purchasing vehicles for repair,
                dismantling, export or resale.
              </p>
              <p>Some vehicles may not be roadworthy.</p>
              <p>
                Vehicles must be transported from our premises and cannot be driven away.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-10">
              <Link
                href="/trade/verify"
                className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-[var(--radius-md)] bg-[#111111] text-white text-[15px] font-medium hover:bg-[#1a1a1a] transition-colors"
              >
                Continue to Trade Vehicles
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/search"
                className="inline-flex items-center justify-center h-12 px-5 rounded-[var(--radius-md)] bg-white text-[var(--color-text)] text-[15px] font-medium border border-[var(--color-border)] hover:bg-[var(--color-hover)] transition-colors"
              >
                Return to Retail Stock
              </Link>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
