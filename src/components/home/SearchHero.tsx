"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

/* ─── Search Hero ─────────────────────────────────────────────────────────
   Spec:
   • Input height: 52px
   • Border radius: 12px (--radius-md)
   • Focus: accent border only — no glow ring
   • Submit button: dark (#111111) — primary CTAs are dark, not blue
────────────────────────────────────────────────────────────────────────── */
export function SearchHero() {
  const [query, setQuery]   = useState("");
  const router              = useRouter();
  const inputRef            = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  };

  return (
    <form onSubmit={handleSubmit} role="search" aria-label="Search vehicles">
      <div
        className={[
          /* Mobile: stacked */
          "flex flex-col gap-2",
          /* sm+: combined pill with shared border */
          "sm:flex-row sm:gap-0",
          "sm:rounded-[var(--radius-md)] sm:border sm:border-[var(--color-border)]",
          "sm:bg-white",
          "sm:focus-within:border-[var(--color-accent)]",
          "sm:overflow-hidden sm:transition-colors sm:duration-[var(--duration-hover)]",
        ].join(" ")}
      >
        {/* ── Text input ─────────────────────────────────────────── */}
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-faint)] pointer-events-none"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by make, model or keyword"
            autoComplete="off"
            className={[
              "w-full h-[52px] pl-12 pr-4",
              "bg-white text-[var(--color-text)] text-base",
              "placeholder:text-[var(--color-text-faint)]",
              "focus:outline-none",
              /* Mobile: own border + focus accent */
              "rounded-[var(--radius-md)] border border-[var(--color-border)] focus:border-[var(--color-accent)]",
              /* sm+: borderless — parent controls the border */
              "sm:rounded-none sm:border-0 sm:focus:border-0",
            ].join(" ")}
            aria-label="Search by make, model or keyword"
          />
        </div>

        {/* Vertical divider — desktop only */}
        <div
          className="hidden sm:block w-px h-[52px] bg-[var(--color-border)] self-center"
          aria-hidden="true"
        />

        {/* ── Submit — dark primary (spec) ───────────────────────── */}
        <button
          type="submit"
          className={[
            "shrink-0 h-[52px] px-7",
            "bg-[#111111] text-white font-medium text-[15px]",
            "hover:bg-[#1a1a1a] active:bg-[#2a2a2a]",
            "transition-colors duration-[var(--duration-hover)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2",
            /* Mobile: full width + rounded */
            "w-full rounded-[var(--radius-md)]",
            /* sm+: auto width, square left edge */
            "sm:w-auto sm:rounded-none sm:rounded-r-[var(--radius-md)]",
          ].join(" ")}
        >
          Search
        </button>
      </div>
    </form>
  );
}
