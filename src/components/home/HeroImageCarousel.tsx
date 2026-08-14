"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { HERO_SLIDES } from "@/lib/hero-images";

const INTERVAL_MS = 5500;
const FADE_MS = 1200;

export function HeroImageCarousel() {
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion || HERO_SLIDES.length <= 1) return;

    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % HERO_SLIDES.length);
    }, INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [reducedMotion]);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === active;

        return (
          <div
            key={slide.src}
            className={[
              "absolute inset-0 transition-opacity ease-in-out overflow-hidden",
              isActive ? "opacity-100 z-[1]" : "opacity-0 z-0",
            ].join(" ")}
            style={{ transitionDuration: `${FADE_MS}ms` }}
          >
            <Image
              src={slide.src}
              alt=""
              fill
              priority={index === 0}
              className={[
                "object-cover",
                isActive && !reducedMotion ? "hero-ken-burns" : "",
              ].join(" ")}
              style={{ objectPosition: slide.objectPosition }}
              sizes="100vw"
            />
          </div>
        );
      })}

      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: [
            "linear-gradient(to right, rgba(17,17,17,0.93) 0%, rgba(17,17,17,0.72) 28%, rgba(17,17,17,0.28) 48%, rgba(17,17,17,0.08) 62%, transparent 78%)",
            "linear-gradient(to bottom, rgba(17,17,17,0.35) 0%, transparent 42%, transparent 100%)",
          ].join(", "),
        }}
      />
    </div>
  );
}
