"use client";

import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import { useSiteAppointment } from "@/components/site/SiteAppointmentProvider";

export interface VehicleContactContextValue {
  vehicleId?:       string;
  vehicleTitle:     string;
  registration?:    string;
  pageUrl:          string;
  openAppointment:  () => void;
}

const VehicleContactContext = createContext<VehicleContactContextValue | null>(null);

export interface VehicleContactProviderProps {
  vehicleId?:    string;
  vehicleTitle:  string;
  registration?: string;
  pageUrl:       string;
  children:      ReactNode;
}

export function VehicleContactProvider({
  vehicleId,
  vehicleTitle,
  registration,
  pageUrl,
  children,
}: VehicleContactProviderProps) {
  const { openAppointment: siteOpen, setVehicleContext } = useSiteAppointment();

  useEffect(() => {
    setVehicleContext({ vehicleId, vehicleTitle, registration, pageUrl });
    return () => setVehicleContext(null);
  }, [vehicleId, vehicleTitle, registration, pageUrl, setVehicleContext]);

  const openAppointment = useCallback(() => {
    siteOpen({ vehicleId, vehicleTitle, registration, pageUrl });
  }, [siteOpen, vehicleId, vehicleTitle, registration, pageUrl]);

  const value = useMemo(
    () => ({ vehicleId, vehicleTitle, registration, pageUrl, openAppointment }),
    [vehicleId, vehicleTitle, registration, pageUrl, openAppointment],
  );

  return (
    <VehicleContactContext.Provider value={value}>
      {children}
    </VehicleContactContext.Provider>
  );
}

export function useVehicleContact(): VehicleContactContextValue {
  const ctx = useContext(VehicleContactContext);
  if (!ctx) {
    throw new Error("useVehicleContact must be used within VehicleContactProvider");
  }
  return ctx;
}

/** Safe hook for optional provider — returns null outside provider */
export function useVehicleContactOptional(): VehicleContactContextValue | null {
  return useContext(VehicleContactContext);
}
