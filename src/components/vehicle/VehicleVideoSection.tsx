import { VideoPlayer } from "@/components/vehicle/VideoPlayer";

interface VehicleVideoSectionProps {
  src:          string;
  posterImage?: string;
  title:        string;
}

export function VehicleVideoSection({ src, posterImage, title }: VehicleVideoSectionProps) {
  return (
    <section aria-labelledby="video-heading" className="space-y-4">
      <div>
        <h2 id="video-heading" className="type-h3 mb-1">Vehicle Video</h2>
        <p className="type-small text-[var(--color-text-muted)]">
          Walkaround, cold start, interior &amp; electrics — where recorded for this listing.
        </p>
      </div>
      <VideoPlayer src={src} posterImage={posterImage} title={title} />
    </section>
  );
}
