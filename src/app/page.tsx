import type { Metadata } from "next";
import { retailVehicles } from "@/lib/mock-data/vehicles";
import { Navbar }               from "@/components/navigation/Navbar";
import { Footer }                 from "@/components/navigation/Footer";
import { SearchHeroSection }      from "@/components/home/SearchHeroSection";
import { CategoryCards }          from "@/components/home/CategoryCards";
import { StockGridSection }       from "@/components/home/StockGridSection";
import { VehicleTypeCards }       from "@/components/home/VehicleTypeCards";
import { WhyChooseUs }            from "@/components/home/WhyChooseUs";
import { TrustedListingsSection } from "@/components/home/TrustedListingsSection";
import { HomeFAQ }                from "@/components/home/HomeFAQ";
import { TestimonialsSection }    from "@/components/home/TestimonialsSection";
import { HomeCTA }                from "@/components/home/HomeCTA";

export const metadata: Metadata = {
  title: "Bury Bargain Cars — Search Our Current Stock",
  description:
    "Browse vehicles by price, mileage, make or model. Every listing includes clear photography, a condition report and a walkaround video where available.",
};

export default function HomePage() {
  return (
    <>
      <Navbar variant="overlay" />

      <main className="flex-1">
        <SearchHeroSection />
        <CategoryCards />
        <StockGridSection vehicles={retailVehicles} />
        <VehicleTypeCards />
        <WhyChooseUs />
        <TrustedListingsSection />
        <HomeFAQ />
        <TestimonialsSection />
        <HomeCTA />
      </main>

      <Footer />
    </>
  );
}
