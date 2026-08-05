import type { ImgHTMLAttributes } from "react";

interface AspectImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: "16/10" | "16/9" | "4/3" | "1/1";
}

const ratioClasses: Record<string, string> = {
  "16/10": "aspect-[16/10]",
  "16/9":  "aspect-video",
  "4/3":   "aspect-[4/3]",
  "1/1":   "aspect-square",
};

export function AspectImage({
  aspectRatio = "16/10",
  className = "",
  alt = "",
  src,
  ...props
}: AspectImageProps) {
  return (
    <div className={["relative overflow-hidden bg-[var(--color-surface-2)]", ratioClasses[aspectRatio]].join(" ")}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className={["absolute inset-0 w-full h-full object-cover", className].join(" ")}
          {...props}
        />
      ) : (
        <PlaceholderCar />
      )}
    </div>
  );
}

function PlaceholderCar() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-surface-2)]">
      <svg
        viewBox="0 0 80 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-20 h-auto opacity-20"
        aria-hidden="true"
      >
        <path
          d="M8 34h64v6H8v-6zM12 34l8-14h32l8 14"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
          fill="none"
        />
        <path d="M20 20l4-8h24l4 8" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="20" cy="38" r="4" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <circle cx="60" cy="38" r="4" stroke="currentColor" strokeWidth="2.5" fill="none" />
      </svg>
    </div>
  );
}
