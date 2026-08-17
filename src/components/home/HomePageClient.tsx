"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Vehicle, SortOption } from "@/lib/types";
import { DEFAULT_FILTERS, DEFAULT_SORT } from "@/lib/types";
import { applyFilters, paramsToFilters } from "@/lib/filters";
import { applySort, paramToSort, sortToParam } from "@/lib/sort";
import { filtersToParams } from "@/lib/filters";
import {
  PREVIEW_SEARCH_RESULTS,
  getPreviewFallbackResults,
} from "@/lib/preview-search";
import { Container } from "@/components/layout/Container";
import { SearchHeroSection } from "@/components/home/SearchHeroSection";
import { HeroSearchOverlay } from "@/components/home/HeroSearchOverlay";
import { CategoryCards } from "@/components/home/CategoryCards";
import { StockGridSection } from "@/components/home/StockGridSection";
import { RentPreviewSection } from "@/components/home/RentPreviewSection";
import { VehicleTypeCards } from "@/components/home/VehicleTypeCards";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { TrustedListingsSection } from "@/components/home/TrustedListingsSection";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { HomeCTA } from "@/components/home/HomeCTA";
import { ActiveFilterChips } from "@/components/filters/ActiveFilterChips";
import { ResultsHeader } from "@/components/filters/ResultsHeader";
import { SortSelect } from "@/components/filters/SortSelect";
import { VehicleGrid } from "@/components/cards/VehicleGrid";
import { VehicleGridSkeleton } from "@/components/feedback/LoadingState";
import { NoResults } from "@/components/feedback/NoResults";

interface HomePageClientProps {
  vehicles: Vehicle[];
}

function HomePageInner({ vehicles }: HomePageClientProps) {
  const router       = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState(() => paramsToFilters(searchParams));
  const [sort, setSort] = useState<SortOption>(() => paramToSort(searchParams.get("sort")));

  useEffect(() => {
    setFilters(paramsToFilters(searchParams));
    setSort(paramToSort(searchParams.get("sort")));
  }, [searchParams]);

  const pushState = useCallback(
    (nextFilters: typeof filters, nextSort: SortOption) => {
      const params = filtersToParams(nextFilters);
      const sortParam = sortToParam(nextSort);
      if (sortParam) params.set("sort", sortParam);
      const qs = params.toString();
      router.replace(qs ? `/?${qs}` : "/", { scroll: false });
    },
    [router]
  );

  const handleFilterChange = useCallback(
    (next: typeof filters) => {
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

  const clearFilters = useCallback(() => {
    handleFilterChange(DEFAULT_FILTERS);
  }, [handleFilterChange]);

  const filtered = useMemo(
    () => applyFilters(vehicles, filters, "retail"),
    [vehicles, filters],
  );
  const results = useMemo(() => applySort(filtered, sort), [filtered, sort]);

  const hasActiveFilters = useMemo(() => {
    const d = DEFAULT_FILTERS;
    return JSON.stringify(filters) !== JSON.stringify(d);
  }, [filters]);

  const showingPreviewFallback =
    hasActiveFilters && results.length === 0 && PREVIEW_SEARCH_RESULTS;

  const displayResults = useMemo(() => {
    if (results.length > 0) return results;
    if (showingPreviewFallback) {
      return getPreviewFallbackResults(vehicles, sort, 6);
    }
    return results;
  }, [results, showingPreviewFallback, vehicles, sort]);

  const previewStock = useMemo(
    () => applySort(vehicles, DEFAULT_SORT),
    [vehicles],
  );

  return (
    <>
      <SearchHeroSection />

      <HeroSearchOverlay vehicles={vehicles} initialFilters={filters} />

      <CategoryCards />

      {hasActiveFilters ? (
        <section
          className="py-10 sm:py-12 bg-[var(--color-surface-2)]"
          aria-labelledby="stock-results-heading"
        >
          <Container>
            <div className="mb-4">
              <ActiveFilterChips
                filters={filters}
                onChange={handleFilterChange}
                onClearAll={clearFilters}
                allVehicles={vehicles}
              />
            </div>

            <ResultsHeader
              count={displayResults.length}
              sortControl={<SortSelect value={sort} onChange={handleSortChange} />}
            />

            {showingPreviewFallback && (
              <p className="mb-4 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-text-muted)]">
                Preview mode — showing sample listings so you can review the results flow. No cars match your current filters.
              </p>
            )}

            {displayResults.length > 0 ? (
              <VehicleGrid vehicles={displayResults} columns={3} />
            ) : (
              <NoResults onClear={clearFilters} />
            )}
          </Container>
        </section>
      ) : (
        <StockGridSection vehicles={previewStock} limit={6} />
      )}

      <RentPreviewSection />

      <VehicleTypeCards />
      <WhyChooseUs />
      <TrustedListingsSection />
      <HomeFAQ />
      <TestimonialsSection />
      <HomeCTA />
    </>
  );
}

export function HomePageClient({ vehicles }: HomePageClientProps) {
  return (
    <Suspense
      fallback={
        <div className="pt-[calc(var(--site-header-height)+2rem)] pb-20">
          <Container>
            <VehicleGridSkeleton count={6} />
          </Container>
        </div>
      }
    >
      <HomePageInner vehicles={vehicles} />
    </Suspense>
  );
}
