import {
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface ExecutiveMetric {
  title: string;
  value: string;
  trend: string;
  status: string;
}

interface ExecutiveMetricsProps {
  metrics: ExecutiveMetric[];
}

const ExecutiveMetrics = ({
  metrics,
}: ExecutiveMetricsProps) => {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Executive Metrics
        </h2>

        <p className="text-sm text-slate-500">
          High-level operational performance indicators.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {metrics.map((metric) => (
          <div
            key={metric.title}
            className="rounded-2xl border bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {metric.title}
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  {metric.value}
                </h3>
              </div>

              <div
                className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold ${
                  metric.status === "positive"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {metric.status === "positive" ? (
                  <ArrowUpRight size={18} />
                ) : (
                  <ArrowDownRight size={18} />
                )}

                {metric.trend}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExecutiveMetrics;