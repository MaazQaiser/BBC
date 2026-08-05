"use client";

import { useState } from "react";
import { Play } from "lucide-react";

export interface VideoPlayerProps {
  src:          string;
  posterImage?: string;
  title?:       string;
  className?:   string;
}

/**
 * Lazy-loading video embed.
 * Shows a poster/placeholder until the user clicks play, avoiding
 * layout shift and unnecessary iframe load on page render.
 */
export function VideoPlayer({ src, posterImage, title = "Vehicle walkaround video", className = "" }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);

  // Convert YouTube watch URL to embed URL if needed
  const embedSrc = src.replace("watch?v=", "embed/").replace("youtu.be/", "www.youtube.com/embed/");
  const autoplaySrc = `${embedSrc}${embedSrc.includes("?") ? "&" : "?"}autoplay=1&rel=0`;

  return (
    <div
      className={[
        "relative rounded-[var(--radius-xl)] overflow-hidden aspect-video bg-[var(--color-surface-2)]",
        className,
      ].join(" ")}
    >
      {playing ? (
        <iframe
          src={autoplaySrc}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="absolute inset-0 w-full h-full flex items-center justify-center group"
          aria-label="Play video"
        >
          {/* Poster */}
          {posterImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={posterImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {/* Scrim */}
          <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors duration-[var(--duration-base)]" />

          {/* Play button */}
          <div className="relative z-10 w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-[var(--shadow-lg)] group-hover:scale-105 transition-transform duration-[var(--duration-base)]">
            <Play size={24} className="text-[var(--color-accent)] fill-[var(--color-accent)] ml-0.5" />
          </div>

          {/* Label */}
          {!posterImage && (
            <span className="relative z-10 mt-20 text-white text-sm font-medium">
              Watch walkaround
            </span>
          )}
        </button>
      )}
    </div>
  );
}
