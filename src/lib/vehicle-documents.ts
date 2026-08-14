import type {
  Vehicle,
  V5cStatus,
  VehicleDocumentImage,
  ServiceRecord,
  KeysInfo,
} from "@/lib/types";
import { getServiceHistoryLabel } from "@/lib/service-history";
import { parseIsoDate } from "@/lib/mot-history";

export const V5C_STATUS_LABELS: Record<V5cStatus, string> = {
  "present-in-name":      "Present, in our name",
  "present-not-in-name":  "Present, not yet in our name",
  "applied-for":          "Applied for",
  "none":                 "No V5C",
};

const V5C_IMAGE_PATTERN = /v5c|logbook/i;

/** Resolve V5C status — never exposed as an image */
export function getV5cStatus(vehicle: Vehicle): V5cStatus {
  if (vehicle.v5cStatus) return vehicle.v5cStatus;
  const v5c = vehicle.documents.find((d) => V5C_IMAGE_PATTERN.test(d.name));
  if (!v5c?.present) return "none";
  return "present-in-name";
}

/** Document images safe for the customer-facing gallery — V5C excluded */
export function getPublishableDocumentImages(
  vehicle: Vehicle,
): VehicleDocumentImage[] {
  const images = vehicle.documentImages ?? [];
  return images.filter(
    (img) =>
      !V5C_IMAGE_PATTERN.test(img.type) &&
      !V5C_IMAGE_PATTERN.test(img.label) &&
      !V5C_IMAGE_PATTERN.test(img.alt),
  );
}

export function getServiceStampCount(vehicle: Vehicle): number {
  return vehicle.serviceRecords.length;
}

export function getMostRecentService(
  vehicle: Vehicle,
): ServiceRecord | undefined {
  if (vehicle.serviceRecords.length === 0) return undefined;
  return [...vehicle.serviceRecords].sort(
    (a, b) => parseIsoDate(b.date).getTime() - parseIsoDate(a.date).getTime(),
  )[0];
}

export function formatServiceDate(iso: string): string {
  return parseIsoDate(iso).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });
}

/** Compact service type label for the history list */
export function formatServiceRecordType(type: ServiceRecord["type"]): string {
  if (/service/i.test(type)) return "Service";
  return type;
}

export function buildServiceHistorySummary(vehicle: Vehicle): string {
  const label = getServiceHistoryLabel(vehicle.serviceHistoryStatus);
  if (vehicle.serviceHistoryStatus === "none") return label;

  const count = getServiceStampCount(vehicle);
  if (count > 0) {
    const unit = count === 1 ? "stamp" : "stamps";
    return `${label} · ${count.toLocaleString("en-GB")} ${unit}`;
  }

  return label;
}

export function formatKeysInfo(keys: KeysInfo | undefined): string | null {
  if (!keys) return null;
  const unit = keys.count === 1 ? "key" : "keys";
  if (keys.sparePresent === true) {
    return `${keys.count.toLocaleString("en-GB")} ${unit} (including spare)`;
  }
  if (keys.sparePresent === false && keys.count === 1) {
    return "1 key (no spare)";
  }
  return `${keys.count.toLocaleString("en-GB")} ${unit}`;
}

/** Derive keys info from legacy documents when structured data is absent */
export function resolveKeysInfo(vehicle: Vehicle): KeysInfo | undefined {
  if (vehicle.keys) return vehicle.keys;

  const spareDoc = vehicle.documents.find((d) => /spare key|second key/i.test(d.name));
  const mainDoc = vehicle.documents.find((d) => /^key/i.test(d.name) && d.present);

  if (!spareDoc && !mainDoc) return undefined;

  const sparePresent = spareDoc?.present ?? false;
  const count = sparePresent ? 2 : 1;
  return { count, sparePresent };
}
