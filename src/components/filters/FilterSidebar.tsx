"use client";

import type { FilterState, Vehicle, BodyType, FuelType, Transmission } from "@/lib/types";
import {
  countByMake,
  countByFuel,
  countByTransmission,
  countByBodyType,
  applyFilters,
} from "@/lib/filters";
import { Button } from "@/components/buttons/Button";
import { RotateCcw } from "lucide-react";
import { DEFAULT_FILTERS } from "@/lib/types";

interface FilterSidebarProps {
  allVehicles: Vehicle[];
  filters: FilterState;
  onChange: (next: FilterState) => void;
}

export function FilterSidebar({ allVehicles, filters, onChange }: FilterSidebarProps) {
  const activeCount = applyFilters(allVehicles, filters).length;
  const hasActiveFilters =
    filters.query ||
    filters.priceMax !== null ||
    filters.priceMin !== null ||
    filters.yearMin !== null ||
    filters.yearMax !== null ||
    filters.mileageMax !== null ||
    filters.make.length > 0 ||
    filters.bodyType.length > 0 ||
    filters.fuelType.length > 0 ||
    filters.transmission.length > 0 ||
    filters.serviceHistoryOnly ||
    filters.hasVideoOnly;

  const set = <K extends keyof FilterState>(key: K, value: FilterState[K]) =>
    onChange({ ...filters, [key]: value });

  const toggleArray = <T,>(arr: T[], val: T): T[] =>
    arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];

  const makeCounts = countByMake(allVehicles);
  const fuelCounts = countByFuel(allVehicles);
  const transmissionCounts = countByTransmission(allVehicles);
  const bodyTypeCounts = countByBodyType(allVehicles);

  return (
    <aside className="space-y-6 text-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-[var(--color-text)]">Filters</p>
          <p className="text-xs text-[var(--color-text-muted)] num">{activeCount} results</p>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onChange(DEFAULT_FILTERS)}
            className="text-[var(--color-text-muted)] gap-1"
          >
            <RotateCcw size={13} />
            Clear all
          </Button>
        )}
      </div>

      {/* Price */}
      <FilterSection title="Price">
        <div className="flex items-center gap-2">
          <PriceInput
            placeholder="Min"
            value={filters.priceMin}
            onChange={(v) => set("priceMin", v)}
          />
          <span className="text-[var(--color-text-faint)]">–</span>
          <PriceInput
            placeholder="Max"
            value={filters.priceMax}
            onChange={(v) => set("priceMax", v)}
          />
        </div>
      </FilterSection>

      {/* Year */}
      <FilterSection title="Year">
        <div className="flex items-center gap-2">
          <NumberInput placeholder="From" value={filters.yearMin} onChange={(v) => set("yearMin", v)} />
          <span className="text-[var(--color-text-faint)]">–</span>
          <NumberInput placeholder="To" value={filters.yearMax} onChange={(v) => set("yearMax", v)} />
        </div>
      </FilterSection>

      {/* Mileage */}
      <FilterSection title="Max Mileage">
        <select
          value={filters.mileageMax ?? ""}
          onChange={(e) => set("mileageMax", e.target.value ? Number(e.target.value) : null)}
          className="w-full border border-[var(--color-border)] rounded-[var(--radius-sm)] px-2.5 py-1.5 bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] num"
        >
          <option value="">Any</option>
          {[10000, 20000, 30000, 50000, 75000, 100000].map((m) => (
            <option key={m} value={m}>
              {m.toLocaleString("en-GB")} mi
            </option>
          ))}
        </select>
      </FilterSection>

      {/* Make */}
      <FilterSection title="Make">
        <CheckboxGroup
          options={Object.entries(makeCounts).sort(([a], [b]) => a.localeCompare(b))}
          selected={filters.make}
          onToggle={(v) => set("make", toggleArray(filters.make, v))}
          allVehicles={allVehicles}
          filters={filters}
          filterKey="make"
        />
      </FilterSection>

      {/* Body type */}
      <FilterSection title="Body Type">
        <CheckboxGroup
          options={Object.entries(bodyTypeCounts).sort(([a], [b]) => a.localeCompare(b))}
          selected={filters.bodyType}
          onToggle={(v) => set("bodyType", toggleArray(filters.bodyType, v as BodyType))}
          allVehicles={allVehicles}
          filters={filters}
          filterKey="bodyType"
        />
      </FilterSection>

      {/* Fuel */}
      <FilterSection title="Fuel">
        <CheckboxGroup
          options={Object.entries(fuelCounts)}
          selected={filters.fuelType}
          onToggle={(v) => set("fuelType", toggleArray(filters.fuelType, v as FuelType))}
          allVehicles={allVehicles}
          filters={filters}
          filterKey="fuelType"
        />
      </FilterSection>

      {/* Transmission */}
      <FilterSection title="Gearbox">
        <CheckboxGroup
          options={Object.entries(transmissionCounts)}
          selected={filters.transmission}
          onToggle={(v) => set("transmission", toggleArray(filters.transmission, v as Transmission))}
          allVehicles={allVehicles}
          filters={filters}
          filterKey="transmission"
        />
      </FilterSection>

      {/* MOT remaining */}
      <FilterSection title="MOT Remaining">
        <select
          value={filters.motRemainingMonths ?? ""}
          onChange={(e) => set("motRemainingMonths", e.target.value ? Number(e.target.value) : null)}
          className="w-full border border-[var(--color-border)] rounded-[var(--radius-sm)] px-2.5 py-1.5 bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
        >
          <option value="">Any</option>
          <option value="3">3+ months</option>
          <option value="6">6+ months</option>
          <option value="9">9+ months</option>
          <option value="12">12 months+</option>
        </select>
      </FilterSection>

      {/* Road Tax */}
      <FilterSection title="Max Annual Road Tax">
        <select
          value={filters.roadTaxMax ?? ""}
          onChange={(e) => set("roadTaxMax", e.target.value ? Number(e.target.value) : null)}
          className="w-full border border-[var(--color-border)] rounded-[var(--radius-sm)] px-2.5 py-1.5 bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] num"
        >
          <option value="">Any</option>
          {[155, 180, 200, 250, 300].map((t) => (
            <option key={t} value={t}>£{t}/yr</option>
          ))}
        </select>
      </FilterSection>

      {/* MPG */}
      <FilterSection title="Min MPG (Combined)">
        <select
          value={filters.mpgMin ?? ""}
          onChange={(e) => set("mpgMin", e.target.value ? Number(e.target.value) : null)}
          className="w-full border border-[var(--color-border)] rounded-[var(--radius-sm)] px-2.5 py-1.5 bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] num"
        >
          <option value="">Any</option>
          {[30, 40, 50, 55, 60].map((m) => (
            <option key={m} value={m}>{m}+ MPG</option>
          ))}
        </select>
      </FilterSection>

      {/* Insurance group */}
      <FilterSection title="Max Insurance Group">
        <select
          value={filters.insuranceGroupMax ?? ""}
          onChange={(e) => set("insuranceGroupMax", e.target.value ? Number(e.target.value) : null)}
          className="w-full border border-[var(--color-border)] rounded-[var(--radius-sm)] px-2.5 py-1.5 bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] num"
        >
          <option value="">Any</option>
          {[10, 15, 20, 25, 30].map((g) => (
            <option key={g} value={g}>Group {g} or lower</option>
          ))}
        </select>
      </FilterSection>

      {/* Toggles */}
      <FilterSection title="Other">
        <div className="space-y-2">
          <ToggleRow
            label="Service History"
            checked={filters.serviceHistoryOnly}
            onChange={(v) => set("serviceHistoryOnly", v)}
          />
          <ToggleRow
            label="Has Video"
            checked={filters.hasVideoOnly}
            onChange={(v) => set("hasVideoOnly", v)}
          />
        </div>
      </FilterSection>
    </aside>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-[var(--color-border)] pt-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-faint)] mb-2.5">
        {title}
      </p>
      {children}
    </div>
  );
}

function PriceInput({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: number | null;
  onChange: (v: number | null) => void;
}) {
  return (
    <div className="relative flex-1">
      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--color-text-faint)] text-sm">£</span>
      <input
        type="number"
        placeholder={placeholder}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
        className="w-full pl-6 pr-2 py-1.5 border border-[var(--color-border)] rounded-[var(--radius-sm)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] num text-sm"
      />
    </div>
  );
}

function NumberInput({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: number | null;
  onChange: (v: number | null) => void;
}) {
  return (
    <input
      type="number"
      placeholder={placeholder}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
      className="flex-1 w-full px-2.5 py-1.5 border border-[var(--color-border)] rounded-[var(--radius-sm)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] num text-sm"
    />
  );
}

function CheckboxGroup({
  options,
  selected,
  onToggle,
  allVehicles,
  filters,
  filterKey,
}: {
  options: [string, number][];
  selected: string[];
  onToggle: (v: string) => void;
  allVehicles: Vehicle[];
  filters: FilterState;
  filterKey: keyof FilterState;
}) {
  return (
    <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
      {options.map(([label, totalCount]) => {
        const filtersWithout = { ...filters, [filterKey]: [] };
        const countIfSelected = applyFilters(allVehicles, {
          ...filtersWithout,
          [filterKey]: [label],
        }).length;
        const isSelected = selected.includes(label);
        const isDisabled = !isSelected && countIfSelected === 0;

        return (
          <label
            key={label}
            className={[
              "flex items-center gap-2 cursor-pointer",
              isDisabled ? "opacity-40 pointer-events-none" : "",
            ].join(" ")}
          >
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onToggle(label)}
              className="w-4 h-4 rounded border-[var(--color-border)] accent-[var(--color-accent)]"
            />
            <span className="flex-1 text-[var(--color-text)]">{label}</span>
            <span className="num text-xs text-[var(--color-text-faint)]">{totalCount}</span>
          </label>
        );
      })}
    </div>
  );
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 cursor-pointer">
      <span className="text-[var(--color-text)]">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={[
          "relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]",
          checked ? "bg-[var(--color-accent)]" : "bg-[var(--color-border-2)]",
        ].join(" ")}
      >
        <span
          className={[
            "pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transition-transform",
            checked ? "translate-x-4" : "translate-x-0",
          ].join(" ")}
        />
      </button>
    </label>
  );
}
