import { Pencil, Trash2 } from "lucide-react";

import type { Team } from "../types/team";

interface Department {
  id: number;
  name: string;
}

interface TeamTableProps {
  teams: Team[];
  departments: Department[];
  onEdit: (team: Team) => void;
  onDelete: (teamId: number) => void;
}

const TeamTable = ({
  teams,
  departments,
  onEdit,
  onDelete,
}: TeamTableProps) => {
  const getDepartmentName = (
    departmentId: number,
  ) => {
    return (
      departments.find(
        (department) =>
          department.id === departmentId,
      )?.name ?? "Unknown"
    );
  };

  if (teams.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center">
        <p className="font-medium text-slate-700">
          No teams found.
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Create your first team to get started.
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
                Team
              </th>

              <th className="px-5 py-4 font-semibold">
                Department
              </th>

              <th className="px-5 py-4 font-semibold">
                Description
              </th>

              <th className="px-5 py-4 text-right font-semibold">
                Actions
              </th>
            </tr>

          </thead>

          <tbody className="divide-y">

            {teams.map((team) => (

              <tr
                key={team.id}
                className="hover:bg-slate-50"
              >

                <td className="px-5 py-4">

                  <div>
                    <p className="font-semibold text-slate-900">
                      {team.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      Team #{team.id}
                    </p>
                  </div>

                </td>

                <td className="px-5 py-4 text-slate-700">
                  {getDepartmentName(
                    team.department_id,
                  )}
                </td>

                <td className="max-w-md px-5 py-4 text-slate-600">
                  {team.description || (
                    <span className="text-slate-400">
                      No description
                    </span>
                  )}
                </td>

                <td className="px-5 py-4">

                  <div className="flex justify-end gap-2">

                    <button
                      type="button"
                      onClick={() =>
                        onEdit(team)
                      }
                      className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                      title="Edit team"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        onDelete(team.id)
                      }
                      className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                      title="Delete team"
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

export default TeamTable;