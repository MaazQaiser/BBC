import type { FaultSeverity } from "@/lib/types";

export const SEVERITY_ORDER: FaultSeverity[] = ["mot-fail", "major", "minor", "advisory"];

export const SEVERITY_CONFIG: Record<
  FaultSeverity,
  { label: string }
> = {
  advisory:  { label: "Advisory" },
  minor:     { label: "Minor" },
  major:     { label: "Major" },
  "mot-fail": { label: "MOT Failure" },
};
