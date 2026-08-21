import { AlertCircle, AlertTriangle, CheckCircle2 } from "lucide-react";

import DashboardCard from "./DashboardCard";
import { recommendations } from "./dashboardData";

export default function AIRecommendations() {
  return (
    <DashboardCard title="AI Recommendations">
      <div className="space-y-4">
        {recommendations.map((item) => {
          const icon =
            item.priority === "High" ? (
              <AlertCircle className="h-5 w-5 text-red-500" />
            ) : item.priority === "Medium" ? (
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            ) : (
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            );

          return (
            <div
              key={item.text}
              className="flex items-start gap-3 rounded-xl bg-slate-50 p-3"
            >
              {icon}

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {item.priority} Priority
                </p>

                <p className="mt-1 text-sm text-slate-600">
                  {item.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardCard>
  );
}