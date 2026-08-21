import DashboardCard from "./DashboardCard";
import { departments } from "./dashboardData";

export default function DepartmentHealth() {
  return (
    <DashboardCard title="Department Health">
      <div className="space-y-4">
        {departments.map((department) => (
          <div key={department.name}>
            <div className="mb-2 flex justify-between">
              <span className="text-sm text-slate-600">
                {department.name}
              </span>

              <span className="text-sm font-semibold text-slate-900">
                {department.value}%
              </span>
            </div>

            <div className="h-2 rounded-full bg-slate-200">
              <div
                className="h-2 rounded-full bg-indigo-600"
                style={{
                  width: `${department.value}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}