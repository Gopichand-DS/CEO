import { Sparkles } from "lucide-react";

import DashboardCard from "./DashboardCard";

const brief = [
  "Revenue increased by 18.2% driven by enterprise renewals.",
  "North Region exceeded quarterly sales target by 12%.",
  "Inventory for Product X is projected to fall below threshold in 5 days.",
  "Three projects require executive attention this week.",
];

export default function AIBrief() {
  return (
    <DashboardCard title="AI Executive Brief">
      <div className="space-y-4">
        {brief.map((item) => (
          <div
            key={item}
            className="flex items-start gap-3"
          >
            <Sparkles className="mt-1 h-4 w-4 shrink-0 text-indigo-600" />

            <p className="text-sm leading-6 text-slate-600">
              {item}
            </p>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}