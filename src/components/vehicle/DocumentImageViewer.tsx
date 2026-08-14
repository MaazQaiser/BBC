"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { VehicleDocumentImage } from "@/lib/types";
import { IconButton } from "@/components/buttons/IconButton";

export interface DocumentImageViewerProps {
  documents: VehicleDocumentImage[];
}

export function DocumentImageViewer({ documents }: DocumentImageViewerProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);

  const prev = useCallback(() => {
    setActiveIndex((i) => {
      if (i === null || documents.length <= 1) return i;
      return (i - 1 + documents.length) % documents.length;
    });
  }, [documents.length]);

  const next = useCallback(() => {
    setActiveIndex((i) => {
      if (i === null || documents.length <= 1) return i;
      return (i + 1) % documents.length;
    });
  }, [documents.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, close, prev, next]);

  if (documents.length === 0) return null;

  const active = activeIndex !== null ? documents[activeIndex] : null;

  return (
    <>
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 list-none p-0 m-0">
        {documents.map((doc, index) => (
          <li key={doc.id}>
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className={[
                "group w-full text-left rounded-[var(--radius-md)] border border-[var(--color-border)]",
                "overflow-hidden bg-[var(--color-surface)] transition-colors",
                "hover:border-[var(--color-border-strong)] focus-visible:outline-none",
                "focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2",
              ].join(" ")}
              aria-label={`View ${doc.label}`}
            >
              <div className="aspect-hero bg-[var(--color-surface-2)] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={doc.imageUrl}
                  alt={doc.alt}
                  className="w-full h-full object-cover transition-transform group-hover:scale-[1.02]"
                />
              </div>
              <p className="type-caption px-2.5 py-2 text-[var(--color-text-muted)] truncate">
                {doc.label}
              </p>
            </button>
          </li>
        ))}
      </ul>

      {active && activeIndex !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.label}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={close}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 mb-3">
              <p className="type-small text-white/90">{active.label}</p>
              <IconButton
                icon={<X size={18} />}
                onClick={close}
                aria-label="Close document viewer"
                variant="secondary"
                className="bg-white/10 hover:bg-white/20 border-white/20 text-white"
              />
            </div>

            <div className="relative flex-1 min-h-0 rounded-[var(--radius-lg)] overflow-hidden bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.imageUrl}
                alt={active.alt}
                className="w-full h-full max-h-[calc(90vh-5rem)] object-contain"
              />

              {documents.length > 1 ? (
                <>
                  <IconButton
                    icon={<ChevronLeft size={18} />}
                    onClick={prev}
                    aria-label="Previous document"
                    variant="secondary"
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90"
                  />
                  <IconButton
                    icon={<ChevronRight size={18} />}
                    onClick={next}
                    aria-label="Next document"
                    variant="secondary"
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90"
                  />
                </>
              ) : null}
            </div>

            {documents.length > 1 ? (
              <p className="type-caption text-white/70 text-center mt-2 num">
                {activeIndex + 1} of {documents.length}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
