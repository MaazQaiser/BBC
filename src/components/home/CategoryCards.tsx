import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { CATEGORY_IMAGES } from "@/lib/category-images";

const CATEGORIES = [
  {
    headline:    "Under £5,000",
    description: "Browse budget-friendly stock with clear condition reporting on every listing.",
    href:        "/search?pmax=5000",
    bg:          "#b8d9f8",
    image:       CATEGORY_IMAGES.under5000,
    imageClass:  "absolute right-0 bottom-0 w-[58%] max-h-[63%] object-contain object-right-bottom pointer-events-none",
  },
  {
    headline:    "Family cars",
    description: "Estates and 7-seat vehicles for school runs, holidays and everyday life.",
    href:        "/search?seats=7",
    bg:          "#c0e7c6",
    image:       CATEGORY_IMAGES.familyCars,
    imageClass:  "absolute right-0 bottom-0 w-[62%] max-h-[55%] object-contain object-right-bottom pointer-events-none",
  },
  {
    headline:    "With video",
    description: "Walkaround videos available so you can see more before arranging a viewing.",
    href:        "/search?video=1",
    bg:          "#f6e5b4",
    image:       CATEGORY_IMAGES.withVideo,
    imageClass:  "absolute right-0 bottom-0 w-[72%] max-h-[53%] object-contain object-right-bottom pointer-events-none",
  },
];

export function CategoryCards() {
  return (
    <section className="pt-28 sm:pt-32 lg:pt-36 pb-12 bg-white" aria-label="Browse by category">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.map(({ headline, description, href, bg, image, imageClass }) => (
            <Link
              key={headline}
              href={href}
              className="group relative block h-[244px] rounded-[28px] overflow-hidden transition-shadow duration-[var(--duration-hover)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)]"
              style={{ backgroundColor: bg }}
            >
              <span
                className="absolute top-5 right-5 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-white/90 text-[#111827] shadow-sm group-hover:bg-white group-hover:scale-105 transition-all duration-[var(--duration-hover)]"
                aria-hidden="true"
              >
                <ArrowUpRight size={18} strokeWidth={2.5} />
              </span>

              {/* Copy — left */}
              <div className="relative z-10 flex h-full flex-col gap-3 pl-6 pr-8 py-8 max-w-[62%]">
                <div className="flex flex-col gap-2.5">
                  <h3 className="text-[26px] font-extrabold leading-[30px] tracking-[-0.5px] text-[#111827]">
                    {headline}
                  </h3>
                  <p className="text-[13px] leading-[19px] text-[#4b5563]">
                    {description}
                  </p>
                </div>

                <span className="inline-flex self-start items-center justify-center px-[22px] py-[13px] rounded-full bg-[#c2f154] text-[14px] font-bold text-[#111827] group-hover:bg-[#b8dc30] transition-colors duration-[var(--duration-hover)]">
                  Browse Stock →
                </span>
              </div>

              {/* Car cutout — right */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="" className={imageClass} />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
