import { cookies } from "next/headers";
import {
  TRADE_SESSION_COOKIE,
  TRADE_SESSION_MAX_AGE,
  parseTradeSession,
  type TradeSession,
} from "@/lib/trade-session";

export async function getTradeSession(): Promise<TradeSession | null> {
  const store = await cookies();
  return parseTradeSession(store.get(TRADE_SESSION_COOKIE)?.value);
}

export async function setTradeSession(session: TradeSession): Promise<void> {
  const store = await cookies();
  store.set(TRADE_SESSION_COOKIE, JSON.stringify(session), {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "lax",
    path:     "/",
    maxAge:   TRADE_SESSION_MAX_AGE,
  });
}
