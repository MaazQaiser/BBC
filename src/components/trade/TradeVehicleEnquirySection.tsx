import Link from "next/link";
import { Send } from "lucide-react";

export interface TradeVehicleEnquirySectionProps {
  enquiryHref: string;
  vehicleTitle: string;
}

/** Desktop enquiry entry point — mobile uses sticky bar */
export function TradeVehicleEnquirySection({
  enquiryHref,
}: TradeVehicleEnquirySectionProps) {
  return (
    <Link
      href={enquiryHref}
      className={[
        "inline-flex items-center justify-center gap-2 h-12 px-6 rounded-[var(--radius-md)]",
        "bg-[var(--color-accent)] text-white type-small font-medium",
        "hover:bg-[var(--color-accent-hover)] transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2",
      ].join(" ")}
    >
      <Send size={16} aria-hidden="true" />
      Send enquiry
    </Link>
  );
}
