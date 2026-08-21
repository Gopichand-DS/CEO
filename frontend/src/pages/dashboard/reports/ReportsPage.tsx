import { FileText, RefreshCw } from "lucide-react";

import { useExecutiveReport } from "./hooks/useExecutiveReport";
import ExecutiveSummary from "./components/ExecutiveSummary";
import ProjectReport from "./components/ProjectReport";
import TaskReport from "./components/TaskReport";
import EmployeeReport from "./components/EmployeeReport";
import ExecutiveDecisions from "./components/ExecutiveDecisions";
import WorkflowReport from "./components/WorkflowReport";

const ReportsPage = () => {
  const {
    data: report,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useExecutiveReport();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="font-medium text-slate-700">
            Generating executive report...
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Analyzing your company's current data.
          </p>
        </div>
      </div>
    );
  }

  if (isError || !report) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <FileText
          className="mx-auto mb-3 text-red-500"
          size={32}
        />

        <h2 className="font-semibold text-red-700">
          Unable to load executive report
        </h2>

        <p className="mt-1 text-sm text-red-600">
          There was a problem retrieving the latest report.
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

  return (
    <div className="space-y-8">

      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-indigo-100 p-3">
            <FileText
              className="text-indigo-600"
              size={24}
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Executive Reports
            </h1>

            <p className="text-sm text-slate-500">
              Business performance, company health, and executive insights.
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
            className={isFetching ? "animate-spin" : ""}
          />

          {isFetching
            ? "Refreshing..."
            : "Refresh Report"}
        </button>

      </div>

      {/* Report Sections */}

      <ExecutiveSummary
        report={report}
      />

      <ProjectReport
        projects={report.analytics.projects}
      />

      <TaskReport
        tasks={report.analytics.tasks}
      />

      <EmployeeReport
        employees={report.analytics.employees}
      />

      <ExecutiveDecisions
          decisions={report.decisions}
      />

      <WorkflowReport
        workflows={report.analytics.workflows}
      />

    </div>
  );
};

export default ReportsPage;