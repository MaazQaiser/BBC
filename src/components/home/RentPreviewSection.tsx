import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { rentVehicles } from "@/lib/mock-data/rent-vehicles";
import { Container } from "@/components/layout/Container";
import { RentVehicleCard } from "@/components/rent/RentVehicleCard";

interface RentPreviewSectionProps {
  /** Max hire cards on the homepage (default 4). */
  limit?: number;
}

export function RentPreviewSection({ limit = 4 }: RentPreviewSectionProps) {
  if (!rentVehicles.length) return null;

  const displayed = rentVehicles.slice(0, limit);
  const total = rentVehicles.length;

  return (
    <section className="py-16 lg:py-20 bg-[var(--color-primary)]" aria-labelledby="rent-heading">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10">
          <div>
            <h2
              id="rent-heading"
              className="text-3xl lg:text-4xl font-bold text-white mb-2"
            >
              Weekly car hire
            </h2>
            <p className="text-sm sm:text-base text-white/80">
              Showing <span className="num">{displayed.length}</span> of{" "}
              <span className="num">{total}</span> vehicles — clear weekly rates and MOT status on every listing
            </p>
          </div>

          <Link
            href="/rent"
            className="link-cta shrink-0 self-start sm:self-auto"
          >
            View all
            <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {displayed.map((vehicle) => (
            <RentVehicleCard key={vehicle.id} vehicle={vehicle} variant="accent" />
          ))}
        </div>
      </Container>
    </section>
  );
}
