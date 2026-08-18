import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { tradeVehicles, getTradeVehicleById } from "@/lib/mock-data/vehicles";
import { formatPrice } from "@/lib/filters";
import { getVehiclePageUrl } from "@/lib/vehicle-page-url";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { Container } from "@/components/layout/Container";
import { VehicleDetailContent } from "@/components/vehicle/VehicleDetailContent";
import { VehicleContactProvider } from "@/components/vehicle/VehicleContactContext";
import { StickyContactPanel } from "@/components/vehicle/StickyContactPanel";
import { VehicleDetailSection } from "@/components/vehicle/VehicleDetailSection";
import { TradeDetailActions } from "@/components/trade/TradeDetailActions";

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

  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  const pageUrl = await getVehiclePageUrl(vehicle.id, `/trade/vehicles`);
  const offerHref = `/trade/vehicles/${vehicle.id}/offer`;

  return (
    <>
      <Navbar />
      <VehicleContactProvider
        vehicleId={vehicle.id}
        vehicleTitle={title}
        registration={vehicle.registration}
        pageUrl={pageUrl}
      >
        <main className="flex-1 pb-32 lg:pb-12 bg-[var(--color-surface-2)]">
          <Container width="page" className="py-6 md:py-8">
            <div className="flex flex-col gap-4 mb-6 md:mb-8">
              <Link
                href="/trade/listing"
                className="inline-flex items-center gap-1.5 type-small text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors self-start"
              >
                <ArrowLeft size={14} aria-hidden="true" /> Back to trade clearance
              </Link>

              <div className="rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-surface-3)] px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text)]">
                  Trade Clearance · For Motor Trade Buyers Only
                </p>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">
                  Sold on a trade basis. Not prepared for retail sale and may not be roadworthy.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <VehicleDetailContent vehicle={vehicle} hideContactSection tradeMode />

              <VehicleDetailSection
                id="trade-actions"
                title="Trade actions"
                description="Make an offer, book a viewing, or WhatsApp us. Proof of motor trade status is required before purchase."
                className="hidden lg:block"
              >
                <TradeDetailActions
                  vehicleId={vehicle.id}
                  vehicleTitle={title}
                  registration={vehicle.registration}
                  pageUrl={pageUrl}
                />
              </VehicleDetailSection>
            </div>
          </Container>
        </main>

        <StickyContactPanel isTrade offerHref={offerHref} />
      </VehicleContactProvider>
      <Footer className="pb-[calc(var(--sticky-bar-height)+env(safe-area-inset-bottom)+0.75rem)] lg:pb-0" />
    </>
  );
}
