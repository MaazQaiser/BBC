"use client";

import { retailVehicles } from "@/lib/mock-data/vehicles";
import { VehicleListingClient } from "@/components/search/VehicleListingClient";

export function SearchClient() {
  return (
    <VehicleListingClient
      vehicles={retailVehicles}
      listingPath="/search"
      pageTitle="Cars for Sale"
    />
  );
}
