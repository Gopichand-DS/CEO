import { Outlet } from "react-router-dom";

import Sidebar from "@/pages/Sidebar";
import Topbar from "@/pages/Topbar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">

      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">

        <Topbar />

        <main className="min-h-0 flex-1 overflow-y-auto">

          <div className="mx-auto max-w-[1800px] p-4 sm:p-6 lg:p-8">

            <Outlet />

          </div>

        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;