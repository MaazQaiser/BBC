import type { Metadata } from "next";
import { tradeVehicles } from "@/lib/mock-data/vehicles";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { TradeListingClient } from "@/components/trade/TradeListingClient";

export const metadata: Metadata = {
  title: "Trade Clearance — Cars to Trade",
  description:
    "Trade clearance vehicles for motor trade buyers only. Sold on a trade basis — not prepared for retail sale.",
  robots: { index: false, follow: false },
};

export default function TradeListingPage() {
  return (
    <>
      <Navbar variant="overlay" />
      <main className="flex-1 w-full min-w-0">
        <TradeListingClient vehicles={tradeVehicles} />
      </main>
      <Footer />
    </>
  );
}
