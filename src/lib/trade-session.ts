/** Cookie name for verified trade-section access. */
export const TRADE_SESSION_COOKIE = "bbc_trade_access";

/** Session lifetime — 7 days. */
export const TRADE_SESSION_MAX_AGE = 60 * 60 * 24 * 7;

export interface TradeSession {
  businessName:     string;
  companyNumber:    string;
  /** ISO timestamp when the gate was completed */
  confirmedAt:      string;
  /** IP address recorded server-side at gate completion */
  gateIpAddress?:   string;
  /** Explicit business-purchase declaration recorded at gate */
  businessConfirmed: boolean;
}

export function isValidTradeSession(value: unknown): value is TradeSession {
  if (!value || typeof value !== "object") return false;
  const s = value as Record<string, unknown>;
  return (
    typeof s.businessName === "string" &&
    s.businessName.trim().length > 0 &&
    typeof s.companyNumber === "string" &&
    s.companyNumber.trim().length > 0 &&
    typeof s.confirmedAt === "string" &&
    s.businessConfirmed === true
  );
}

export function parseTradeSession(raw: string | undefined): TradeSession | null {
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isValidTradeSession(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}
