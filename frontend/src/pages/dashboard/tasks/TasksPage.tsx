import { useState } from "react";
import { ListChecks, Plus } from "lucide-react";

import {
  useDeleteTask,
  useTasks,
} from "./hooks/useTasks";

import { useProjects } from "../projects/hooks/useProjects";
import { useEmployees } from "../employees/hooks/useEmployees";

import TaskModal from "./components/TaskModal";
import TaskTable from "./components/TaskTable";

import type { Task } from "./types/task";

const TasksPage = () => {
  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [selectedTask, setSelectedTask] =
    useState<Task | null>(null);

  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useTasks();

  const {
    data: projects = [],
  } = useProjects();

  const {
    data: employees = [],
  } = useEmployees();

  const deleteTask = useDeleteTask();

  const handleCreate = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = async (
    taskId: number,
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteTask.mutateAsync(taskId);
    } catch (error) {
      console.error(
        "Failed to delete task:",
        error,
      );
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className="space-y-6 p-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-indigo-100 p-3">
            <ListChecks className="text-indigo-600" />
          </div>

          <div>

            <h1 className="text-2xl font-bold text-slate-900">
              Tasks
            </h1>

            <p className="text-sm text-slate-500">
              Manage tasks, assignments, priorities, and deadlines.
            </p>

          </div>

        </div>

        <button
          type="button"
          onClick={handleCreate}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          <Plus size={18} />
          New Task
        </button>

      </div>

      {/* Loading */}

      {isLoading && (
        <div className="rounded-xl border bg-white p-8 text-center text-slate-500">
          Loading tasks...
        </div>
      )}

      {/* Error */}

      {isError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center text-red-600">
          Unable to load tasks.
        </div>
      )}

      {/* Table */}

      {!isLoading && !isError && (
        <TaskTable
          tasks={tasks}
          projects={projects}
          employees={employees}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Modal */}

      <TaskModal
        open={isModalOpen}
        task={selectedTask}
        onClose={handleCloseModal}
      />

    </div>
  );
};

export default TasksPage;