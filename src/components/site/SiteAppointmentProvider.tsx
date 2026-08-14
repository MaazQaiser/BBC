"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AppointmentRequestModal } from "@/components/vehicle/AppointmentRequestModal";
import { SITE_NAME } from "@/lib/site-brand";

export interface AppointmentVehicleContext {
  vehicleId?:    string;
  vehicleTitle?: string;
  registration?: string;
  pageUrl?:      string;
}

export interface SiteAppointmentContextValue {
  openAppointment: (context?: AppointmentVehicleContext) => void;
  setVehicleContext: (context: AppointmentVehicleContext | null) => void;
}

const SiteAppointmentContext = createContext<SiteAppointmentContextValue | null>(null);

export function SiteAppointmentProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [pageVehicle, setPageVehicle] = useState<AppointmentVehicleContext | null>(null);
  const [active, setActive] = useState<AppointmentVehicleContext>({});

  const setVehicleContext = useCallback((context: AppointmentVehicleContext | null) => {
    setPageVehicle(context);
  }, []);

  const openAppointment = useCallback(
    (context?: AppointmentVehicleContext) => {
      const fallbackUrl =
        typeof window !== "undefined" ? window.location.href : pathname;
      const next = context ?? pageVehicle ?? {};
      setActive({
        vehicleTitle: next.vehicleTitle || SITE_NAME,
        registration: next.registration ?? "",
        vehicleId: next.vehicleId,
        pageUrl: next.pageUrl || fallbackUrl,
      });
      setOpen(true);
    },
    [pageVehicle, pathname],
  );

  const closeAppointment = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ openAppointment, setVehicleContext }),
    [openAppointment, setVehicleContext],
  );

  return (
    <SiteAppointmentContext.Provider value={value}>
      {children}
      <AppointmentRequestModal
        open={open}
        onClose={closeAppointment}
        vehicleId={active.vehicleId}
        vehicleTitle={active.vehicleTitle ?? SITE_NAME}
        registration={active.registration ?? ""}
        pageUrl={active.pageUrl ?? ""}
      />
    </SiteAppointmentContext.Provider>
  );
}

export function useSiteAppointment(): SiteAppointmentContextValue {
  const ctx = useContext(SiteAppointmentContext);
  if (!ctx) {
    throw new Error("useSiteAppointment must be used within SiteAppointmentProvider");
  }
  return ctx;
}

export function useSiteAppointmentOptional(): SiteAppointmentContextValue | null {
  return useContext(SiteAppointmentContext);
}
