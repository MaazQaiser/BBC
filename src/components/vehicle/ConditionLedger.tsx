import type { ConditionItem, FaultSeverity } from "@/lib/types";
import { AlertTriangle, AlertCircle, Info, ShieldAlert } from "lucide-react";

const SEVERITY_META: Record<
  FaultSeverity,
  { label: string; icon: typeof Info; bgClass: string; textClass: string; borderClass: string }
> = {
  advisory: {
    label: "Advisory",
    icon: Info,
    bgClass:    "bg-[var(--color-surface-2)]",
    textClass:  "text-[var(--color-text-muted)]",
    borderClass:"border-[var(--color-border)]",
  },
  minor: {
    label: "Minor",
    icon: AlertCircle,
    bgClass:    "bg-amber-50",
    textClass:  "text-amber-700",
    borderClass:"border-amber-200",
  },
  major: {
    label: "Major",
    icon: AlertTriangle,
    bgClass:    "bg-orange-50",
    textClass:  "text-orange-700",
    borderClass:"border-orange-200",
  },
  "mot-fail": {
    label: "MOT Failure",
    icon: ShieldAlert,
    bgClass:    "bg-red-50",
    textClass:  "text-[var(--color-mot-fail)]",
    borderClass:"border-red-200",
  },
};

const SEVERITY_ORDER: FaultSeverity[] = ["mot-fail", "major", "minor", "advisory"];

interface ConditionLedgerProps {
  items: ConditionItem[];
}

export function ConditionLedger({ items }: ConditionLedgerProps) {
  if (items.length === 0) {
    return (
      <section aria-labelledby="condition-heading" className="space-y-4">
        <LedgerHeader count={0} />
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-6 text-center">
          <p className="text-[var(--color-text-muted)] text-sm">No condition items to declare.</p>
        </div>
      </section>
    );
  }

  // Group by area, ordered by worst severity first
  const grouped: Record<string, ConditionItem[]> = {};
  const sorted = [...items].sort(
    (a, b) => SEVERITY_ORDER.indexOf(a.severity) - SEVERITY_ORDER.indexOf(b.severity)
  );
  for (const item of sorted) {
    if (!grouped[item.area]) grouped[item.area] = [];
    grouped[item.area].push(item);
  }

  const areaOrder = Object.keys(grouped).sort((a, b) => {
    const worstA = SEVERITY_ORDER.indexOf(grouped[a][0].severity);
    const worstB = SEVERITY_ORDER.indexOf(grouped[b][0].severity);
    return worstA - worstB;
  });

  return (
    <section aria-labelledby="condition-heading" className="space-y-4">
      <LedgerHeader count={items.length} />

      {/* Legend */}
      <div className="flex flex-wrap gap-2">
        {SEVERITY_ORDER.map((s) => {
          const meta = SEVERITY_META[s];
          const Icon = meta.icon;
          const count = items.filter((i) => i.severity === s).length;
          if (count === 0) return null;
          return (
            <span
              key={s}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${meta.bgClass} ${meta.textClass} ${meta.borderClass}`}
            >
              <Icon size={12} />
              {meta.label}: <span className="num font-semibold">{count}</span>
            </span>
          );
        })}
      </div>

      {/* Items */}
      <div className="space-y-3">
        {areaOrder.map((area) => (
          <div
            key={area}
            className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden"
          >
            <div className="px-4 py-2.5 border-b border-[var(--color-border)] bg-[var(--color-surface-2)]">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-faint)]">
                {area}
              </p>
            </div>
            <ul className="divide-y divide-[var(--color-border)]">
              {grouped[area].map((item) => {
                const meta = SEVERITY_META[item.severity];
                const Icon = meta.icon;
                return (
                  <li key={item.id} className="flex items-start gap-3 px-4 py-3.5">
                    <span
                      className={`mt-0.5 flex-none w-5 h-5 rounded flex items-center justify-center ${meta.bgClass} ${meta.textClass} border ${meta.borderClass}`}
                    >
                      <Icon size={12} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[var(--color-text)] leading-relaxed">
                        {item.description}
                      </p>
                      <p className={`text-xs font-medium mt-0.5 ${meta.textClass}`}>{meta.label}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <p className="text-xs text-[var(--color-text-faint)] leading-relaxed">
        All condition items are declared in full. Nothing is hidden. Severity ratings follow standard automotive
        condition grading — advisory items are cosmetic or very minor; major items require attention but do not affect
        roadworthiness.
      </p>
    </section>
  );
}

function LedgerHeader({ count }: { count: number }) {
  return (
    <div className="flex items-start gap-3">
      <div>
        <h2 id="condition-heading" className="text-lg font-semibold text-[var(--color-text)]">
          Condition Ledger
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] mt-0.5">
          {count === 0
            ? "This vehicle has no declared condition items."
            : `${count} declared condition ${count === 1 ? "item" : "items"} — every fault listed openly.`}
        </p>
      </div>
    </div>
  );
}
