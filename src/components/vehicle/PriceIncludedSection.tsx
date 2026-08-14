import { formatPrice } from "@/lib/filters";
import { buildPriceExplanation } from "@/lib/vehicle-detail";

interface PriceIncludedSectionProps {
  price:          number;
  whatsIncluded:  string[];
}

export function PriceIncludedSection({ price, whatsIncluded }: PriceIncludedSectionProps) {
  const explanation = buildPriceExplanation();

  return (
    <section aria-labelledby="price-heading" className="space-y-4 pt-2 border-t border-[var(--color-border)]">
      <div>
        <h2 id="price-heading" className="sr-only">
          Price
        </h2>
        <p className="num text-3xl sm:text-4xl font-semibold text-[var(--color-text)] tracking-tight">
          {formatPrice(price)}
        </p>
        <p className="text-sm sm:text-base text-[var(--color-text-muted)] mt-3 leading-relaxed max-w-prose">
          {explanation}
        </p>
      </div>

      {whatsIncluded.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-[var(--color-text)] mb-2">
            What&apos;s included
          </h3>
          <ul className="space-y-1.5">
            {whatsIncluded.map((item) => (
              <li key={item} className="text-sm text-[var(--color-text-body)] leading-relaxed pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1 before:h-1 before:rounded-full before:bg-[var(--color-text-faint)]">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
