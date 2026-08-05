import type { Vehicle } from "@/lib/types";
import type { ServiceRecord } from "@/lib/types";
import { CheckCircle2, XCircle } from "lucide-react";
import { DOCUMENT_CHECKLIST, documentPresent } from "@/lib/vehicle-detail";

export interface DocumentCardProps {
  vehicle:               Vehicle;
  serviceRecords:        ServiceRecord[];
  serviceHistoryPresent: boolean;
}

export function DocumentCard({ vehicle, serviceRecords, serviceHistoryPresent }: DocumentCardProps) {
  return (
    <section aria-labelledby="docs-heading" className="space-y-5">
      <h2 id="docs-heading" className="type-h3">Documents &amp; History</h2>

      {/* Scope document checklist */}
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
        <ul className="divide-y divide-[var(--color-border)]">
          {DOCUMENT_CHECKLIST.map(({ label, match, note }) => {
            const present = documentPresent(vehicle, match);
            return (
              <li key={label} className="flex items-start gap-3 px-4 py-3">
                {present ? (
                  <CheckCircle2 size={16} className="shrink-0 text-[var(--color-success)] mt-0.5" />
                ) : (
                  <XCircle size={16} className="shrink-0 text-[var(--color-text-faint)] mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <span className={[
                    "type-small block",
                    present ? "text-[var(--color-text)]" : "text-[var(--color-text-faint)]",
                  ].join(" ")}>
                    {label}
                  </span>
                  {note ? (
                    <span className="type-caption text-[var(--color-text-muted)] block mt-0.5">{note}</span>
                  ) : null}
                </div>
                {!present && (
                  <span className="type-caption text-[var(--color-text-faint)] shrink-0">Not present</span>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Service records */}
      {serviceHistoryPresent && serviceRecords.length > 0 ? (
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
          <div className="px-4 py-2.5 bg-[var(--color-surface-2)] border-b border-[var(--color-border)]">
            <p className="type-section-label">Service records ({serviceRecords.length})</p>
          </div>
          <ul className="divide-y divide-[var(--color-border)]">
            {[...serviceRecords]
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((rec, i) => (
                <li key={i} className="flex items-start gap-4 px-4 py-3.5">
                  <div className="shrink-0 text-right min-w-[72px]">
                    <p className="num text-sm font-medium text-[var(--color-text)]">
                      {new Date(rec.date).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
                    </p>
                    <p className="num type-caption text-[var(--color-text-muted)]">
                      {rec.mileage.toLocaleString("en-GB")} mi
                    </p>
                  </div>
                  <div>
                    <p className="type-small font-medium text-[var(--color-text)]">{rec.type}</p>
                    <p className="type-caption text-[var(--color-text-muted)] mt-0.5">{rec.location}</p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      ) : !serviceHistoryPresent ? (
        <p className="type-small text-[var(--color-text-muted)]">
          No full service history is available for this vehicle.
        </p>
      ) : null}
    </section>
  );
}
