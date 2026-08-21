import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { RevenueChartItem } from "@/types/dashboard";

interface Props {
  data: RevenueChartItem[];
}

const RevenueChart = ({
  data,
}: Props) => {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-xl font-bold">
          Revenue Analytics
        </h2>

        <p className="text-sm text-slate-500">
          Monthly revenue and profit
        </p>
      </div>

      {data.length === 0 ? (
        <div className="flex h-[350px] items-center justify-center rounded-xl bg-slate-50">
          <div className="text-center">
            <p className="font-medium text-slate-600">
              No revenue data available
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Revenue analytics will appear here when
              financial transactions are recorded.
            </p>
          </div>
        </div>
      ) : (
        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <AreaChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="month"
            />

            <YAxis />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              fill="#93c5fd"
            />

            <Area
              type="monotone"
              dataKey="profit"
              stroke="#16a34a"
              fill="#86efac"
            />

          </AreaChart>
        </ResponsiveContainer>
      )}

    </div>
  );
};

export default RevenueChart;