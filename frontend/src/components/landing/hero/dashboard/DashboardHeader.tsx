import { BrainCircuit, Activity } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 pb-5">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600">
          <BrainCircuit className="h-5 w-5 text-white" />
        </div>

        <div>
          <h3 className="font-bold text-slate-900">
            Mini CEO
          </h3>

          <p className="text-xs text-slate-500">
            Executive Intelligence
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1">
        <Activity className="h-4 w-4 text-emerald-600" />

        <span className="text-xs font-semibold text-emerald-700">
          LIVE
        </span>
      </div>
    </div>
  );
}