import type { Metadata } from "next";
import { tradeVehicles } from "@/lib/mock-data/vehicles";
import { TradeListingClient } from "./TradeListingClient";

export const metadata: Metadata = {
  title: "Trade Vehicles",
  robots: { index: false, follow: false },
};

export default function TradeListingPage() {
  return <TradeListingClient vehicles={tradeVehicles} />;
}
