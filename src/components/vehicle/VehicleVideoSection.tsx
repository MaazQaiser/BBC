import { VideoPlayer } from "@/components/vehicle/VideoPlayer";

interface VehicleVideoSectionProps {
  src:          string;
  posterImage?: string;
  posterAlt?:   string;
  title:        string;
}

export function VehicleVideoSection({
  src,
  posterImage,
  posterAlt,
  title,
  embedded = false,
}: VehicleVideoSectionProps & { embedded?: boolean }) {
  const player = (
    <VideoPlayer
      src={src}
      posterImage={posterImage}
      posterAlt={posterAlt}
      title={title}
    />
  );

  if (embedded) return player;

  return (
    <section aria-labelledby="video-heading" className="space-y-4 pt-2 border-t border-[var(--color-border)]">
      <div>
        <h2 id="video-heading" className="text-lg font-semibold text-[var(--color-text)] mb-1">
          Video
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-prose">
          Walkaround, cold start, declared faults, interior and electrics — where recorded for this
          vehicle.
        </p>
      </div>
      {player}
    </section>
  );
}
