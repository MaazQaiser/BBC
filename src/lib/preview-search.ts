import type { SortOption, Vehicle } from "@/lib/types";
import { applySort } from "@/lib/sort";

/** Show sample listings when filters match nothing — for local UI review. */
export const PREVIEW_SEARCH_RESULTS =
  process.env.NODE_ENV === "development" ||
  process.env.NEXT_PUBLIC_PREVIEW_SEARCH_RESULTS === "true";

export function getPreviewFallbackResults(
  vehicles: Vehicle[],
  sort: SortOption,
  limit = 6,
): Vehicle[] {
  return applySort(vehicles, sort).slice(0, limit);
}
