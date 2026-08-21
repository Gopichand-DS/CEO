import type { ReactNode } from "react";

interface DashboardSectionProps {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}

const DashboardSection = ({
  title,
  description,
  action,
  children,
}: DashboardSectionProps) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {(title || description || action) && (
        <div className="flex flex-col gap-4 border-b border-slate-100 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            {title && (
              <h2 className="text-xl font-semibold text-slate-900">
                {title}
              </h2>
            )}

            {description && (
              <p className="mt-1 text-sm text-slate-500">
                {description}
              </p>
            )}
          </div>

          {action}
        </div>
      )}

      <div className="p-6">{children}</div>
    </section>
  );
};

export default DashboardSection;