import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CircleArrowButtonProps {
  href:       string;
  label?:     string;
  className?: string;
}

/** LUXED-style green circular arrow CTA */
export function CircleArrowButton({ href, label = "View", className = "" }: CircleArrowButtonProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={[
        "inline-flex items-center justify-center",
        "w-10 h-10 rounded-full",
        "bg-[var(--color-accent)] text-white",
        "hover:bg-[var(--color-accent-hover)]",
        "transition-colors duration-[var(--duration-hover)]",
        className,
      ].join(" ")}
    >
      <ArrowRight size={18} strokeWidth={2} />
    </Link>
  );
}
