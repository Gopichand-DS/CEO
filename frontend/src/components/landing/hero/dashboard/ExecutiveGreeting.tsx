import { Clock3 } from "lucide-react";

export default function ExecutiveGreeting() {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div>
        <h3 className="text-xl font-bold text-slate-900">
          Good Morning, CEO 👋
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Here's your executive summary for today.
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm">
        <Clock3 className="h-4 w-4 text-indigo-600" />

        <span className="text-sm font-medium text-slate-700">
          09:30 AM
        </span>
      </div>
    </div>
  );
}