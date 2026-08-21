import {
  AlertTriangle,
  CheckCircle2,
  FolderKanban,
  Target,
} from "lucide-react";

import type { ProjectAnalytics } from "../types/report";

interface ProjectReportProps {
  projects: ProjectAnalytics;
}

const ProjectReport = ({
  projects,
}: ProjectReportProps) => {
  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center gap-3">

        <div className="rounded-xl bg-purple-100 p-3">
          <FolderKanban
            size={22}
            className="text-purple-600"
          />
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Project Performance
          </h2>

          <p className="text-sm text-slate-500">
            Current project health and delivery performance.
          </p>
        </div>

      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">
            Total Projects
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-900">
            {projects.total_projects}
          </p>
        </div>

        <div className="rounded-xl bg-blue-50 p-4">
          <p className="text-sm text-slate-500">
            Active Projects
          </p>

          <p className="mt-1 text-2xl font-bold text-blue-700">
            {projects.active_projects}
          </p>
        </div>

        <div className="rounded-xl bg-green-50 p-4">
          <div className="flex items-center gap-2">
            <CheckCircle2
              size={16}
              className="text-green-600"
            />

            <p className="text-sm text-slate-500">
              Completed
            </p>
          </div>

          <p className="mt-1 text-2xl font-bold text-green-700">
            {projects.completed_projects}
          </p>
        </div>

        <div className="rounded-xl bg-red-50 p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle
              size={16}
              className="text-red-600"
            />

            <p className="text-sm text-slate-500">
              High Risk
            </p>
          </div>

          <p className="mt-1 text-2xl font-bold text-red-700">
            {projects.high_risk_projects}
          </p>
        </div>

      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">

        <div>
          <div className="mb-2 flex items-center justify-between">

            <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Target size={16} />
              Completion Rate
            </span>

            <span className="font-semibold text-slate-900">
              {projects.completion_rate}%
            </span>

          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-200">

            <div
              className="h-full rounded-full bg-green-500"
              style={{
                width: `${Math.min(
                  Math.max(projects.completion_rate, 0),
                  100,
                )}%`,
              }}
            />

          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">

            <span className="text-sm font-medium text-slate-700">
              Average Progress
            </span>

            <span className="font-semibold text-slate-900">
              {projects.average_progress}%
            </span>

          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-200">

            <div
              className="h-full rounded-full bg-indigo-500"
              style={{
                width: `${Math.min(
                  Math.max(projects.average_progress, 0),
                  100,
                )}%`,
              }}
            />

          </div>
        </div>

      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">

        <div className="rounded-xl border p-4">
          <p className="text-sm text-slate-500">
            Planned
          </p>

          <p className="mt-1 text-xl font-bold">
            {projects.planned_projects}
          </p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-sm text-slate-500">
            Delayed
          </p>

          <p className="mt-1 text-xl font-bold text-orange-600">
            {projects.delayed_projects}
          </p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-sm text-slate-500">
            Overdue
          </p>

          <p className="mt-1 text-xl font-bold text-red-600">
            {projects.overdue_percentage}%
          </p>
        </div>

      </div>

    </section>
  );
};

export default ProjectReport;