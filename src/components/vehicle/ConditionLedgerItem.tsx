import type { ConditionItem, FaultSeverity } from "@/lib/types";
import { Info, AlertCircle, AlertTriangle, ShieldAlert } from "lucide-react";

/* ─── Severity config ────────────────────────────────────────────────── */
export const SEVERITY_CONFIG: Record<
  FaultSeverity,
  {
    label:       string;
    icon:        typeof Info;
    iconBg:      string;
    iconColor:   string;
    borderColor: string;
    textColor:   string;
  }
> = {
  advisory: {
    label:       "Advisory",
    icon:        Info,
    iconBg:      "bg-[var(--color-surface-2)]",
    iconColor:   "text-[var(--color-text-muted)]",
    borderColor: "border-[var(--color-border)]",
    textColor:   "text-[var(--color-text-muted)]",
  },
  minor: {
    label:       "Minor",
    icon:        AlertCircle,
    iconBg:      "bg-[var(--color-warning-bg)]",
    iconColor:   "text-[var(--color-warning)]",
    borderColor: "border-[var(--color-warning-border)]",
    textColor:   "text-[var(--color-warning-text)]",
  },
  major: {
    label:       "Major",
    icon:        AlertTriangle,
    iconBg:      "bg-orange-50",
    iconColor:   "text-orange-600",
    borderColor: "border-orange-200",
    textColor:   "text-orange-700",
  },
  "mot-fail": {
    label:       "MOT Failure",
    icon:        ShieldAlert,
    iconBg:      "bg-[var(--color-error-bg)]",
    iconColor:   "text-[var(--color-error)]",
    borderColor: "border-[var(--color-error-border)]",
    textColor:   "text-[var(--color-error-text)]",
  },
};

export const SEVERITY_ORDER: FaultSeverity[] = ["mot-fail", "major", "minor", "advisory"];

/* ─── Component ──────────────────────────────────────────────────────── */
export interface ConditionLedgerItemProps {
  item: ConditionItem;
}

export function ConditionLedgerItem({ item }: ConditionLedgerItemProps) {
  const config = SEVERITY_CONFIG[item.severity];
  const Icon   = config.icon;

  return (
    <li className="flex items-start gap-3.5 px-4 py-3.5">
      <span
        className={[
          "mt-0.5 shrink-0 w-6 h-6 rounded flex items-center justify-center",
          config.iconBg,
          config.iconColor,
        ].join(" ")}
        aria-hidden="true"
      >
        <Icon size={13} />
      </span>
      <div className="flex-1 min-w-0">
        <p className="type-small text-[var(--color-text)] leading-relaxed">
          {item.description}
        </p>
        {item.qualifier && (
          <p className="type-caption text-[var(--color-text-muted)] mt-1 num">{item.qualifier}</p>
        )}
        {item.photo && (
          <div className="mt-3 rounded-[var(--radius-md)] overflow-hidden border border-[var(--color-border)] max-w-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.photo} alt="" className="w-full aspect-[4/3] object-cover" />
          </div>
        )}
        <p className={["type-caption font-medium mt-1", config.textColor].join(" ")}>
          {config.label}
        </p>
      </div>
    </li>
  );
}

/* ─── Full Condition Ledger section ──────────────────────────────────── */
export function ConditionLedger({ items }: { items: ConditionItem[] }) {
  if (items.length === 0) {
    return (
      <section aria-labelledby="condition-heading">
        <h2 id="condition-heading" className="type-h3 mb-2">What&apos;s Wrong With It</h2>
        <p className="type-small text-[var(--color-text-muted)] mb-4">
          No condition items to declare on this vehicle.
        </p>
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-success-border)] bg-[var(--color-success-bg)] px-5 py-4 text-sm text-[var(--color-success-text)] mb-4">
          No declared faults on this vehicle.
        </div>
        <p className="type-small text-[var(--color-text-muted)] leading-relaxed border-l-2 border-[var(--color-border-strong)] pl-4">
          The price reflects everything above, and the buyer&apos;s legal rights are unaffected.
        </p>
      </section>
    );
  }

  // Group by area, sort by severity within each group
  const grouped: Record<string, ConditionItem[]> = {};
  const sorted = [...items].sort(
    (a, b) => SEVERITY_ORDER.indexOf(a.severity) - SEVERITY_ORDER.indexOf(b.severity)
  );
  for (const item of sorted) {
    if (!grouped[item.area]) grouped[item.area] = [];
    grouped[item.area].push(item);
  }

  // Order areas by their worst item's severity
  const areaOrder = Object.keys(grouped).sort((a, b) => {
    const worstA = SEVERITY_ORDER.indexOf(grouped[a][0].severity);
    const worstB = SEVERITY_ORDER.indexOf(grouped[b][0].severity);
    return worstA - worstB;
  });

  return (
    <section aria-labelledby="condition-heading" className="space-y-5">
      {/* Header */}
      <div>
        <h2 id="condition-heading" className="type-h3 mb-1">What&apos;s Wrong With It</h2>
        <p className="type-small text-[var(--color-text-muted)]">
          <span className="num font-medium">{items.length}</span> declared condition{" "}
          {items.length === 1 ? "item" : "items"} — every fault listed openly.
        </p>
      </div>

      {/* Severity legend */}
      <div className="flex flex-wrap gap-2">
        {SEVERITY_ORDER.map((s) => {
          const count  = items.filter((i) => i.severity === s).length;
          if (count === 0) return null;
          const config = SEVERITY_CONFIG[s];
          const Icon   = config.icon;
          return (
            <span
              key={s}
              className={[
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
                config.iconBg,
                config.textColor,
                config.borderColor,
              ].join(" ")}
            >
              <Icon size={11} />
              {config.label} (<span className="num">{count}</span>)
            </span>
          );
        })}
      </div>

      {/* Items grouped by area */}
      <div className="space-y-3">
        {areaOrder.map((area) => (
          <div
            key={area}
            className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden"
          >
            <div className="px-4 py-2.5 bg-[var(--color-surface-2)] border-b border-[var(--color-border)]">
              <p className="type-section-label">{area}</p>
            </div>
            <ul className="divide-y divide-[var(--color-border)]">
              {grouped[area].map((item) => (
                <ConditionLedgerItem key={item.id} item={item} />
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="type-small text-[var(--color-text-muted)] leading-relaxed border-l-2 border-[var(--color-border-strong)] pl-4">
        The price reflects everything above, and the buyer&apos;s legal rights are unaffected.
      </p>
    </section>
  );
}
