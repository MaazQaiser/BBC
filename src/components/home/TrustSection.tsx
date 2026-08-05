import { ShieldCheck, History, Video } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    title: "Every fault is declared",
    body: "We list every condition item we find — nothing is hidden. You see the full picture before you buy.",
  },
  {
    icon: History,
    title: "Full MOT history included",
    body: "Every car comes with a complete MOT history so you can trace its life on the road.",
  },
  {
    icon: Video,
    title: "Video on every car",
    body: "Walk-around videos are filmed for every vehicle so you can inspect remotely before visiting.",
  },
] as const;

export function TrustSection() {
  return (
    <section
      aria-labelledby="trust-heading"
      className="bg-[var(--color-surface)] border-y border-[var(--color-border)] py-10 sm:py-12"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 id="trust-heading" className="sr-only">
          Why buy from BBC
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 sm:divide-x divide-[var(--color-border)]">
          {TRUST_ITEMS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="sm:px-8 first:pl-0 last:pr-0">
              <div className="w-9 h-9 rounded-[var(--radius)] bg-[var(--color-accent-light)] flex items-center justify-center text-[var(--color-accent)] mb-3">
                <Icon size={18} />
              </div>
              <p className="font-semibold text-[var(--color-text)] text-base mb-1">{title}</p>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
