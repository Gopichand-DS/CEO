import {
  FolderKanban,
  CheckCircle2,
  AlertTriangle,
  Clock3,
} from "lucide-react";

interface ProjectStatusItem {
  id: number;
  project: string;
  manager: string;
  progress: number;
  status: string;
  due_date: string;
}

interface ProjectStatusProps {
  projects: ProjectStatusItem[];
}

const getStatusStyle = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return {
        icon: (
          <CheckCircle2
            size={18}
            className="text-green-600"
          />
        ),
        badge: "bg-green-100 text-green-700",
        label: "Completed",
      };

    case "ACTIVE":
    case "IN_PROGRESS":
      return {
        icon: (
          <CheckCircle2
            size={18}
            className="text-blue-600"
          />
        ),
        badge: "bg-blue-100 text-blue-700",
        label: "On Track",
      };

    case "PLANNED":
      return {
        icon: (
          <Clock3
            size={18}
            className="text-yellow-600"
          />
        ),
        badge: "bg-yellow-100 text-yellow-700",
        label: "Planned",
      };

    default:
      return {
        icon: (
          <AlertTriangle
            size={18}
            className="text-red-600"
          />
        ),
        badge: "bg-red-100 text-red-700",
        label: status,
      };
  }
};

const ProjectStatus = ({
  projects,
}: ProjectStatusProps) => {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center gap-3">
        <FolderKanban className="text-indigo-600" />

        <div>
          <h2 className="text-xl font-bold">
            Project Status
          </h2>

          <p className="text-sm text-slate-500">
            Live project progress overview
          </p>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="py-10 text-center text-slate-500">
          No projects found.
        </div>
      ) : (
        <div className="space-y-6">

          {projects.map((project) => {
            const style = getStatusStyle(project.status);

            return (
              <div
                key={project.id}
                className="rounded-xl border p-4"
              >
                <div className="flex items-start justify-between">

                  <div>
                    <h3 className="font-semibold">
                      {project.project}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Project Manager: {project.manager}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Due: {project.due_date}
                    </p>
                  </div>

                  <div
                    className={`flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${style.badge}`}
                  >
                    {style.icon}
                    {style.label}
                  </div>

                </div>

                <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200">

                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      project.progress >= 90
                        ? "bg-green-500"
                        : project.progress >= 70
                        ? "bg-blue-500"
                        : project.progress >= 50
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{
                      width: `${project.progress}%`,
                    }}
                  />

                </div>

                <div className="mt-2 flex justify-between text-sm">

                  <span className="text-slate-500">
                    Progress
                  </span>

                  <span className="font-semibold">
                    {project.progress}%
                  </span>

                </div>

              </div>
            );
          })}

        </div>
      )}
    </div>
  );
};

export default ProjectStatus;