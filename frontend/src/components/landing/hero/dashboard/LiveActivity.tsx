import { CheckCircle2 } from "lucide-react";

import DashboardCard from "./DashboardCard";
import { activityFeed } from "./dashboardData";

export default function LiveActivity() {
  return (
    <DashboardCard title="Live Activity Feed">
      <div className="space-y-3">
        {activityFeed.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3"
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />

            <span className="text-sm text-slate-600">
              {item}
            </span>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}