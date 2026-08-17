import { formatPrice, motRemainingMonths } from "@/lib/filters";

export function formatWeeklyRent(amount: number): string {
  return `${formatPrice(amount)}/wk`;
}

export function formatMotExpiryShort(motExpiry: string): string {
  const expiry = new Date(motExpiry);
  const label = expiry.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
  return `MOT ${label}`;
}

export function motStatusTone(motExpiry: string): "ok" | "warn" {
  return motRemainingMonths(motExpiry) >= 3 ? "ok" : "warn";
}

export function filterRentByQuery<T extends { make: string; model: string; variant: string; year: number }>(
  items: T[],
  query: string,
): T[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter((v) => {
    const haystack = `${v.year} ${v.make} ${v.model} ${v.variant}`.toLowerCase();
    return haystack.includes(q);
  });
}
