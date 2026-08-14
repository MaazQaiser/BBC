/** Normalise YouTube / Vimeo URLs to embeddable iframe src (no autoplay) */
export function toVideoEmbedUrl(url: string): string {
  if (!url) return url;

  // Already an embed URL
  if (url.includes("/embed/")) return url.split("?")[0];

  // YouTube watch URL
  const ytWatch = url.match(/[?&]v=([^&]+)/);
  if (ytWatch) return `https://www.youtube.com/embed/${ytWatch[1]}`;

  // youtu.be short link
  const ytShort = url.match(/youtu\.be\/([^?&]+)/);
  if (ytShort) return `https://www.youtube.com/embed/${ytShort[1]}`;

  // Vimeo
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;

  return url;
}

export function toVideoWatchUrl(embedOrWatchUrl: string): string {
  const embed = toVideoEmbedUrl(embedOrWatchUrl);
  const yt = embed.match(/youtube\.com\/embed\/([^?&]+)/);
  if (yt) return `https://www.youtube.com/watch?v=${yt[1]}`;
  const vimeo = embed.match(/vimeo\.com\/video\/(\d+)/);
  if (vimeo) return `https://vimeo.com/${vimeo[1]}`;
  return embedOrWatchUrl;
}

export interface VideoObjectData {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  contentUrl: string;
  embedUrl: string;
}

/** Build VideoObject fields for structured data — returns null when no video */
export function buildVideoObjectData(vehicle: {
  year: number;
  make: string;
  model: string;
  videoUrl?: string;
  images: string[];
  listedAt: string;
}): VideoObjectData | null {
  if (!vehicle.videoUrl) return null;

  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  const embedUrl = toVideoEmbedUrl(vehicle.videoUrl);
  const contentUrl = toVideoWatchUrl(vehicle.videoUrl);

  return {
    name: `${title} walkaround video`,
    description: `Walkaround, cold start, interior and declared faults for the ${title}.`,
    thumbnailUrl: vehicle.images[0] ?? "",
    uploadDate: vehicle.listedAt,
    contentUrl,
    embedUrl,
  };
}

export function buildVideoObjectJsonLd(data: VideoObjectData): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: data.name,
    description: data.description,
    thumbnailUrl: data.thumbnailUrl,
    uploadDate: data.uploadDate,
    contentUrl: data.contentUrl,
    embedUrl: data.embedUrl,
  };
}
