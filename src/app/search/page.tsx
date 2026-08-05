import type { Metadata } from "next";
import { SearchClient } from "./SearchClient";

export const metadata: Metadata = {
  title: "Search Cars",
  description: "Browse our full stock of used cars. Filter by price, year, mileage, fuel type, and more.",
};

export default function SearchPage() {
  return <SearchClient />;
}
