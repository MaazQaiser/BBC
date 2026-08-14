import type { Metadata } from "next";
import { retailVehicles } from "@/lib/mock-data/vehicles";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { HomePageClient } from "@/components/home/HomePageClient";
import { SITE_NAME } from "@/lib/site-brand";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Search Our Current Stock`,
  description:
    "Search used vehicles by make, price, year, mileage and body type. Every listing includes declared faults, full MOT history and video where available.",
};

export default function HomePage() {
  return (
    <>
      <Navbar variant="overlay" />

      <main className="flex-1 w-full min-w-0">
        <HomePageClient vehicles={retailVehicles} />
      </main>

      <Footer />
    </>
  );
}
