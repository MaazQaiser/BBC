"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import type { Vehicle, FilterState } from "@/lib/types";
import { DEFAULT_FILTERS } from "@/lib/types";
import { applyFilters, filtersToParams, paramsToFilters } from "@/lib/filters";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { Container } from "@/components/layout/Container";
import { FilterSidebar } from "@/components/filters/FilterSidebar";
import { VehicleGrid } from "@/components/cards/VehicleGrid";
import { BottomSheet } from "@/components/sections/BottomSheet";
import { Button } from "@/components/buttons/Button";
import { NoResults } from "@/components/feedback/NoResults";

export interface VehicleListingClientProps {
  vehicles:        Vehicle[];
  listingPath:     string;
  pageTitle:       string;
  tradeMode?:      boolean;
}

function VehicleListingInner({
  vehicles,
  listingPath,
  pageTitle,
  tradeMode = false,
}: VehicleListingClientProps) {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [filters, setFilters] = useState<FilterState>(() =>
    paramsToFilters(searchParams)
  );

  useEffect(() => {
    setFilters(paramsToFilters(searchParams));
  }, [searchParams]);

  const handleFilterChange = useCallback(
    (next: FilterState) => {
      setFilters(next);
      const params = filtersToParams(next);
      router.replace(`${listingPath}?${params.toString()}`, { scroll: false });
    },
    [router, listingPath]
  );

  const handleClear = useCallback(() => {
    handleFilterChange(DEFAULT_FILTERS);
  }, [handleFilterChange]);

  const results = applyFilters(vehicles, filters);

  const activeFilterCount = [
    filters.query,
    filters.priceMin,
    filters.priceMax,
    filters.yearMin,
    filters.yearMax,
    filters.mileageMax,
    filters.motRemainingMonths,
    ...filters.make,
    ...filters.bodyType,
    ...filters.fuelType,
    ...filters.transmission,
    filters.serviceHistoryOnly || null,
    filters.hasVideoOnly || null,
  ].filter(Boolean).length;

  return (
    <>
      <Navbar />

      <main className="flex-1 py-6 md:py-8">
        <Container>
          <div className="flex items-baseline justify-between mb-6 gap-4 flex-wrap">
            <div>
              <h1 className="type-h2 text-[var(--color-text)]">{pageTitle}</h1>
              <p className="type-small text-[var(--color-text-muted)] num mt-1">
                {results.length} {results.length === 1 ? "vehicle" : "vehicles"} found
              </p>
            </div>

            <Button
              variant="secondary"
              size="sm"
              leftIcon={<SlidersHorizontal size={15} />}
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden"
            >
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-1 w-4 h-4 rounded-full bg-[var(--color-accent)] text-white text-[10px] num font-medium leading-none inline-flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </div>

          {tradeMode && (
            <div className="mb-5 p-4 rounded-[var(--radius-md)] bg-[var(--color-warning-bg)] border border-[var(--color-warning-border)] type-small text-[var(--color-warning-text)]">
              Trade vehicles are sold for spares, repair or resale. They may not be roadworthy, must be transported, and cannot be driven away.
            </div>
          )}

          <div className="flex gap-8 items-start">
            <aside className="hidden lg:block w-64 shrink-0">
              <FilterSidebar
                allVehicles={vehicles}
                filters={filters}
                onChange={handleFilterChange}
              />
            </aside>

            <div className="flex-1 min-w-0">
              {results.length === 0 ? (
                <NoResults onClear={handleClear} />
              ) : (
                <VehicleGrid vehicles={results} tradeLinks={tradeMode} />
              )}
            </div>
          </div>
        </Container>
      </main>

      <BottomSheet
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Filters"
        footer={
          <Button fullWidth onClick={() => setDrawerOpen(false)}>
            Show <span className="num">{results.length}</span> {results.length === 1 ? "car" : "cars"}
          </Button>
        }
      >
        <FilterSidebar
          allVehicles={vehicles}
          filters={filters}
          onChange={handleFilterChange}
        />
      </BottomSheet>

      <Footer />
    </>
  );
}

export function VehicleListingClient(props: VehicleListingClientProps) {
  return (
    <Suspense>
      <VehicleListingInner {...props} />
    </Suspense>
  );
}
