import DashboardCard from "./DashboardCard";

export default function ExecutiveScore() {
  return (
    <DashboardCard title="Executive Health Score">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-5xl font-black text-emerald-600">
            92
          </p>

          <p className="mt-2 text-sm font-medium text-slate-500">
            Excellent
          </p>
        </div>

        <div className="flex h-24 w-24 items-center justify-center rounded-full border-[10px] border-emerald-500">
          <span className="text-lg font-bold text-slate-900">
            92%
          </span>
        </div>
      </div>

      <div className="mt-5 rounded-xl bg-emerald-50 p-3">
        <p className="text-sm text-emerald-700">
          Overall company performance is healthy with only minor operational risks.
        </p>
      </div>
    </DashboardCard>
  );
}