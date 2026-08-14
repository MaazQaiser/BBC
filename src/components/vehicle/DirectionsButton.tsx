"use client";

import { useCallback, useEffect, useState } from "react";
import { Navigation } from "lucide-react";
import { buildDirectionsHref } from "@/lib/contact-links";
import {
  CONTACT_ACTION_BASE,
  CONTACT_ACTION_GRID,
  CONTACT_ACTION_OUTLINE,
} from "@/lib/contact-action-styles";

interface DirectionsButtonProps {
  className?: string;
  /** Equal-width column in a contact action grid */
  grid?: boolean;
}

export function DirectionsButton({ className = "", grid = false }: DirectionsButtonProps) {
  const [href, setHref] = useState<string | null>(null);

  useEffect(() => {
    const isApple =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    setHref(buildDirectionsHref(isApple));
  }, []);

  const handleClick = useCallback(() => {
    if (!href) return;
    window.open(href, "_blank", "noopener,noreferrer");
  }, [href]);

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!href}
      className={[
        grid ? CONTACT_ACTION_GRID : CONTACT_ACTION_BASE,
        CONTACT_ACTION_OUTLINE,
        "disabled:opacity-60 disabled:cursor-not-allowed",
        className,
      ].join(" ")}
      aria-label="Get directions to Manchester Car Yard"
    >
      <Navigation size={16} aria-hidden="true" />
      Get directions
    </button>
  );
}
