import type { MotEntry } from "@/lib/types";
import {
  buildMotDisplayItems,
  formatMotDate,
  formatMotRecordMeta,
  formatMotResultLabel,
} from "@/lib/mot-history";

function AdvisoryList({ advisories }: { advisories: string[] }) {
  if (advisories.length === 0) {
    return (
      <p className="type-small text-[var(--color-text-muted)]">No advisories</p>
    );
  }

  return (
    <div>
      <p className="type-caption text-[var(--color-text-muted)] mb-1">Advisory</p>
      <p className="type-small text-[var(--color-text-body)] break-words">
        {advisories.join(" · ")}
      </p>
    </div>
  );
}

function FailureList({ failures }: { failures: string[] }) {
  return (
    <div>
      <p className="type-caption text-[var(--color-text-muted)] mb-1">Failed on</p>
      <p className="type-small text-[var(--color-text-body)] break-words">
        {failures.join(" · ")}
      </p>
    </div>
  );
}

function MotRecordMeta({ entry }: { entry: Pick<MotEntry, "mileage" | "testCenter"> }) {
  const meta = formatMotRecordMeta(entry);
  if (!meta) return null;

  return (
    <p className="type-small num text-[var(--color-text-muted)] break-words">{meta}</p>
  );
}

function MotRecordRow({
  date,
  resultLabel,
  isFail,
  children,
}: {
  date: string;
  resultLabel: string;
  isFail: boolean;
  children: React.ReactNode;
}) {
  return (
    <article className="py-4 first:pt-0 border-b border-[var(--color-border)] last:border-b-0">
      <div className="grid grid-cols-1 sm:grid-cols-[9.5rem_7.5rem_1fr] sm:gap-x-6 gap-y-2">
        <p className="type-small font-medium text-[var(--color-text)] num">
          {formatMotDate(date)}
        </p>
        <p
          className={[
            "type-small font-semibold uppercase tracking-wide",
            isFail
              ? "text-[var(--color-error-text)]"
              : "text-[var(--color-text)]",
          ].join(" ")}
          aria-label={`MOT result: ${resultLabel}`}
        >
          {resultLabel}
        </p>
        <div className="sm:col-start-3 space-y-2 min-w-0">{children}</div>
      </div>
    </article>
  );
}

export function MotHistory({ history, embedded = false }: { history: MotEntry[]; embedded?: boolean }) {
  const items = buildMotDisplayItems(history);

  const list = items.length === 0 ? (
    <p className="type-small text-[var(--color-text-muted)]">
      No MOT records available.
    </p>
  ) : (
    <div>
      {items.map((item) => {
            if (item.kind === "fail-retest") {
              const passMeta = formatMotRecordMeta(item.pass);
              return (
                <MotRecordRow
                  key={`${item.fail.date}-retest`}
                  date={item.fail.date}
                  resultLabel="Fail → Passed"
                  isFail
                >
                  <MotRecordMeta entry={item.fail} />
                  <FailureList failures={item.fail.failures} />
                  <p className="type-small text-[var(--color-text-body)]">
                    <span className="text-[var(--color-text-muted)]">Retested: </span>
                    {formatMotDate(item.pass.date)}
                    {" · "}
                    {formatMotResultLabel("pass")}
                    {item.pass.rectifiedNote ? (
                      <span className="text-[var(--color-text-muted)]">
                        {" "}
                        · {item.pass.rectifiedNote}
                      </span>
                    ) : null}
                  </p>
                  {passMeta ? (
                    <p className="type-small num text-[var(--color-text-muted)]">
                      {passMeta}
                    </p>
                  ) : null}
                  {item.pass.advisories.length > 0 ? (
                    <AdvisoryList advisories={item.pass.advisories} />
                  ) : null}
                </MotRecordRow>
              );
            }

            if (item.kind === "fail") {
              return (
                <MotRecordRow
                  key={item.entry.date}
                  date={item.entry.date}
                  resultLabel="Fail"
                  isFail
                >
                  <MotRecordMeta entry={item.entry} />
                  <FailureList failures={item.entry.failures} />
                  {item.entry.advisories.length > 0 ? (
                    <AdvisoryList advisories={item.entry.advisories} />
                  ) : null}
                </MotRecordRow>
              );
            }

            return (
              <MotRecordRow
                key={item.entry.date}
                date={item.entry.date}
                resultLabel="Pass"
                isFail={false}
              >
                <MotRecordMeta entry={item.entry} />
                <AdvisoryList advisories={item.entry.advisories} />
              </MotRecordRow>
            );
          })}
        </div>
  );

  if (embedded) return list;

  return (
    <section aria-labelledby="mot-heading">
      <h2 id="mot-heading" className="type-h3 mb-4">
        MOT history
      </h2>
      {list}
    </section>
  );
}
