"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";
import type { Vehicle, FilterState, SortOption } from "@/lib/types";
import { DEFAULT_FILTERS } from "@/lib/types";
import { applyFilters, filtersToParams, paramsToFilters } from "@/lib/filters";
import { applySort, paramToSort, sortToParam } from "@/lib/sort";
import {
  PREVIEW_SEARCH_RESULTS,
  getPreviewFallbackResults,
} from "@/lib/preview-search";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { Container } from "@/components/layout/Container";
import { HomeSearchBar } from "@/components/home/HomeSearchBar";
import { FilterPanel } from "@/components/filters/FilterPanel";
import { ActiveFilterChips } from "@/components/filters/ActiveFilterChips";
import { ResultsHeader } from "@/components/filters/ResultsHeader";
import { SortSelect } from "@/components/filters/SortSelect";
import { VehicleGrid } from "@/components/cards/VehicleGrid";
import { VehicleGridSkeleton } from "@/components/feedback/LoadingState";
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
  const [moreOpen, setMoreOpen] = useState(false);

  const [filters, setFilters] = useState<FilterState>(() =>
    paramsToFilters(searchParams)
  );
  const [sort, setSort] = useState<SortOption>(() =>
    paramToSort(searchParams.get("sort"))
  );

  useEffect(() => {
    setFilters(paramsToFilters(searchParams));
    setSort(paramToSort(searchParams.get("sort")));
  }, [searchParams]);

  const pushState = useCallback(
    (nextFilters: FilterState, nextSort: SortOption) => {
      const params = filtersToParams(nextFilters);
      const sortParam = sortToParam(nextSort);
      if (sortParam) params.set("sort", sortParam);
      const qs = params.toString();
      router.replace(qs ? `${listingPath}?${qs}` : listingPath, { scroll: false });
    },
    [router, listingPath]
  );

  const handleFilterChange = useCallback(
    (next: FilterState) => {
      setFilters(next);
      pushState(next, sort);
    },
    [pushState, sort]
  );

  const handleSortChange = useCallback(
    (nextSort: SortOption) => {
      setSort(nextSort);
      pushState(filters, nextSort);
    },
    [pushState, filters]
  );

  const handleClear = useCallback(() => {
    handleFilterChange(DEFAULT_FILTERS);
  }, [handleFilterChange]);

  const filtered = useMemo(
    () => applyFilters(vehicles, filters, tradeMode ? "trade" : "retail"),
    [vehicles, filters, tradeMode],
  );
  const results  = useMemo(() => applySort(filtered, sort), [filtered, sort]);

  const showingPreviewFallback =
    results.length === 0 && PREVIEW_SEARCH_RESULTS;

  const displayResults = useMemo(() => {
    if (results.length > 0) return results;
    if (showingPreviewFallback) {
      return getPreviewFallbackResults(vehicles, sort, 6);
    }
    return results;
  }, [results, showingPreviewFallback, vehicles, sort]);

  const activeFilterCount = useMemo(
    () => buildFilterBadgeCount(filters),
    [filters]
  );

  return (
    <>
      <Navbar />

      <main className="flex-1 py-6 md:py-8">
        <Container>
          <div className="mb-6">
            <h1 className="type-h2 text-[var(--color-text)]">{pageTitle}</h1>
            {tradeMode ? (
              <p className="type-small text-[var(--color-text-muted)] mt-2 max-w-2xl">
                Vehicles sold for spares, repair or resale. Each listing includes
                declared faults, MOT history and available photography or video.
              </p>
            ) : null}
            {tradeMode ? (
              <p className="mt-3">
                <Link
                  href="/search"
                  className="type-small text-[var(--color-accent)] hover:underline"
                >
                  Back to retail stock
                </Link>
              </p>
            ) : null}
          </div>

          <div className="max-w-4xl mb-6">
            <HomeSearchBar
              vehicles={vehicles}
              initialFilters={filters}
              target={tradeMode ? "trade" : "search"}
            />
          </div>

          <div className="mb-4">
            <ActiveFilterChips filters={filters} onChange={handleFilterChange} onClearAll={handleClear} allVehicles={vehicles} />
          </div>

          {/* Desktop: expandable more filters */}
          <div className="hidden lg:block mb-6">
            <button
              type="button"
              onClick={() => setMoreOpen((o) => !o)}
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent)] hover:underline"
              aria-expanded={moreOpen}
            >
              {moreOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              {moreOpen ? "Hide filters" : "More filters"}
            </button>
            {moreOpen && (
              <div className="mt-4 p-5 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white max-w-3xl">
                <FilterPanel
                  mode="more"
                  allVehicles={vehicles}
                  filters={filters}
                  onChange={handleFilterChange}
                />
              </div>
            )}
          </div>

          <ResultsHeader
            count={displayResults.length}
            sortControl={<SortSelect value={sort} onChange={handleSortChange} />}
            filtersControl={
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
            }
          />

          {showingPreviewFallback && (
            <p className="mb-4 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-text-muted)]">
              Preview mode — showing sample listings so you can review the results flow. No cars match your current filters.
            </p>
          )}

          {displayResults.length > 0 ? (
            <VehicleGrid
              vehicles={displayResults}
              tradeLinks={tradeMode}
              hideTradeBadge={tradeMode}
            />
          ) : (
            <NoResults onClear={handleClear} />
          )}
        </Container>
      </main>

      <BottomSheet
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Filter"
      >
        <FilterPanel
          mode="full"
          allVehicles={vehicles}
          filters={filters}
          onChange={handleFilterChange}
        />
      </BottomSheet>

      <Footer />
    </>
  );
}

function buildFilterBadgeCount(filters: FilterState): number {
  let count = 0;
  if (filters.transmission.length) count += filters.transmission.length;
  if (filters.fuelType.length) count += filters.fuelType.length;
  if (filters.doors.length) count += filters.doors.length;
  if (filters.seats.length) count += filters.seats.length;
  if (filters.motRemainingMonths !== null) count += 1;
  if (filters.roadTaxMax !== null) count += 1;
  if (filters.mpgMin !== null) count += 1;
  if (filters.insuranceGroupMax !== null) count += 1;
  if (filters.serviceHistory.length) count += filters.serviceHistory.length;
  if (filters.hasVideoOnly) count += 1;
  if (filters.lowMileageForAgeOnly) count += 1;
  return count;
}

export function VehicleListingClient(props: VehicleListingClientProps) {
  return (
    <Suspense fallback={
      <div className="min-h-[50vh] flex items-center justify-center">
        <VehicleGridSkeleton count={3} />
      </div>
    }>
      <VehicleListingInner {...props} />
    </Suspense>
  );
}
