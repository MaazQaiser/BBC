import { Check } from "lucide-react";
import { formatPrice } from "@/lib/filters";

interface PriceIncludedSectionProps {
  price:          number;
  whatsIncluded:  string[];
}

export function PriceIncludedSection({ price, whatsIncluded }: PriceIncludedSectionProps) {
  return (
    <section aria-labelledby="price-heading" className="space-y-5">
      <div>
        <h2 id="price-heading" className="type-h3 mb-1">Price &amp; What&apos;s Included</h2>
        <p className="num text-4xl font-bold text-[var(--color-text)] tracking-tight">
          {formatPrice(price)}
        </p>
        <p className="type-small text-[var(--color-text-muted)] mt-1">No hidden fees</p>
      </div>

      <ul className="space-y-2.5">
        {whatsIncluded.map((item) => (
          <li key={item} className="flex items-start gap-2.5 type-small text-[var(--color-text)]">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#B8F040] shrink-0 mt-0.5">
              <Check size={12} className="text-[var(--color-text)]" strokeWidth={3} aria-hidden="true" />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
