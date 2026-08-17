// ─── Vehicle & related domain types ───────────────────────────────────

export type FuelType = "Petrol" | "Diesel" | "Hybrid" | "Electric" | "Mild Hybrid";
export type Transmission = "Manual" | "Automatic" | "Semi-Auto";
export type BodyType = "Hatchback" | "Saloon" | "Estate" | "SUV" | "MPV" | "Convertible" | "Coupe" | "Van";
export type FaultSeverity = "advisory" | "minor" | "major" | "mot-fail";

/** Structured service history status shown on listings and filters */
export type ServiceHistoryStatus =
  | "full"
  | "part"
  | "present-unverified"
  | "none";

export type SortOption =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "mileage-asc"
  | "year-desc"
  | "mot-desc";

export type VehicleStatus = "retail" | "trade" | "rent";

export const DEFAULT_SORT: SortOption = "price-asc";

export interface ConditionItem {
  id:          string;
  /** Short fault title — e.g. "Dent to rear passenger door" */
  title:       string;
  severity:    FaultSeverity;
  /** Fault photograph — required for published vehicles */
  photo:       string;
  /** Meaningful alt text describing the fault */
  photoAlt:    string;
  /** Measurements and factual qualifiers — e.g. ["~10cm", "paint intact"] */
  qualifiers?: string[];
  /** Optional additional factual detail */
  detail?:     string;
  /** @deprecated Use title — kept for data migration */
  area?:       string;
  /** @deprecated Use title/detail — kept for data migration */
  description?: string;
  /** @deprecated Use qualifiers — kept for data migration */
  qualifier?:  string;
}

export interface MotEntry {
  date: string;          // ISO date string
  result: "pass" | "fail";
  mileage: number;
  advisories: string[];
  failures: string[];
  testCenter: string;
  /** Factual note when known — e.g. "Rectified same day" */
  rectifiedNote?: string;
}

export interface ServiceRecord {
  date: string;
  mileage: number;
  type: "Full Service" | "Interim Service" | "Oil & Filter" | "Major Service";
  location: string;
}

export type V5cStatus =
  | "present-in-name"
  | "present-not-in-name"
  | "applied-for"
  | "none";

export type DocumentImageType =
  | "service-book"
  | "invoice"
  | "mot-certificate"
  | "receipt"
  | "keys"
  | "handbook"
  | "cambelt"
  | "clutch";

export interface VehicleDocumentImage {
  id: string;
  type: DocumentImageType;
  /** Customer-facing label — e.g. "Service book" */
  label: string;
  imageUrl: string;
  /** Document type only — no personal information */
  alt: string;
}

export interface MaintenanceEvidence {
  type: "cambelt" | "clutch";
  /** Factual detail — e.g. "Changed Aug 2023 · invoice held" */
  detail: string;
}

export interface KeysInfo {
  count: number;
  sparePresent?: boolean;
}

export interface Document {
  name: string;
  present: boolean;
}

export interface RunningCosts {
  mpgCombined: number;
  mpgUrban?: number;
  mpgExtra?: number;
  insuranceGroup: number;
  /** Optional suffix — e.g. "E" for 18E */
  insuranceGroupSuffix?: string;
  roadTaxAnnual: number;
  co2gkm?: number;
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
  /** Weekly hire rate — rent stock only */
  weeklyRent?: number;
  description: string;
  images: string[];           // paths or placeholder refs
  /** Meaningful alt text per image — falls back to generated labels */
  imageAlts?: string[];
  hasVideo: boolean;
  videoUrl?: string;
  serviceHistoryPresent: boolean;
  serviceHistoryStatus: ServiceHistoryStatus;
  serviceRecords: ServiceRecord[];
  isSold?: boolean;
  /** Structured V5C status — never shown as an image */
  v5cStatus?: V5cStatus;
  /** Publishable document photographs — V5C must not be included */
  documentImages?: VehicleDocumentImage[];
  maintenanceEvidence?: MaintenanceEvidence[];
  keys?: KeysInfo;
  documents: Document[];
  conditionItems: ConditionItem[];
  motHistory: MotEntry[];
  motExpiry: string;          // ISO date
  runningCosts: RunningCosts;
  formerKeepers?: number;
  lat: number;
  lng: number;
  /** Stock type — retail and trade must never mix in queries */
  status?: VehicleStatus;
  isTrade: boolean;           // @deprecated mirror of status === "trade"
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
  serviceHistory: ServiceHistoryStatus[];
  hasVideoOnly: boolean;
  lowMileageForAgeOnly: boolean;
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
  serviceHistory: [],
  hasVideoOnly: false,
  lowMileageForAgeOnly: false,
};
