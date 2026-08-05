import type { ElementType, HTMLAttributes } from "react";

export interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  /** Vertical padding preset.
   *  section = 120px (spec standard section spacing)
   *  xl      = 80px
   *  lg      = 64px
   *  md      = 40px
   *  sm      = 24px
   */
  py?: "section" | "xl" | "lg" | "md" | "sm";
  /** Background preset */
  bg?: "default" | "surface" | "secondary" | "none";
  /** Draw a top border between sections */
  bordered?: boolean;
  /** HTML element to render (semantic) */
  as?: ElementType;
}

const PY: Record<NonNullable<SectionWrapperProps["py"]>, string> = {
  section: "py-16 lg:py-20 xl:py-[7.5rem]",  /* 64px → 80px → 120px */
  xl:      "py-12 lg:py-16 xl:py-20",          /* 48px → 64px → 80px  */
  lg:      "py-10 lg:py-12 xl:py-16",          /* 40px → 48px → 64px  */
  md:      "py-8  lg:py-10",                   /* 32px → 40px          */
  sm:      "py-5  lg:py-6",                    /* 20px → 24px          */
};

const BG: Record<NonNullable<SectionWrapperProps["bg"]>, string> = {
  default:   "bg-[var(--color-bg)]",
  surface:   "bg-[var(--color-surface)]",
  secondary: "bg-[var(--color-surface-2)]",
  none:      "",
};

export function SectionWrapper({
  py        = "section",
  bg        = "default",
  bordered  = false,
  as: Tag   = "section",
  className = "",
  children,
  ...props
}: SectionWrapperProps) {
  return (
    <Tag
      className={[
        PY[py],
        BG[bg],
        bordered ? "border-t border-[var(--color-border)]" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </Tag>
  );
}
