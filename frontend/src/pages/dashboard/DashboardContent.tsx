import type { DashboardOverview } from "@/types/dashboard";

import DashboardHeader from "./DashboardHeader";

import KPIGrid from "./kpi/KPIGrid";
import ExecutiveMetrics from "./executive/ExecutiveMetrics";

import CompanyHealth from "./CompanyHealth/CompanyHealth";
import DepartmentPerformance from "./DepartmentPerformance/DepartmentPerformance";
import ProjectStatus from "./ProjectStatus/ProjectStatus";
import EmployeeOverview from "./EmployeeOverview/EmployeeOverview";

import RevenueChart from "./RevenueChart/RevenueChart";
import RecentActivities from "./RecentActivities/RecentActivities";
import CriticalAlerts from "./CriticalAlerts/CriticalAlerts";
import PendingApprovals from "./PendingApprovals/PendingApprovals";
import QuickActions from "./QuickActions/QuickActions";

import AIExecutiveSummary from "./ai/AIExecutiveSummary";

interface DashboardContentProps {
  dashboard: DashboardOverview;
}

const DashboardContent = ({
  dashboard,
}: DashboardContentProps) => {
  return (
    <div className="space-y-6">

      {/* --------------------------------------------- */}
      {/* HEADER */}
      {/* --------------------------------------------- */}

      <DashboardHeader />

      {/* --------------------------------------------- */}
      {/* KPI CARDS */}
      {/* --------------------------------------------- */}

      <KPIGrid
        kpis={dashboard.kpis}
      />

      {/* --------------------------------------------- */}
      {/* EXECUTIVE METRICS */}
      {/* --------------------------------------------- */}

      <ExecutiveMetrics
        metrics={dashboard.executive_metrics}
      />

      {/* --------------------------------------------- */}
      {/* COMPANY HEALTH */}
      {/* --------------------------------------------- */}

      <CompanyHealth
        health={dashboard.company_health}
      />

      {/* --------------------------------------------- */}
      {/* REVENUE ANALYTICS */}
      {/* --------------------------------------------- */}

      <RevenueChart
        data={dashboard.revenue_chart}
      />

      {/* --------------------------------------------- */}
      {/* DEPARTMENT + PROJECT */}
      {/* --------------------------------------------- */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <DepartmentPerformance
          departments={dashboard.department_performance}
        />

        <ProjectStatus
          projects={dashboard.project_status}
        />

      </div>

      {/* --------------------------------------------- */}
      {/* EMPLOYEE OVERVIEW */}
      {/* --------------------------------------------- */}

      <EmployeeOverview
        overview={dashboard.employee_overview}
      />

      {/* --------------------------------------------- */}
      {/* ACTIVITIES + ALERTS */}
      {/* --------------------------------------------- */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <RecentActivities
          activities={dashboard.activities}
        />

        <CriticalAlerts
          alerts={dashboard.alerts}
        />

      </div>

      {/* --------------------------------------------- */}
      {/* APPROVALS + QUICK ACTIONS */}
      {/* --------------------------------------------- */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <PendingApprovals
          approvals={dashboard.approvals}
        />

        <QuickActions />

      </div>

      {/* --------------------------------------------- */}
      {/* AI EXECUTIVE SUMMARY */}
      {/* --------------------------------------------- */}

      <AIExecutiveSummary
        summary={dashboard.ai_summary}
      />

    </div>
  );
};

export default DashboardContent;