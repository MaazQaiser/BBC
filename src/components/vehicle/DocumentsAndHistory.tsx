import type { Vehicle } from "@/lib/types";
import { DocumentImageViewer } from "@/components/vehicle/DocumentImageViewer";
import {
  buildServiceHistorySummary,
  formatKeysInfo,
  formatServiceDate,
  formatServiceRecordType,
  getMostRecentService,
  getPublishableDocumentImages,
  getV5cStatus,
  resolveKeysInfo,
  V5C_STATUS_LABELS,
} from "@/lib/vehicle-documents";
import { parseIsoDate } from "@/lib/mot-history";

export interface DocumentsAndHistoryProps {
  vehicle: Vehicle;
}

function FactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[9rem_1fr] gap-1 sm:gap-4 py-3 border-b border-[var(--color-border)] last:border-b-0">
      <dt className="type-small text-[var(--color-text-muted)]">{label}</dt>
      <dd className="type-small text-[var(--color-text)] min-w-0">{value}</dd>
    </div>
  );
}

function FactRowMono({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[9rem_1fr] gap-1 sm:gap-4 py-3 border-b border-[var(--color-border)] last:border-b-0">
      <dt className="type-small text-[var(--color-text-muted)]">{label}</dt>
      <dd className="type-small num text-[var(--color-text)] min-w-0">{value}</dd>
    </div>
  );
}

export function DocumentsAndHistory({ vehicle, embedded = false }: DocumentsAndHistoryProps & { embedded?: boolean }) {
  const serviceSummary = buildServiceHistorySummary(vehicle);
  const lastService = getMostRecentService(vehicle);
  const sortedRecords = [...vehicle.serviceRecords].sort(
    (a, b) =>
      parseIsoDate(b.date).getTime() - parseIsoDate(a.date).getTime(),
  );
  const v5cStatus = getV5cStatus(vehicle);
  const documentImages = getPublishableDocumentImages(vehicle);
  const keysInfo = resolveKeysInfo(vehicle);
  const keysLabel = formatKeysInfo(keysInfo);

  const showServiceList =
    vehicle.serviceHistoryStatus !== "none" && sortedRecords.length > 0;

  const body = (
    <>
      {/* Service history summary */}
      <dl className="border-t border-[var(--color-border)]">
        <FactRow label="History" value={serviceSummary} />

        {lastService ? (
          <FactRowMono
            label="Last service"
            value={`${formatServiceDate(lastService.date)} at ${lastService.mileage.toLocaleString("en-GB")} miles`}
          />
        ) : vehicle.serviceHistoryStatus !== "none" ? null : (
          <FactRow label="Last service" value="Not recorded" />
        )}

        {vehicle.maintenanceEvidence?.map((evidence) => (
          <FactRow
            key={evidence.type}
            label={evidence.type === "cambelt" ? "Cambelt" : "Clutch"}
            value={evidence.detail}
          />
        ))}

        <FactRow label="V5C" value={V5C_STATUS_LABELS[v5cStatus]} />

        {vehicle.formerKeepers != null ? (
          <FactRowMono
            label="Former keepers"
            value={String(vehicle.formerKeepers)}
          />
        ) : null}

        {keysLabel ? <FactRow label="Keys" value={keysLabel} /> : null}
      </dl>

      {/* Individual service records */}
      {showServiceList ? (
        <div>
          <h3 className="type-section-label mb-3">Service records</h3>
          <ul className="divide-y divide-[var(--color-border)] border-t border-[var(--color-border)]">
            {sortedRecords.map((record, i) => (
              <li
                key={`${record.date}-${i}`}
                className="grid grid-cols-1 sm:grid-cols-[7rem_7rem_1fr] sm:gap-x-6 gap-y-1 py-3"
              >
                <p className="type-small font-medium text-[var(--color-text)]">
                  {formatServiceDate(record.date)}
                </p>
                <p className="type-small num text-[var(--color-text-muted)]">
                  {record.mileage.toLocaleString("en-GB")} miles
                </p>
                <p className="type-small text-[var(--color-text-body)] sm:col-start-3">
                  {formatServiceRecordType(record.type)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Document thumbnails */}
      {documentImages.length > 0 ? (
        <div className="space-y-3">
          <h3 className="type-section-label">Documents</h3>
          <DocumentImageViewer documents={documentImages} />
          <p className="type-caption text-[var(--color-text-faint)]">
            Personal details redacted before upload.
          </p>
        </div>
      ) : (
        <p className="type-small text-[var(--color-text-muted)]">
          No document photographs are available for this vehicle.
        </p>
      )}
    </>
  );

  if (embedded) return body;

  return (
    <section aria-labelledby="docs-heading" className="space-y-6">
      <h2 id="docs-heading" className="type-h3">
        Service history and paperwork
      </h2>
      {body}
    </section>
  );
}
