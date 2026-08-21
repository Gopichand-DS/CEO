import {
  Activity,
  ArrowUpRight,
  Brain,
  DollarSign,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";

import { Badge, Card, Stat } from "@/components/ui";

export default function HeroDashboard() {
  return (
    <div className="relative w-full max-w-2xl">
      <Card
        variant="glass"
        className="overflow-hidden border-slate-200 backdrop-blur-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-5">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Executive Dashboard
            </p>

            <h3 className="mt-1 text-2xl font-bold text-slate-900">
              AI Business Overview
            </h3>
          </div>

          <Badge variant="success">
            Live
          </Badge>
        </div>

        {/* KPI Cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Stat
            label="Today's Revenue"
            value="$248K"
            trend={{
              value: "+12.8%",
              positive: true,
            }}
          />

          <Stat
            label="Active Projects"
            value="42"
            trend={{
              value: "+6",
              positive: true,
            }}
          />
        </div>

        {/* AI Investigation */}
        <div className="mt-8 rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-indigo-600 p-3 text-white">
              <Brain className="h-5 w-5" />
            </div>

            <div className="flex-1">
              <h4 className="font-semibold text-slate-900">
                AI Investigation
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Revenue decreased by 8% in the South Region due to delayed
                deliveries and lower weekend conversions. AI recommends
                reallocating inventory and increasing logistics capacity.
              </p>
            </div>
          </div>
        </div>

        {/* Executive Insights */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-emerald-600" />

              <span className="font-medium text-slate-700">
                Revenue Growth
              </span>
            </div>

            <div className="flex items-center gap-1 font-semibold text-emerald-600">
              <TrendingUp className="h-4 w-4" />

              18%
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <Activity className="h-5 w-5 text-blue-600" />

              <span className="font-medium text-slate-700">
                Operations
              </span>
            </div>

            <span className="font-semibold text-blue-600">
              Stable
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <TriangleAlert className="h-5 w-5 text-amber-500" />

              <span className="font-medium text-slate-700">
                Risk Alerts
              </span>
            </div>

            <div className="flex items-center gap-1 font-semibold text-amber-600">
              3

              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}