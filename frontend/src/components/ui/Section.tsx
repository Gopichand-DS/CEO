import * as React from "react";
import clsx from "clsx";

type SectionSpacing = "sm" | "md" | "lg" | "xl" | "none";

type SectionTag =
  | "section"
  | "div"
  | "article"
  | "aside"
  | "main"
  | "header"
  | "footer";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: SectionSpacing;
  as?: SectionTag;
}

const spacingStyles: Record<SectionSpacing, string> = {
  none: "",
  sm: "py-12 lg:py-16",
  md: "py-16 lg:py-20",
  lg: "py-20 lg:py-28",
  xl: "py-24 lg:py-32",
};

export default function Section({
  as: Component = "section",
  spacing = "lg",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Component
      className={clsx(
        "relative w-full",
        spacingStyles[spacing],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}