import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import {
  useCreateTask,
  useUpdateTask,
} from "../hooks/useTasks";

import { useProjects } from "../../projects/hooks/useProjects";
import { useEmployees } from "../../employees/hooks/useEmployees";

import type {
  Task,
  TaskCreate,
} from "../types/task";

interface TaskFormProps {
  task?: Task | null;
  onClose: () => void;
}

const TaskForm = ({
  task = null,
  onClose,
}: TaskFormProps) => {
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();

  const {
    data: projects = [],
    isLoading: projectsLoading,
  } = useProjects();

  const {
    data: employees = [],
    isLoading: employeesLoading,
  } = useEmployees();

  const isEditMode = task !== null;

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [projectId, setProjectId] =
    useState<number | "">("");

  const [assignedTo, setAssignedTo] =
    useState<number | "">("");

  const [status, setStatus] =
    useState("TODO");

  const [priority, setPriority] =
    useState("MEDIUM");

  const [startDate, setStartDate] =
    useState("");

  const [dueDate, setDueDate] =
    useState("");

  const [estimatedHours, setEstimatedHours] =
    useState("");

  useEffect(() => {
    if (!task) {
      setTitle("");
      setDescription("");
      setProjectId("");
      setAssignedTo("");
      setStatus("TODO");
      setPriority("MEDIUM");
      setStartDate("");
      setDueDate("");
      setEstimatedHours("");
      return;
    }

    setTitle(task.title);
    setDescription(task.description ?? "");
    setProjectId(task.project_id);
    setAssignedTo(
      task.assigned_to ?? "",
    );
    setStatus(task.status);
    setPriority(task.priority);
    setStartDate(task.start_date);
    setDueDate(task.due_date ?? "");
    setEstimatedHours(
      task.estimated_hours?.toString() ?? "",
    );
  }, [task]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (projectId === "") {
      return;
    }

    try {
      if (isEditMode && task) {
        await updateTask.mutateAsync({
          taskId: task.id,

          data: {
            title: title.trim(),
            description:
              description.trim() || undefined,

            project_id: projectId,

            assigned_to:
              assignedTo === ""
                ? null
                : assignedTo,

            status,
            priority,
            start_date: startDate,

            due_date:
              dueDate || null,

            estimated_hours:
              estimatedHours
                ? Number(estimatedHours)
                : null,
          },
        });
      } else {
        const payload: TaskCreate = {
          title: title.trim(),

          description:
            description.trim() || undefined,

          project_id: projectId,

          assigned_to:
            assignedTo === ""
              ? null
              : assignedTo,

          status,
          priority,
          start_date: startDate,

          due_date:
            dueDate || null,

          estimated_hours:
            estimatedHours
              ? Number(estimatedHours)
              : null,
        };

        await createTask.mutateAsync(
          payload,
        );
      }

      onClose();
    } catch (error) {
      console.error(
        isEditMode
          ? "Failed to update task:"
          : "Failed to create task:",
        error,
      );
    }
  };

  const isSubmitting =
    createTask.isPending ||
    updateTask.isPending;

  const isLoading =
    projectsLoading ||
    employeesLoading;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6"
    >

      {/* Title */}

      <div>
        <label className="mb-1 block text-sm font-medium">
          Task Title
        </label>

        <input
          required
          minLength={2}
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
          placeholder="Complete authentication API"
          className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-indigo-500"
        />
      </div>

      {/* Project */}

      <div>
        <label className="mb-1 block text-sm font-medium">
          Project
        </label>

        <select
          required
          value={projectId}
          onChange={(event) =>
            setProjectId(
              event.target.value
                ? Number(event.target.value)
                : "",
            )
          }
          disabled={projectsLoading}
          className="w-full rounded-lg border bg-white px-3 py-2.5 outline-none focus:border-indigo-500"
        >
          <option value="">
            {projectsLoading
              ? "Loading projects..."
              : "Select project"}
          </option>

          {projects.map((project) => (
            <option
              key={project.id}
              value={project.id}
            >
              {project.name}
            </option>
          ))}
        </select>
      </div>

      {/* Employee */}

      <div>
        <label className="mb-1 block text-sm font-medium">
          Assigned Employee
        </label>

        <select
          value={assignedTo}
          onChange={(event) =>
            setAssignedTo(
              event.target.value
                ? Number(event.target.value)
                : "",
            )
          }
          disabled={employeesLoading}
          className="w-full rounded-lg border bg-white px-3 py-2.5 outline-none focus:border-indigo-500"
        >
          <option value="">
            {employeesLoading
              ? "Loading employees..."
              : "Unassigned"}
          </option>

          {employees.map((employee) => (
            <option
              key={employee.id}
              value={employee.id}
            >
              {employee.full_name}
            </option>
          ))}
        </select>
      </div>

      {/* Status + Priority */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

        <div>
          <label className="mb-1 block text-sm font-medium">
            Status
          </label>

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
            className="w-full rounded-lg border bg-white px-3 py-2.5 outline-none focus:border-indigo-500"
          >
            <option value="TODO">
              To Do
            </option>

            <option value="IN_PROGRESS">
              In Progress
            </option>

            <option value="COMPLETED">
              Completed
            </option>

            <option value="BLOCKED">
              Blocked
            </option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Priority
          </label>

          <select
            value={priority}
            onChange={(event) =>
              setPriority(event.target.value)
            }
            className="w-full rounded-lg border bg-white px-3 py-2.5 outline-none focus:border-indigo-500"
          >
            <option value="LOW">
              Low
            </option>

            <option value="MEDIUM">
              Medium
            </option>

            <option value="HIGH">
              High
            </option>

            <option value="CRITICAL">
              Critical
            </option>
          </select>
        </div>

      </div>

      {/* Dates */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

        <div>
          <label className="mb-1 block text-sm font-medium">
            Start Date
          </label>

          <input
            required
            type="date"
            value={startDate}
            onChange={(event) =>
              setStartDate(event.target.value)
            }
            className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Due Date
          </label>

          <input
            type="date"
            value={dueDate}
            onChange={(event) =>
              setDueDate(event.target.value)
            }
            className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-indigo-500"
          />
        </div>

      </div>

      {/* Estimated Hours */}

      <div>
        <label className="mb-1 block text-sm font-medium">
          Estimated Hours
        </label>

        <input
          type="number"
          min="0"
          step="0.5"
          value={estimatedHours}
          onChange={(event) =>
            setEstimatedHours(
              event.target.value,
            )
          }
          placeholder="10"
          className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-indigo-500"
        />
      </div>

      {/* Description */}

      <div>
        <label className="mb-1 block text-sm font-medium">
          Description
        </label>

        <textarea
          rows={4}
          value={description}
          onChange={(event) =>
            setDescription(
              event.target.value,
            )
          }
          placeholder="Describe the task..."
          className="w-full resize-none rounded-lg border px-3 py-2.5 outline-none focus:border-indigo-500"
        />
      </div>

      {/* Actions */}

      <div className="flex justify-end gap-3 border-t pt-5">

        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          className="rounded-lg border px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={
            isSubmitting ||
            isLoading ||
            projectId === ""
          }
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting && (
            <Loader2
              size={17}
              className="animate-spin"
            />
          )}

          {isSubmitting
            ? isEditMode
              ? "Updating..."
              : "Creating..."
            : isEditMode
              ? "Update Task"
              : "Create Task"}
        </button>

      </div>

    </form>
  );
};

export default TaskForm;