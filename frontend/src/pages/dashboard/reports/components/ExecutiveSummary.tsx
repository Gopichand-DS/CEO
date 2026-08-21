import {
  Activity,
  CheckCircle2,
  DollarSign,
  FolderKanban,
  Users,
} from "lucide-react";

import type { ExecutiveReport } from "../types/report";

interface ExecutiveSummaryProps {
  report: ExecutiveReport;
}

const ExecutiveSummary = ({
  report,
}: ExecutiveSummaryProps) => {
  const { analytics } = report;
  const { kpis } = analytics;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const cards = [
    {
      label: "Revenue",
      value: formatCurrency(kpis.revenue),
      icon: DollarSign,
      description: "Current company revenue",
      className: "bg-blue-50 text-blue-600",
    },
    {
      label: "Profit",
      value: formatCurrency(kpis.profit),
      icon: Activity,
      description: "Current company profit",
      className: "bg-green-50 text-green-600",
    },
    {
      label: "Active Projects",
      value: kpis.active_projects,
      icon: FolderKanban,
      description: "Projects currently active",
      className: "bg-purple-50 text-purple-600",
    },
    {
      label: "Active Employees",
      value: kpis.active_employees,
      icon: Users,
      description: "Currently active employees",
      className: "bg-orange-50 text-orange-600",
    },
    {
      label: "Completed Tasks",
      value: kpis.completed_tasks,
      icon: CheckCircle2,
      description: "Tasks completed",
      className: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Company Health",
      value: `${kpis.company_health}%`,
      icon: Activity,
      description: "Overall business health",
      className: "bg-indigo-50 text-indigo-600",
    },
  ];

  return (
    <div className="space-y-6">

      <div className="rounded-2xl border bg-white p-6 shadow-sm">

        <div className="flex items-start justify-between gap-4">

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Executive Summary
            </h2>

            <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600">
              {report.executive_summary}
            </p>
          </div>

          <div className="shrink-0 rounded-xl bg-slate-100 px-3 py-2 text-xs text-slate-500">
            Generated{" "}
            {new Date(report.generated_at).toLocaleString("en-IN")}
          </div>

        </div>

      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">

        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="rounded-2xl border bg-white p-5 shadow-sm"
            >

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {card.label}
                  </p>

                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    {card.value}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {card.description}
                  </p>
                </div>

                <div
                  className={`rounded-xl p-3 ${card.className}`}
                >
                  <Icon size={20} />
                </div>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default ExecutiveSummary;