import {
  FolderKanban,
  Plus,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";

import {
  useDeleteProject,
  useProjects,
} from "./hooks/useProjects";

import CreateProjectModal from "./components/CreateProjectModal";

const ProjectsPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("ALL");
  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const {
    data: projects = [],
    isLoading,
    isError,
  } = useProjects();

  const deleteProject = useDeleteProject();

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        project.description
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" ||
        project.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [projects, search, statusFilter]);

  const handleDelete = async (
    projectId: number,
    projectName: string,
  ) => {
    const confirmed = window.confirm(
      `Delete project "${projectName}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProject.mutateAsync(projectId);
    } catch (error) {
      console.error(
        "Failed to delete project:",
        error,
      );
    }
  };

  const totalProjects = projects.length;

  const activeProjects = projects.filter(
    (project) => project.status === "ACTIVE",
  ).length;

  const plannedProjects = projects.filter(
    (project) => project.status === "PLANNED",
  ).length;

  const completedProjects = projects.filter(
    (project) => project.status === "COMPLETED",
  ).length;

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-5">
          <div className="h-8 w-48 rounded bg-slate-200" />
          <div className="h-24 rounded-xl bg-slate-200" />
          <div className="h-80 rounded-xl bg-slate-200" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <h2 className="font-semibold text-red-700">
            Unable to load projects
          </h2>

          <p className="mt-1 text-sm text-red-600">
            Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">

      {/* Header */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-100 p-3">
              <FolderKanban
                size={24}
                className="text-blue-600"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Projects
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage and monitor your company projects.
              </p>
            </div>
          </div>
        </div>

        <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
          >
          <Plus size={18} />
          New Project
        </button>

      </div>

      {/* Summary cards */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <SummaryCard
          label="Total Projects"
          value={totalProjects}
        />

        <SummaryCard
          label="Active"
          value={activeProjects}
        />

        <SummaryCard
          label="Planned"
          value={plannedProjects}
        />

        <SummaryCard
          label="Completed"
          value={completedProjects}
        />

      </div>

      {/* Filters */}

      <div className="flex flex-col gap-3 rounded-xl border bg-white p-4 shadow-sm sm:flex-row">

        <div className="relative flex-1">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search projects..."
            className="w-full rounded-lg border bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
          />

        </div>

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value)
          }
          className="rounded-lg border bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
        >
          <option value="ALL">All Statuses</option>
          <option value="PLANNED">Planned</option>
          <option value="ACTIVE">Active</option>
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

      {/* Projects table */}

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

        <div className="border-b px-5 py-4">
          <h2 className="font-semibold text-slate-900">
            Project Portfolio
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            {filteredProjects.length} project
            {filteredProjects.length !== 1
              ? "s"
              : ""}{" "}
            shown
          </p>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center">

            <FolderKanban
              size={40}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 font-semibold text-slate-700">
              No projects found
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Create a project to start managing your
              company portfolio.
            </p>

          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full min-w-[850px]">

              <thead className="bg-slate-50">
                <tr className="text-left text-xs uppercase tracking-wide text-slate-500">

                  <th className="px-5 py-3">
                    Project
                  </th>

                  <th className="px-5 py-3">
                    Department
                  </th>

                  <th className="px-5 py-3">
                    Status
                  </th>

                  <th className="px-5 py-3">
                    Budget
                  </th>

                  <th className="px-5 py-3">
                    Start Date
                  </th>

                  <th className="px-5 py-3">
                    Due Date
                  </th>

                  <th className="px-5 py-3 text-right">
                    Actions
                  </th>

                </tr>
              </thead>

              <tbody className="divide-y">

                {filteredProjects.map(
                  (project) => (
                    <tr
                      key={project.id}
                      className="transition hover:bg-slate-50"
                    >

                      <td className="px-5 py-4">

                        <div className="font-medium text-slate-900">
                          {project.name}
                        </div>

                        {project.description && (
                          <div className="mt-1 max-w-xs truncate text-xs text-slate-500">
                            {project.description}
                          </div>
                        )}

                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        Department #{project.department_id}
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge
                          status={project.status}
                        />
                      </td>

                      <td className="px-5 py-4 text-sm font-medium text-slate-700">
                        ₹
                        {Number(
                          project.budget,
                        ).toLocaleString()}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {project.start_date}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {project.end_date ?? "—"}
                      </td>

                      <td className="px-5 py-4 text-right">

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              project.id,
                              project.name,
                            )
                          }
                          disabled={
                            deleteProject.isPending
                          }
                          className="text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
                        >
                          Delete
                        </button>

                      </td>

                    </tr>
                  ),
                )}

              </tbody>

            </table>

          </div>
        )}

      </div>
      <CreateProjectModal
          open={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        />

    </div>
    
  );
};

interface SummaryCardProps {
  label: string;
  value: number;
}

const SummaryCard = ({
  label,
  value,
}: SummaryCardProps) => {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-3xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
};

const StatusBadge = ({
  status,
}: {
  status: string;
}) => {
  const styles: Record<string, string> = {
    PLANNED:
      "bg-slate-100 text-slate-700",
    ACTIVE:
      "bg-emerald-100 text-emerald-700",
    IN_PROGRESS:
      "bg-blue-100 text-blue-700",
    COMPLETED:
      "bg-violet-100 text-violet-700",
    CANCELLED:
      "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        styles[status] ??
        "bg-slate-100 text-slate-700"
      }`}
    >
      {status.replace("_", " ")}
    </span>
  );
};

export default ProjectsPage;