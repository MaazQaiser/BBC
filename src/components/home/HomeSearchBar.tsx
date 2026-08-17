"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, ChevronDown, Tag, Calendar, Gauge, Car, HelpCircle, Shield, CirclePoundSterling } from "lucide-react";
import type { BodyType, FilterState, Vehicle } from "@/lib/types";
import { getMakes, getModelsForMake, filtersToParams } from "@/lib/filters";
import { paramToSort, sortToParam } from "@/lib/sort";

const PRICE_OPTIONS = [
  { label: "Any price", value: "" },
  { label: "Up to £500", value: "500" },
  { label: "Up to £1,000", value: "1000" },
  { label: "Up to £2,000", value: "2000" },
  { label: "Up to £3,000", value: "3000" },
  { label: "Up to £5,000", value: "5000" },
  { label: "Up to £7,500", value: "7500" },
  { label: "Up to £10,000", value: "10000" },
  { label: "Up to £15,000", value: "15000" },
  { label: "Up to £20,000", value: "20000" },
  { label: "Up to £25,000", value: "25000" },
];

const YEAR_OPTIONS = [
  { label: "Any year", value: "" },
  { label: "2022 or newer", value: "2022" },
  { label: "2020 or newer", value: "2020" },
  { label: "2018 or newer", value: "2018" },
  { label: "2015 or newer", value: "2015" },
  { label: "2010 or newer", value: "2010" },
];

const MILEAGE_OPTIONS = [
  { label: "Any mileage", value: "" },
  { label: "Up to 30,000 mi", value: "30000" },
  { label: "Up to 50,000 mi", value: "50000" },
  { label: "Up to 80,000 mi", value: "80000" },
  { label: "Up to 100,000 mi", value: "100000" },
];

const BODY_OPTIONS: { label: string; value: BodyType | "" }[] = [
  { label: "Any body type", value: "" },
  { label: "Hatchback", value: "Hatchback" },
  { label: "Saloon", value: "Saloon" },
  { label: "Estate", value: "Estate" },
  { label: "SUV", value: "SUV" },
  { label: "MPV", value: "MPV" },
];

const ROAD_TAX_OPTIONS = [
  { label: "Any road tax", value: "" },
  { label: "Up to £155/yr", value: "155" },
  { label: "Up to £180/yr", value: "180" },
  { label: "Up to £200/yr", value: "200" },
  { label: "Up to £250/yr", value: "250" },
  { label: "Up to £300/yr", value: "300" },
];

const INSURANCE_GROUP_OPTIONS = [
  { label: "Any insurance group", value: "" },
  { label: "Group 10 or lower", value: "10" },
  { label: "Group 15 or lower", value: "15" },
  { label: "Group 20 or lower", value: "20" },
  { label: "Group 25 or lower", value: "25" },
  { label: "Group 30 or lower", value: "30" },
];

function labelFor(options: { label: string; value: string }[], value: string) {
  return options.find((o) => o.value === value)?.label ?? options[0].label;
}

function buildFilters(
  keyword: string,
  make: string,
  model: string,
  priceMax: string,
  yearMin: string,
  mileageMax: string,
  bodyType: string,
  roadTaxMax: string,
  insuranceGroupMax: string,
  hasVideoOnly: boolean,
): FilterState {
  return {
    query: keyword.trim(),
    priceMin: null,
    priceMax: priceMax ? Number(priceMax) : null,
    yearMin: yearMin ? Number(yearMin) : null,
    yearMax: null,
    mileageMax: mileageMax ? Number(mileageMax) : null,
    motRemainingMonths: null,
    make: make ? [make] : [],
    model: model ? [model] : [],
    bodyType: bodyType ? [bodyType as BodyType] : [],
    fuelType: [],
    transmission: [],
    doors: [],
    seats: [],
    roadTaxMax: roadTaxMax ? Number(roadTaxMax) : null,
    mpgMin: null,
    insuranceGroupMax: insuranceGroupMax ? Number(insuranceGroupMax) : null,
    serviceHistory: [],
    hasVideoOnly,
    lowMileageForAgeOnly: false,
  };
}

type HeroTab = "all" | "under-5000" | "with-video";

export interface HomeSearchBarProps {
  /** Used to populate make/model options */
  vehicles?: Vehicle[];
  /** Sync field values from active URL filters */
  initialFilters?: FilterState;
  /** Where search submits — homepage `/`, retail search `/search`, trade `/trade/listing` */
  target?: "home" | "search" | "trade";
  /** Hero homepage widget with tabs and single-row layout */
  variant?: "default" | "hero";
}

export function HomeSearchBar({
  vehicles = [],
  initialFilters,
  target = "home",
  variant = "default",
}: HomeSearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [keyword, setKeyword] = useState(initialFilters?.query ?? "");
  const [make, setMake] = useState(initialFilters?.make[0] ?? "");
  const [model, setModel] = useState(initialFilters?.model[0] ?? "");
  const [priceMax, setPriceMax] = useState(
    initialFilters?.priceMax != null ? String(initialFilters.priceMax) : ""
  );
  const [yearMin, setYearMin] = useState(
    initialFilters?.yearMin != null ? String(initialFilters.yearMin) : ""
  );
  const [mileageMax, setMileageMax] = useState(
    initialFilters?.mileageMax != null ? String(initialFilters.mileageMax) : ""
  );
  const [bodyType, setBodyType] = useState(initialFilters?.bodyType[0] ?? "");
  const [roadTaxMax, setRoadTaxMax] = useState(
    initialFilters?.roadTaxMax != null ? String(initialFilters.roadTaxMax) : "",
  );
  const [insuranceGroupMax, setInsuranceGroupMax] = useState(
    initialFilters?.insuranceGroupMax != null ? String(initialFilters.insuranceGroupMax) : "",
  );
  const [hasVideoOnly, setHasVideoOnly] = useState(initialFilters?.hasVideoOnly ?? false);
  const [heroTab, setHeroTab] = useState<HeroTab>(() => {
    if (initialFilters?.hasVideoOnly) return "with-video";
    if (initialFilters?.priceMax === 5000) return "under-5000";
    return "all";
  });

  useEffect(() => {
    if (!initialFilters) return;
    setKeyword(initialFilters.query ?? "");
    setMake(initialFilters.make[0] ?? "");
    setModel(initialFilters.model[0] ?? "");
    setPriceMax(initialFilters.priceMax != null ? String(initialFilters.priceMax) : "");
    setYearMin(initialFilters.yearMin != null ? String(initialFilters.yearMin) : "");
    setMileageMax(initialFilters.mileageMax != null ? String(initialFilters.mileageMax) : "");
    setBodyType(initialFilters.bodyType[0] ?? "");
    setRoadTaxMax(initialFilters.roadTaxMax != null ? String(initialFilters.roadTaxMax) : "");
    setInsuranceGroupMax(
      initialFilters.insuranceGroupMax != null ? String(initialFilters.insuranceGroupMax) : "",
    );
    setHasVideoOnly(initialFilters.hasVideoOnly ?? false);
    if (initialFilters.hasVideoOnly) setHeroTab("with-video");
    else if (initialFilters.priceMax === 5000) setHeroTab("under-5000");
    else setHeroTab("all");
  }, [initialFilters]);

  const makes = useMemo(() => getMakes(vehicles), [vehicles]);
  const models = useMemo(
    () => (make ? getModelsForMake(vehicles, make) : []),
    [vehicles, make]
  );

  const handleMakeChange = (next: string) => {
    setMake(next);
    setModel("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filters = buildFilters(
      keyword,
      make,
      model,
      priceMax,
      yearMin,
      mileageMax,
      bodyType,
      roadTaxMax,
      insuranceGroupMax,
      hasVideoOnly,
    );
    const params = filtersToParams(filters);
    const sortParam = sortToParam(paramToSort(searchParams.get("sort")));
    if (sortParam) params.set("sort", sortParam);
    const qs = params.toString();
    const base =
      target === "search"
        ? "/search"
        : target === "trade"
          ? "/trade/listing"
          : "/";
    router.push(qs ? `${base}?${qs}` : base);
  };

  const applyHeroTab = (tab: HeroTab) => {
    setHeroTab(tab);
    if (tab === "all") {
      setPriceMax("");
      setHasVideoOnly(false);
    } else if (tab === "under-5000") {
      setPriceMax("5000");
      setHasVideoOnly(false);
    } else {
      setHasVideoOnly(true);
    }
  };

  if (variant === "hero") {
    return (
      <form
        onSubmit={handleSubmit}
        role="search"
        aria-label="Search vehicles"
        className="w-full min-w-0 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-lg)] overflow-hidden"
      >
        {/* Quick filter tabs */}
        <div className="flex flex-wrap items-center gap-2 px-4 sm:px-5 pt-4 pb-3 border-b border-[var(--color-border)] min-w-0">
          {(
            [
              { id: "all" as const, label: "All cars" },
              { id: "under-5000" as const, label: "Under £5,000" },
              { id: "with-video" as const, label: "With video" },
            ] as const
          ).map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => applyHeroTab(id)}
              className={[
                "h-9 px-4 rounded-[var(--radius-pill)] text-sm font-medium transition-colors",
                heroTab === id
                  ? "bg-[var(--color-accent)] text-white"
                  : "bg-[var(--color-surface-2)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-3)]",
              ].join(" ")}
            >
              {label}
            </button>
          ))}
          <Link
            href="/rent"
            className={[
              "h-9 px-4 inline-flex items-center rounded-[var(--radius-pill)] text-sm font-medium transition-colors",
              pathname === "/rent"
                ? "bg-[var(--color-accent)] text-white"
                : "bg-[var(--color-surface-2)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-3)]",
            ].join(" ")}
          >
            Cars to rent
          </Link>
          <Link
            href="/contact"
            className="basis-full sm:basis-auto sm:ml-auto inline-flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors shrink-0"
          >
            <HelpCircle size={15} aria-hidden="true" />
            Need help?
          </Link>
        </div>

        {/* Filters — one row on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:flex xl:items-stretch xl:min-w-0">
          <div className="relative min-w-0 px-4 sm:px-4 py-3.5 sm:border-r border-[var(--color-border)] border-b xl:border-b-0 xl:flex-[1.15] xl:min-w-[9rem]">
            <label htmlFor="hero-keyword" className="sr-only">
              Make or keyword
            </label>
            <div className="flex items-center gap-2 min-w-0 h-full">
              <Search size={16} className="shrink-0 text-[var(--color-text-faint)]" aria-hidden="true" />
              <input
                id="hero-keyword"
                type="text"
                inputMode="search"
                enterKeyHint="search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Make or keyword"
                autoComplete="off"
                className="w-full min-w-0 appearance-none border-0 bg-transparent p-0 text-sm font-semibold text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] placeholder:font-normal shadow-none outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
              />
            </div>
          </div>

          <SearchSelect
            label="Max price"
            icon={Tag}
            value={priceMax}
            onChange={setPriceMax}
            options={PRICE_OPTIONS}
            compact
            className="sm:border-r border-[var(--color-border)] border-b xl:border-b-0 xl:flex-1 xl:min-w-[7rem]"
          />
          <SearchSelect
            label="Body type"
            icon={Car}
            value={bodyType}
            onChange={setBodyType}
            options={BODY_OPTIONS.map((o) => ({ label: o.label, value: o.value }))}
            compact
            className="sm:border-r border-[var(--color-border)] border-b xl:border-b-0 xl:flex-1 xl:min-w-[7rem]"
          />
          <SearchSelect
            label="Max mileage"
            icon={Gauge}
            value={mileageMax}
            onChange={setMileageMax}
            options={MILEAGE_OPTIONS}
            compact
            className="sm:border-r border-[var(--color-border)] border-b xl:border-b-0 xl:flex-1 xl:min-w-[7rem]"
          />
          <SearchSelect
            label="Insurance group"
            icon={Shield}
            value={insuranceGroupMax}
            onChange={setInsuranceGroupMax}
            options={INSURANCE_GROUP_OPTIONS}
            compact
            className="sm:border-r border-[var(--color-border)] border-b xl:border-b-0 xl:flex-1 xl:min-w-[7rem]"
          />
          <SearchSelect
            label="Road tax"
            icon={CirclePoundSterling}
            value={roadTaxMax}
            onChange={setRoadTaxMax}
            options={ROAD_TAX_OPTIONS}
            compact
            className="sm:border-r border-[var(--color-border)] border-b xl:border-b-0 xl:flex-1 xl:min-w-[7rem]"
          />

          <button
            type="submit"
            className="w-full sm:col-span-2 xl:col-span-1 xl:w-auto shrink-0 inline-flex items-center justify-center gap-2 h-14 xl:h-auto xl:self-stretch px-6 xl:px-8 bg-[var(--color-accent)] text-white font-semibold text-sm leading-none hover:bg-[var(--color-accent-hover)] transition-colors duration-[var(--duration-hover)] xl:min-w-[148px] xl:rounded-r-[var(--radius-xl)] border-b xl:border-b-0"
          >
            <Search size={18} strokeWidth={2.5} aria-hidden="true" />
            <span className="whitespace-nowrap">Search Cars</span>
          </button>
        </div>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="Search vehicles"
      className="w-full min-w-0 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-sm)]"
    >
      {/* Make & model row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-[var(--color-border)]">
        <SearchSelect
          label="Make & model"
          subLabel="Make & model"
          value={make}
          onChange={handleMakeChange}
          options={[{ label: "Any make or model", value: "" }, ...makes.map((m) => ({ label: m, value: m }))]}
          className="sm:border-r sm:border-[var(--color-border)]"
        />
        <SearchSelect
          label="Model"
          subLabel="Model"
          value={model}
          onChange={setModel}
          disabled={!make}
          options={[
            { label: make ? "Any model" : "Select a make first", value: "" },
            ...models.map((m) => ({ label: m, value: m })),
          ]}
        />
      </div>

      {/* First-class filters: price, year, mileage */}
      <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-[var(--color-border)]">
        <SearchSelect
          label="Price"
          icon={Tag}
          value={priceMax}
          onChange={setPriceMax}
          options={PRICE_OPTIONS}
          className="sm:border-r sm:border-[var(--color-border)]"
        />
        <SearchSelect
          label="Year / age"
          icon={Calendar}
          value={yearMin}
          onChange={setYearMin}
          options={YEAR_OPTIONS}
          className="sm:border-r sm:border-[var(--color-border)]"
        />
        <SearchSelect
          label="Mileage"
          icon={Gauge}
          value={mileageMax}
          onChange={setMileageMax}
          options={MILEAGE_OPTIONS}
        />
      </div>

      {/* Body type + submit */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] lg:items-stretch">
        <SearchSelect
          label="Body type"
          icon={Car}
          value={bodyType}
          onChange={setBodyType}
          options={BODY_OPTIONS.map((o) => ({ label: o.label, value: o.value }))}
          className="lg:border-r lg:border-[var(--color-border)]"
          bordered={false}
        />
        <button
          type="submit"
          className="w-full lg:w-auto shrink-0 inline-flex items-center justify-center gap-2 h-14 px-8 bg-[var(--color-accent)] text-white font-semibold text-sm leading-none hover:bg-[var(--color-accent-hover)] transition-colors duration-[var(--duration-hover)] lg:min-w-[168px] lg:rounded-r-[var(--radius-lg)]"
        >
          <Search size={18} strokeWidth={2.5} aria-hidden="true" />
          Search Cars
        </button>
      </div>
    </form>
  );
}

function SearchSelect({
  label,
  subLabel,
  icon: Icon,
  value,
  onChange,
  options,
  disabled = false,
  className = "",
  hideLabel = false,
  bordered = true,
  compact = false,
}: {
  label: string;
  subLabel?: string;
  icon?: typeof Tag;
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
  disabled?: boolean;
  className?: string;
  hideLabel?: boolean;
  bordered?: boolean;
  compact?: boolean;
}) {
  const displayLabel = subLabel ?? label;
  const selected = options.find((o) => o.value === value);

  return (
    <div
      className={[
        "relative w-full min-w-0",
        compact ? "px-4 py-3.5" : "px-4 sm:px-5 py-4",
        bordered ? "" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {!hideLabel && (
        <div className={["flex items-center gap-1.5", compact ? "mb-1.5" : "mb-2"].join(" ")}>
          {Icon && (
            <Icon size={14} className="shrink-0 text-[var(--color-text-faint)]" strokeWidth={2} aria-hidden="true" />
          )}
          <span className="text-xs font-medium text-[var(--color-text-muted)] truncate">{displayLabel}</span>
        </div>
      )}
      {hideLabel && (
        <span className="sr-only">{label}</span>
      )}
      <div className="relative flex items-center gap-2 min-w-0">
        <select
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          aria-label={displayLabel}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        >
          {options.map((opt) => (
            <option key={opt.value || "any"} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span
          className={[
            "block flex-1 min-w-0 text-sm font-semibold truncate",
            disabled ? "text-[var(--color-text-faint)]" : "text-[var(--color-text)]",
          ].join(" ")}
        >
          {selected?.label ?? labelFor(options, value)}
        </span>
        <ChevronDown size={16} className="shrink-0 text-[var(--color-text-faint)] pointer-events-none" aria-hidden="true" />
      </div>
    </div>
  );
}
