/**
 * Local vehicle images — everyday used cars only (hatchbacks, family cars).
 * Served from /public/images/vehicles/. No luxury or sports car imagery.
 */
const V = "?v=2"; // cache-bust after image swap

export const VEHICLE_IMAGES = {
  car01: `/images/vehicles/car-01.jpg${V}`,
  car02: `/images/vehicles/car-02.jpg${V}`,
  car03: `/images/vehicles/car-03.jpg${V}`,
  car04: `/images/vehicles/car-04.jpg${V}`,
  car05: `/images/vehicles/car-05.jpg${V}`,
  car06: `/images/vehicles/car-06.jpg${V}`,
  car07: `/images/vehicles/car-07.jpg${V}`,
  car08: `/images/vehicles/car-08.jpg${V}`,
  car09: `/images/vehicles/car-09.jpg${V}`,
  car10: `/images/vehicles/car-10.jpg${V}`,
  car11: `/images/vehicles/car-11.jpg${V}`,
  hero:  `/images/vehicles/hero.jpg${V}`,
} as const;

/** Rotating list for vehicle listing cards */
export const VEHICLE_IMAGE_LIST = [
  VEHICLE_IMAGES.car01,
  VEHICLE_IMAGES.car02,
  VEHICLE_IMAGES.car03,
  VEHICLE_IMAGES.car04,
  VEHICLE_IMAGES.car05,
  VEHICLE_IMAGES.car06,
  VEHICLE_IMAGES.car07,
  VEHICLE_IMAGES.car08,
  VEHICLE_IMAGES.car09,
  VEHICLE_IMAGES.car10,
  VEHICLE_IMAGES.car11,
];

export function vehicleImage(index: number): string {
  return VEHICLE_IMAGE_LIST[index % VEHICLE_IMAGE_LIST.length];
}
