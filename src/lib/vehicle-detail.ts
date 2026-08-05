import type { Vehicle } from "@/lib/types";

/** Standard inclusions shown on every retail vehicle detail page */
export function buildWhatsIncluded(vehicle: Vehicle): string[] {
  const items = [
    "Clear condition report with every declared fault",
    "Full MOT history with advisories",
    "Transparent pricing — no hidden fees",
  ];

  if (vehicle.serviceHistoryPresent) {
    items.push("Service history where records exist");
  }
  if (vehicle.hasVideo) {
    items.push("Walkaround video where available");
  }
  if (vehicle.documents.some((d) => d.name.toLowerCase().includes("spare key") && d.present)) {
    items.push("Spare key where present");
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
