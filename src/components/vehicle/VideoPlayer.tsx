"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { toVideoEmbedUrl } from "@/lib/video";

export interface VideoPlayerProps {
  src:          string;
  posterImage?: string;
  posterAlt?:   string;
  title:        string;
  className?:   string;
}

/**
 * Lazy-loading video embed — poster + play until user initiates playback.
 * Supports YouTube and Vimeo externally hosted URLs.
 */
export function VideoPlayer({
  src,
  posterImage,
  posterAlt,
  title,
  className = "",
}: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);

  const embedSrc = toVideoEmbedUrl(src);
  const autoplaySrc = `${embedSrc}${embedSrc.includes("?") ? "&" : "?"}autoplay=1&rel=0`;

  return (
    <div
      className={[
        "relative rounded-[var(--radius-xl)] overflow-hidden aspect-video bg-[var(--color-surface-2)] w-full min-w-0",
        className,
      ].join(" ")}
    >
      {playing ? (
        <iframe
          src={autoplaySrc}
          title={title}
          className="absolute inset-0 w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="absolute inset-0 w-full h-full flex items-center justify-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
          aria-label={`Play ${title}`}
        >
          {posterImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={posterImage}
              alt={posterAlt ?? title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          <div
            className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-[var(--duration-base)]"
            aria-hidden="true"
          />

          <span className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/95 flex items-center justify-center shadow-[var(--shadow-md)] group-hover:scale-105 group-focus-visible:scale-105 transition-transform duration-[var(--duration-base)]">
            <Play
              size={22}
              className="text-[var(--color-accent)] fill-[var(--color-accent)] ml-0.5"
              aria-hidden="true"
            />
          </span>
        </button>
      )}
    </div>
  );
}
