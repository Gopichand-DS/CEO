import DashboardHeader from "./DashboardHeader";
import ExecutiveGreeting from "./ExecutiveGreeting";
import DepartmentHealth from "./DepartmentHealth";
import ExecutiveScore from "./ExecutiveScore";
import AIRecommendations from "./AIRecommendations";
import RevenueChart from "./RevenueChart";
import LiveActivity from "./LiveActivity";

export default function HeroDashboard() {
  return (
    <div
      className="
        w-full
        max-w-2xl
        rounded-[32px]
        border
        border-slate-200
        bg-white/90
        p-6
        shadow-2xl
        backdrop-blur-xl
        transition-all
        duration-500
        hover:-translate-y-2
        hover:shadow-[0_30px_80px_rgba(79,70,229,0.15)]
      "
    >
      <DashboardHeader />

      <div className="mt-6 space-y-5">
        <ExecutiveGreeting />

        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12 lg:col-span-7">
            <DepartmentHealth />
          </div>

          <div className="col-span-12 lg:col-span-5">
            <ExecutiveScore />
          </div>

          <div className="col-span-12">
            <AIRecommendations />
          </div>

          <div className="col-span-12">
            <RevenueChart />
          </div>

          <div className="col-span-12">
            <LiveActivity />
          </div>
        </div>
      </div>
    </div>
  );
}