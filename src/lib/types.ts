// ─── Vehicle & related domain types ───────────────────────────────────

export type FuelType = "Petrol" | "Diesel" | "Hybrid" | "Electric" | "Mild Hybrid";
export type Transmission = "Manual" | "Automatic" | "Semi-Auto";
export type BodyType = "Hatchback" | "Saloon" | "Estate" | "SUV" | "MPV" | "Convertible" | "Coupe" | "Van";
export type FaultSeverity = "advisory" | "minor" | "major" | "mot-fail";

export interface ConditionItem {
  id:          string;
  area:        string;
  description: string;
  severity:    FaultSeverity;
  qualifier?:  string;
  photo?:      string;
}

export interface MotEntry {
  date: string;          // ISO date string
  result: "pass" | "fail";
  mileage: number;
  advisories: string[];
  failures: string[];
  testCenter: string;
}

export interface ServiceRecord {
  date: string;
  mileage: number;
  type: "Full Service" | "Interim Service" | "Oil & Filter" | "Major Service";
  location: string;
}

export interface Document {
  name: string;
  present: boolean;
}

export interface RunningCosts {
  mpgCombined: number;
  mpgUrban: number;
  mpgExtra: number;
  insuranceGroup: number;
  roadTaxAnnual: number;
  co2gkm: number;
}

export interface Vehicle {
  id: string;
  slug: string;
  make: string;
  model: string;
  variant: string;
  year: number;
  mileage: number;
  fuelType: FuelType;
  transmission: Transmission;
  bodyType: BodyType;
  doors: number;
  seats: number;
  colour: string;
  registration?: string;
  engineCC: number;
  price: number;
  description: string;
  images: string[];           // paths or placeholder refs
  hasVideo: boolean;
  videoUrl?: string;
  serviceHistoryPresent: boolean;
  serviceRecords: ServiceRecord[];
  documents: Document[];
  conditionItems: ConditionItem[];
  motHistory: MotEntry[];
  motExpiry: string;          // ISO date
  runningCosts: RunningCosts;
  formerKeepers?: number;
  lat: number;
  lng: number;
  isTrade: boolean;           // true = trade listing only
  listedAt: string;           // ISO date
}

// ─── Filter state ──────────────────────────────────────────────────────

export interface FilterState {
  query: string;
  priceMin: number | null;
  priceMax: number | null;
  yearMin: number | null;
  yearMax: number | null;
  mileageMax: number | null;
  motRemainingMonths: number | null;  // minimum months
  make: string[];
  model: string[];
  bodyType: BodyType[];
  fuelType: FuelType[];
  transmission: Transmission[];
  doors: number[];
  seats: number[];
  roadTaxMax: number | null;
  mpgMin: number | null;
  insuranceGroupMax: number | null;
  serviceHistoryOnly: boolean;
  hasVideoOnly: boolean;
}

export const DEFAULT_FILTERS: FilterState = {
  query: "",
  priceMin: null,
  priceMax: null,
  yearMin: null,
  yearMax: null,
  mileageMax: null,
  motRemainingMonths: null,
  make: [],
  model: [],
  bodyType: [],
  fuelType: [],
  transmission: [],
  doors: [],
  seats: [],
  roadTaxMax: null,
  mpgMin: null,
  insuranceGroupMax: null,
  serviceHistoryOnly: false,
  hasVideoOnly: false,
};
