import * as React from "react";
import clsx from "clsx";

type CardVariant =
  | "default"
  | "glass"
  | "outlined"
  | "filled";

type CardPadding =
  | "none"
  | "sm"
  | "md"
  | "lg";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  hover?: boolean;
}

const variantStyles: Record<CardVariant, string> = {
  default:
    "border border-slate-200 bg-white shadow-sm",

  glass:
    "border border-white/30 bg-white/70 backdrop-blur-xl shadow-xl",

  outlined:
    "border border-slate-300 bg-white",

  filled:
    "bg-slate-50 border border-slate-100",
};

const paddingStyles: Record<CardPadding, string> = {
  none: "",

  sm: "p-4",

  md: "p-6",

  lg: "p-8",
};

export default function Card({
  variant = "default",
  padding = "md",
  hover = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-3xl transition-all duration-300",
        variantStyles[variant],
        paddingStyles[padding],

        hover &&
          "hover:-translate-y-1 hover:shadow-2xl hover:border-indigo-200",

        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}