import type { Metadata } from "next";
import { rentVehicles } from "@/lib/mock-data/rent-vehicles";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { RentListingClient } from "@/components/rent/RentListingClient";

export const metadata: Metadata = {
  title: "Weekly Car Hire",
  description:
    "Browse weekly hire vehicles from Manchester Car Yard. Clear rates and MOT status on every listing — contact us to check availability.",
};

export default function RentPage() {
  return (
    <>
      <Navbar variant="overlay" />

      <main className="flex-1 w-full min-w-0">
        <RentListingClient vehicles={rentVehicles} />
      </main>

      <Footer />
    </>
  );
}
