import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { TRADE_SESSION_COOKIE, parseTradeSession } from "@/lib/trade-session";

const PROTECTED_PREFIXES = ["/trade/listing", "/trade/vehicles"];

function isProtectedTradeRoute(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export function middleware(request: NextRequest) {
  if (!isProtectedTradeRoute(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const session = parseTradeSession(request.cookies.get(TRADE_SESSION_COOKIE)?.value);
  if (session) {
    return NextResponse.next();
  }

  const gateUrl = new URL("/trade/verify", request.url);
  gateUrl.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(gateUrl);
}

export const config = {
  matcher: ["/trade/listing", "/trade/listing/:path*", "/trade/vehicles/:path*"],
};
