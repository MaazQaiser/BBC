import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { Container } from "@/components/layout/Container";
import { BusinessVerificationForm } from "@/components/trade/BusinessVerificationForm";

export const metadata: Metadata = {
  title: "Trade Vehicles — Business information",
  robots: { index: false, follow: false },
};

export default function TradeVerifyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 py-8 lg:py-12">
        <Container width="narrow">
          <div className="max-w-xl mx-auto rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
            <Suspense fallback={null}>
              <BusinessVerificationForm />
            </Suspense>
          </div>

          <p className="mt-6 text-center">
            <Link
              href="/trade"
              className="type-small text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              ← Back to trade information
            </Link>
          </p>
        </Container>
      </main>
      <Footer />
    </>
  );
}
