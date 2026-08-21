import TaskForm from "./TaskForm";

import type { Task } from "../types/task";

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  task?: Task | null;
}

const TaskModal = ({
  open,
  onClose,
  task = null,
}: TaskModalProps) => {
  if (!open) {
    return null;
  }

  const isEditMode = task !== null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">

        <div className="border-b px-6 py-5">

          <h2 className="text-xl font-bold text-slate-900">
            {isEditMode
              ? "Edit Task"
              : "Add New Task"}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {isEditMode
              ? "Update task information."
              : "Create a task and assign it to a project or employee."}
          </p>

        </div>

        <TaskForm
          task={task}
          onClose={onClose}
        />

      </div>

    </div>
  );
};

export default TaskModal;