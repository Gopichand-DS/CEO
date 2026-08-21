import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useDepartments } from "../hooks/useDepartments";
import { useCreateProject } from "../hooks/useProjects";
import type { ProjectCreateRequest } from "../types/project";

import { useAuthStore } from "@/features/auth/store/auth.store";

interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateProjectModal = ({
  open,
  onClose,
}: CreateProjectModalProps) => {
  const user = useAuthStore((state) => state.user);

  const createProject = useCreateProject();
  const {
    data: departments = [],
    isLoading: departmentsLoading,
    isError: departmentsError,
  } = useDepartments();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("PLANNED");
  const [budget, setBudget] = useState("");

  useEffect(() => {
    if (!open) {
      setName("");
      setDescription("");
      setDepartmentId("");
      setStartDate("");
      setEndDate("");
      setStatus("PLANNED");
      setBudget("");
    }
  }, [open]);

  if (!open) {
    return null;
  }

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!user?.company_id) {
      return;
    }

    const payload: ProjectCreateRequest = {
      name: name.trim(),
      description:
        description.trim() || null,
      company_id: user.company_id,
      department_id: Number(departmentId),
      start_date: startDate,
      end_date: endDate || null,
      status,
      budget: Number(budget),
    };

    try {
      await createProject.mutateAsync(payload);

      onClose();
    } catch (error) {
      console.error(
        "Failed to create project:",
        error,
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-5">

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Create New Project
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add the project details below.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >

          {/* Project Name */}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Project Name
            </label>

            <input
              required
              minLength={2}
              maxLength={150}
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Enter project name"
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* Description */}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Description
            </label>

            <textarea
              maxLength={500}
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              placeholder="Describe the project..."
              rows={3}
              className="w-full resize-none rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* Department + Status */}

          <div className="grid gap-4 sm:grid-cols-2">

            <div>
               <label className="mb-1.5 block text-sm font-medium text-slate-700">
                 Department
                </label>

              <select
                  required
                  value={departmentId}
                  onChange={(event) =>
                  setDepartmentId(event.target.value)
                }
                disabled={
                departmentsLoading ||
                departmentsError
                }
                className="w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-400"
              >
              <option value="">
                  {departmentsLoading
                  ? "Loading departments..."
                  : departmentsError
                  ? "Unable to load departments"
                  : "Select department"}
              </option>

              {departments.map((department) => (
              <option
                key={department.id}
                value={department.id}
              >
                {department.name}
              </option>
              ))}
              </select>

              {departments.length === 0 &&
              !departmentsLoading &&
              !departmentsError && (
              <p className="mt-1 text-xs text-amber-600">
                  No departments are available.
              </p>
              )}
          </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Status
              </label>

              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value)
                }
                className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              >
                <option value="PLANNED">
                  Planned
                </option>

                <option value="ACTIVE">
                  Active
                </option>

                <option value="IN_PROGRESS">
                  In Progress
                </option>

                <option value="COMPLETED">
                  Completed
                </option>

                <option value="CANCELLED">
                  Cancelled
                </option>
              </select>
            </div>

          </div>

          {/* Dates */}

          <div className="grid gap-4 sm:grid-cols-2">

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Start Date
              </label>

              <input
                required
                type="date"
                value={startDate}
                onChange={(event) =>
                  setStartDate(event.target.value)
                }
                className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                End Date
              </label>

              <input
                type="date"
                value={endDate}
                min={startDate || undefined}
                onChange={(event) =>
                  setEndDate(event.target.value)
                }
                className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>

          </div>

          {/* Budget */}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Budget
            </label>

            <input
              required
              type="number"
              min={0}
              step="0.01"
              value={budget}
              onChange={(event) =>
                setBudget(event.target.value)
              }
              placeholder="Enter project budget"
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* Error */}

          {createProject.isError && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              Failed to create project. Please check
              the project details and try again.
            </div>
          )}

          {/* Actions */}

          <div className="flex justify-end gap-3 border-t pt-5">

            <button
              type="button"
              onClick={onClose}
              disabled={createProject.isPending}
              className="rounded-lg border px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={createProject.isPending}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {createProject.isPending
                ? "Creating..."
                : "Create Project"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default CreateProjectModal;