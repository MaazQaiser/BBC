import type { Document, ServiceRecord } from "@/lib/types";
import { CheckCircle2, XCircle } from "lucide-react";

interface DocumentsListProps {
  documents: Document[];
  serviceRecords: ServiceRecord[];
  serviceHistoryPresent: boolean;
}

export function DocumentsList({ documents, serviceRecords, serviceHistoryPresent }: DocumentsListProps) {
  return (
    <section aria-labelledby="docs-heading" className="space-y-5">
      <h2 id="docs-heading" className="text-lg font-semibold text-[var(--color-text)]">
        Documents &amp; Service History
      </h2>

      {/* Documents checklist */}
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
        <div className="px-4 py-2.5 border-b border-[var(--color-border)] bg-[var(--color-surface-2)]">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-faint)]">
            Documents
          </p>
        </div>
        <ul className="divide-y divide-[var(--color-border)]">
          {documents.map(({ name, present }) => (
            <li key={name} className="flex items-center gap-3 px-4 py-3">
              {present ? (
                <CheckCircle2 size={16} className="shrink-0 text-[var(--color-mot-pass)]" />
              ) : (
                <XCircle size={16} className="shrink-0 text-[var(--color-text-faint)]" />
              )}
              <span className={present ? "text-[var(--color-text)] text-sm" : "text-[var(--color-text-faint)] text-sm"}>
                {name}
              </span>
              {!present && (
                <span className="ml-auto text-xs text-[var(--color-text-faint)]">Not present</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Service records */}
      {serviceHistoryPresent && serviceRecords.length > 0 ? (
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
          <div className="px-4 py-2.5 border-b border-[var(--color-border)] bg-[var(--color-surface-2)]">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-faint)]">
              Service Records
            </p>
          </div>
          <ul className="divide-y divide-[var(--color-border)]">
            {serviceRecords
              .slice()
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((rec, i) => (
                <li key={i} className="px-4 py-3 flex items-start gap-4 flex-wrap sm:flex-nowrap">
                  <div className="shrink-0 text-right">
                    <p className="text-sm num font-medium text-[var(--color-text)]">
                      {new Date(rec.date).toLocaleDateString("en-GB", {
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-xs num text-[var(--color-text-muted)]">
                      {rec.mileage.toLocaleString("en-GB")} mi
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[var(--color-text)]">{rec.type}</p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{rec.location}</p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      ) : (
        !serviceHistoryPresent && (
          <p className="text-sm text-[var(--color-text-muted)]">
            No full service history is available for this vehicle.
          </p>
        )
      )}
    </section>
  );
}
