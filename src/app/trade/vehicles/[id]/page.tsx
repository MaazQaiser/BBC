import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { tradeVehicles, getTradeVehicleById } from "@/lib/mock-data/vehicles";
import { formatPrice } from "@/lib/filters";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { Container } from "@/components/layout/Container";
import { VehicleDetailContent } from "@/components/vehicle/VehicleDetailContent";
import { StickyContactPanel } from "@/components/vehicle/StickyContactPanel";
import { TradeVehicleBadge } from "@/components/trade/TradeVehicleBadge";
import { getTradeSession } from "@/lib/trade-session-server";

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
    title:  `[Trade] ${vehicle.year} ${vehicle.make} ${vehicle.model} — ${formatPrice(vehicle.price)}`,
    robots: { index: false, follow: false },
  };
}

export default async function TradeVehicleDetailPage({ params }: PageProps) {
  const { id }  = await params;
  const vehicle = getTradeVehicleById(id);
  if (!vehicle) notFound();

  const tradeSession = await getTradeSession();
  if (!tradeSession) notFound();

  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

  return (
    <>
      <Navbar />
      <main className="flex-1 pb-28 lg:pb-12">
        <Container className="py-6 md:py-8">
          <div className="flex items-center gap-3 mb-8 flex-wrap">
            <Link
              href="/trade/listing"
              className="inline-flex items-center gap-1.5 type-small text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              <ArrowLeft size={14} aria-hidden="true" /> Back to trade stock
            </Link>
            <TradeVehicleBadge />
          </div>

          <VehicleDetailContent vehicle={vehicle} />
        </Container>
      </main>

      <StickyContactPanel
        vehicleTitle={`[Trade] ${title}`}
        price={vehicle.price}
        isTrade
        enquiryHref={`/trade/vehicles/${vehicle.id}/enquiry`}
      />
      <Footer />
    </>
  );
}
