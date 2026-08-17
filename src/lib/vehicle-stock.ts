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

export function isRentVehicle(vehicle: Vehicle): boolean {
  return getVehicleStatus(vehicle) === "rent";
}

/** Retail stock query — excludes trade and rent vehicles */
export function getRetailStock(vehicles: Vehicle[]): Vehicle[] {
  return vehicles.filter(isRetailVehicle);
}

/** Trade stock query — trade vehicles only */
export function getTradeStock(vehicles: Vehicle[]): Vehicle[] {
  return vehicles.filter(isTradeVehicle);
}

/** Rent stock query — hire vehicles only */
export function getRentStock(vehicles: Vehicle[]): Vehicle[] {
  return vehicles.filter(isRentVehicle);
}

/**
 * Enforce stock-type separation at query time.
 * Never rely on client flags alone — always filter server-side data sources.
 */
export function filterByStockType(
  vehicles: Vehicle[],
  stockType: StockType,
): Vehicle[] {
  if (stockType === "trade") return getTradeStock(vehicles);
  if (stockType === "rent") return getRentStock(vehicles);
  return getRetailStock(vehicles);
}
