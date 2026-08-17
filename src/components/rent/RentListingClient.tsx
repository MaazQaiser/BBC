"use client";

import { useMemo, useState } from "react";
import type { Vehicle } from "@/lib/types";
import { filterRentByQuery } from "@/lib/rent-format";
import { Container } from "@/components/layout/Container";
import { RentHeroSection } from "@/components/rent/RentHeroSection";
import { RentSearchBar } from "@/components/rent/RentSearchBar";
import { RentVehicleCard } from "@/components/rent/RentVehicleCard";
import { RentHireCTA } from "@/components/rent/RentHireCTA";
import { RentFAQ } from "@/components/rent/RentFAQ";
import { Button } from "@/components/buttons/Button";

interface RentListingClientProps {
  vehicles: Vehicle[];
}

export function RentListingClient({ vehicles }: RentListingClientProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(
    () => filterRentByQuery(vehicles, query),
    [vehicles, query],
  );

  return (
    <>
      <RentHeroSection vehicleCount={vehicles.length} />
      <RentSearchBar value={query} onChange={setQuery} />

      <section className="flex-1 bg-[var(--color-surface-2)] pt-8 sm:pt-10 pb-12 sm:pb-14 lg:pb-16">
        <Container>
          {results.length > 0 ? (
            <>
              <p className="type-small text-[var(--color-text-muted)] mb-6 text-center sm:text-left">
                Showing <span className="num font-medium text-[var(--color-text)]">{results.length}</span>
                {query.trim() ? " matching vehicles" : ` of ${vehicles.length} hire vehicles`}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
                {results.map((vehicle) => (
                  <RentVehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <p className="type-body text-[var(--color-text-muted)] mb-4">
                No vehicles match that search. Try a different make or model.
              </p>
              <Button variant="secondary" size="sm" onClick={() => setQuery("")}>
                Clear search
              </Button>
            </div>
          )}

          <RentHireCTA />
        </Container>
      </section>

      <RentFAQ />
    </>
  );
}
