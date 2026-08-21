import {
  ArrowUpRight,
  ArrowDownRight,
  BriefcaseBusiness,
} from "lucide-react";

import type {
  ExecutiveMetric,
} from "@/types/dashboard";

interface Props {
  metrics: ExecutiveMetric[];
}

const ExecutiveSummary = ({
  metrics,
}: Props) => {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm h-full">

      <div className="mb-6 flex items-center gap-3">

        <BriefcaseBusiness
          className="text-indigo-600"
        />

        <div>

          <h2 className="text-xl font-bold">
            Executive Summary
          </h2>

          <p className="text-sm text-slate-500">
            Key business indicators
          </p>

        </div>

      </div>

      <div className="space-y-5">

        {metrics.map((metric) => (

          <div
            key={metric.title}
            className="flex items-center justify-between rounded-xl border border-slate-100 p-4 transition hover:bg-slate-50"
          >

            <div>

              <h3 className="font-semibold">
                {metric.title}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {metric.value}
              </p>

            </div>

            <div
              className={`flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${
                metric.status === "positive"
                  ? "bg-green-100 text-green-700"
                  : metric.status === "warning"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >

              {metric.status === "positive" ? (
                <ArrowUpRight size={16} />
              ) : (
                <ArrowDownRight size={16} />
              )}

              {metric.trend}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default ExecutiveSummary;