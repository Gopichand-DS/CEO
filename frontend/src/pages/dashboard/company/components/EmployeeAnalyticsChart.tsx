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
  employees: ExecutiveAnalytics["employees"];
}

const EmployeeAnalyticsChart = ({
  employees,
}: Props) => {
  const data = [
    {
      name: "Active",
      value: employees.active_employees,
    },
    {
      name: "Inactive",
      value: employees.inactive_employees,
    },
    {
      name: "New",
      value: employees.new_employees,
    },
  ];

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900">
          Workforce Overview
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Current employee distribution and workforce utilization.
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

      <div className="mt-4 grid grid-cols-2 gap-4 border-t pt-4">

        <div>
          <p className="text-xs text-slate-500">
            Total Employees
          </p>

          <p className="mt-1 font-semibold text-slate-900">
            {employees.total_employees}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">
            Utilization
          </p>

          <p className="mt-1 font-semibold text-slate-900">
            {employees.employee_utilization}%
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">
            New Employees
          </p>

          <p className="mt-1 font-semibold text-slate-900">
            {employees.new_employees}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">
            Average Salary
          </p>

          <p className="mt-1 font-semibold text-slate-900">
            ₹{employees.average_salary.toLocaleString("en-IN")}
          </p>
        </div>

      </div>

    </div>
  );
};

export default EmployeeAnalyticsChart;