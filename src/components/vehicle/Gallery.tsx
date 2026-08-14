"use client";

import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
import { IconButton } from "@/components/buttons/IconButton";

export interface GalleryProps {
  images: string[];
  alts:   string[];
}

export function Gallery({ images, alts }: GalleryProps) {
  const [active, setActive]     = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const total = images.length;

  const prev = useCallback(() => {
    setActive((i) => (i - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % total);
  }, [total]);

  // Keyboard navigation in lightbox
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, prev, next]);

  if (total === 0) return null;

  const currentAlt = alts[active] ?? `Vehicle photograph ${active + 1}`;

  const handleTouchStart = (e: React.TouchEvent) => {
    (e.currentTarget as HTMLElement).dataset.touchX = String(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const startX = Number((e.currentTarget as HTMLElement).dataset.touchX);
    if (!startX) return;
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 48) {
      if (diff > 0) next();
      else prev();
    }
  };

  return (
    <section aria-label="Vehicle photographs" className="w-full min-w-0">
      {/* Main viewer — fixed 4:3 */}
      <div
        className="relative rounded-[var(--radius-xl)] overflow-hidden bg-[var(--color-surface-2)] aspect-hero w-full min-w-0"
        onTouchStart={total > 1 ? handleTouchStart : undefined}
        onTouchEnd={total > 1 ? handleTouchEnd : undefined}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[active]}
          alt={currentAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {total > 1 && (
          <>
            <IconButton
              icon={<ChevronLeft size={18} />}
              onClick={prev}
              aria-label="Previous photograph"
              variant="secondary"
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm shadow-[var(--shadow-sm)] h-11 w-11"
            />
            <IconButton
              icon={<ChevronRight size={18} />}
              onClick={next}
              aria-label="Next photograph"
              variant="secondary"
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm shadow-[var(--shadow-sm)] h-11 w-11"
            />
          </>
        )}

        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          {total > 1 && (
            <span className="num text-xs text-white bg-black/50 backdrop-blur-sm px-2.5 py-1.5 rounded-[var(--radius-sm)]">
              {active + 1} / {total}
            </span>
          )}
          <IconButton
            icon={<Expand size={15} />}
            onClick={() => setLightbox(true)}
            aria-label="View full-size photograph"
            variant="secondary"
            size="sm"
            className="bg-white/90 backdrop-blur-sm shadow-[var(--shadow-sm)] h-10 w-10"
          />
        </div>
      </div>

      {/* Thumbnails */}
      {total > 1 && (
        <div
          className="flex gap-2.5 overflow-x-auto mt-3 pb-1 -mx-1 px-1 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Photograph thumbnails"
        >
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={alts[i] ?? `Photograph ${i + 1}`}
              onClick={() => setActive(i)}
              className={[
                "snap-start shrink-0 w-[4.5rem] sm:w-24 aspect-hero rounded-[var(--radius-md)] overflow-hidden transition-all duration-[var(--duration-fast)] border-2",
                i === active
                  ? "border-[var(--color-accent)] ring-2 ring-[var(--color-accent-muted)]"
                  : "border-[var(--color-border)] opacity-75 hover:opacity-100",
              ].join(" ")}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover pointer-events-none"
              />
            </button>
          ))}
        </div>
      )}

      {/* Full-size viewer */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[var(--z-modal)] bg-black/95 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Full-size photograph viewer"
          onClick={() => setLightbox(false)}
        >
          <IconButton
            icon={<X size={20} />}
            onClick={() => setLightbox(false)}
            aria-label="Close full-size viewer"
            variant="ghost"
            className="absolute text-white hover:bg-white/10 focus-visible:ring-white top-[max(1rem,env(safe-area-inset-top))] right-[max(1rem,env(safe-area-inset-right))]"
          />
          {total > 1 && (
            <>
              <IconButton
                icon={<ChevronLeft size={22} />}
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Previous photograph"
                variant="ghost"
                size="lg"
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 focus-visible:ring-white"
              />
              <IconButton
                icon={<ChevronRight size={22} />}
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Next photograph"
                variant="ghost"
                size="lg"
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 focus-visible:ring-white"
              />
            </>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[active]}
            alt={currentAlt}
            className="max-h-[90vh] max-w-full object-contain rounded-[var(--radius-md)]"
            onClick={(e) => e.stopPropagation()}
          />
          {total > 1 && (
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 num text-sm text-white/80">
              {active + 1} / {total}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
