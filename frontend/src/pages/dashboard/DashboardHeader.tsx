import { CalendarDays } from "lucide-react";

import { useAuthStore } from "@/features/auth/store/auth.store";

const DashboardHeader = () => {
  const user = useAuthStore(
    (state) => state.user
  );

  const today = new Date().toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const firstName =
    user?.full_name?.trim().split(" ")[0] || "there";

  return (
    <section className="flex flex-col justify-between gap-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white lg:flex-row lg:items-center lg:items-center">

      <div>

        <p className="text-sm uppercase tracking-widest text-blue-100">
          Executive Dashboard
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Welcome back, {firstName} 👋
        </h1>

        <p className="mt-3 max-w-2xl text-blue-100">
          Here's a quick overview of today's company
          performance. AI insights and business metrics
          will appear below.
        </p>

      </div>

      <div className="flex items-center gap-3 rounded-xl bg-white/10 px-5 py-4 backdrop-blur">

        <CalendarDays size={22} />

        <span className="font-medium">
          {today}
        </span>

      </div>

    </section>
  );
};

export default DashboardHeader;