import {
  PlusCircle,
  Users,
  FolderKanban,
  FileText,
} from "lucide-react";

const actions = [
  {
    title: "New Project",
    icon: FolderKanban,
  },
  {
    title: "Add Employee",
    icon: Users,
  },
  {
    title: "Generate Report",
    icon: FileText,
  },
  {
    title: "Create Task",
    icon: PlusCircle,
  },
];

const QuickActions = () => {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              className="flex flex-col items-center rounded-xl border p-6 transition hover:bg-slate-50 hover:shadow-md"
            >
              <div className="rounded-full bg-blue-100 p-4">
                <Icon
                  size={24}
                  className="text-blue-600"
                />
              </div>

              <span className="mt-4 font-medium">
                {action.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;