import { Pencil, Trash2 } from "lucide-react";

import type { Task } from "../types/task";

interface Project {
  id: number;
  name: string;
}

interface Employee {
  id: number;
  full_name: string;
}

interface TaskTableProps {
  tasks: Task[];
  projects: Project[];
  employees: Employee[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
}

const TaskTable = ({
  tasks,
  projects,
  employees,
  onEdit,
  onDelete,
}: TaskTableProps) => {
  const getProjectName = (
    projectId: number,
  ) => {
    return (
      projects.find(
        (project) => project.id === projectId,
      )?.name ?? "Unknown Project"
    );
  };

  const getEmployeeName = (
    employeeId: number | null,
  ) => {
    if (employeeId === null) {
      return "Unassigned";
    }

    return (
      employees.find(
        (employee) => employee.id === employeeId,
      )?.full_name ?? "Unknown Employee"
    );
  };

  const getStatusStyle = (
    status: string,
  ) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700";

      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-700";

      case "BLOCKED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const getPriorityStyle = (
    priority: string,
  ) => {
    switch (priority) {
      case "CRITICAL":
        return "bg-red-100 text-red-700";

      case "HIGH":
        return "bg-orange-100 text-orange-700";

      case "MEDIUM":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center">
        <p className="font-medium text-slate-700">
          No tasks found.
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Create your first task to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="w-full text-left text-sm">

          <thead className="border-b bg-slate-50">

            <tr>

              <th className="px-5 py-4 font-semibold">
                Task
              </th>

              <th className="px-5 py-4 font-semibold">
                Project
              </th>

              <th className="px-5 py-4 font-semibold">
                Assigned To
              </th>

              <th className="px-5 py-4 font-semibold">
                Status
              </th>

              <th className="px-5 py-4 font-semibold">
                Priority
              </th>

              <th className="px-5 py-4 font-semibold">
                Due Date
              </th>

              <th className="px-5 py-4 text-right font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody className="divide-y">

            {tasks.map((task) => (

              <tr
                key={task.id}
                className="hover:bg-slate-50"
              >

                <td className="px-5 py-4">

                  <div>

                    <p className="font-semibold text-slate-900">
                      {task.title}
                    </p>

                    {task.description && (
                      <p className="mt-1 max-w-xs truncate text-xs text-slate-500">
                        {task.description}
                      </p>
                    )}

                  </div>

                </td>

                <td className="px-5 py-4 text-slate-700">
                  {getProjectName(
                    task.project_id,
                  )}
                </td>

                <td className="px-5 py-4 text-slate-700">
                  {getEmployeeName(
                    task.assigned_to,
                  )}
                </td>

                <td className="px-5 py-4">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                      task.status,
                    )}`}
                  >
                    {task.status}
                  </span>

                </td>

                <td className="px-5 py-4">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getPriorityStyle(
                      task.priority,
                    )}`}
                  >
                    {task.priority}
                  </span>

                </td>

                <td className="px-5 py-4 text-slate-700">
                  {task.due_date ?? "—"}
                </td>

                <td className="px-5 py-4">

                  <div className="flex justify-end gap-2">

                    <button
                      type="button"
                      onClick={() =>
                        onEdit(task)
                      }
                      className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                      title="Edit task"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        onDelete(task.id)
                      }
                      className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                      title="Delete task"
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default TaskTable;