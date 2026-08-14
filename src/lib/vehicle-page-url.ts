import { headers } from "next/headers";

/** Build absolute URL for the current vehicle detail page */
export async function getVehiclePageUrl(vehicleId: string, pathPrefix = "/vehicles"): Promise<string> {
  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host");
  const protocol = headerList.get("x-forwarded-proto") ?? "http";
  if (!host) return `${pathPrefix}/${vehicleId}`;
  return `${protocol}://${host}${pathPrefix}/${vehicleId}`;
}
