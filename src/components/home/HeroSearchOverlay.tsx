"use client";

import { Suspense } from "react";
import { Container } from "@/components/layout/Container";
import { HomeSearchBar } from "@/components/home/HomeSearchBar";
import type { FilterState, Vehicle } from "@/lib/types";

interface HeroSearchOverlayProps {
  vehicles: Vehicle[];
  initialFilters?: FilterState;
}

/** Between hero and category section — pulled up to sit half on each. */
export function HeroSearchOverlay({ vehicles, initialFilters }: HeroSearchOverlayProps) {
  return (
    <div className="relative z-30 hero-search-lift">
      <Container>
        <Suspense
          fallback={
            <div
              className="h-40 rounded-[var(--radius-xl)] bg-white shadow-[var(--shadow-lg)] animate-pulse"
              aria-hidden="true"
            />
          }
        >
          <HomeSearchBar
            vehicles={vehicles}
            initialFilters={initialFilters}
            target="home"
            variant="hero"
          />
        </Suspense>
      </Container>
    </div>
  );
}
