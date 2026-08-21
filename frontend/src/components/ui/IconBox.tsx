import * as React from "react";
import clsx from "clsx";

type IconBoxVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "glass";

type IconBoxSize =
  | "sm"
  | "md"
  | "lg";

interface IconBoxProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: IconBoxVariant;
  size?: IconBoxSize;
}

const variantStyles: Record<IconBoxVariant, string> = {
  primary:
    "bg-indigo-100 text-indigo-600 border border-indigo-200",

  secondary:
    "bg-slate-100 text-slate-700 border border-slate-200",

  success:
    "bg-emerald-100 text-emerald-600 border border-emerald-200",

  warning:
    "bg-amber-100 text-amber-600 border border-amber-200",

  danger:
    "bg-red-100 text-red-600 border border-red-200",

  glass:
    "bg-white/70 backdrop-blur-xl border border-white/40 text-slate-900 shadow-lg",
};

const sizeStyles: Record<IconBoxSize, string> = {
  sm: "h-10 w-10 text-lg",

  md: "h-14 w-14 text-2xl",

  lg: "h-16 w-16 text-3xl",
};

export default function IconBox({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: IconBoxProps) {
  return (
    <div
      className={clsx(
        "inline-flex items-center justify-center rounded-2xl transition-all duration-300",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}