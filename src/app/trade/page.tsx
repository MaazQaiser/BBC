import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Trade Vehicles",
  description:
    "Trade vehicles sold for spares, repair or resale — for business buyers only.",
  robots: { index: false, follow: false },
};

export default function TradeInformationPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 py-8 lg:py-12">
        <Container width="narrow">
          <div className="max-w-xl mx-auto">
            <p className="type-label text-[var(--color-text-muted)] mb-2">
              Trade vehicles
            </p>
            <h1 className="type-h2 text-[var(--color-text)] mb-6">
              Trade vehicles
            </h1>

            <div className="type-body text-[var(--color-text-body)] space-y-4 leading-relaxed mb-10">
              <p>
                These vehicles are sold for spares, repair or resale.
              </p>
              <p>
                They are not prepared for retail sale and may not be roadworthy.
              </p>
              <p>
                The buyer must arrange transport, and vehicles may not be driven
                away.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/trade/verify"
                className={[
                  "inline-flex items-center justify-center gap-2 h-12 px-5 rounded-[var(--radius-md)]",
                  "bg-[var(--color-accent)] text-white type-small font-medium",
                  "hover:bg-[var(--color-accent-hover)] transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2",
                ].join(" ")}
              >
                Continue to trade vehicles
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/search"
                className={[
                  "inline-flex items-center justify-center h-12 px-5 rounded-[var(--radius-md)]",
                  "border border-[var(--color-border-strong)] bg-[var(--color-surface)]",
                  "type-small font-medium text-[var(--color-text)]",
                  "hover:bg-[var(--color-hover)] transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2",
                ].join(" ")}
              >
                Back to retail stock
              </Link>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
