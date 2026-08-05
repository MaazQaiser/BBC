import type { RunningCosts as RunningCostsType } from "@/lib/types";

interface RunningCostsProps {
  costs:         RunningCostsType;
  formerKeepers?: number;
}

export function RunningCosts({ costs, formerKeepers }: RunningCostsProps) {
  const rows = [
    { label: "Road Tax",          value: `£${costs.roadTaxAnnual}/yr` },
    { label: "MPG (Combined)",    value: `${costs.mpgCombined} mpg` },
    { label: "Insurance Group",   value: `Group ${costs.insuranceGroup}` },
    ...(formerKeepers != null
      ? [{ label: "Former Keepers", value: String(formerKeepers) }]
      : []),
  ];

  return (
    <section aria-labelledby="costs-heading">
      <h2 id="costs-heading" className="type-h3 mb-4">Running Cost Figures</h2>
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden">
        <table className="w-full type-small">
          <tbody className="divide-y divide-[var(--color-border)]">
            {rows.map(({ label, value }) => (
              <tr
                key={label}
                className="bg-[var(--color-surface)] even:bg-[var(--color-surface-2)]"
              >
                <td className="px-4 py-3 text-[var(--color-text-muted)]">{label}</td>
                <td className="px-4 py-3 text-right num font-medium text-[var(--color-text)]">
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="type-caption text-[var(--color-text-faint)] mt-2">
        Manufacturer estimates. Actual figures vary with driving conditions.
      </p>
    </section>
  );
}
