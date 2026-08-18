import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { Container } from "@/components/layout/Container";
import { BusinessVerificationForm } from "@/components/trade/BusinessVerificationForm";

export const metadata: Metadata = {
  title: "Trade buyer verification",
  robots: { index: false, follow: false },
};

const ACCEPTABLE_EVIDENCE = [
  "Motor trade insurance certificate",
  "Company details / Companies House information",
  "VAT registration where applicable",
  "Recent trade invoice",
  "Business bank or card evidence if appropriate",
  "Photo ID for the purchaser or director",
];

export default function TradeVerifyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 py-8 lg:py-12">
        <Container width="narrow">
          <div className="max-w-xl mx-auto">
            <p className="type-label text-[var(--color-text-muted)] mb-2">
              Trade Clearance
            </p>
            <h1 className="type-h2 text-[var(--color-text)] mb-3">
              Trade buyer verification
            </h1>
            <p className="type-body text-[var(--color-text-muted)] mb-6 leading-relaxed">
              You can browse trade stock and make an offer without uploading
              documents. Proof of motor trade status is required before purchase
              and collection.
            </p>

            <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-2)] p-5 sm:p-6 mb-8">
              <h2 className="text-sm font-semibold text-[var(--color-text)] mb-3">
                Acceptable evidence
              </h2>
              <ul className="space-y-2 text-sm text-[var(--color-text-muted)] leading-relaxed">
                {ACCEPTABLE_EVIDENCE.map((item) => (
                  <li key={item} className="pl-4 relative before:absolute before:left-0 before:content-['–']">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-[var(--color-text-faint)] mt-4">
                Other reasonable proof that you operate in the motor trade may also be accepted.
                We do not currently collect documents online.
              </p>
            </div>

            <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
              <Suspense fallback={null}>
                <BusinessVerificationForm />
              </Suspense>
            </div>

            <p className="mt-6 text-center">
              <Link
                href="/trade/listing"
                className="type-small text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
              >
                ← Back to trade clearance
              </Link>
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
