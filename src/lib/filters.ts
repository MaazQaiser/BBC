import type { FilterState, Vehicle, BodyType, FuelType, Transmission } from "@/lib/types";
import { DEFAULT_FILTERS } from "@/lib/types";

// ─── Apply filters to vehicle list ────────────────────────────────────

export function applyFilters(vehicles: Vehicle[], filters: FilterState): Vehicle[] {
  return vehicles.filter((v) => {
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
    if (filters.serviceHistoryOnly && !v.serviceHistoryPresent) return false;
    if (filters.hasVideoOnly && !v.hasVideo) return false;
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
  if (filters.serviceHistoryOnly) p.set("sh",         "1");
  if (filters.hasVideoOnly)       p.set("video",      "1");
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
    serviceHistoryOnly:  params.get("sh")    === "1",
    hasVideoOnly:        params.get("video") === "1",
  };
}

// ─── Price band helpers ───────────────────────────────────────────────

export const PRICE_BANDS = [500, 1000, 1500, 2000, 3000, 4000, 5000, 7500, 10000, 12500, 15000];

export function getPriceBands(vehicles: Vehicle[]): { max: number; count: number }[] {
  return PRICE_BANDS
    .map((max) => ({ max, count: vehicles.filter((v) => v.price <= max).length }))
    .filter((band) => band.count > 0);
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
      params: { serviceHistoryOnly: true },
      match: (v) => v.serviceHistoryPresent,
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
