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
    <div className="relative w-full min-w-0 px-4 sm:px-5 py-3.5 sm:py-4 border-b border-[var(--color-border)] last:border-b-0 lg:flex-1 lg:border-b-0">
      <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
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
  return <div className="hidden lg:block w-px self-stretch bg-[var(--color-border)] my-3 shrink-0" aria-hidden="true" />;
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
    <div className="w-full min-w-0 max-w-full rounded-[var(--radius-2xl)] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.10)] sm:shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-[var(--color-border)]">
      {/* Tabs row */}
      <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 p-3 sm:p-2">
        <div className="flex flex-wrap gap-1.5 sm:gap-2 min-w-0">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTab(tab.id)}
              className={[
                "h-9 px-3 sm:px-4 rounded-[var(--radius-pill)] text-xs sm:text-sm font-semibold transition-colors duration-[var(--duration-hover)] whitespace-nowrap",
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
          className="hidden sm:inline-flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors shrink-0"
        >
          <HelpCircle size={16} strokeWidth={2} aria-hidden="true" />
          Need help?
        </Link>
      </div>

      {/* Search fields */}
      <form
        onSubmit={handleSubmit}
        role="search"
        aria-label="Search vehicles"
        className="px-3 pb-3 sm:p-2 min-w-0"
      >
        <div className="flex w-full min-w-0 flex-col lg:flex-row lg:items-stretch rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white">
          <SearchField label="Make or keyword" icon={Search} showChevron={false}>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Any make or model"
              autoComplete="off"
              className="w-full min-w-0 bg-transparent border-0 outline-none text-sm font-semibold text-[var(--color-text)] placeholder:text-[var(--color-text)] placeholder:font-semibold"
            />
          </SearchField>

          <Divider />

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

          <button
            type="submit"
            className="w-full shrink-0 inline-flex items-center justify-center gap-2 h-12 px-6 bg-[var(--color-accent)] text-white font-semibold text-sm leading-none hover:bg-[var(--color-accent-hover)] transition-colors duration-[var(--duration-hover)] rounded-[var(--radius-lg)] lg:h-auto lg:w-auto lg:self-stretch lg:px-8 lg:min-w-[168px] lg:rounded-none lg:rounded-r-[var(--radius-xl)]"
          >
            <Search size={18} strokeWidth={2.5} aria-hidden="true" />
            Search Cars
          </button>
        </div>
      </form>
    </div>
  );
}
