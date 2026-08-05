"use client";

import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
import { IconButton } from "@/components/buttons/IconButton";

export interface GalleryProps {
  images: string[];
  alt:    string;
}

function Placeholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-surface-2)]">
      <svg viewBox="0 0 80 50" fill="none" className="w-20 opacity-15" aria-hidden="true">
        <path d="M8 34h64v5H8v-5zm4 0 8-13h32l8 13M20 20l4-8h24l4 8" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="20" cy="37" r="3.5" stroke="currentColor" strokeWidth="2" />
        <circle cx="60" cy="37" r="3.5" stroke="currentColor" strokeWidth="2" />
      </svg>
    </div>
  );
}

export function Gallery({ images, alt }: GalleryProps) {
  const [active, setActive]     = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const total = Math.max(images.length, 1);
  const hasImages = images.length > 0;

  const prev = useCallback(() => setActive((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setActive((i) => (i + 1) % total),         [total]);

  return (
    <>
      {/* Main viewer */}
      <div className="relative rounded-[var(--radius-xl)] overflow-hidden bg-[var(--color-surface-2)] aspect-[4/3]">
        {hasImages ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={images[active]}
            alt={`${alt} — photo ${active + 1} of ${total}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <Placeholder />
        )}

        {/* Nav arrows */}
        {total > 1 && (
          <>
            <IconButton
              icon={<ChevronLeft size={18} />}
              onClick={prev}
              aria-label="Previous photo"
              variant="secondary"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/85 backdrop-blur-sm shadow-[var(--shadow-sm)]"
            />
            <IconButton
              icon={<ChevronRight size={18} />}
              onClick={next}
              aria-label="Next photo"
              variant="secondary"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/85 backdrop-blur-sm shadow-[var(--shadow-sm)]"
            />
          </>
        )}

        {/* Counter + expand */}
        {hasImages && (
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            {total > 1 && (
              <span className="num text-xs text-white bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
                {active + 1} / {total}
              </span>
            )}
            <IconButton
              icon={<Expand size={14} />}
              onClick={() => setLightbox(true)}
              aria-label="View full screen"
              variant="secondary"
              size="sm"
              className="bg-white/85 backdrop-blur-sm shadow-[var(--shadow-sm)]"
            />
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {total > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-0.5 mt-2.5">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View photo ${i + 1}`}
              className={[
                "shrink-0 w-20 aspect-[4/3] rounded-[var(--radius-sm)] overflow-hidden transition-all duration-[var(--duration-fast)] border-2",
                i === active
                  ? "border-[var(--color-accent)] opacity-100"
                  : "border-transparent opacity-60 hover:opacity-90",
              ].join(" ")}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[var(--z-modal)] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          <IconButton
            icon={<X size={20} />}
            onClick={() => setLightbox(false)}
            aria-label="Close lightbox"
            variant="ghost"
            className="absolute top-4 right-4 text-white hover:bg-white/10"
          />
          {total > 1 && (
            <>
              <IconButton
                icon={<ChevronLeft size={22} />}
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Previous"
                variant="ghost"
                size="lg"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
              />
              <IconButton
                icon={<ChevronRight size={22} />}
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Next"
                variant="ghost"
                size="lg"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
              />
            </>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[active]}
            alt={alt}
            className="max-h-[90vh] max-w-full object-contain rounded-[var(--radius-md)]"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
