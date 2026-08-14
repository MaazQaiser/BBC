const TESTIMONIALS = [
  {
    quote:  "The condition report matched the car exactly. No surprises when I arrived.",
    name:   "James M.",
    rating: 5,
    image:  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
    quote:  "Clear MOT history and honest descriptions made the decision straightforward.",
    name:   "Sarah T.",
    rating: 5,
    image:  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&h=200&q=80",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-[var(--color-accent-muted)] text-sm">★</span>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const featured = TESTIMONIALS[0];

  return (
    <section className="py-16 lg:py-24 bg-[var(--color-surface-2)]" aria-labelledby="testimonials-heading">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-[64px]">
        <h2 id="testimonials-heading" className="text-3xl lg:text-4xl font-bold text-center text-[var(--color-text)] mb-12">
          What Our Customers Say
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
          {/* Featured */}
          <div className="flex flex-col sm:flex-row rounded-[var(--radius-3xl)] bg-white overflow-hidden shadow-[var(--shadow-card)]">
            <div className="sm:w-2/5 min-h-[200px] sm:min-h-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featured.image}
                alt=""
                className="w-full h-full object-cover min-h-[200px]"
              />
            </div>
            <div className="flex flex-col justify-center p-8">
              <Stars count={featured.rating} />
              <blockquote className="mt-4 text-lg font-medium text-[var(--color-text)] leading-relaxed">
                &ldquo;{featured.quote}&rdquo;
              </blockquote>
              <cite className="mt-4 not-italic text-sm font-semibold text-[var(--color-text-muted)]">
                — {featured.name}
              </cite>
            </div>
          </div>

          {/* Secondary cards */}
          <div className="space-y-4">
            {TESTIMONIALS.slice(1).map(({ quote, name, rating }) => (
              <div key={name} className="rounded-[var(--radius-3xl)] bg-white p-6 shadow-[var(--shadow-card)]">
                <Stars count={rating} />
                <p className="mt-3 text-sm text-[var(--color-text-body)] leading-relaxed">&ldquo;{quote}&rdquo;</p>
                <p className="mt-3 text-sm font-semibold text-[var(--color-text-muted)]">— {name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
