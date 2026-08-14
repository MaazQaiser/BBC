import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { Container } from "@/components/layout/Container";
import { YardLocationContent } from "@/components/site/YardLocationContent";
import { SITE_NAME } from "@/lib/site-brand";

export const metadata: Metadata = {
  title: "Contact",
  description: `Find ${SITE_NAME} in Bury, Greater Manchester. Opening hours, directions, call, WhatsApp and appointment requests.`,
};

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1 bg-white">
        <Container className="py-10 sm:py-14 lg:py-16">
          <div className="max-w-2xl min-w-0">
            <h1 className="type-h2 text-[var(--color-text)]">Where we are</h1>
            <p className="type-body text-[var(--color-text-muted)] mt-3 mb-8 leading-relaxed">
              Visit during opening hours, call or WhatsApp before you travel, or
              request an appointment.
            </p>

            <YardLocationContent showOpenStatus compactMap />
          </div>
        </Container>
      </main>

      <Footer />
    </>
  );
}
