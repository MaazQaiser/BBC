import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getTradeVehicleById, tradeVehicles } from "@/lib/mock-data/vehicles";
import { formatPrice } from "@/lib/filters";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { Container } from "@/components/layout/Container";
import { TradeOfferForm } from "@/components/trade/TradeOfferForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return tradeVehicles.map((v) => ({ id: v.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id }  = await params;
  const vehicle = getTradeVehicleById(id);
  if (!vehicle) return {};
  return {
    title:  `Make an offer — ${vehicle.year} ${vehicle.make} ${vehicle.model}`,
    robots: { index: false, follow: false },
  };
}

export default async function TradeOfferPage({ params }: PageProps) {
  const { id }  = await params;
  const vehicle = getTradeVehicleById(id);
  if (!vehicle) notFound();

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

          <p className="type-label text-[var(--color-accent)] mb-2">Trade Clearance</p>
          <h1 className="type-h2 text-[var(--color-text)] mb-1">Make an offer</h1>
          <p className="type-body text-[var(--color-text-muted)] num mb-8">
            {title} — {formatPrice(vehicle.price)}
            {vehicle.registration && (
              <span className="ml-3 uppercase">{vehicle.registration}</span>
            )}
          </p>

          <TradeOfferForm
            vehicleId={vehicle.id}
            vehicleTitle={title}
            registration={vehicle.registration ?? "N/A"}
            askingPrice={vehicle.price}
          />
        </Container>
      </main>
      <Footer />
    </>
  );
}
