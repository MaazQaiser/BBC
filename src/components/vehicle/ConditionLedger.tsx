"use client";

import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import type { ConditionItem } from "@/lib/types";
import {
  getFaultCount,
  formatFaultCount,
  getFaultTitle,
  getFaultQualifiers,
  getFaultDetail,
  getFaultPhotoAlt,
  CONDITION_LEDGER_INTRO,
  CONDITION_LEDGER_CLOSING,
  CONDITION_LEDGER_EMPTY,
} from "@/lib/condition-ledger";
import { IconButton } from "@/components/buttons/IconButton";

export interface ConditionLedgerProps {
  items: ConditionItem[];
  /** Render content only — heading provided by parent card */
  embedded?: boolean;
}

export function ConditionLedger({ items, embedded = false }: ConditionLedgerProps) {
  const count = getFaultCount(items);

  const body = (
    <>
      {count === 0 ? (
        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
          {CONDITION_LEDGER_EMPTY}
        </p>
      ) : (
        <ol className="space-y-8 sm:space-y-10 list-none m-0 p-0">
          {items.map((item) => (
            <ConditionLedgerFault key={item.id} item={item} />
          ))}
        </ol>
      )}

      <p className="text-sm text-[var(--color-text-muted)] leading-relaxed pt-4 border-t border-[var(--color-border)]">
        {CONDITION_LEDGER_CLOSING}
      </p>
    </>
  );

  if (embedded) return body;

  return (
    <section
      aria-labelledby="condition-heading"
      className="space-y-6 pt-2 border-t border-[var(--color-border)]"
    >
      <header>
        <h2
          id="condition-heading"
          className="text-xl sm:text-2xl font-semibold text-[var(--color-text)] tracking-tight"
        >
          What&apos;s wrong with it
        </h2>
        <p className="text-sm sm:text-base text-[var(--color-text-muted)] mt-2 leading-relaxed max-w-prose">
          {CONDITION_LEDGER_INTRO}
        </p>
        {count > 0 && (
          <p className="text-sm font-medium text-[var(--color-text)] mt-3 num">
            {formatFaultCount(count)}
          </p>
        )}
      </header>
      {body}
    </section>
  );
}

function ConditionLedgerFault({ item }: { item: ConditionItem }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const title = getFaultTitle(item);
  const qualifiers = getFaultQualifiers(item);
  const detail = getFaultDetail(item);
  const photoAlt = getFaultPhotoAlt(item);
  const isMotFail = item.severity === "mot-fail";

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, closeLightbox]);

  if (!item.photo) {
    return (
      <li className={isMotFail ? "sm:border-l-2 sm:border-[var(--color-error-border)] sm:pl-5" : ""}>
        <FaultDetails
          title={title}
          qualifiers={qualifiers}
          detail={detail}
          isMotFail={isMotFail}
        />
      </li>
    );
  }

  return (
    <li
      className={[
        "flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6",
        isMotFail ? "sm:border-l-2 sm:border-[var(--color-error-border)] sm:pl-5" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <FaultPhotoButton
        src={item.photo}
        alt={photoAlt}
        onOpen={() => setLightboxOpen(true)}
      />

      <div className="flex-1 min-w-0 sm:pt-1">
        <FaultDetails
          title={title}
          qualifiers={qualifiers}
          detail={detail}
          isMotFail={isMotFail}
        />
      </div>

      {lightboxOpen && (
        <FaultPhotoLightbox
          src={item.photo}
          alt={photoAlt}
          onClose={closeLightbox}
        />
      )}
    </li>
  );
}

function FaultDetails({
  title,
  qualifiers,
  detail,
  isMotFail,
}: {
  title: string;
  qualifiers: string[];
  detail?: string;
  isMotFail: boolean;
}) {
  return (
    <>
      <h3 className="text-base font-semibold text-[var(--color-text)] leading-snug">
        {title}
      </h3>

      {qualifiers.length > 0 && (
        <p className="text-sm text-[var(--color-text-body)] mt-1.5 num leading-relaxed">
          {qualifiers.join(" · ")}
        </p>
      )}

      {detail && (
        <p className="text-sm text-[var(--color-text-muted)] mt-2 leading-relaxed">
          {detail}
        </p>
      )}

      {isMotFail && (
        <p className="text-xs font-medium text-[var(--color-error-text)] mt-2">
          Recorded MOT failure item
        </p>
      )}
    </>
  );
}

function FaultPhotoButton({
  src,
  alt,
  onOpen,
}: {
  src: string;
  alt: string;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={[
        "relative w-full sm:w-44 md:w-52 shrink-0 rounded-[var(--radius-md)] overflow-hidden",
        "border border-[var(--color-border)] bg-[var(--color-surface-2)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",
        "hover:border-[var(--color-border-strong)] transition-colors",
      ].join(" ")}
      aria-label={`View full-size photograph: ${alt}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full aspect-[4/3] object-cover"
      />
    </button>
  );
}

function FaultPhotoLightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
  label?: string;
}) {
  return (
    <div
      className="fixed inset-0 z-[var(--z-modal)] bg-black/95 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Full-size fault photograph: ${alt}`}
      onClick={onClose}
    >
      <IconButton
        icon={<X size={20} />}
        onClick={onClose}
        aria-label="Close photograph"
        variant="ghost"
        className="absolute text-white hover:bg-white/10 focus-visible:ring-white top-[max(1rem,env(safe-area-inset-top))] right-[max(1rem,env(safe-area-inset-right))]"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="max-h-[90vh] max-w-full object-contain rounded-[var(--radius-md)]"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

/* ─── Legacy exports ─────────────────────────────────────────────────── */
export { SEVERITY_ORDER, SEVERITY_CONFIG } from "./condition-severity";
export type { ConditionLedgerProps as ConditionLedgerItemProps } from "./ConditionLedger";
