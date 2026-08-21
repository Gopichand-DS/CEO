import * as React from "react";
import clsx from "clsx";

interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export default function Select({
  error = false,
  className,
  children,
  ...props
}: SelectProps) {
  return (
    <select
      {...props}
      className={clsx(
        `
        h-12
        w-full
        rounded-xl
        border
        bg-white
        px-4
        text-sm
        text-slate-900
        outline-none
        transition-all
        duration-300
        `,
        error
          ? `
            border-red-500
            focus:ring-4
            focus:ring-red-100
          `
          : `
            border-slate-300
            focus:border-[#4F46E5]
            focus:ring-4
            focus:ring-indigo-100
          `,
        className
      )}
    >
      {children}
    </select>
  );
}