import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  ListTodo,
} from "lucide-react";

import type { TaskAnalytics } from "../types/report";

interface TaskReportProps {
  tasks: TaskAnalytics;
}

const TaskReport = ({ tasks }: TaskReportProps) => {
  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-blue-100 p-3">
          <ListTodo
            size={22}
            className="text-blue-600"
          />
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Task Performance
          </h2>

          <p className="text-sm text-slate-500">
            Task progress, completion, priorities, and blockers.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">
            Total Tasks
          </p>
          <p className="mt-1 text-2xl font-bold">
            {tasks.total_tasks}
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
            {tasks.completed_tasks}
          </p>
        </div>

        <div className="rounded-xl bg-yellow-50 p-4">
          <div className="flex items-center gap-2">
            <Clock3
              size={16}
              className="text-yellow-600"
            />
            <p className="text-sm text-slate-500">
              In Progress
            </p>
          </div>

          <p className="mt-1 text-2xl font-bold text-yellow-700">
            {tasks.in_progress_tasks}
          </p>
        </div>

        <div className="rounded-xl bg-red-50 p-4">
          <div className="flex items-center gap-2">
            <AlertCircle
              size={16}
              className="text-red-600"
            />
            <p className="text-sm text-slate-500">
              Blocked
            </p>
          </div>

          <p className="mt-1 text-2xl font-bold text-red-700">
            {tasks.blocked_tasks}
          </p>
        </div>

      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">
              Completion Rate
            </span>

            <span className="font-semibold text-slate-900">
              {tasks.completion_percentage}%
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-green-500"
              style={{
                width: `${Math.min(
                  Math.max(tasks.completion_percentage, 0),
                  100,
                )}%`,
              }}
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">
              Overdue Rate
            </span>

            <span className="font-semibold text-slate-900">
              {tasks.overdue_percentage}%
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-red-500"
              style={{
                width: `${Math.min(
                  Math.max(tasks.overdue_percentage, 0),
                  100,
                )}%`,
              }}
            />
          </div>
        </div>

      </div>

      <div className="mt-6">

        <h3 className="mb-3 text-sm font-semibold text-slate-700">
          Task Priorities
        </h3>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-xl border p-4">
            <p className="text-xs text-slate-500">
              Critical
            </p>
            <p className="mt-1 text-xl font-bold text-red-600">
              {tasks.critical_priority_tasks}
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <p className="text-xs text-slate-500">
              High
            </p>
            <p className="mt-1 text-xl font-bold text-orange-600">
              {tasks.high_priority_tasks}
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <p className="text-xs text-slate-500">
              Medium
            </p>
            <p className="mt-1 text-xl font-bold text-yellow-600">
              {tasks.medium_priority_tasks}
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <p className="text-xs text-slate-500">
              Low
            </p>
            <p className="mt-1 text-xl font-bold text-slate-600">
              {tasks.low_priority_tasks}
            </p>
          </div>

        </div>

      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-xl border p-4">
          <p className="text-xs text-slate-500">
            Pending
          </p>
          <p className="mt-1 text-lg font-bold">
            {tasks.pending_tasks}
          </p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-xs text-slate-500">
            In Review
          </p>
          <p className="mt-1 text-lg font-bold">
            {tasks.in_review_tasks}
          </p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-xs text-slate-500">
            Overdue
          </p>
          <p className="mt-1 text-lg font-bold text-red-600">
            {tasks.overdue_tasks}
          </p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-xs text-slate-500">
            On Hold
          </p>
          <p className="mt-1 text-lg font-bold text-orange-600">
            {tasks.on_hold_tasks}
          </p>
        </div>

      </div>

    </section>
  );
};

export default TaskReport;