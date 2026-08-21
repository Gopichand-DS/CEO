import * as React from "react";
import clsx from "clsx";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export default function Input({
  error = false,
  className,
  ...props
}: InputProps) {
  return (
    <input
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
        placeholder:text-slate-400
        transition-all
        duration-300
        outline-none
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
        "disabled:bg-slate-100",
        className
      )}
    />
  );
}