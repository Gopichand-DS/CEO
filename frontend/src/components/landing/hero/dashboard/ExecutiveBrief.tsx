import DashboardCard from "./DashboardCard";
import { executiveBrief } from "./dashboardData";

export default function ExecutiveBrief() {
  return (
    <DashboardCard title="Today's Executive Brief">
      <div className="space-y-3">
        {executiveBrief.map((item) => (
          <div
            key={item.title}
            className="flex items-center justify-between"
          >
            <span className="text-sm text-slate-600">
              {item.title}
            </span>

            <span className="font-semibold text-slate-900">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}