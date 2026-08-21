import * as React from "react";
import clsx from "clsx";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export default function TextArea({
  error = false,
  className,
  ...props
}: TextAreaProps) {
  return (
    <textarea
      {...props}
      className={clsx(
        `
        min-h-32
        w-full
        rounded-xl
        border
        bg-white
        p-4
        text-sm
        text-slate-900
        placeholder:text-slate-400
        outline-none
        transition-all
        duration-300
        resize-none
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
    />
  );
}