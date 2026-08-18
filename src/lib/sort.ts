import type { SortOption, Vehicle } from "@/lib/types";
import { DEFAULT_SORT } from "@/lib/types";
import { motRemainingMonths } from "@/lib/filters";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest",      label: "Newest in" },
  { value: "price-asc",   label: "Price low to high" },
  { value: "price-desc",  label: "Price high to low" },
  { value: "mileage-asc", label: "Mileage low to high" },
  { value: "year-desc",   label: "Age newest first" },
  { value: "mot-desc",    label: "MOT remaining longest" },
];

/** Trade listing — price only */
export const TRADE_SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "price-asc",  label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export function getSortLabel(sort: SortOption): string {
  return SORT_OPTIONS.find((o) => o.value === sort)?.label ?? "Price low to high";
}

export function applySort(vehicles: Vehicle[], sort: SortOption): Vehicle[] {
  const list = [...vehicles];
  switch (sort) {
    case "price-asc":
      return list.sort((a, b) => a.price - b.price);
    case "price-desc":
      return list.sort((a, b) => b.price - a.price);
    case "mileage-asc":
      return list.sort((a, b) => a.mileage - b.mileage);
    case "year-desc":
      return list.sort((a, b) => b.year - a.year);
    case "newest":
      return list.sort(
        (a, b) => new Date(b.listedAt).getTime() - new Date(a.listedAt).getTime()
      );
    case "mot-desc":
      return list.sort(
        (a, b) => motRemainingMonths(b.motExpiry) - motRemainingMonths(a.motExpiry)
      );
    default:
      return list.sort((a, b) => a.price - b.price);
  }
}

export function sortToParam(sort: SortOption): string | null {
  return sort === DEFAULT_SORT ? null : sort;
}

export function paramToSort(param: string | null): SortOption {
  const valid = SORT_OPTIONS.map((o) => o.value);
  if (param && valid.includes(param as SortOption)) return param as SortOption;
  return DEFAULT_SORT;
}
