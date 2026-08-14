import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items:      BreadcrumbItem[];
  className?: string;
}

/**
 * Minimal breadcrumb. Current page is always last with no href.
 */
export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={["flex items-center gap-1 flex-wrap", className].join(" ")}
    >
      <ol className="flex items-center gap-1 flex-wrap list-none p-0 m-0">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1">
              {isLast ? (
                <span
                  className="type-small text-[var(--color-text-muted)] break-words [overflow-wrap:anywhere] max-w-[16rem] sm:max-w-none"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <>
                  <Link
                    href={item.href ?? "#"}
                    className="type-small text-[var(--color-text-faint)] hover:text-[var(--color-text)] transition-colors"
                  >
                    {item.label}
                  </Link>
                  <ChevronRight
                    size={13}
                    className="text-[var(--color-text-faint)]"
                    aria-hidden="true"
                  />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
