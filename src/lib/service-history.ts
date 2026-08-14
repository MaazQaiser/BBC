import type { ServiceHistoryStatus } from "@/lib/types";

export const SERVICE_HISTORY_OPTIONS: { value: ServiceHistoryStatus; label: string }[] = [
  { value: "full",                label: "Full service history" },
  { value: "part",                label: "Part service history" },
  { value: "present-unverified",  label: "Service history present, not verified" },
  { value: "none",                label: "No service history" },
];

export function getServiceHistoryLabel(status: ServiceHistoryStatus): string {
  return SERVICE_HISTORY_OPTIONS.find((o) => o.value === status)?.label ?? "No service history";
}
