import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Vehicle } from "@/lib/types";
import { Container } from "@/components/layout/Container";
import { VehicleGrid } from "@/components/cards/VehicleGrid";

interface StockGridSectionProps {
  vehicles: Vehicle[];
  /** Max cards to show on the homepage (default 6). */
  limit?: number;
}

export function StockGridSection({ vehicles, limit = 6 }: StockGridSectionProps) {
  if (!vehicles.length) return null;

  const displayed = vehicles.slice(0, limit);
  const total       = vehicles.length;

  return (
    <section className="py-16 lg:py-20 bg-[var(--color-surface-2)]" aria-labelledby="stock-heading">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10">
          <div>
            <h2
              id="stock-heading"
              className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] mb-2"
            >
              Current Stock
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-text-muted)]">
              Showing <span className="num">{displayed.length}</span> of{" "}
              <span className="num">{total}</span> vehicles — browse our full forecourt listings
            </p>
          </div>

          <Link
            href="/search"
            className="link-cta shrink-0 self-start sm:self-auto"
          >
            View all
            <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
          </Link>
        </div>

        <VehicleGrid vehicles={displayed} columns={3} />
      </Container>
    </section>
  );
}
