import type { RunningCosts as RunningCostsType } from "@/lib/types";

interface RunningCostsProps {
  costs: RunningCostsType;
  formerKeepers?: number;
}

function formatInsuranceGroup(costs: RunningCostsType): string | null {
  if (costs.insuranceGroup == null || Number.isNaN(costs.insuranceGroup)) {
    return null;
  }
  const suffix = costs.insuranceGroupSuffix ?? "";
  return `${costs.insuranceGroup}${suffix}`;
}

export function RunningCosts({ costs, formerKeepers, embedded = false }: RunningCostsProps & { embedded?: boolean }) {
  const rows: { label: string; value: string }[] = [];

  if (costs.roadTaxAnnual != null && !Number.isNaN(costs.roadTaxAnnual)) {
    rows.push({
      label: "Road tax",
      value: `£${costs.roadTaxAnnual.toLocaleString("en-GB")}/yr`,
    });
  }

  if (costs.mpgCombined != null && !Number.isNaN(costs.mpgCombined)) {
    rows.push({
      label: "MPG combined",
      value: String(costs.mpgCombined),
    });
  }

  const insurance = formatInsuranceGroup(costs);
  if (insurance) {
    rows.push({
      label: "Insurance group",
      value: insurance,
    });
  }

  if (formerKeepers != null) {
    rows.push({
      label: "Former keepers",
      value: String(formerKeepers),
    });
  }

  const body = (
    <>
      {rows.length === 0 ? (
        <p className="type-small text-[var(--color-text-muted)]">
          Running cost information is not available for this vehicle.
        </p>
      ) : (
        <dl className="border-t border-[var(--color-border)]">
          {rows.map(({ label, value }) => (
            <div
              key={label}
              className="grid grid-cols-1 sm:grid-cols-[9rem_1fr] gap-1 sm:gap-4 py-3 border-b border-[var(--color-border)] last:border-b-0"
            >
              <dt className="type-small text-[var(--color-text-muted)]">{label}</dt>
              <dd className="type-small num font-medium text-[var(--color-text)]">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      <p className="type-caption text-[var(--color-text-faint)] mt-3">
        Manufacturer estimates. Actual figures vary with driving conditions.
      </p>
    </>
  );

  if (embedded) return body;

  return (
    <section aria-labelledby="costs-heading">
      <h2 id="costs-heading" className="type-h3 mb-4">
        Running costs
      </h2>
      {body}
    </section>
  );
}
