import type { ConditionItem, FaultCategory } from "@/lib/types";

/** Shared fault count — used on result cards and condition ledger */
export function getFaultCount(items: ConditionItem[]): number {
  return items.length;
}

export function formatFaultCount(count: number): string {
  return `${count} ${count === 1 ? "fault listed" : "faults listed"}`;
}

export function getFaultTitle(item: ConditionItem): string {
  if (item.title) return item.title;
  if (item.description) {
    const part = item.description.split(" — ")[0]?.split(" - ")[0];
    return part ?? item.description;
  }
  return "Declared fault";
}

export function getFaultQualifiers(item: ConditionItem): string[] {
  if (item.qualifiers?.length) return item.qualifiers;
  if (item.qualifier) return [item.qualifier];
  return [];
}

export function getFaultDetail(item: ConditionItem): string | undefined {
  if (item.detail) return item.detail;
  if (item.description && item.title) {
    const remainder = item.description.replace(item.title, "").replace(/^[—–-]\s*/, "").trim();
    return remainder || undefined;
  }
  return undefined;
}

export function getFaultPhotoAlt(item: ConditionItem): string {
  if (item.photoAlt) return item.photoAlt;
  const qualifiers = getFaultQualifiers(item);
  const base = getFaultTitle(item);
  return qualifiers.length > 0 ? `${base} — ${qualifiers.join(", ")}` : base;
}

export const CONDITION_LEDGER_INTRO =
  "Every fault on this vehicle is listed here with photographs and measurements where recorded. " +
  "This is what you are coming to see.";

export const CONDITION_LEDGER_CLOSING =
  "The price reflects everything above. Your legal rights are unaffected.";

export const CONDITION_LEDGER_EMPTY =
  "No condition records are listed for this vehicle at present.";

export const TRADE_CONDITION_INTRO =
  "This description reflects known issues at the time of listing. It is not an exhaustive inspection report.";

export const TRADE_CONDITION_CLOSING =
  "Sold on a trade basis. The buyer must satisfy themselves as to condition before purchase.";

export function getTradeConditionSummary(items: ConditionItem[]): string {
  if (!items.length) return "No declared faults listed";
  const first = getFaultTitle(items[0]);
  if (items.length === 1) return first;
  return `${first} · ${formatFaultCount(items.length)}`;
}

export const FAULT_CATEGORY_LABELS: Record<FaultCategory | "other", string> = {
  cosmetic:       "Cosmetic issues",
  mechanical:     "Mechanical issues",
  "warning-light": "Warning lights",
  missing:        "Missing or requiring repair",
  other:          "Other known issues",
};

export function groupTradeConditionItems(items: ConditionItem[]): {
  category: FaultCategory | "other";
  label: string;
  items: ConditionItem[];
}[] {
  const order: (FaultCategory | "other")[] = [
    "cosmetic",
    "mechanical",
    "warning-light",
    "missing",
    "other",
  ];
  const buckets = new Map<FaultCategory | "other", ConditionItem[]>();
  for (const item of items) {
    const key = item.faultCategory ?? "other";
    const list = buckets.get(key) ?? [];
    list.push(item);
    buckets.set(key, list);
  }
  return order
    .filter((category) => (buckets.get(category)?.length ?? 0) > 0)
    .map((category) => ({
      category,
      label: FAULT_CATEGORY_LABELS[category],
      items: buckets.get(category) ?? [],
    }));
}
