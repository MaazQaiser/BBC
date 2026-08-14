import { NextResponse } from "next/server";
import { setTradeSession } from "@/lib/trade-session-server";
import { getClientIp } from "@/lib/eskimo";
import type { TradeSession } from "@/lib/trade-session";

interface GateBody {
  businessName?:  string;
  companyNumber?: string;
  confirmed?:     boolean;
}

export async function POST(request: Request) {
  let body: GateBody;
  try {
    body = (await request.json()) as GateBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const businessName  = body.businessName?.trim() ?? "";
  const companyNumber = body.companyNumber?.trim() ?? "";

  if (!businessName) {
    return NextResponse.json({ error: "Business name is required." }, { status: 400 });
  }
  if (!companyNumber) {
    return NextResponse.json({ error: "Company number or VAT number is required." }, { status: 400 });
  }
  if (!body.confirmed) {
    return NextResponse.json(
      { error: "You must confirm you are buying in the course of a business." },
      { status: 400 },
    );
  }

  const session: TradeSession = {
    businessName,
    companyNumber,
    confirmedAt: new Date().toISOString(),
    gateIpAddress: getClientIp(request),
    businessConfirmed: true,
  };

  await setTradeSession(session);

  return NextResponse.json({ ok: true });
}
