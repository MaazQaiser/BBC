"use client";

import { YardLocationContent } from "@/components/site/YardLocationContent";

export function LocationSection({ embedded = false }: { embedded?: boolean }) {
  const body = (
    <YardLocationContent showOpenStatus showTravelTimes contactActions="directions" />
  );

  if (embedded) return body;

  return (
    <section aria-labelledby="location-heading">
      <h2 id="location-heading" className="type-h3 mb-4">
        Where we are
      </h2>
      {body}
    </section>
  );
}
