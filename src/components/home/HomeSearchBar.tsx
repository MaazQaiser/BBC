"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ChevronDown,
  HelpCircle,
  Tag,
  Car,
  Gauge,
  type LucideIcon,
} from "lucide-react";
import type { BodyType } from "@/lib/types";

const TABS = [
  { id: "all",    label: "All cars" },
  { id: "budget", label: "Under £5,000" },
  { id: "video",  label: "With video" },
] as const;

const PRICE_OPTIONS = [
  { label: "Any price", value: "" },
  { label: "Up to £3,000", value: "3000" },
  { label: "Up to £5,000", value: "5000" },
  { label: "Up to £7,500", value: "7500" },
  { label: "Up to £10,000", value: "10000" },
  { label: "Up to £15,000", value: "15000" },
];

const BODY_OPTIONS: { label: string; value: BodyType | "" }[] = [
  { label: "Any body type", value: "" },
  { label: "Hatchback", value: "Hatchback" },
  { label: "Saloon", value: "Saloon" },
  { label: "Estate", value: "Estate" },
  { label: "SUV", value: "SUV" },
  { label: "MPV", value: "MPV" },
];

const MILEAGE_OPTIONS = [
  { label: "Any mileage", value: "" },
  { label: "Up to 30,000 mi", value: "30000" },
  { label: "Up to 50,000 mi", value: "50000" },
  { label: "Up to 80,000 mi", value: "80000" },
  { label: "Up to 100,000 mi", value: "100000" },
];

function labelFor(options: { label: string; value: string }[], value: string) {
  return options.find((o) => o.value === value)?.label ?? options[0].label;
}

function SearchField({
  label,
  icon: Icon,
  children,
  showChevron = true,
}: {
  label: string;
  icon: LucideIcon;
  children: React.ReactNode;
  showChevron?: boolean;
}) {
  return (
    <div className="relative flex-1 min-w-0 px-4 sm:px-5 py-4 border-b border-[var(--color-border)] last:border-b-0 lg:border-b-0">
      <div className="flex items-center gap-1.5 mb-2">
        <Icon size={14} className="shrink-0 text-[var(--color-text-faint)]" strokeWidth={2} aria-hidden="true" />
        <span className="text-xs text-[var(--color-text-muted)]">{label}</span>
      </div>
      <div className="flex items-center gap-2 min-w-0">
        <div className="flex-1 min-w-0 relative">{children}</div>
        {showChevron && (
          <ChevronDown size={16} className="shrink-0 text-[var(--color-text-faint)] pointer-events-none" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}

function Divider() {
  return <div className="hidden lg:block w-px self-stretch bg-[var(--color-border)] my-3" aria-hidden="true" />;
}

export function HomeSearchBar() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["id"]>("all");
  const [query, setQuery] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [mileageMax, setMileageMax] = useState("");

  const handleTab = (id: (typeof TABS)[number]["id"]) => {
    setActiveTab(id);
    if (id === "budget") setPriceMax("5000");
    if (id === "all") setPriceMax("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    const q = query.trim();
    if (q) params.set("q", q);
    if (priceMax) params.set("pmax", priceMax);
    if (bodyType) params.set("body", bodyType);
    if (mileageMax) params.set("mmax", mileageMax);
    if (activeTab === "video") params.set("video", "1");
    const qs = params.toString();
    router.push(qs ? `/search?${qs}` : "/search");
  };

  return (
    <div className="w-full rounded-[var(--radius-2xl)] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-[var(--color-border)] overflow-hidden">
      {/* Tabs row */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2">
        <div className="flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTab(tab.id)}
              className={[
                "h-9 px-4 rounded-[var(--radius-pill)] text-sm font-semibold transition-colors duration-[var(--duration-hover)]",
                activeTab === tab.id
                  ? "bg-[var(--color-accent)] text-white"
                  : "text-[var(--color-text)] hover:bg-[var(--color-surface-2)]",
              ].join(" ")}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
        >
          <HelpCircle size={16} strokeWidth={2} aria-hidden="true" />
          Need help?
        </Link>
      </div>

      {/* Inner search panel */}
      <form
        onSubmit={handleSubmit}
        role="search"
        aria-label="Search vehicles"
        className="p-2"
      >
        <div className="flex flex-col lg:flex-row lg:items-stretch rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white overflow-hidden">
          {/* Make / keyword */}
          <SearchField label="Make or keyword" icon={Search} showChevron={false}>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Any make or model"
              autoComplete="off"
              className="w-full bg-transparent border-0 outline-none text-sm font-semibold text-[var(--color-text)] placeholder:text-[var(--color-text)] placeholder:font-semibold"
            />
          </SearchField>

          <Divider />

          {/* Max price */}
          <SearchField label="Max price" icon={Tag}>
            <select
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Max price"
            >
              {PRICE_OPTIONS.map((opt) => (
                <option key={opt.value || "any"} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <span className="block text-sm font-semibold text-[var(--color-text)] truncate">
              {labelFor(PRICE_OPTIONS, priceMax)}
            </span>
          </SearchField>

          <Divider />

          {/* Body type */}
          <SearchField label="Body type" icon={Car}>
            <select
              value={bodyType}
              onChange={(e) => setBodyType(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Body type"
            >
              {BODY_OPTIONS.map((opt) => (
                <option key={opt.value || "any"} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <span className="block text-sm font-semibold text-[var(--color-text)] truncate">
              {labelFor(BODY_OPTIONS.map((o) => ({ label: o.label, value: o.value })), bodyType)}
            </span>
          </SearchField>

          <Divider />

          {/* Max mileage */}
          <SearchField label="Max mileage" icon={Gauge}>
            <select
              value={mileageMax}
              onChange={(e) => setMileageMax(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Max mileage"
            >
              {MILEAGE_OPTIONS.map((opt) => (
                <option key={opt.value || "any"} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <span className="block text-sm font-semibold text-[var(--color-text)] truncate">
              {labelFor(MILEAGE_OPTIONS, mileageMax)}
            </span>
          </SearchField>

          {/* CTA */}
          <button
            type="submit"
            className="shrink-0 m-2 lg:m-0 lg:rounded-none inline-flex items-center justify-center gap-2 px-6 lg:px-8 bg-[var(--color-accent)] text-white font-semibold text-sm hover:bg-[var(--color-accent-hover)] transition-colors duration-[var(--duration-hover)] rounded-[var(--radius-lg)] lg:min-w-[160px]"
          >
            <Search size={18} strokeWidth={2.5} aria-hidden="true" />
            Search Cars
          </button>
        </div>
      </form>
    </div>
  );
}
