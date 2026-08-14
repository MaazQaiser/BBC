import { NextResponse } from "next/server";
import { getVehicleById } from "@/lib/mock-data/vehicles";
import { getClientIp, sendAppointmentRequestToEskimo } from "@/lib/eskimo";

interface AppointmentBody {
  name?:           string;
  mobile?:         string;
  email?:          string;
  registration?:   string;
  postcode?:       string;
  preferredDay?:   string;
  preferredTime?:  string;
  vehicleId?:      string;
  vehiclePageUrl?: string;
}

const VALID_TIMES = new Set(["Morning", "Afternoon", "Evening"]);

export async function POST(request: Request) {
  let body: AppointmentBody;
  try {
    body = (await request.json()) as AppointmentBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim();
  const mobile = body.mobile?.trim();
  const email = body.email?.trim();
  const registration = body.registration?.trim();
  const postcode = body.postcode?.trim();
  const preferredDay = body.preferredDay?.trim();
  const preferredTime = body.preferredTime?.trim();

  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!mobile) {
    return NextResponse.json({ error: "Mobile number is required." }, { status: 400 });
  }
  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (!registration) {
    return NextResponse.json({ error: "Registration is required." }, { status: 400 });
  }
  if (!postcode) {
    return NextResponse.json({ error: "Postcode is required." }, { status: 400 });
  }
  if (!preferredDay) {
    return NextResponse.json({ error: "Preferred day is required." }, { status: 400 });
  }
  if (!preferredTime || !VALID_TIMES.has(preferredTime)) {
    return NextResponse.json({ error: "Select a preferred time." }, { status: 400 });
  }

  const vehicleId = body.vehicleId?.trim();
  const vehicle = vehicleId ? getVehicleById(vehicleId) : undefined;
  const vehicleTitle = vehicle
    ? `${vehicle.year} ${vehicle.make} ${vehicle.model}`
    : undefined;

  const timestamp = new Date().toISOString();
  const ipAddress = getClientIp(request);

  try {
    const { delivered } = await sendAppointmentRequestToEskimo({
      name,
      mobile,
      email,
      registration,
      postcode,
      preferredDay,
      preferredTime: preferredTime as "Morning" | "Afternoon" | "Evening",
      vehicleId: vehicle?.id,
      vehicleTitle,
      vehiclePageUrl: body.vehiclePageUrl?.trim() || undefined,
      timestamp,
      ipAddress,
    });

    return NextResponse.json({ ok: true, delivered, timestamp });
  } catch {
    return NextResponse.json(
      { error: "We couldn't send your request. Please try again." },
      { status: 502 },
    );
  }
}
