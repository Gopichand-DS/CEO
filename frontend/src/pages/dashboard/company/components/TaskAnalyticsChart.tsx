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
  tasks: ExecutiveAnalytics["tasks"];
}

const TaskAnalyticsChart = ({
  tasks,
}: Props) => {
  const data = [
    {
      name: "Pending",
      value: tasks.pending_tasks,
    },
    {
      name: "In Progress",
      value: tasks.in_progress_tasks,
    },
    {
      name: "In Review",
      value: tasks.in_review_tasks,
    },
    {
      name: "Completed",
      value: tasks.completed_tasks,
    },
    {
      name: "Blocked",
      value: tasks.blocked_tasks,
    },
    {
      name: "On Hold",
      value: tasks.on_hold_tasks,
    },
    {
      name: "Cancelled",
      value: tasks.cancelled_tasks,
    },
  ];

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900">
          Task Status
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Distribution of tasks across their current status.
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
              tick={{ fontSize: 12 }}
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
              maxBarSize={42}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 border-t pt-4 sm:grid-cols-4">

        <div>
          <p className="text-xs text-slate-500">
            Total Tasks
          </p>

          <p className="mt-1 font-semibold text-slate-900">
            {tasks.total_tasks}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">
            Completion
          </p>

          <p className="mt-1 font-semibold text-slate-900">
            {tasks.completion_percentage}%
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">
            Overdue
          </p>

          <p className="mt-1 font-semibold text-slate-900">
            {tasks.overdue_percentage}%
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">
            Critical
          </p>

          <p className="mt-1 font-semibold text-red-600">
            {tasks.critical_priority_tasks}
          </p>
        </div>

      </div>

    </div>
  );
};

export default TaskAnalyticsChart;