import type { ConditionItem } from "@/lib/types";

export interface EskimoTradeEnquiryPayload {
  businessName:        string;
  companyNumber:       string;
  contactName:         string;
  phone:               string;
  email:               string;
  vehicleRegistration: string;
  vehicleId:           string;
  vehicleTitle:        string;
  timestamp:           string;
  ipAddress:           string;
  conditionLedger:     ConditionItem[];
  message?:            string;
}

/**
 * Forward a trade enquiry to Eskimo.
 * Set ESKIMO_WEBHOOK_URL in the environment to enable live delivery.
 */
export async function sendTradeEnquiryToEskimo(
  payload: EskimoTradeEnquiryPayload
): Promise<{ delivered: boolean }> {
  const webhookUrl = process.env.ESKIMO_WEBHOOK_URL;

  if (!webhookUrl) {
    console.info("[Eskimo] Trade enquiry (webhook not configured):", JSON.stringify(payload, null, 2));
    return { delivered: false };
  }

  const response = await fetch(webhookUrl, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Eskimo webhook returned ${response.status}`);
  }

  return { delivered: true };
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}
