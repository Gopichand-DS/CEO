import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface Props {
  health: number;
}

const CompanyHealthChart = ({
  health,
}: Props) => {
  const safeHealth = Math.min(
    100,
    Math.max(0, health),
  );

  const data = [
    {
      name: "Health",
      value: safeHealth,
    },
    {
      name: "Remaining",
      value: 100 - safeHealth,
    },
  ];

  const getHealthLabel = () => {
    if (safeHealth >= 90) return "Excellent";
    if (safeHealth >= 75) return "Healthy";
    if (safeHealth >= 60) return "Needs Attention";
    return "Critical";
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900">
          Company Health
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Overall organizational health score.
        </p>
      </div>

      <div className="relative h-[300px] w-full">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              innerRadius={85}
              outerRadius={115}
              paddingAngle={2}
              stroke="none"
            >
              <Cell fill="#4f46e5" />
              <Cell fill="#e2e8f0" />
            </Pie>

            <Tooltip
              formatter={(value) => [
                `${value}%`,
                "Score",
              ]}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">

          <span className="text-4xl font-bold text-slate-900">
            {safeHealth}%
          </span>

          <span className="mt-1 text-sm font-medium text-slate-500">
            {getHealthLabel()}
          </span>

        </div>

      </div>

      <div className="mt-4 border-t pt-4 text-center">

        <p className="text-sm text-slate-500">
          Health score combines project, task,
          employee, and workflow performance.
        </p>

      </div>

    </div>
  );
};

export default CompanyHealthChart;