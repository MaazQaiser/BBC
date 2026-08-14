"use client";

import { X } from "lucide-react";
import type { FilterState, Vehicle, BodyType, FuelType, Transmission } from "@/lib/types";
import {
  applyFilters,
  countByMake,
  countByFuel,
  countByTransmission,
  countByBodyType,
  countByDoors,
  countBySeats,
  countByModel,
  countIfOption,
  isOptionDisabled,
  HOMEPAGE_PRICE_BANDS,
  MILEAGE_FILTER_OPTIONS,
  YEAR_FILTER_PRESETS,
  MOT_FILTER_OPTIONS,
  formatPrice,
} from "@/lib/filters";
import { SERVICE_HISTORY_OPTIONS } from "@/lib/service-history";
import { RotateCcw } from "lucide-react";

export interface FilterPanelProps {
  allVehicles: Vehicle[];
  filters: FilterState;
  onChange: (next: FilterState) => void;
  /** full = all filters (mobile sheet); more = extended filters only (desktop) */
  mode?: "full" | "more";
  className?: string;
}

export function FilterPanel({
  allVehicles,
  filters,
  onChange,
  mode = "full",
  className = "",
}: FilterPanelProps) {
  const activeCount = applyFilters(allVehicles, filters).length;
  const showPrimary = mode === "full";

  const set = <K extends keyof FilterState>(key: K, value: FilterState[K]) =>
    onChange({ ...filters, [key]: value });

  const toggleArray = <T,>(arr: T[], val: T): T[] =>
    arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];

  const makeCounts = countByMake(allVehicles);
  const modelCounts = countByModel(allVehicles, filters.make);
  const bodyTypeCounts = countByBodyType(allVehicles);
  const fuelCounts = countByFuel(allVehicles);
  const transmissionCounts = countByTransmission(allVehicles);
  const doorCounts = countByDoors(allVehicles);
  const seatCounts = countBySeats(allVehicles);

  const priceBands = HOMEPAGE_PRICE_BANDS.map((max) => ({
    max,
    count: countIfOption(allVehicles, filters, { ...filters, priceMin: null, priceMax: max }),
  })).filter((b) => b.count > 0);

  return (
    <div className={["space-y-0 text-sm", className].join(" ")}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="font-semibold text-[var(--color-text)]">Filters</p>
          <p className="text-xs text-[var(--color-text-muted)] num">{activeCount} cars</p>
        </div>
      </div>

      {showPrimary && (
        <>
          <FirstClassSection title="Price">
            {priceBands.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {priceBands.map(({ max, count }) => {
                  const isSelected = filters.priceMax === max && filters.priceMin === null;
                  const next = { ...filters, priceMin: null, priceMax: max };
                  const disabled = isOptionDisabled(allVehicles, filters, next, isSelected);
                  return (
                    <button
                      key={max}
                      type="button"
                      disabled={disabled}
                      onClick={() => set("priceMax", isSelected ? null : max)}
                      className={chipButtonClass(isSelected, disabled)}
                    >
                      Under {formatPrice(max)}
                      <span className="num text-xs opacity-70">{count}</span>
                    </button>
                  );
                })}
              </div>
            )}
            <div className="flex items-center gap-2">
              <PriceInput placeholder="Min" value={filters.priceMin} onChange={(v) => set("priceMin", v)} />
              <span className="text-[var(--color-text-faint)]">–</span>
              <PriceInput placeholder="Max" value={filters.priceMax} onChange={(v) => set("priceMax", v)} />
            </div>
          </FirstClassSection>

          <FirstClassSection title="Year / age">
            <div className="flex flex-wrap gap-2 mb-3">
              {YEAR_FILTER_PRESETS.map(({ label, value }) => {
                const isSelected = filters.yearMin === value && filters.yearMax === null;
                const next = { ...filters, yearMin: value, yearMax: null };
                const count = countIfOption(allVehicles, filters, next);
                const disabled = isOptionDisabled(allVehicles, filters, next, isSelected);
                return (
                  <button
                    key={value}
                    type="button"
                    disabled={disabled}
                    onClick={() => set("yearMin", isSelected ? null : value)}
                    className={chipButtonClass(isSelected, disabled)}
                  >
                    {label}
                    <span className="num text-xs opacity-70">{count}</span>
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-2">
              <NumberInput placeholder="From year" value={filters.yearMin} onChange={(v) => set("yearMin", v)} />
              <span className="text-[var(--color-text-faint)]">–</span>
              <NumberInput placeholder="To year" value={filters.yearMax} onChange={(v) => set("yearMax", v)} />
            </div>
          </FirstClassSection>

          <FirstClassSection title="Mileage">
            <div className="space-y-1.5">
              {[{ label: "Any mileage", value: null as number | null }, ...MILEAGE_FILTER_OPTIONS.map((m) => ({
                label: `Up to ${m.toLocaleString("en-GB")} mi`,
                value: m,
              }))].map(({ label, value }) => {
                const isSelected = filters.mileageMax === value;
                const next = { ...filters, mileageMax: value };
                const count = countIfOption(allVehicles, filters, next);
                const disabled = value !== null && isOptionDisabled(allVehicles, filters, next, isSelected);
                return (
                  <OptionRow
                    key={label}
                    label={label}
                    count={count}
                    selected={isSelected}
                    disabled={!!disabled}
                    onSelect={() => set("mileageMax", isSelected && value !== null ? null : value)}
                  />
                );
              })}
            </div>
          </FirstClassSection>

          <FilterSection title="Make & model">
            <p className="text-xs text-[var(--color-text-muted)] mb-2">Make</p>
            <CheckboxGroup
              options={Object.entries(makeCounts).sort(([a], [b]) => a.localeCompare(b))}
              selected={filters.make}
              onToggle={(v) => {
                const nextMake = toggleArray(filters.make, v);
                const validModels = filters.model.filter((m) =>
                  allVehicles.some((veh) => nextMake.includes(veh.make) && veh.model === m)
                );
                onChange({ ...filters, make: nextMake, model: validModels });
              }}
              allVehicles={allVehicles}
              filters={filters}
              applyOption={(label) => ({ ...filters, make: toggleArray(filters.make, label) })}
            />
            <p className="text-xs text-[var(--color-text-muted)] mt-4 mb-2">Model</p>
            {filters.make.length === 0 ? (
              <p className="text-xs text-[var(--color-text-faint)]">Any model</p>
            ) : (
              <CheckboxGroup
                options={Object.entries(modelCounts).sort(([a], [b]) => a.localeCompare(b))}
                selected={filters.model}
                onToggle={(v) => set("model", toggleArray(filters.model, v))}
                allVehicles={allVehicles}
                filters={filters}
                applyOption={(label) => ({ ...filters, model: toggleArray(filters.model, label) })}
              />
            )}
          </FilterSection>

          <FilterSection title="Body type">
            <CheckboxGroup
              options={Object.entries(bodyTypeCounts).sort(([a], [b]) => a.localeCompare(b))}
              selected={filters.bodyType}
              onToggle={(v) => set("bodyType", toggleArray(filters.bodyType, v as BodyType))}
              allVehicles={allVehicles}
              filters={filters}
              applyOption={(label) => ({
                ...filters,
                bodyType: toggleArray(filters.bodyType, label as BodyType),
              })}
            />
          </FilterSection>
        </>
      )}

      <FilterSection title="Transmission">
        <CheckboxGroup
          options={Object.entries(transmissionCounts)}
          selected={filters.transmission}
          onToggle={(v) => set("transmission", toggleArray(filters.transmission, v as Transmission))}
          allVehicles={allVehicles}
          filters={filters}
          applyOption={(label) => ({
            ...filters,
            transmission: toggleArray(filters.transmission, label as Transmission),
          })}
        />
      </FilterSection>

      <FilterSection title="Fuel">
        <CheckboxGroup
          options={Object.entries(fuelCounts)}
          selected={filters.fuelType}
          onToggle={(v) => set("fuelType", toggleArray(filters.fuelType, v as FuelType))}
          allVehicles={allVehicles}
          filters={filters}
          applyOption={(label) => ({
            ...filters,
            fuelType: toggleArray(filters.fuelType, label as FuelType),
          })}
        />
      </FilterSection>

      <FilterSection title="Doors">
        <CheckboxGroup
          options={Object.entries(doorCounts).sort(([a], [b]) => Number(a) - Number(b))}
          selected={filters.doors.map(String)}
          onToggle={(v) => set("doors", toggleArray(filters.doors, Number(v)))}
          allVehicles={allVehicles}
          filters={filters}
          applyOption={(label) => ({
            ...filters,
            doors: toggleArray(filters.doors, Number(label)),
          })}
        />
      </FilterSection>

      <FilterSection title="Seats">
        <CheckboxGroup
          options={Object.entries(seatCounts).sort(([a], [b]) => Number(a) - Number(b))}
          selected={filters.seats.map(String)}
          onToggle={(v) => set("seats", toggleArray(filters.seats, Number(v)))}
          allVehicles={allVehicles}
          filters={filters}
          applyOption={(label) => ({
            ...filters,
            seats: toggleArray(filters.seats, Number(label)),
          })}
        />
      </FilterSection>

      <FilterSection title="MOT remaining">
        <div className="space-y-1.5">
          {[{ label: "Any MOT", value: null as number | null }, ...MOT_FILTER_OPTIONS.map((o) => ({
            label: o.label,
            value: o.value,
          }))].map(({ label, value }) => {
            const isSelected = filters.motRemainingMonths === value;
            const next = { ...filters, motRemainingMonths: value };
            const count = countIfOption(allVehicles, filters, next);
            const disabled = value !== null && isOptionDisabled(allVehicles, filters, next, isSelected);
            return (
              <OptionRow
                key={label}
                label={label}
                count={count}
                selected={isSelected}
                disabled={!!disabled}
                onSelect={() => set("motRemainingMonths", isSelected && value !== null ? null : value)}
              />
            );
          })}
        </div>
      </FilterSection>

      <FilterSection title="Road tax">
        <SelectOptions
          value={filters.roadTaxMax}
          options={[
            { label: "Any", value: null },
            ...[155, 180, 200, 250, 300].map((t) => ({ label: `Up to £${t}/yr`, value: t })),
          ]}
          allVehicles={allVehicles}
          filters={filters}
          applyValue={(v) => ({ ...filters, roadTaxMax: v })}
          onChange={(v) => set("roadTaxMax", v)}
        />
      </FilterSection>

      <FilterSection title="MPG">
        <SelectOptions
          value={filters.mpgMin}
          options={[
            { label: "Any", value: null },
            ...[30, 40, 50, 55, 60].map((m) => ({ label: `${m}+ MPG`, value: m })),
          ]}
          allVehicles={allVehicles}
          filters={filters}
          applyValue={(v) => ({ ...filters, mpgMin: v })}
          onChange={(v) => set("mpgMin", v)}
        />
      </FilterSection>

      <FilterSection title="Insurance group">
        <SelectOptions
          value={filters.insuranceGroupMax}
          options={[
            { label: "Any", value: null },
            ...[10, 15, 20, 25, 30].map((g) => ({ label: `Group ${g} or lower`, value: g })),
          ]}
          allVehicles={allVehicles}
          filters={filters}
          applyValue={(v) => ({ ...filters, insuranceGroupMax: v })}
          onChange={(v) => set("insuranceGroupMax", v)}
        />
      </FilterSection>

      <FilterSection title="Service history">
        <div className="space-y-1.5">
          {SERVICE_HISTORY_OPTIONS.map(({ value, label }) => {
            const isSelected = filters.serviceHistory.includes(value);
            const count = countIfOption(allVehicles, filters, {
              ...filters,
              serviceHistory: [value],
            });
            const disabled = isOptionDisabled(
              allVehicles,
              filters,
              { ...filters, serviceHistory: [value] },
              isSelected
            );
            return (
              <OptionRow
                key={value}
                label={label}
                count={count}
                selected={isSelected}
                disabled={disabled}
                onSelect={() => set("serviceHistory", toggleArray(filters.serviceHistory, value))}
              />
            );
          })}
        </div>
      </FilterSection>

      <FilterSection title="Has video">
        <OptionRow
          label="Has video"
          count={countIfOption(allVehicles, filters, { ...filters, hasVideoOnly: true })}
          selected={filters.hasVideoOnly}
          disabled={isOptionDisabled(
            allVehicles,
            filters,
            { ...filters, hasVideoOnly: true },
            filters.hasVideoOnly
          )}
          onSelect={() => set("hasVideoOnly", !filters.hasVideoOnly)}
        />
      </FilterSection>
    </div>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────

function FirstClassSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-[var(--color-border)] pt-5 pb-1 first:border-t-0 first:pt-0">
      <p className="text-sm font-semibold text-[var(--color-text)] mb-3">{title}</p>
      {children}
    </div>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-[var(--color-border)] pt-4 mt-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-faint)] mb-2.5">
        {title}
      </p>
      {children}
    </div>
  );
}

function chipButtonClass(selected: boolean, disabled: boolean) {
  return [
    "inline-flex items-center gap-1.5 h-9 px-3 rounded-[var(--radius-md)] text-sm font-medium border transition-colors",
    disabled ? "opacity-40 cursor-not-allowed border-[var(--color-border)] text-[var(--color-text-faint)]" : "",
    !disabled && selected
      ? "border-[var(--color-accent)] bg-[var(--color-accent-light)] text-[var(--color-accent)]"
      : !disabled
        ? "border-[var(--color-border)] bg-white text-[var(--color-text)] hover:border-[var(--color-border-strong)]"
        : "",
  ]
    .filter(Boolean)
    .join(" ");
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
        className="w-full pl-6 pr-2 py-2 border border-[var(--color-border)] rounded-[var(--radius-sm)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] num text-sm"
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
      className="flex-1 w-full px-2.5 py-2 border border-[var(--color-border)] rounded-[var(--radius-sm)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] num text-sm"
    />
  );
}

function OptionRow({
  label,
  count,
  selected,
  disabled,
  onSelect,
}: {
  label: string;
  count: number;
  selected: boolean;
  disabled: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      className={[
        "w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-[var(--radius-sm)] text-left transition-colors",
        disabled ? "opacity-40 cursor-not-allowed" : "hover:bg-[var(--color-hover)] cursor-pointer",
        selected ? "bg-[var(--color-accent-light)] ring-1 ring-[var(--color-accent-muted)]" : "",
      ].join(" ")}
    >
      <span className="text-[var(--color-text)]">{label}</span>
      <span className="num text-xs text-[var(--color-text-muted)] shrink-0">{count}</span>
    </button>
  );
}

function SelectOptions({
  value,
  options,
  allVehicles,
  filters,
  applyValue,
  onChange,
}: {
  value: number | null;
  options: { label: string; value: number | null }[];
  allVehicles: Vehicle[];
  filters: FilterState;
  applyValue: (v: number | null) => FilterState;
  onChange: (v: number | null) => void;
}) {
  return (
    <div className="space-y-1.5">
      {options.map(({ label, value: optVal }) => {
        const isSelected = value === optVal;
        const next = applyValue(optVal);
        const count = countIfOption(allVehicles, filters, next);
        const disabled = optVal !== null && isOptionDisabled(allVehicles, filters, next, isSelected);
        return (
          <OptionRow
            key={label}
            label={label}
            count={count}
            selected={isSelected}
            disabled={!!disabled}
            onSelect={() => onChange(isSelected && optVal !== null ? null : optVal)}
          />
        );
      })}
    </div>
  );
}

function CheckboxGroup({
  options,
  selected,
  onToggle,
  allVehicles,
  filters,
  applyOption,
}: {
  options: [string, number][];
  selected: string[];
  onToggle: (v: string) => void;
  allVehicles: Vehicle[];
  filters: FilterState;
  applyOption: (label: string) => FilterState;
}) {
  return (
    <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
      {options.map(([label, totalCount]) => {
        const isSelected = selected.includes(label);
        const countIfSelected = countIfOption(allVehicles, filters, applyOption(label));
        const disabled = isOptionDisabled(allVehicles, filters, applyOption(label), isSelected);

        return (
          <label
            key={label}
            className={[
              "flex items-center gap-2 py-1",
              disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
            ].join(" ")}
          >
            <input
              type="checkbox"
              checked={isSelected}
              disabled={disabled}
              onChange={() => onToggle(label)}
              className="w-4 h-4 rounded border-[var(--color-border)] accent-[var(--color-accent)]"
            />
            <span className="flex-1 text-[var(--color-text)]">{label}</span>
            <span className="num text-xs text-[var(--color-text-faint)]">
              {isSelected ? countIfSelected : totalCount}
            </span>
          </label>
        );
      })}
    </div>
  );
}

export function FilterPanelClearButton({ onClear }: { onClear: () => void }) {
  return (
    <button
      type="button"
      onClick={onClear}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
    >
      <RotateCcw size={14} />
      Clear all
    </button>
  );
}

export function FilterChipRemoveIcon() {
  return <X size={12} strokeWidth={2.5} aria-hidden="true" />;
}
