import { buildVideoObjectData, buildVideoObjectJsonLd } from "@/lib/video";
import type { Vehicle } from "@/lib/types";

interface VehicleVideoStructuredDataProps {
  vehicle: Vehicle;
}

/** VideoObject JSON-LD hook — output only when vehicle has a video URL */
export function VehicleVideoStructuredData({ vehicle }: VehicleVideoStructuredDataProps) {
  const data = buildVideoObjectData(vehicle);
  if (!data) return null;

  const jsonLd = buildVideoObjectJsonLd(data);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
