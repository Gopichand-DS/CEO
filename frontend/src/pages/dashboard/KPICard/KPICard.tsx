import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import type { KPI } from "./types";

interface Props {
  item: KPI;
}

const KPICard = ({ item }: Props) => {
  const Icon = item.icon;

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div className="rounded-xl bg-blue-100 p-3">
          <Icon
            size={24}
            className="text-blue-600"
          />
        </div>

        <div
          className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
            item.trend === "up"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {item.trend === "up" ? (
            <ArrowUpRight size={14} />
          ) : (
            <ArrowDownRight size={14} />
          )}

          {item.change}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm text-slate-500">
          {item.title}
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          {item.value}
        </h2>
      </div>
    </div>
  );
};

export default KPICard;