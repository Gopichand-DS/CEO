import * as React from "react";
import clsx from "clsx";

interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export default function Label({
  required = false,
  className,
  children,
  ...props
}: LabelProps) {
  return (
    <label
      {...props}
      className={clsx(
        `
        mb-2
        block
        text-sm
        font-semibold
        text-slate-700
        `,
        className
      )}
    >
      {children}

      {required && (
        <span className="ml-1 text-red-500">*</span>
      )}
    </label>
  );
}