import type { HTMLAttributes } from "react";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** page = max-w-[1440px] | content = max-w-[1280px] | narrow = max-w-[680px] */
  width?: "page" | "content" | "narrow";
}

const WIDTH = {
  page:    "max-w-[1440px]",
  content: "max-w-[1280px]",  /* spec: content width 1280px */
  narrow:  "max-w-[680px]",
};

/**
 * The universal page container.
 * Responsive side padding: 20px mobile → 64px desktop.
 */
export function Container({
  width     = "content",
  className = "",
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={[
        "box-border w-full mx-auto min-w-0 max-w-full",
        "pl-[max(1.25rem,env(safe-area-inset-left))]",
        "pr-[max(1.25rem,env(safe-area-inset-right))]",
        "sm:pl-8 sm:pr-8 lg:px-[64px]",
        WIDTH[width],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
