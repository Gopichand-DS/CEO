import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import type { ExecutiveAnalytics } from "@/pages/dashboard/reports/types/report";

interface Props {
  projects: ExecutiveAnalytics["projects"];
}

const ProjectAnalyticsChart = ({
  projects,
}: Props) => {
  const data = [
    {
      name: "Total",
      value: projects.total_projects,
    },
    {
      name: "Active",
      value: projects.active_projects,
    },
    {
      name: "Completed",
      value: projects.completed_projects,
    },
    {
      name: "Planned",
      value: projects.planned_projects,
    },
    {
      name: "Delayed",
      value: projects.delayed_projects,
    },
    {
      name: "High Risk",
      value: projects.high_risk_projects,
    },
  ];

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900">
          Project Performance
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Current project distribution across the company.
        </p>
      </div>

      <div className="h-[320px] w-full">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 10,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              cursor={{
                fill: "rgba(148, 163, 184, 0.08)",
              }}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            />

            <Bar
              dataKey="value"
              fill="#4f46e5"
              radius={[6, 6, 0, 0]}
              maxBarSize={48}
            />
          </BarChart>
        </ResponsiveContainer>

      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 border-t pt-4 sm:grid-cols-4">

        <div>
          <p className="text-xs text-slate-500">
            Completion Rate
          </p>

          <p className="mt-1 font-semibold text-slate-900">
            {projects.completion_rate}%
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">
            Average Progress
          </p>

          <p className="mt-1 font-semibold text-slate-900">
            {projects.average_progress}%
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">
            Overdue
          </p>

          <p className="mt-1 font-semibold text-slate-900">
            {projects.overdue_percentage}%
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">
            High Risk
          </p>

          <p className="mt-1 font-semibold text-red-600">
            {projects.high_risk_projects}
          </p>
        </div>

      </div>

    </div>
  );
};

export default ProjectAnalyticsChart;