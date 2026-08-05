import { NextResponse } from "next/server";
import { getTradeVehicleById } from "@/lib/mock-data/vehicles";
import { getTradeSession } from "@/lib/trade-session-server";
import { getClientIp, sendTradeEnquiryToEskimo } from "@/lib/eskimo";

interface EnquiryBody {
  vehicleId?:   string;
  contactName?: string;
  phone?:       string;
  email?:       string;
  message?:     string;
}

export async function POST(request: Request) {
  const session = await getTradeSession();
  if (!session) {
    return NextResponse.json({ error: "Trade session required." }, { status: 401 });
  }

  let body: EnquiryBody;
  try {
    body = (await request.json()) as EnquiryBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const vehicleId = body.vehicleId?.trim();
  if (!vehicleId) {
    return NextResponse.json({ error: "Vehicle ID is required." }, { status: 400 });
  }

  const contactName = body.contactName?.trim();
  const phone       = body.phone?.trim();
  const email       = body.email?.trim();

  if (!contactName) {
    return NextResponse.json({ error: "Contact name is required." }, { status: 400 });
  }
  if (!phone) {
    return NextResponse.json({ error: "Phone number is required." }, { status: 400 });
  }
  if (!email) {
    return NextResponse.json({ error: "Email address is required." }, { status: 400 });
  }

  const vehicle = getTradeVehicleById(vehicleId);
  if (!vehicle) {
    return NextResponse.json({ error: "Trade vehicle not found." }, { status: 404 });
  }

  if (!vehicle.registration) {
    return NextResponse.json({ error: "Vehicle registration is missing." }, { status: 422 });
  }

  const timestamp = new Date().toISOString();
  const ipAddress = getClientIp(request);

  try {
    const { delivered } = await sendTradeEnquiryToEskimo({
      businessName:        session.businessName,
      companyNumber:       session.companyNumber,
      contactName,
      phone,
      email,
      vehicleRegistration: vehicle.registration,
      vehicleId:           vehicle.id,
      vehicleTitle:        `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
      timestamp,
      ipAddress,
      conditionLedger:     vehicle.conditionItems,
      message:             body.message?.trim() || undefined,
    });

    return NextResponse.json({ ok: true, delivered, timestamp });
  } catch {
    return NextResponse.json({ error: "Failed to send enquiry." }, { status: 502 });
  }
}
