import type { MotEntry } from "@/lib/types";

/** Parse ISO date (YYYY-MM-DD) in local calendar — avoids UTC timezone drift */
export function parseIsoDate(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

/** Full test date — e.g. "14 Mar 2024" */
export function formatMotDate(iso: string): string {
  return parseIsoDate(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Recorded mileage at the test — e.g. "51,200 miles" */
export function formatMotMileage(mileage: number): string {
  return `${mileage.toLocaleString("en-GB")} miles`;
}

/** Mileage and test centre on one line, omitting empty parts */
export function formatMotRecordMeta(entry: Pick<MotEntry, "mileage" | "testCenter">): string | null {
  const parts: string[] = [];
  if (typeof entry.mileage === "number" && !Number.isNaN(entry.mileage)) {
    parts.push(formatMotMileage(entry.mileage));
  }
  const centre = entry.testCenter?.trim();
  if (centre) parts.push(centre);
  return parts.length > 0 ? parts.join(" · ") : null;
}

export type MotDisplayItem =
  | { kind: "pass"; entry: MotEntry }
  | { kind: "fail"; entry: MotEntry }
  | { kind: "fail-retest"; fail: MotEntry; pass: MotEntry };

const RETEST_WINDOW_DAYS = 28;

/**
 * Build MOT display items newest-first, pairing fails with subsequent passes
 * within the retest window.
 */
export function buildMotDisplayItems(history: MotEntry[]): MotDisplayItem[] {
  if (history.length === 0) return [];

  const sorted = [...history].sort(
    (a, b) => parseIsoDate(b.date).getTime() - parseIsoDate(a.date).getTime(),
  );

  const used = new Set<number>();
  const items: MotDisplayItem[] = [];

  for (let i = 0; i < sorted.length; i++) {
    if (used.has(i)) continue;

    const entry = sorted[i];

    if (entry.result === "pass") {
      const olderIdx = i + 1;
      if (olderIdx < sorted.length && !used.has(olderIdx)) {
        const older = sorted[olderIdx];
        if (older.result === "fail") {
          const days =
            (parseIsoDate(entry.date).getTime() - parseIsoDate(older.date).getTime()) /
            86_400_000;
          if (days >= 0 && days <= RETEST_WINDOW_DAYS) {
            items.push({ kind: "fail-retest", fail: older, pass: entry });
            used.add(i);
            used.add(olderIdx);
            continue;
          }
        }
      }
      items.push({ kind: "pass", entry });
    } else {
      items.push({ kind: "fail", entry });
    }
  }

  return items;
}

export function formatMotResultLabel(result: "pass" | "fail"): string {
  return result === "pass" ? "Pass" : "Fail";
}
