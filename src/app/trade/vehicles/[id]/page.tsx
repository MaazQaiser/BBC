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
import { TradeVehicleEnquirySection } from "@/components/trade/TradeVehicleEnquirySection";
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
  const pageUrl = await getVehiclePageUrl(vehicle.id, `/trade/vehicles`);
  const enquiryHref = `/trade/vehicles/${vehicle.id}/enquiry`;

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
            <div className="flex items-center gap-3 mb-6 md:mb-8 flex-wrap">
              <Link
                href="/trade/listing"
                className="inline-flex items-center gap-1.5 type-small text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
              >
                <ArrowLeft size={14} aria-hidden="true" /> Back to trade stock
              </Link>
            </div>

            <div className="space-y-5">
              <VehicleDetailContent vehicle={vehicle} hideContactSection />

              <VehicleDetailSection
                id="trade-enquiry"
                title="Trade enquiry"
                description={`Send an enquiry about ${title}. Your business information from the trade gate will be included with the request.`}
                className="hidden lg:block"
              >
                <TradeVehicleEnquirySection
                  enquiryHref={enquiryHref}
                  vehicleTitle={title}
                />
              </VehicleDetailSection>
            </div>
          </Container>
        </main>

        <StickyContactPanel isTrade enquiryHref={enquiryHref} />
      </VehicleContactProvider>
      <Footer className="pb-[calc(var(--sticky-bar-height)+env(safe-area-inset-bottom)+0.75rem)] lg:pb-0" />
    </>
  );
}
