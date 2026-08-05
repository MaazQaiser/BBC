"use client";

import type { Vehicle } from "@/lib/types";
import { VehicleListingClient } from "@/components/search/VehicleListingClient";

export function TradeListingClient({ vehicles }: { vehicles: Vehicle[] }) {
  return (
    <VehicleListingClient
      vehicles={vehicles}
      listingPath="/trade/listing"
      pageTitle="Trade Vehicles"
      tradeMode
    />
  );
}
