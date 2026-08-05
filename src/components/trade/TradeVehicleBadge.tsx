import { Tag } from "lucide-react";
import { Badge, type BadgeSize } from "@/components/badges/Badge";

/** Small badge shown on trade vehicle cards and detail pages. */
export function TradeVehicleBadge({ size = "md" }: { size?: BadgeSize }) {
  return (
    <Badge variant="trade" size={size} icon={<Tag size={10} />}>
      Trade Vehicle
    </Badge>
  );
}
