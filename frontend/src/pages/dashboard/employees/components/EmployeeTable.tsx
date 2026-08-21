import {
  Pencil,
  Trash2,
} from "lucide-react";

import type { Employee } from "../types/employee";
import type { Team } from "../types/team";

interface Department {
  id: number;
  name: string;
}

interface EmployeeTableProps {
  employees: Employee[];
  departments: Department[];
  teams: Team[];
  onEdit: (employee: Employee) => void;
  onDelete: (employeeId: number) => void;
}

const EmployeeTable = ({
  employees,
  departments,
  teams,
  onEdit,
  onDelete,
}: EmployeeTableProps) => {

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

  const getTeamName = (
    teamId: number | null,
  ) => {
    if (!teamId) {
      return "Not Assigned";
    }

    return (
      teams.find(
        (team) => team.id === teamId,
      )?.name ?? "Unknown"
    );
  };

  const getManagerName = (
    managerId: number | null,
  ) => {
    if (!managerId) {
      return "Not Assigned";
    }

    return (
      employees.find(
        (employee) =>
          employee.id === managerId,
      )?.full_name ?? "Unknown"
    );
  };

  if (employees.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center">
        <p className="font-medium text-slate-700">
          No employees found.
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Add your first employee to get started.
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
                Employee
              </th>

              <th className="px-5 py-4 font-semibold">
                Designation
              </th>

              <th className="px-5 py-4 font-semibold">
                Department
              </th>

              <th className="px-5 py-4 font-semibold">
                Team
              </th>

              <th className="px-5 py-4 font-semibold">
                Manager
              </th>

              <th className="px-5 py-4 font-semibold">
                Status
              </th>

              <th className="px-5 py-4 text-right font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody className="divide-y">

            {employees.map((employee) => (

              <tr
                key={employee.id}
                className="hover:bg-slate-50"
              >

                <td className="px-5 py-4">

                  <div>

                    <p className="font-semibold text-slate-900">
                      {employee.full_name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {employee.employee_code}
                    </p>

                    <p className="text-xs text-slate-500">
                      {employee.email}
                    </p>

                  </div>

                </td>

                <td className="px-5 py-4 text-slate-700">
                  {employee.designation}
                </td>

                <td className="px-5 py-4 text-slate-700">
                  {getDepartmentName(
                    employee.department_id,
                  )}
                </td>

                <td className="px-5 py-4 text-slate-700">
                  {getTeamName(
                    employee.team_id,
                  )}
                </td>

                <td className="px-5 py-4 text-slate-700">
                  {getManagerName(
                    employee.manager_id,
                  )}
                </td>

                <td className="px-5 py-4">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      employee.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : employee.status === "ON_LEAVE"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {employee.status}
                  </span>

                </td>

                <td className="px-5 py-4">

                  <div className="flex justify-end gap-2">

                    <button
                      type="button"
                      onClick={() =>
                        onEdit(employee)
                      }
                      className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                      title="Edit employee"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        onDelete(employee.id)
                      }
                      className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                      title="Delete employee"
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

export default EmployeeTable;