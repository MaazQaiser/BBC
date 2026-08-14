import type { Vehicle, VehicleStatus } from "@/lib/types";

export type { VehicleStatus };
export type StockType = VehicleStatus;

/** Resolve stock type — prefers explicit status, falls back to isTrade */
export function getVehicleStatus(vehicle: Vehicle): VehicleStatus {
  if (vehicle.status) return vehicle.status;
  return vehicle.isTrade ? "trade" : "retail";
}

export function isRetailVehicle(vehicle: Vehicle): boolean {
  return getVehicleStatus(vehicle) === "retail";
}

export function isTradeVehicle(vehicle: Vehicle): boolean {
  return getVehicleStatus(vehicle) === "trade";
}

/** Retail stock query — excludes trade vehicles */
export function getRetailStock(vehicles: Vehicle[]): Vehicle[] {
  return vehicles.filter(isRetailVehicle);
}

/** Trade stock query — trade vehicles only */
export function getTradeStock(vehicles: Vehicle[]): Vehicle[] {
  return vehicles.filter(isTradeVehicle);
}

/**
 * Enforce stock-type separation at query time.
 * Never rely on client flags alone — always filter server-side data sources.
 */
export function filterByStockType(
  vehicles: Vehicle[],
  stockType: StockType,
): Vehicle[] {
  return stockType === "trade"
    ? getTradeStock(vehicles)
    : getRetailStock(vehicles);
}
