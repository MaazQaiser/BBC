"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { filtersToParams } from "@/lib/filters";
import { DEFAULT_FILTERS } from "@/lib/types";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = filtersToParams({ ...DEFAULT_FILTERS, query });
    router.push(`/search?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="flex gap-2">
        <label htmlFor="main-search" className="sr-only">
          Search cars
        </label>
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-faint)] pointer-events-none"
          />
          <input
            id="main-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Make, model, or keyword…"
            className="w-full pl-10 pr-4 py-3 rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent text-base transition-shadow"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-3 bg-[var(--color-accent)] text-white rounded-[var(--radius)] font-medium text-base hover:bg-[var(--color-accent-hover)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 shrink-0"
        >
          Search
        </button>
      </div>
    </form>
  );
}
