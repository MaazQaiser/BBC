"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginationProps {
  page:       number;
  totalPages: number;
  onPage:     (page: number) => void;
  className?: string;
}

export function Pagination({ page, totalPages, onPage, className = "" }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = buildPageList(page, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className={["flex items-center gap-1", className].join(" ")}
    >
      <PageButton
        onClick={() => onPage(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </PageButton>

      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`ellipsis-${i}`} className="w-9 text-center text-sm text-[var(--color-text-faint)]">
            …
          </span>
        ) : (
          <PageButton
            key={p}
            onClick={() => onPage(p as number)}
            active={p === page}
            aria-label={`Page ${p}`}
            aria-current={p === page ? "page" : undefined}
          >
            <span className="num">{p}</span>
          </PageButton>
        )
      )}

      <PageButton
        onClick={() => onPage(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </PageButton>
    </nav>
  );
}

function PageButton({
  children,
  active,
  disabled,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  active?:  boolean;
  disabled?: boolean;
  onClick:  () => void;
  [k: string]: unknown;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        "w-9 h-9 inline-flex items-center justify-center rounded-[var(--radius-md)] text-sm transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]",
        "disabled:opacity-40 disabled:pointer-events-none",
        active
          ? "bg-[var(--color-accent)] text-white font-medium"
          : "text-[var(--color-text-muted)] hover:bg-[var(--color-hover)] hover:text-[var(--color-text)]",
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}

function buildPageList(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "…")[] = [1];
  if (current > 3) pages.push("…");

  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) {
    pages.push(p);
  }

  if (current < total - 2) pages.push("…");
  pages.push(total);

  return pages;
}
