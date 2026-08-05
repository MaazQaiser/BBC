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
 * Side padding: 64px.
 * Max-width centres content on large screens.
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
        "w-full mx-auto",
        "px-[64px]",
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
