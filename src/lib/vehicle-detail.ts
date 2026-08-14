import type { Vehicle } from "@/lib/types";
import { formatMileage } from "@/lib/filters";

const FALLBACK_VIEWS = [
  "front three-quarter view",
  "rear three-quarter view",
  "driver side view",
  "interior view",
  "engine bay view",
  "dashboard view",
];

/** Meaningful alt text for gallery images */
export function getVehicleImageAlt(vehicle: Vehicle, index: number): string {
  if (vehicle.imageAlts?.[index]) return vehicle.imageAlts[index];
  const view = FALLBACK_VIEWS[index] ?? `view ${index + 1}`;
  return `${vehicle.year} ${vehicle.make} ${vehicle.model} ${view}`;
}

/** Compact key specification line shown under the derivative */
export function buildKeySpecLine(vehicle: Vehicle): string {
  return `${vehicle.doors}dr · ${vehicle.fuelType} · ${vehicle.transmission}`;
}

/** Mileage + body/fuel/transmission for scan-friendly display */
export function buildKeySpecWithMileage(vehicle: Vehicle): {
  mileage: string;
  specLine: string;
} {
  return {
    mileage: formatMileage(vehicle.mileage),
    specLine: buildKeySpecLine(vehicle),
  };
}

/** Factual price context — reflects disclosed condition */
export function buildPriceExplanation(): string {
  return (
    "The price reflects this vehicle's disclosed condition. " +
    "Declared faults, MOT history and available records are shown on this page."
  );
}

/** Factual inclusions list — no promotional language */
export function buildWhatsIncluded(vehicle: Vehicle): string[] {
  const items = [
    "Declared faults listed in the condition report",
    "Full MOT history with advisories",
  ];

  if (vehicle.serviceHistoryPresent) {
    items.push("Service history where records exist");
  }

  return items;
}

/** Scope document checklist — V5C image is never published */
export const DOCUMENT_CHECKLIST: {
  label: string;
  match: RegExp;
  note?: string;
}[] = [
  { label: "Service history",      match: /service history/i },
  { label: "Service book",         match: /service book/i },
  { label: "Invoices",             match: /invoice/i },
  { label: "MOT certificates",     match: /mot certificate/i },
  { label: "Receipts",             match: /receipt/i },
  { label: "Handbook",             match: /handbook/i },
  { label: "Keys",                 match: /key/i },
  { label: "Cambelt/clutch evidence", match: /cambelt|clutch/i },
  { label: "V5C status", match: /v5c|logbook/i, note: "Document held — image never published" },
];

export function documentPresent(vehicle: Vehicle, match: RegExp): boolean {
  return vehicle.documents.some((d) => match.test(d.name) && d.present);
}
