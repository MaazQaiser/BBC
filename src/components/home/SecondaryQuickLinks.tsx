"use client";

import Link from "next/link";
import { getHomepageQuickLinks } from "@/lib/filters";
import type { Vehicle } from "@/lib/types";

interface SecondaryQuickLinksProps {
  vehicles: Vehicle[];
}

export function SecondaryQuickLinks({ vehicles }: SecondaryQuickLinksProps) {
  const links = getHomepageQuickLinks(vehicles);
  if (links.length === 0) return null;

  return (
    <section aria-labelledby="quick-links-heading" className="mt-6">
      <h2
        id="quick-links-heading"
        className="text-xs font-medium text-[var(--color-text-muted)] mb-2"
      >
        Also in stock
      </h2>
      <div className="flex flex-wrap gap-2">
        {links.map(({ label, href, count }) => (
          <Link
            key={label}
            href={href}
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-[var(--radius-md)] text-sm font-medium border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-hover)] transition-colors duration-[var(--duration-hover)]"
          >
            {label}
            <span className="num text-xs text-[var(--color-text-muted)]">{count}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
