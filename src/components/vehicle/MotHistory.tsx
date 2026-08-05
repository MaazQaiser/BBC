import type { MotEntry } from "@/lib/types";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

export function MotHistory({ history }: { history: MotEntry[] }) {
  if (history.length === 0) {
    return (
      <section aria-labelledby="mot-heading">
        <h2 id="mot-heading" className="type-h3 mb-3">Full MOT History</h2>
        <p className="type-small text-[var(--color-text-muted)]">No MOT records available.</p>
      </section>
    );
  }

  return (
    <section aria-labelledby="mot-heading">
      <h2 id="mot-heading" className="type-h3 mb-5">Full MOT History</h2>

      <ol className="relative space-y-3">
        {/* Timeline spine */}
        <div className="absolute left-[19px] top-5 bottom-5 w-px bg-[var(--color-border)] hidden sm:block" aria-hidden="true" />

        {history.map((entry, i) => {
          const passed = entry.result === "pass";
          return (
            <li key={i} className="relative sm:pl-10">
              {/* Timeline dot */}
              <span
                className={[
                  "hidden sm:flex absolute left-0 top-3.5 w-10 h-10 rounded-full",
                  "items-center justify-center border-2 bg-[var(--color-surface)] z-10",
                  passed
                    ? "border-[var(--color-success)] text-[var(--color-success)]"
                    : "border-[var(--color-error)] text-[var(--color-error)]",
                ].join(" ")}
                aria-hidden="true"
              >
                {passed ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
              </span>

              <div
                className={[
                  "rounded-[var(--radius-lg)] border p-4",
                  passed
                    ? "border-[var(--color-border)] bg-[var(--color-surface)]"
                    : "border-[var(--color-error-border)] bg-[var(--color-error-bg)]",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className={passed ? "text-[var(--color-success)]" : "text-[var(--color-error)]"}>
                      {passed ? <CheckCircle2 size={15} className="sm:hidden" /> : <XCircle size={15} className="sm:hidden" />}
                    </span>
                    <span className={[
                      "type-small font-semibold",
                      passed ? "text-[var(--color-success-text)]" : "text-[var(--color-error-text)]",
                    ].join(" ")}>
                      {passed ? "Pass" : "Fail"}
                    </span>
                    <span className="num type-small text-[var(--color-text)]">
                      {new Date(entry.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>
                  <span className="num type-small text-[var(--color-text-muted)]">
                    {entry.mileage.toLocaleString("en-GB")} mi
                  </span>
                </div>

                {entry.failures.length > 0 && (
                  <div className="mb-2">
                    <p className="type-caption font-semibold text-[var(--color-error)] mb-1 uppercase tracking-wider">Failures</p>
                    <ul className="space-y-0.5">
                      {entry.failures.map((f, j) => (
                        <li key={j} className="flex items-start gap-2 type-small text-[var(--color-error-text)]">
                          <XCircle size={12} className="mt-0.5 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {entry.advisories.length > 0 && (
                  <div>
                    <p className="type-caption font-semibold text-[var(--color-warning)] mb-1 uppercase tracking-wider">Advisories</p>
                    <ul className="space-y-0.5">
                      {entry.advisories.map((a, j) => (
                        <li key={j} className="flex items-start gap-2 type-small text-[var(--color-warning-text)]">
                          <AlertTriangle size={12} className="mt-0.5 shrink-0" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <p className="type-caption text-[var(--color-text-faint)] mt-2">{entry.testCenter}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
