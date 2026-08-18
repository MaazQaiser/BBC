import { NextResponse } from "next/server";
import { getTradeVehicleById } from "@/lib/mock-data/vehicles";
import { getTradeSession } from "@/lib/trade-session-server";
import { getClientIp, sendTradeEnquiryToEskimo } from "@/lib/eskimo";

interface OfferBody {
  vehicleId?:    string;
  contactName?:  string;
  companyName?:  string;
  phone?:        string;
  email?:        string;
  offerAmount?:  number | string;
  message?:      string;
}

export async function POST(request: Request) {
  let body: OfferBody;
  try {
    body = (await request.json()) as OfferBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const vehicleId = body.vehicleId?.trim();
  if (!vehicleId) {
    return NextResponse.json({ error: "Vehicle ID is required." }, { status: 400 });
  }

  const contactName = body.contactName?.trim();
  const companyName = body.companyName?.trim();
  const phone       = body.phone?.trim();
  const email       = body.email?.trim();
  const offerAmount = Number(body.offerAmount);

  if (!contactName) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!companyName) {
    return NextResponse.json({ error: "Company name is required." }, { status: 400 });
  }
  if (!phone) {
    return NextResponse.json({ error: "Mobile number is required." }, { status: 400 });
  }
  if (!email) {
    return NextResponse.json({ error: "Email address is required." }, { status: 400 });
  }
  if (!Number.isFinite(offerAmount) || offerAmount <= 0) {
    return NextResponse.json({ error: "A valid offer amount is required." }, { status: 400 });
  }

  const vehicle = getTradeVehicleById(vehicleId);
  if (!vehicle) {
    return NextResponse.json({ error: "Trade vehicle not found." }, { status: 404 });
  }

  if (!vehicle.registration) {
    return NextResponse.json({ error: "Vehicle registration is missing." }, { status: 422 });
  }

  const session = await getTradeSession();
  const timestamp = new Date().toISOString();
  const ipAddress = getClientIp(request);

  try {
    const { delivered } = await sendTradeEnquiryToEskimo({
      businessName:        companyName,
      companyNumber:       session?.companyNumber,
      contactName,
      phone,
      email,
      offerAmount,
      vehicleRegistration: vehicle.registration,
      vehicleId:           vehicle.id,
      vehicleTitle:        `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
      tradeStatus:         true,
      gateTimestamp:       session?.confirmedAt,
      gateIpAddress:       session?.gateIpAddress,
      businessConfirmed:   session?.businessConfirmed ?? false,
      timestamp,
      ipAddress,
      conditionLedger:     vehicle.conditionItems,
      message:             body.message?.trim() || undefined,
    });

    return NextResponse.json({ ok: true, delivered, timestamp });
  } catch {
    return NextResponse.json({ error: "Failed to send offer." }, { status: 502 });
  }
}
