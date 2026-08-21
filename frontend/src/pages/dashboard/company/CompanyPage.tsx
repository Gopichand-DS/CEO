import {
  Building2,
  RefreshCw,
} from "lucide-react";

import { useCompanyAnalytics } from "./hooks/useCompanyAnalytics";
import ProjectAnalyticsChart from "./components/ProjectAnalyticsChart";
import TaskAnalyticsChart from "./components/TaskAnalyticsChart";
import EmployeeAnalyticsChart from "./components/EmployeeAnalyticsChart";
import WorkflowAnalyticsChart from "./components/WorkflowAnalyticsChart";
import CompanyHealthChart from "./components/CompanyHealthChart";

const CompanyPage = () => {
  const {
    data,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useCompanyAnalytics();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="font-medium text-slate-700">
            Loading company analytics...
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Preparing your company's performance data.
          </p>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <Building2
          className="mx-auto mb-3 text-red-500"
          size={32}
        />

        <h2 className="font-semibold text-red-700">
          Unable to load company analytics
        </h2>

        <p className="mt-1 text-sm text-red-600">
          There was a problem retrieving your company data.
        </p>

        <button
          type="button"
          onClick={() => refetch()}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      </div>
    );
  }

  const {
    company,
    report,
  } = data;

  const {
    kpis,
    projects,
    tasks,
    employees,
    workflows,
  } = report.analytics;

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-indigo-100 p-3">
            <Building2
              className="text-indigo-600"
              size={24}
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {company.name}
            </h1>

            <p className="text-sm text-slate-500">
              {company.industry || "Industry not specified"}
              {" • "}
              {company.country || "Country not specified"}
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            size={17}
            className={
              isFetching
                ? "animate-spin"
                : ""
            }
          />

          {isFetching
            ? "Refreshing..."
            : "Refresh"}
        </button>

      </div>

      {/* KPI section */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Revenue
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            ₹{kpis.revenue.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Profit
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            ₹{kpis.profit.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Active Projects
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {kpis.active_projects}
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Employees
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {kpis.active_employees}
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Completed Tasks
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {kpis.completed_tasks}
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Company Health
          </p>

          <p className="mt-2 text-2xl font-bold text-indigo-600">
            {kpis.company_health}%
          </p>
        </div>

      </div>

      {/* Temporary analytics data verification */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">

        <h2 className="text-lg font-bold text-slate-900">
          Analytics Data
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Charts will be added here next.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">
              Projects
            </p>

            <p className="mt-1 font-semibold">
              {projects.total_projects} total
            </p>

            <p className="text-sm text-slate-500">
              {projects.completed_projects} completed
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">
              Tasks
            </p>

            <p className="mt-1 font-semibold">
              {tasks.total_tasks} total
            </p>

            <p className="text-sm text-slate-500">
              {tasks.completion_percentage}% completed
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">
              Employees
            </p>

            <p className="mt-1 font-semibold">
              {employees.total_employees} total
            </p>

            <p className="text-sm text-slate-500">
              {employees.employee_utilization}% utilization
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">
              Workflows
            </p>

            <p className="mt-1 font-semibold">
              {workflows.total_workflows} total
            </p>

            <p className="text-sm text-slate-500">
              {workflows.workflow_health_score}% health
            </p>
          </div>

        </div>

      </div>
            <ProjectAnalyticsChart
              projects={projects}
            />

            <TaskAnalyticsChart
              tasks={tasks}
            />

            <EmployeeAnalyticsChart
              employees={employees}
            />

            <WorkflowAnalyticsChart
              workflows={workflows}
            />

            <div className="grid gap-6 xl:grid-cols-2">

  <CompanyHealthChart
    health={kpis.company_health}
  />

  <div className="rounded-2xl border bg-white p-6 shadow-sm">

    <h2 className="text-lg font-bold text-slate-900">
      Company Performance Summary
    </h2>

    <p className="mt-1 text-sm text-slate-500">
      Key performance indicators across the organization.
    </p>

    <div className="mt-6 space-y-5">

      <div>
        <div className="mb-2 flex justify-between">
          <span className="text-sm font-medium text-slate-600">
            Project Completion
          </span>

          <span className="text-sm font-semibold text-slate-900">
            {projects.completion_rate}%
          </span>
        </div>

        <div className="h-3 rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-indigo-600"
            style={{
              width: `${Math.min(
                100,
                projects.completion_rate,
              )}%`,
            }}
          />
        </div>
      </div>

      <div>
        <div className="mb-2 flex justify-between">
          <span className="text-sm font-medium text-slate-600">
            Task Completion
          </span>

          <span className="text-sm font-semibold text-slate-900">
            {tasks.completion_percentage}%
          </span>
        </div>

        <div className="h-3 rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-indigo-600"
            style={{
              width: `${Math.min(
                100,
                tasks.completion_percentage,
              )}%`,
            }}
          />
        </div>
      </div>

      <div>
        <div className="mb-2 flex justify-between">
          <span className="text-sm font-medium text-slate-600">
            Employee Utilization
          </span>

          <span className="text-sm font-semibold text-slate-900">
            {employees.employee_utilization}%
          </span>
        </div>

        <div className="h-3 rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-indigo-600"
            style={{
              width: `${Math.min(
                100,
                employees.employee_utilization,
              )}%`,
            }}
          />
        </div>
      </div>

      <div>
        <div className="mb-2 flex justify-between">
          <span className="text-sm font-medium text-slate-600">
            Workflow Health
          </span>

          <span className="text-sm font-semibold text-slate-900">
            {workflows.workflow_health_score}%
          </span>
        </div>

        <div className="h-3 rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-indigo-600"
            style={{
              width: `${Math.min(
                100,
                workflows.workflow_health_score,
              )}%`,
            }}
          />
        </div>
      </div>

    </div>

  </div>

</div>

    </div>

    
  );
};

export default CompanyPage;