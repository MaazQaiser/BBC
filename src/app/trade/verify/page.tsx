import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { Container } from "@/components/layout/Container";
import { BusinessVerificationForm } from "@/components/trade/BusinessVerificationForm";

export const metadata: Metadata = {
  title: "Business Verification",
  robots: { index: false, follow: false },
};

export default function TradeVerifyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 py-8 lg:py-12">
        <Container width="narrow">
          <p className="type-label text-[var(--color-accent)] mb-2">Trade Vehicles</p>
          <h1 className="type-h2 text-[var(--color-text)] mb-2">Business Verification</h1>
          <p className="type-body text-[var(--color-text-muted)] mb-8 leading-relaxed">
            You must complete business verification before accessing trade vehicles.
          </p>

          <Suspense fallback={null}>
            <BusinessVerificationForm />
          </Suspense>

          <p className="mt-8 text-center">
            <Link
              href="/trade"
              className="type-small text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              ← Back to Trade Information
            </Link>
          </p>
        </Container>
      </main>
      <Footer />
    </>
  );
}
