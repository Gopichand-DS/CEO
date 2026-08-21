import type { ReactNode } from "react";

interface DashboardCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function DashboardCard({
  title,
  children,
  className = "",
}: DashboardCardProps) {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        ${className}
      `}
    >
      {title && (
        <h4 className="mb-4 text-sm font-semibold text-slate-500 uppercase tracking-wide">
          {title}
        </h4>
      )}

      {children}
    </div>
  );
}