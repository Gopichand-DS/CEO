import * as React from "react";
import clsx from "clsx";

type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "outline";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary:
    "bg-indigo-100 text-indigo-700 border border-indigo-200",

  secondary:
    "bg-slate-100 text-slate-700 border border-slate-200",

  success:
    "bg-emerald-100 text-emerald-700 border border-emerald-200",

  warning:
    "bg-amber-100 text-amber-700 border border-amber-200",

  danger:
    "bg-red-100 text-red-700 border border-red-200",

  outline:
    "border border-slate-300 bg-white text-slate-700",
};

export default function Badge({
  variant = "primary",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <div
      className={clsx(
        "inline-flex items-center justify-center rounded-full px-4 py-1.5 text-sm font-semibold tracking-wide",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}