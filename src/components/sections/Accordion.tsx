"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export interface AccordionItem {
  id:       string;
  trigger:  ReactNode;
  content:  ReactNode;
}

export interface AccordionProps {
  items:        AccordionItem[];
  defaultOpen?: string[];
  multiple?:    boolean;
  className?:   string;
}

/**
 * Accessible accordion. Supports single or multi-open mode.
 * Used for FAQ, filter groups, etc.
 */
export function Accordion({
  items,
  defaultOpen = [],
  multiple    = false,
  className   = "",
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpen);

  const toggle = (id: string) => {
    if (multiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div
      className={["divide-y divide-[var(--color-border)]", className].join(" ")}
    >
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
              id={`accordion-trigger-${item.id}`}
              className="w-full flex items-center justify-between gap-3 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] rounded-[var(--radius-sm)]"
            >
              <span className="type-small font-medium text-[var(--color-text)] flex-1">
                {item.trigger}
              </span>
              <ChevronDown
                size={16}
                className={[
                  "shrink-0 text-[var(--color-text-muted)] transition-transform duration-[var(--duration-base)]",
                  isOpen ? "rotate-180" : "",
                ].join(" ")}
                aria-hidden="true"
              />
            </button>

            <div
              id={`accordion-content-${item.id}`}
              role="region"
              aria-labelledby={`accordion-trigger-${item.id}`}
              hidden={!isOpen}
              className="pb-4"
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
