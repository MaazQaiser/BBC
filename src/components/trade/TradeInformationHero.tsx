import { LIFESTYLE_IMAGES } from "@/lib/lifestyle-images";

export function TradeInformationHero() {
  return (
    <div className="relative w-full aspect-[21/9] sm:aspect-[21/8] lg:aspect-[21/7] overflow-hidden rounded-[var(--radius-2xl)] bg-[var(--color-surface-2)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LIFESTYLE_IMAGES.handover}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" aria-hidden="true" />
    </div>
  );
}
