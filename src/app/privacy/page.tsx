import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-14 w-full">
        <h1 className="text-2xl font-semibold text-[var(--color-text)] mb-2">Privacy Policy</h1>
        <p className="text-sm text-[var(--color-text-muted)] num mb-8">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </p>

        <div className="prose-like space-y-6 text-sm text-[var(--color-text)] leading-relaxed">
          <Section title="Who we are">
            BBC Cars is a used vehicle retailer based in Leigh. Our website address is:{" "}
            <span className="num">bbc-cars.co.uk</span>
          </Section>

          <Section title="What data we collect">
            <p>
              When you contact us via WhatsApp, phone, or email, we collect the contact information you
              provide (such as your name and phone number) solely to respond to your enquiry.
            </p>
            <p>
              We do not use tracking cookies, advertising cookies, or any third-party analytics
              beyond standard server logs.
            </p>
          </Section>

          <Section title="How we use your data">
            <p>Your data is used only to respond to your enquiry and is never sold or shared with third parties.</p>
          </Section>

          <Section title="Your rights">
            <p>
              Under UK GDPR you have the right to access, correct, or delete any personal data we hold about you.
              To exercise these rights, please contact us at{" "}
              <a href="mailto:hello@bbc-cars.co.uk" className="text-[var(--color-accent)] hover:underline num">
                hello@bbc-cars.co.uk
              </a>
              .
            </p>
          </Section>

          <Section title="Contact">
            <p>
              For any privacy-related questions, please email{" "}
              <a href="mailto:hello@bbc-cars.co.uk" className="text-[var(--color-accent)] hover:underline num">
                hello@bbc-cars.co.uk
              </a>
              .
            </p>
          </Section>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-semibold text-[var(--color-text)] text-base mb-2">{title}</h2>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
