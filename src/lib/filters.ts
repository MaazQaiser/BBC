import type { FilterState, Vehicle, BodyType, FuelType, Transmission, ServiceHistoryStatus } from "@/lib/types";
import { DEFAULT_FILTERS } from "@/lib/types";
import { getServiceHistoryLabel } from "@/lib/service-history";
import { filterByStockType, type StockType } from "@/lib/vehicle-stock";

// ─── Apply filters to vehicle list ────────────────────────────────────

export function isLowMileageForAge(vehicle: Vehicle): boolean {
  const ageYears = Math.max(1, new Date().getFullYear() - vehicle.year);
  return vehicle.mileage / ageYears <= 8000;
}

export function applyFilters(
  vehicles: Vehicle[],
  filters: FilterState,
  stockType?: StockType,
): Vehicle[] {
  const pool = stockType ? filterByStockType(vehicles, stockType) : vehicles;

  return pool.filter((v) => {
    if (filters.query) {
      const q = filters.query.toLowerCase();
      const haystack = `${v.make} ${v.model} ${v.variant} ${v.colour} ${v.bodyType}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (filters.priceMin !== null && v.price < filters.priceMin) return false;
    if (filters.priceMax !== null && v.price > filters.priceMax) return false;
    if (filters.yearMin !== null && v.year < filters.yearMin) return false;
    if (filters.yearMax !== null && v.year > filters.yearMax) return false;
    if (filters.mileageMax !== null && v.mileage > filters.mileageMax) return false;
    if (filters.make.length > 0 && !filters.make.includes(v.make)) return false;
    if (filters.model.length > 0 && !filters.model.includes(v.model)) return false;
    if (filters.bodyType.length > 0 && !filters.bodyType.includes(v.bodyType)) return false;
    if (filters.fuelType.length > 0 && !filters.fuelType.includes(v.fuelType)) return false;
    if (filters.transmission.length > 0 && !filters.transmission.includes(v.transmission)) return false;
    if (filters.doors.length > 0 && !filters.doors.includes(v.doors)) return false;
    if (filters.seats.length > 0 && !filters.seats.includes(v.seats)) return false;
    if (filters.roadTaxMax !== null && v.runningCosts.roadTaxAnnual > filters.roadTaxMax) return false;
    if (filters.mpgMin !== null && v.runningCosts.mpgCombined < filters.mpgMin) return false;
    if (filters.insuranceGroupMax !== null && v.runningCosts.insuranceGroup > filters.insuranceGroupMax) return false;
    if (filters.serviceHistory.length > 0 && !filters.serviceHistory.includes(v.serviceHistoryStatus)) return false;
    if (filters.hasVideoOnly && !v.hasVideo) return false;
    if (filters.lowMileageForAgeOnly && !isLowMileageForAge(v)) return false;
    if (filters.motRemainingMonths !== null) {
      const expiry = new Date(v.motExpiry);
      const now = new Date();
      const monthsRemaining = (expiry.getFullYear() - now.getFullYear()) * 12 + (expiry.getMonth() - now.getMonth());
      if (monthsRemaining < filters.motRemainingMonths) return false;
    }
    return true;
  });
}

// ─── Count how many vehicles match each filter option ─────────────────

export function countWithFilters(vehicles: Vehicle[], filters: FilterState): number {
  return applyFilters(vehicles, filters).length;
}

/** Count results if a single filter option were applied on top of a cleared sibling key */
export function countIfOption(
  allVehicles: Vehicle[],
  filters: FilterState,
  next: FilterState
): number {
  return applyFilters(allVehicles, next).length;
}

export function isOptionDisabled(
  allVehicles: Vehicle[],
  filters: FilterState,
  next: FilterState,
  isSelected: boolean
): boolean {
  if (isSelected) return false;
  return countIfOption(allVehicles, filters, next) === 0;
}

export function countByMake(vehicles: Vehicle[]): Record<string, number> {
  return vehicles.reduce<Record<string, number>>((acc, v) => {
    acc[v.make] = (acc[v.make] ?? 0) + 1;
    return acc;
  }, {});
}

export function countByFuel(vehicles: Vehicle[]): Record<string, number> {
  return vehicles.reduce<Record<string, number>>((acc, v) => {
    acc[v.fuelType] = (acc[v.fuelType] ?? 0) + 1;
    return acc;
  }, {});
}

export function countByTransmission(vehicles: Vehicle[]): Record<string, number> {
  return vehicles.reduce<Record<string, number>>((acc, v) => {
    acc[v.transmission] = (acc[v.transmission] ?? 0) + 1;
    return acc;
  }, {});
}

export function countByBodyType(vehicles: Vehicle[]): Record<string, number> {
  return vehicles.reduce<Record<string, number>>((acc, v) => {
    acc[v.bodyType] = (acc[v.bodyType] ?? 0) + 1;
    return acc;
  }, {});
}

export function countByDoors(vehicles: Vehicle[]): Record<number, number> {
  return vehicles.reduce<Record<number, number>>((acc, v) => {
    acc[v.doors] = (acc[v.doors] ?? 0) + 1;
    return acc;
  }, {});
}

export function countBySeats(vehicles: Vehicle[]): Record<number, number> {
  return vehicles.reduce<Record<number, number>>((acc, v) => {
    acc[v.seats] = (acc[v.seats] ?? 0) + 1;
    return acc;
  }, {});
}

export function countByModel(vehicles: Vehicle[], makes: string[]): Record<string, number> {
  const pool = makes.length ? vehicles.filter((v) => makes.includes(v.make)) : vehicles;
  return pool.reduce<Record<string, number>>((acc, v) => {
    acc[v.model] = (acc[v.model] ?? 0) + 1;
    return acc;
  }, {});
}

// ─── URL <-> FilterState ───────────────────────────────────────────────

export function filtersToParams(filters: FilterState): URLSearchParams {
  const p = new URLSearchParams();
  if (filters.query)              p.set("q",          filters.query);
  if (filters.priceMin !== null)  p.set("pmin",       String(filters.priceMin));
  if (filters.priceMax !== null)  p.set("pmax",       String(filters.priceMax));
  if (filters.yearMin !== null)   p.set("ymin",       String(filters.yearMin));
  if (filters.yearMax !== null)   p.set("ymax",       String(filters.yearMax));
  if (filters.mileageMax !== null) p.set("mmax",      String(filters.mileageMax));
  if (filters.motRemainingMonths !== null) p.set("mot", String(filters.motRemainingMonths));
  if (filters.make.length)        p.set("make",       filters.make.join(","));
  if (filters.model.length)       p.set("model",      filters.model.join(","));
  if (filters.bodyType.length)    p.set("body",       filters.bodyType.join(","));
  if (filters.fuelType.length)    p.set("fuel",       filters.fuelType.join(","));
  if (filters.transmission.length) p.set("gearbox",   filters.transmission.join(","));
  if (filters.doors.length)       p.set("doors",      filters.doors.join(","));
  if (filters.seats.length)       p.set("seats",      filters.seats.join(","));
  if (filters.roadTaxMax !== null) p.set("tax",       String(filters.roadTaxMax));
  if (filters.mpgMin !== null)    p.set("mpg",        String(filters.mpgMin));
  if (filters.insuranceGroupMax !== null) p.set("ins", String(filters.insuranceGroupMax));
  if (filters.serviceHistory.length) p.set("sh", filters.serviceHistory.join(","));
  if (filters.hasVideoOnly)       p.set("video",      "1");
  if (filters.lowMileageForAgeOnly) p.set("lowmileage", "1");
  return p;
}

export function paramsToFilters(params: URLSearchParams): FilterState {
  return {
    query:               params.get("q") ?? DEFAULT_FILTERS.query,
    priceMin:            params.has("pmin")  ? Number(params.get("pmin"))  : null,
    priceMax:            params.has("pmax")  ? Number(params.get("pmax"))  : null,
    yearMin:             params.has("ymin")  ? Number(params.get("ymin"))  : null,
    yearMax:             params.has("ymax")  ? Number(params.get("ymax"))  : null,
    mileageMax:          params.has("mmax")  ? Number(params.get("mmax"))  : null,
    motRemainingMonths:  params.has("mot")   ? Number(params.get("mot"))   : null,
    make:                params.has("make")  ? params.get("make")!.split(",") : [],
    model:               params.has("model") ? params.get("model")!.split(",") : [],
    bodyType:            params.has("body")  ? (params.get("body")!.split(",") as BodyType[]) : [],
    fuelType:            params.has("fuel")  ? (params.get("fuel")!.split(",") as FuelType[]) : [],
    transmission:        params.has("gearbox") ? (params.get("gearbox")!.split(",") as Transmission[]) : [],
    doors:               params.has("doors") ? params.get("doors")!.split(",").map(Number) : [],
    seats:               params.has("seats") ? params.get("seats")!.split(",").map(Number) : [],
    roadTaxMax:          params.has("tax")   ? Number(params.get("tax"))   : null,
    mpgMin:              params.has("mpg")   ? Number(params.get("mpg"))   : null,
    insuranceGroupMax:   params.has("ins")   ? Number(params.get("ins"))   : null,
    serviceHistory:      parseServiceHistoryParam(params.get("sh")),
    hasVideoOnly:        params.get("video") === "1",
    lowMileageForAgeOnly: params.get("lowmileage") === "1",
  };
}

// ─── Price band helpers ───────────────────────────────────────────────
// Homepage cumulative bands — extensible; do not treat as max vehicle price.

export const HOMEPAGE_PRICE_BANDS = [500, 1000, 2000, 3000, 5000, 7500, 10000, 15000] as const;

/** @deprecated Use HOMEPAGE_PRICE_BANDS for homepage display */
export const PRICE_BANDS = [...HOMEPAGE_PRICE_BANDS, 20000, 25000];

export function getHomepagePriceBands(vehicles: Vehicle[]): { max: number; count: number }[] {
  return HOMEPAGE_PRICE_BANDS.map((max) => ({
    max,
    count: vehicles.filter((v) => v.price <= max).length,
  })).filter((band) => band.count > 0);
}

export function getPriceBands(vehicles: Vehicle[]): { max: number; count: number }[] {
  return getHomepagePriceBands(vehicles);
}

// ─── Make / model helpers ─────────────────────────────────────────────

export function getMakes(vehicles: Vehicle[]): string[] {
  return [...new Set(vehicles.map((v) => v.make))].sort((a, b) => a.localeCompare(b));
}

export function getModelsForMake(vehicles: Vehicle[], make: string): string[] {
  return [...new Set(vehicles.filter((v) => v.make === make).map((v) => v.model))].sort((a, b) =>
    a.localeCompare(b)
  );
}

// ─── Low mileage for age ──────────────────────────────────────────────
// (defined above applyFilters)

// ─── Homepage secondary quick links ───────────────────────────────────

export interface QuickLink {
  label: string;
  href: string;
  count: number;
}

export function getHomepageQuickLinks(vehicles: Vehicle[]): QuickLink[] {
  const now = new Date();
  const sixMonthsAhead = new Date(now.getFullYear(), now.getMonth() + 6, now.getDate());

  const candidates: { label: string; href: string; match: (v: Vehicle) => boolean }[] = [
    {
      label: "Long MOT",
      href:  "/?mot=6",
      match: (v) => new Date(v.motExpiry) >= sixMonthsAhead,
    },
    {
      label: "Automatic",
      href:  "/?gearbox=Automatic",
      match: (v) => v.transmission === "Automatic",
    },
    {
      label: "7 seats",
      href:  "/?seats=7",
      match: (v) => v.seats >= 7,
    },
    {
      label: "Low mileage for age",
      href:  "/?lowmileage=1",
      match: isLowMileageForAge,
    },
  ];

  return candidates
    .map(({ label, href, match }) => ({
      label,
      href,
      count: vehicles.filter(match).length,
    }))
    .filter((link) => link.count > 0);
}

// ─── Popular search helpers ───────────────────────────────────────────

interface PopularSearch {
  label: string;
  params: Partial<FilterState>;
  count: number;
}

export function getPopularSearches(vehicles: Vehicle[]): PopularSearch[] {
  const now = new Date();
  const sixMonthsAhead = new Date(now.getFullYear(), now.getMonth() + 6, now.getDate());

  const candidates: { label: string; params: Partial<FilterState>; match: (v: Vehicle) => boolean }[] = [
    {
      label: "Long MOT",
      params: { motRemainingMonths: 6 },
      match: (v) => new Date(v.motExpiry) >= sixMonthsAhead,
    },
    {
      label: "Automatic",
      params: { transmission: ["Automatic"] },
      match: (v) => v.transmission === "Automatic",
    },
    {
      label: "7 Seats",
      params: { seats: [7] },
      match: (v) => v.seats >= 7,
    },
    {
      label: "Low Mileage",
      params: { mileageMax: 30000 },
      match: (v) => v.mileage <= 30000,
    },
    {
      label: "Under £5,000",
      params: { priceMax: 5000 },
      match: (v) => v.price <= 5000,
    },
    {
      label: "Service History",
      params: { serviceHistory: ["full"] },
      match: (v) => v.serviceHistoryStatus === "full",
    },
    {
      label: "Video Included",
      params: { hasVideoOnly: true },
      match: (v) => v.hasVideo,
    },
    {
      label: "SUV / Crossover",
      params: { bodyType: ["SUV"] },
      match: (v) => v.bodyType === "SUV",
    },
  ];

  return candidates
    .map(({ label, params, match }) => ({ label, params, count: vehicles.filter(match).length }))
    .filter(({ count }) => count > 0);
}

export function formatPrice(p: number): string {
  return `£${p.toLocaleString("en-GB")}`;
}

export function formatMileage(m: number): string {
  return `${m.toLocaleString("en-GB")} mi`;
}

export function motRemainingMonths(motExpiry: string): number {
  const expiry = new Date(motExpiry);
  const now = new Date();
  return (expiry.getFullYear() - now.getFullYear()) * 12 + (expiry.getMonth() - now.getMonth());
}

// ─── Filter option presets ─────────────────────────────────────────────

export const MILEAGE_FILTER_OPTIONS = [30000, 50000, 80000, 100000, 150000, 200000] as const;

export const YEAR_FILTER_PRESETS = [
  { label: "2022 or newer", value: 2022 },
  { label: "2020 or newer", value: 2020 },
  { label: "2018 or newer", value: 2018 },
  { label: "2015 or newer", value: 2015 },
  { label: "2010 or newer", value: 2010 },
] as const;

export const MOT_FILTER_OPTIONS = [
  { label: "3+ months", value: 3 },
  { label: "6+ months", value: 6 },
  { label: "9+ months", value: 9 },
  { label: "12+ months", value: 12 },
] as const;

// ─── Active filter chips ─────────────────────────────────────────────────

export interface ActiveFilterChip {
  id: string;
  label: string;
  remove: (filters: FilterState) => FilterState;
}

function parseServiceHistoryParam(raw: string | null): ServiceHistoryStatus[] {
  if (!raw) return [];
  if (raw === "1") return ["full", "part", "present-unverified"];
  const valid: ServiceHistoryStatus[] = ["full", "part", "present-unverified", "none"];
  return raw.split(",").filter((v): v is ServiceHistoryStatus =>
    valid.includes(v as ServiceHistoryStatus)
  );
}

export function hasActiveFilters(filters: FilterState): boolean {
  return buildActiveFilterChips(filters).length > 0;
}

export function buildActiveFilterChips(
  filters: FilterState,
  allVehicles?: Vehicle[]
): ActiveFilterChip[] {
  const chips: ActiveFilterChip[] = [];

  if (filters.query) {
    chips.push({
      id: "query",
      label: `"${filters.query}"`,
      remove: (f) => ({ ...f, query: "" }),
    });
  }
  if (filters.priceMin !== null) {
    chips.push({
      id: "pmin",
      label: `From £${filters.priceMin.toLocaleString("en-GB")}`,
      remove: (f) => ({ ...f, priceMin: null }),
    });
  }
  if (filters.priceMax !== null) {
    chips.push({
      id: "pmax",
      label: `Under £${filters.priceMax.toLocaleString("en-GB")}`,
      remove: (f) => ({ ...f, priceMax: null }),
    });
  }
  if (filters.yearMin !== null) {
    chips.push({
      id: "ymin",
      label: `${filters.yearMin} or newer`,
      remove: (f) => ({ ...f, yearMin: null }),
    });
  }
  if (filters.yearMax !== null) {
    chips.push({
      id: "ymax",
      label: `Up to ${filters.yearMax}`,
      remove: (f) => ({ ...f, yearMax: null }),
    });
  }
  if (filters.mileageMax !== null) {
    chips.push({
      id: "mmax",
      label: `Up to ${filters.mileageMax.toLocaleString("en-GB")} mi`,
      remove: (f) => ({ ...f, mileageMax: null }),
    });
  }
  if (filters.motRemainingMonths !== null) {
    chips.push({
      id: "mot",
      label: `MOT ${filters.motRemainingMonths}+ months`,
      remove: (f) => ({ ...f, motRemainingMonths: null }),
    });
  }
  filters.make.forEach((m) => {
    chips.push({
      id: `make-${m}`,
      label: m,
      remove: (f) => {
        const nextMake = f.make.filter((x) => x !== m);
        const nextModel = allVehicles
          ? f.model.filter((mod) =>
              allVehicles.some((v) => nextMake.includes(v.make) && v.model === mod)
            )
          : f.model;
        return { ...f, make: nextMake, model: nextModel };
      },
    });
  });
  filters.model.forEach((m) => {
    chips.push({
      id: `model-${m}`,
      label: m,
      remove: (f) => ({ ...f, model: f.model.filter((x) => x !== m) }),
    });
  });
  filters.bodyType.forEach((b) => {
    chips.push({
      id: `body-${b}`,
      label: b,
      remove: (f) => ({ ...f, bodyType: f.bodyType.filter((x) => x !== b) }),
    });
  });
  filters.fuelType.forEach((fuel) => {
    chips.push({
      id: `fuel-${fuel}`,
      label: fuel,
      remove: (f) => ({ ...f, fuelType: f.fuelType.filter((x) => x !== fuel) }),
    });
  });
  filters.transmission.forEach((t) => {
    chips.push({
      id: `gearbox-${t}`,
      label: t,
      remove: (f) => ({ ...f, transmission: f.transmission.filter((x) => x !== t) }),
    });
  });
  filters.doors.forEach((d) => {
    chips.push({
      id: `doors-${d}`,
      label: `${d} doors`,
      remove: (f) => ({ ...f, doors: f.doors.filter((x) => x !== d) }),
    });
  });
  filters.seats.forEach((s) => {
    chips.push({
      id: `seats-${s}`,
      label: `${s} seats`,
      remove: (f) => ({ ...f, seats: f.seats.filter((x) => x !== s) }),
    });
  });
  if (filters.roadTaxMax !== null) {
    chips.push({
      id: "tax",
      label: `Road tax up to £${filters.roadTaxMax}/yr`,
      remove: (f) => ({ ...f, roadTaxMax: null }),
    });
  }
  if (filters.mpgMin !== null) {
    chips.push({
      id: "mpg",
      label: `${filters.mpgMin}+ MPG`,
      remove: (f) => ({ ...f, mpgMin: null }),
    });
  }
  if (filters.insuranceGroupMax !== null) {
    chips.push({
      id: "ins",
      label: `Insurance group ${filters.insuranceGroupMax} or lower`,
      remove: (f) => ({ ...f, insuranceGroupMax: null }),
    });
  }
  filters.serviceHistory.forEach((sh) => {
    chips.push({
      id: `sh-${sh}`,
      label: getServiceHistoryLabel(sh),
      remove: (f) => ({ ...f, serviceHistory: f.serviceHistory.filter((x) => x !== sh) }),
    });
  });
  if (filters.hasVideoOnly) {
    chips.push({
      id: "video",
      label: "Has video",
      remove: (f) => ({ ...f, hasVideoOnly: false }),
    });
  }
  if (filters.lowMileageForAgeOnly) {
    chips.push({
      id: "lowmileage",
      label: "Low mileage for age",
      remove: (f) => ({ ...f, lowMileageForAgeOnly: false }),
    });
  }

  return chips;
}
