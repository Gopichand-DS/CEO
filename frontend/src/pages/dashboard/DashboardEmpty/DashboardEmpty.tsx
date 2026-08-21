import { DatabaseZap } from "lucide-react";

const DashboardEmpty = () => {
  return (
    <div className="flex h-[500px] flex-col items-center justify-center rounded-2xl border border-dashed bg-white">

      <DatabaseZap
        size={70}
        className="text-slate-400"
      />

      <h2 className="mt-6 text-2xl font-bold">
        No Dashboard Data
      </h2>

      <p className="mt-3 max-w-md text-center text-slate-500">
        Dashboard data will appear here once your company
        starts generating projects, employees, revenue
        and business activities.
      </p>

    </div>
  );
};

export default DashboardEmpty;