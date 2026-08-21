import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "navbar";

type ButtonSize =
  | "sm"
  | "md"
  | "lg"
  | "icon";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800",

  secondary:
    "bg-slate-900 text-white hover:bg-slate-800 active:bg-black",

  outline:
    "border border-slate-300 bg-white text-slate-900 hover:bg-slate-100",

  ghost:
    "bg-transparent text-slate-700 hover:bg-slate-100",

  danger:
    "bg-red-600 text-white hover:bg-red-700",

  navbar:
  "bg-white text-black border border-white shadow-md hover:bg-slate-100 hover:text-black active:bg-slate-200",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",

  md: "h-11 px-6 text-sm",

  lg: "h-12 px-8 text-base",

  icon: "h-11 w-11",
};

export default function Button({
  asChild = false,
  variant = "primary",
  size = "md",
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      className={clsx(
        "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300",
        "[&_a]:text-inherit [&_a]:no-underline",
        "[&_svg]:shrink-0",
        "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              opacity="0.25"
            />

            <path
              fill="currentColor"
              d="M22 12a10 10 0 00-10-10v4a6 6 0 016 6h4z"
            />
          </svg>

          Loading...
        </>
      ) : (
        children
      )}
    </Component>
  );
}