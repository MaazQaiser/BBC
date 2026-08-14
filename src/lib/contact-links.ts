import { SITE_CONTACT, SITE_LOCATION } from "@/lib/site-contact";

export interface VehicleWhatsAppContext {
  registration?: string;
  vehicleTitle: string;
  pageUrl: string;
}

/** Prefilled WhatsApp message for a vehicle enquiry */
export function buildVehicleWhatsAppMessage({
  registration,
  vehicleTitle,
  pageUrl,
}: VehicleWhatsAppContext): string {
  const reference = registration?.trim() || vehicleTitle;
  return `Hi, I'm interested in the ${reference}.\n${pageUrl}`;
}

export function buildWhatsAppHref(message: string): string {
  const base = SITE_CONTACT.whatsappHref;
  const separator = base.includes("?") ? "&" : "?";
  return `${base}${separator}text=${encodeURIComponent(message)}`;
}

export function buildVehicleWhatsAppHref(context: VehicleWhatsAppContext): string {
  return buildWhatsAppHref(buildVehicleWhatsAppMessage(context));
}

export function buildGoogleMapsDirectionsHref(): string {
  const query = encodeURIComponent(
    `${SITE_CONTACT.addressLine1}, ${SITE_CONTACT.addressLine2}`,
  );
  return `https://www.google.com/maps/dir/?api=1&destination=${query}`;
}

export function buildAppleMapsDirectionsHref(): string {
  const { lat, lng } = SITE_LOCATION;
  const label = encodeURIComponent(SITE_CONTACT.name);
  return `maps://maps.apple.com/?daddr=${lat},${lng}&q=${label}`;
}

/** Pick Apple Maps on iOS/iPadOS; Google Maps elsewhere */
export function buildDirectionsHref(isAppleDevice: boolean): string {
  return isAppleDevice
    ? buildAppleMapsDirectionsHref()
    : buildGoogleMapsDirectionsHref();
}

export function buildOpenStreetMapEmbedUrl(): string {
  const { lat, lng } = SITE_LOCATION;
  const delta = 0.012;
  const bbox = [lng - delta, lat - delta, lng + delta, lat + delta].join(",");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;
}
