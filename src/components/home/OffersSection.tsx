import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { VEHICLE_IMAGES } from "@/lib/vehicle-images";

const FEATURED = {
  title:  "Walkaround videos on selected stock",
  href:   "/search?video=1",
  image:  VEHICLE_IMAGES.car02,
};

const OFFERS = [
  {
    title: "Under £5,000",
    meta:  "Budget-friendly stock",
    href:  "/search?pmax=5000",
    image: VEHICLE_IMAGES.car01,
  },
  {
    title: "Trade vehicles",
    meta:  "Trade listings with declared faults",
    href:  "/trade",
    image: VEHICLE_IMAGES.car06,
  },
  {
    title: "7-seat & estate cars",
    meta:  "Family-friendly options",
    href:  "/search?seats=7",
    image: VEHICLE_IMAGES.car09,
  },
  {
    title: "Long MOT remaining",
    meta:  "6 months or more",
    href:  "/search?mot=6",
    image: VEHICLE_IMAGES.car10,
  },
];

function PlayBadge({ size = "lg" }: { size?: "lg" | "sm" }) {
  const dim = size === "lg" ? "w-14 h-14" : "w-8 h-8";
  const icon = size === "lg" ? 22 : 14;

  return (
    <span
      className={`inline-flex items-center justify-center ${dim} rounded-full bg-[var(--color-accent)] text-white`}
      aria-hidden="true"
    >
      <Play size={icon} fill="currentColor" strokeWidth={0} className="ml-0.5" />
    </span>
  );
}

export function OffersSection() {
  return (
    <section className="py-16 lg:py-24 bg-white" aria-labelledby="offers-heading">
      <Container>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10">
          <div>
            <h2
              id="offers-heading"
              className="text-[2rem] lg:text-[2.25rem] leading-tight font-bold text-[var(--color-text)] mb-2"
            >
              Browse by focus
            </h2>
            <p className="text-base text-[var(--color-text-muted)] max-w-xl">
              Straightforward ways to explore current stock.
            </p>
          </div>

          <Link
            href="/search"
            className="link-cta shrink-0 self-start sm:self-auto"
          >
            View More
            <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
          </Link>
        </div>

        {/* Featured + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-6">
          {/* Featured — left */}
          <Link
            href={FEATURED.href}
            className="group relative block min-h-[320px] sm:min-h-[380px] lg:min-h-[420px] rounded-[var(--radius-2xl)] overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={FEATURED.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-[var(--duration-hover)]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

            <div className="absolute inset-0 flex items-center justify-center">
              <PlayBadge size="lg" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug max-w-md">
                {FEATURED.title}
              </h3>
            </div>
          </Link>

          {/* List — right */}
          <div className="rounded-[var(--radius-2xl)] bg-[#E5F5E8] p-4 sm:p-5 flex flex-col gap-3">
            {OFFERS.map(({ title, meta, href, image }) => (
              <Link
                key={title}
                href={href}
                className="group flex items-center gap-4 p-3 rounded-[var(--radius-xl)] hover:bg-white/60 transition-colors duration-[var(--duration-hover)]"
              >
                <div className="relative shrink-0 w-[88px] h-[60px] rounded-[var(--radius-lg)] overflow-hidden bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <PlayBadge size="sm" />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm sm:text-base font-bold text-[var(--color-text)] leading-snug mb-1 group-hover:text-[var(--color-accent)] transition-colors">
                    {title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-text-muted)]">
                    {meta}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
