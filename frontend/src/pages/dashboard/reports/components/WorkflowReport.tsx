import {
  Activity,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

import type { WorkflowAnalytics } from "../types/report";

interface WorkflowReportProps {
  workflows: WorkflowAnalytics;
}

const WorkflowReport = ({
  workflows,
}: WorkflowReportProps) => {
  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center gap-3">

        <div className="rounded-xl bg-cyan-100 p-3">
          <Activity
            size={22}
            className="text-cyan-600"
          />
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Workflow Health
          </h2>

          <p className="text-sm text-slate-500">
            Operational workflow health and execution status.
          </p>
        </div>

      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">
            Total Workflows
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-900">
            {workflows.total_workflows}
          </p>
        </div>

        <div className="rounded-xl bg-blue-50 p-4">
          <div className="flex items-center gap-2">
            <Clock3
              size={16}
              className="text-blue-600"
            />

            <p className="text-sm text-slate-500">
              Pending
            </p>
          </div>

          <p className="mt-1 text-2xl font-bold text-blue-700">
            {workflows.pending_instances}
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
            {workflows.completed_instances}
          </p>
        </div>

        <div className="rounded-xl bg-red-50 p-4">
          <div className="flex items-center gap-2">
            <XCircle
              size={16}
              className="text-red-600"
            />

            <p className="text-sm text-slate-500">
              Failed
            </p>
          </div>

          <p className="mt-1 text-2xl font-bold text-red-700">
            {workflows.failed_instances}
          </p>
        </div>

      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">

        <div className="rounded-xl border p-4">

          <p className="text-sm text-slate-500">
            Workflow Health Score
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-900">
            {workflows.workflow_health_score}%
          </p>

        </div>

        <div className="rounded-xl border p-4">

          <p className="text-sm text-slate-500">
            Completion Rate
          </p>

          <p className="mt-1 text-2xl font-bold text-green-600">
            {workflows.completion_rate}%
          </p>

        </div>

        <div className="rounded-xl border p-4">

          <p className="text-sm text-slate-500">
            Failure Rate
          </p>

          <p className="mt-1 text-2xl font-bold text-red-600">
            {workflows.failure_rate}%
          </p>

        </div>

      </div>

      <div className="mt-6">

        <div className="mb-2 flex items-center justify-between">

          <span className="text-sm font-medium text-slate-700">
            Workflow Health
          </span>

          <span className="font-semibold text-slate-900">
            {workflows.workflow_health_score}%
          </span>

        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-200">

          <div
            className="h-full rounded-full bg-cyan-500"
            style={{
              width: `${Math.min(
                Math.max(
                  workflows.workflow_health_score,
                  0,
                ),
                100,
              )}%`,
            }}
          />

        </div>

      </div>

    </section>
  );
};

export default WorkflowReport;