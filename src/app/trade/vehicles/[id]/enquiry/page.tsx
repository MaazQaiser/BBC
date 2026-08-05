import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getTradeVehicleById } from "@/lib/mock-data/vehicles";
import { formatPrice } from "@/lib/filters";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { Container } from "@/components/layout/Container";
import { getTradeSession } from "@/lib/trade-session-server";
import { TradeEnquiryForm } from "@/components/trade/TradeEnquiryForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id }  = await params;
  const vehicle = getTradeVehicleById(id);
  if (!vehicle) return {};
  return {
    title:  `Enquire — ${vehicle.year} ${vehicle.make} ${vehicle.model}`,
    robots: { index: false, follow: false },
  };
}

export default async function TradeEnquiryPage({ params }: PageProps) {
  const { id }  = await params;
  const vehicle = getTradeVehicleById(id);
  if (!vehicle) notFound();

  const tradeSession = await getTradeSession();
  if (!tradeSession) notFound();

  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

  return (
    <>
      <Navbar />
      <main className="flex-1 py-8 lg:py-12">
        <Container width="narrow">
          <Link
            href={`/trade/vehicles/${vehicle.id}`}
            className="inline-flex items-center gap-1.5 type-small text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors mb-8"
          >
            <ArrowLeft size={14} aria-hidden="true" /> Back to vehicle
          </Link>

          <p className="type-label text-[var(--color-accent)] mb-2">Trade Enquiry</p>
          <h1 className="type-h2 text-[var(--color-text)] mb-1">{title}</h1>
          <p className="type-body text-[var(--color-text-muted)] num mb-8">
            {formatPrice(vehicle.price)}
            {vehicle.registration && (
              <span className="ml-3 uppercase">{vehicle.registration}</span>
            )}
          </p>

          <TradeEnquiryForm
            vehicleId={vehicle.id}
            vehicleTitle={title}
            registration={vehicle.registration ?? "N/A"}
            tradeSession={tradeSession}
          />
        </Container>
      </main>
      <Footer />
    </>
  );
}
