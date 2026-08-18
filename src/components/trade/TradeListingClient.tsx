"use client";

import { useMemo, useState } from "react";
import type { SortOption, Vehicle } from "@/lib/types";
import { applySort, TRADE_SORT_OPTIONS } from "@/lib/sort";
import { Container } from "@/components/layout/Container";
import { SortSelect } from "@/components/filters/SortSelect";
import { TradeHeroSection } from "@/components/trade/TradeHeroSection";
import { TradeVehicleCard } from "@/components/trade/TradeVehicleCard";

interface TradeListingClientProps {
  vehicles: Vehicle[];
}

export function TradeListingClient({ vehicles }: TradeListingClientProps) {
  const [sort, setSort] = useState<SortOption>("price-asc");

  const results = useMemo(() => applySort(vehicles, sort), [vehicles, sort]);

  return (
    <>
      <TradeHeroSection />

      <section className="flex-1 bg-[var(--color-surface-2)] py-8 sm:py-10 lg:py-12">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <p className="type-small text-[var(--color-text-muted)]">
              <span className="num font-medium text-[var(--color-text)]">{results.length}</span>{" "}
              vehicles for trade clearance
            </p>
            <SortSelect value={sort} onChange={setSort} options={TRADE_SORT_OPTIONS} />
          </div>

          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {results.map((vehicle) => (
                <TradeVehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <p className="type-body text-[var(--color-text-muted)] py-16 text-center">
              No trade vehicles are listed at present.
            </p>
          )}
        </Container>
      </section>
    </>
  );
}
