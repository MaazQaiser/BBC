import type { Vehicle } from "@/lib/types";

type RentSeed = Pick<
  Vehicle,
  | "id"
  | "slug"
  | "make"
  | "model"
  | "variant"
  | "year"
  | "mileage"
  | "fuelType"
  | "transmission"
  | "bodyType"
  | "colour"
  | "weeklyRent"
  | "motExpiry"
  | "images"
  | "description"
>;

function hireVehicle(seed: RentSeed): Vehicle {
  const weeklyRent = seed.weeklyRent ?? 0;
  return {
    ...seed,
    doors: 5,
    seats: 5,
    engineCC: 1400,
    price: weeklyRent,
    weeklyRent,
    hasVideo: false,
    serviceHistoryPresent: true,
    serviceHistoryStatus: "present-unverified",
    serviceRecords: [],
    documents: [{ name: "MOT Certificate", present: true }],
    conditionItems: [],
    motHistory: [
      {
        date: seed.motExpiry.replace(/-\d{2}$/, "-01"),
        result: "pass",
        mileage: seed.mileage,
        advisories: [],
        failures: [],
        testCenter: "BBC Autos, Leigh",
      },
    ],
    runningCosts: {
      mpgCombined: 45,
      insuranceGroup: 12,
      roadTaxAnnual: 180,
    },
    lat: 53.4968,
    lng: -2.5149,
    status: "rent",
    isTrade: false,
    listedAt: "2025-01-15T10:00:00Z",
  };
}

export const rentVehicles: Vehicle[] = [
  hireVehicle({
    id: "r001",
    slug: "2008-ford-fiesta-hire",
    make: "Ford",
    model: "Fiesta",
    variant: "1.25 Style 3dr",
    year: 2008,
    mileage: 89200,
    fuelType: "Petrol",
    transmission: "Manual",
    bodyType: "Hatchback",
    colour: "Red",
    weeklyRent: 50,
    motExpiry: "2027-01-15",
    images: ["/images/vehicles/car-01.jpg?v=2"],
    description: "Reliable small hatch — ideal for local hire and short-term use.",
  }),
  hireVehicle({
    id: "r002",
    slug: "2011-ford-fiesta-hire",
    make: "Ford",
    model: "Fiesta",
    variant: "1.25 Edge 5dr",
    year: 2011,
    mileage: 76400,
    fuelType: "Petrol",
    transmission: "Manual",
    bodyType: "Hatchback",
    colour: "Black",
    weeklyRent: 60,
    motExpiry: "2026-10-20",
    images: ["/images/vehicles/car-02.jpg?v=2"],
    description: "Compact petrol Fiesta with manual gearbox — easy to drive and park.",
  }),
  hireVehicle({
    id: "r003",
    slug: "2009-ford-fiesta-diesel-hire",
    make: "Ford",
    model: "Fiesta",
    variant: "1.4 TDCi Style 5dr",
    year: 2009,
    mileage: 98500,
    fuelType: "Diesel",
    transmission: "Manual",
    bodyType: "Hatchback",
    colour: "Black",
    weeklyRent: 60,
    motExpiry: "2027-01-08",
    images: ["/images/vehicles/car-03.jpg?v=2"],
    description: "Economical diesel hatchback suited to longer weekly hire.",
  }),
  hireVehicle({
    id: "r004",
    slug: "2011-ford-fiesta-tdci-hire",
    make: "Ford",
    model: "Fiesta",
    variant: "1.6 TDCi Zetec 5dr",
    year: 2011,
    mileage: 81200,
    fuelType: "Diesel",
    transmission: "Manual",
    bodyType: "Hatchback",
    colour: "Blue",
    weeklyRent: 65,
    motExpiry: "2026-09-12",
    images: ["/images/vehicles/car-04.jpg?v=2"],
    description: "Zetec-spec Fiesta TDCi — comfortable and frugal for weekly hire.",
  }),
  hireVehicle({
    id: "r005",
    slug: "2010-audi-a3-tdi-hire",
    make: "Audi",
    model: "A3",
    variant: "2.0 TDI Sport 3dr",
    year: 2010,
    mileage: 92100,
    fuelType: "Diesel",
    transmission: "Manual",
    bodyType: "Hatchback",
    colour: "Red",
    weeklyRent: 80,
    motExpiry: "2026-11-30",
    images: ["/images/vehicles/car-05.jpg?v=2"],
    description: "Sportier hatch option for drivers wanting a bit more comfort on hire.",
  }),
  hireVehicle({
    id: "r006",
    slug: "2012-ford-mondeo-hire",
    make: "Ford",
    model: "Mondeo",
    variant: "1.6 TDCi Edge 5dr",
    year: 2012,
    mileage: 104300,
    fuelType: "Diesel",
    transmission: "Manual",
    bodyType: "Saloon",
    colour: "Silver",
    weeklyRent: 75,
    motExpiry: "2027-02-18",
    images: ["/images/vehicles/car-06.jpg?v=2"],
    description: "Spacious saloon for families or longer-distance weekly hire.",
  }),
  hireVehicle({
    id: "r007",
    slug: "2011-volkswagen-passat-hire",
    make: "Volkswagen",
    model: "Passat",
    variant: "1.6 TDI S 4dr",
    year: 2011,
    mileage: 96800,
    fuelType: "Diesel",
    transmission: "Manual",
    bodyType: "Saloon",
    colour: "White",
    weeklyRent: 70,
    motExpiry: "2026-08-22",
    images: ["/images/vehicles/car-07.jpg?v=2"],
    description: "Comfortable Passat saloon with good motorway manners.",
  }),
  hireVehicle({
    id: "r008",
    slug: "2011-seat-leon-tdi-hire",
    make: "SEAT",
    model: "Leon",
    variant: "1.6 TDI S Emocion 5dr",
    year: 2011,
    mileage: 88700,
    fuelType: "Diesel",
    transmission: "Manual",
    bodyType: "Hatchback",
    colour: "White",
    weeklyRent: 65,
    motExpiry: "2027-03-05",
    images: ["/images/vehicles/car-08.jpg?v=2"],
    description: "Practical Leon TDI hatch — versatile weekly hire option.",
  }),
];

export function getRentVehicleById(id: string): Vehicle | undefined {
  return rentVehicles.find((v) => v.id === id);
}
