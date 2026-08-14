import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { Container } from "@/components/layout/Container";
import { SITE_NAME } from "@/lib/site-brand";

export const metadata: Metadata = {
  title: "Terms & Conditions",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">
        <Container width="narrow" className="py-10 sm:py-14">
        <h1 className="text-2xl font-semibold text-[var(--color-text)] mb-2">Terms &amp; Conditions</h1>
        <p className="text-sm text-[var(--color-text-muted)] num mb-8">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </p>

        <div className="space-y-6 text-sm text-[var(--color-text)] leading-relaxed">
          <Section title="Vehicle descriptions">
            All vehicle listings include a full condition ledger. Descriptions are accurate at the time of listing.
            We recommend an independent inspection before purchase.
          </Section>
          <Section title="Prices">
            All prices shown are in GBP and are final. No hidden fees are added at point of sale.
          </Section>
          <Section title="Trade vehicles">
            Trade listings include the same condition disclosure as retail stock. Each listing describes known faults,
            MOT history and any available photography or video. Buyers should review the listing in full before purchase.
          </Section>
          <Section title="Payment">
            {SITE_NAME} accepts cash and bank transfer, completed on site. We do not take online payments, deposits or reservations through this website.
          </Section>
          <Section title="Images and video">
            Images and video walkarounds are provided for reference. Colours may vary due to photography conditions.
          </Section>
          <Section title="Governing law">
            These terms are governed by the laws of England and Wales.
          </Section>
        </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-[var(--color-border)] pt-4">
      <h2 className="font-semibold text-[var(--color-text)] text-base mb-1.5">{title}</h2>
      <p>{children}</p>
    </div>
  );
}
