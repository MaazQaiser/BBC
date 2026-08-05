"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown } from "lucide-react";

const QUICK_FILTERS = [
  { label: "Any make",  href: "/search" },
  { label: "Any price", href: "/search" },
  { label: "Any fuel",  href: "/search?gearbox=Automatic" },
];

export function LuxedSearchHero() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} role="search" aria-label="Search vehicles">
        {/* Single glass search bar — one box, no nested borders */}
        <div
          className={[
            "flex flex-col sm:flex-row overflow-hidden",
            "rounded-[var(--radius-3xl)]",
            "bg-white/15 backdrop-blur-xl",
            "border border-white/25",
            "shadow-[0_8px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.15)]",
          ].join(" ")}
        >
          <div className="relative flex-1 flex items-center min-w-0">
            <Search
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by make, model or keyword"
              autoComplete="off"
              className="w-full h-14 pl-14 pr-4 bg-transparent border-0 outline-none text-white placeholder:text-white/45"
            />
          </div>

          <div className="hidden sm:block w-px bg-white/20 shrink-0" aria-hidden="true" />

          <button
            type="submit"
            className={[
              "shrink-0 h-14 px-8 w-full sm:w-auto",
              "bg-[var(--color-accent)] text-white font-semibold text-base",
              "hover:bg-[var(--color-accent-hover)]",
              "transition-colors duration-[var(--duration-hover)]",
            ].join(" ")}
          >
            Search
          </button>
        </div>
      </form>

      <div className="flex flex-wrap justify-center gap-3 mt-5">
        {QUICK_FILTERS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className={[
              "inline-flex items-center gap-2 h-10 px-4",
              "rounded-[var(--radius-pill)]",
              "bg-white/10 backdrop-blur-md",
              "border border-white/20",
              "text-white/90 text-sm font-medium",
              "hover:bg-white/20 hover:border-white/30",
              "transition-colors duration-[var(--duration-hover)]",
            ].join(" ")}
          >
            {label}
            <ChevronDown size={14} aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>
  );
}
