/**
 * Hero editorial images — local assets in /public/images/hero/.
 */
export const HERO_IMAGES = {
  forecourt:  "/images/hero/forecourt.png?v=4",
  interior:   "/images/hero/interior.png?v=4",
  inspection: "/images/hero/inspection.png?v=4",
} as const;

export type HeroImageKey = keyof typeof HERO_IMAGES;

export const HERO_SLIDES = [
  {
    src: HERO_IMAGES.forecourt,
    alt: "Used cars on the Manchester Car Yard forecourt",
  },
  {
    src: HERO_IMAGES.interior,
    alt: "Detailed interior photography of a listed vehicle",
  },
  {
    src: HERO_IMAGES.inspection,
    alt: "Mechanic inspecting a vehicle engine bay",
  },
] as const;
