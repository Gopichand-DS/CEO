import * as React from "react";
import clsx from "clsx";

interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  description?: string;
  trend?: {
    value: string;
    positive?: boolean;
  };
}

export default function Stat({
  label,
  value,
  description,
  trend,
  className,
  ...props
}: StatProps) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg",
        className
      )}
      {...props}
    >
      <span className="text-sm font-medium uppercase tracking-wide text-slate-500">
        {label}
      </span>

      <div className="flex items-end justify-between gap-4">
        <h3 className="text-4xl font-bold tracking-tight text-slate-900">
          {value}
        </h3>

        {trend && (
          <span
            className={clsx(
              "rounded-full px-3 py-1 text-sm font-semibold",
              trend.positive
                ? "bg-emerald-100 text-emerald-700"
                : "bg-red-100 text-red-700"
            )}
          >
            {trend.value}
          </span>
        )}
      </div>

      {description && (
        <p className="text-sm leading-6 text-slate-600">
          {description}
        </p>
      )}
    </div>
  );
}