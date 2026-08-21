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
  workflows: ExecutiveAnalytics["workflows"];
}

const WorkflowAnalyticsChart = ({
  workflows,
}: Props) => {
  const data = [
    {
      name: "Pending",
      value: workflows.pending_instances,
    },
    {
      name: "Running",
      value: workflows.running_instances,
    },
    {
      name: "Completed",
      value: workflows.completed_instances,
    },
    {
      name: "Failed",
      value: workflows.failed_instances,
    },
  ];

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900">
          Workflow Health
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Current workflow execution and operational health.
        </p>
      </div>

      <div className="h-[300px] w-full">
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
              fill="#6366f1"
              radius={[6, 6, 0, 0]}
              maxBarSize={52}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 border-t pt-4 sm:grid-cols-4">

        <div>
          <p className="text-xs text-slate-500">
            Total Workflows
          </p>

          <p className="mt-1 font-semibold text-slate-900">
            {workflows.total_workflows}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">
            Instances
          </p>

          <p className="mt-1 font-semibold text-slate-900">
            {workflows.total_instances}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">
            Completion Rate
          </p>

          <p className="mt-1 font-semibold text-slate-900">
            {workflows.completion_rate}%
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">
            Failure Rate
          </p>

          <p className="mt-1 font-semibold text-red-600">
            {workflows.failure_rate}%
          </p>
        </div>

      </div>

    </div>
  );
};

export default WorkflowAnalyticsChart;