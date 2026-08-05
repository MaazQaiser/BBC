import { ShieldAlert, Calendar, Video, FileCheck, type LucideIcon } from "lucide-react";

const FEATURES: {
  icon: LucideIcon;
  title: string;
  body: string;
}[] = [
  {
    icon:  ShieldAlert,
    title: "Faults clearly listed",
    body:  "Every known issue is described and photographed before you visit.",
  },
  {
    icon:  Calendar,
    title: "Full MOT history",
    body:  "MOT records and advisories shown alongside each vehicle.",
  },
  {
    icon:  Video,
    title: "Video walkaround",
    body:  "Narrated walkaround and cold start video where available.",
  },
  {
    icon:  FileCheck,
    title: "Service records",
    body:  "Service history noted on every listing where records exist.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-16 lg:py-24 bg-white" aria-labelledby="why-heading">
      <div className="max-w-[1280px] mx-auto px-[64px]">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 rounded-[var(--radius-pill)] bg-[#B8F040] text-xs font-semibold text-[var(--color-text)] shadow-[var(--shadow-sm)]">
            Why Choose Us
          </span>
          <h2
            id="why-heading"
            className="text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15] font-bold text-[var(--color-text)] tracking-tight"
          >
            An honest way to find your next car
          </h2>
        </div>

        {/* Four columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex flex-col items-center text-center">
              <div className="mb-6 text-[var(--color-text)]">
                <Icon size={52} strokeWidth={1.25} aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text)] mb-3">
                {title}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-[240px]">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
