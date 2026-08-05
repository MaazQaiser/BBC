import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { retailVehicles, getRetailVehicleById } from "@/lib/mock-data/vehicles";
import { formatPrice } from "@/lib/filters";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { Container } from "@/components/layout/Container";
import { VehicleDetailContent } from "@/components/vehicle/VehicleDetailContent";
import { StickyContactPanel } from "@/components/vehicle/StickyContactPanel";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return retailVehicles.map((v) => ({ id: v.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id }  = await params;
  const vehicle = getRetailVehicleById(id);
  if (!vehicle) return {};
  return {
    title:       `${vehicle.year} ${vehicle.make} ${vehicle.model} — ${formatPrice(vehicle.price)}`,
    description: vehicle.description,
  };
}

export default async function VehicleDetailPage({ params }: PageProps) {
  const { id }  = await params;
  const vehicle = getRetailVehicleById(id);
  if (!vehicle) notFound();

  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

  return (
    <>
      <Navbar />

      <main className="flex-1 pb-28 lg:pb-12">
        <Container className="py-6 md:py-8">
          <Breadcrumb
            items={[
              { label: "Cars for Sale", href: "/search" },
              { label: title },
            ]}
            className="mb-8"
          />

          <VehicleDetailContent vehicle={vehicle} />
        </Container>
      </main>

      <StickyContactPanel vehicleTitle={title} price={vehicle.price} />
      <Footer />
    </>
  );
}
