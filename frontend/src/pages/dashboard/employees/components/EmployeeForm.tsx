import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";

import {
  useCreateEmployee,
  useEmployees,
  useUpdateEmployee,
} from "../hooks/useEmployees";

import { useTeams } from "../hooks/useTeams";
import { useDepartments } from "../../projects/hooks/useDepartments";

import { useAuthStore } from "@/features/auth/store/auth.store";

import type {
  Employee,
  EmployeeCreate,
} from "../types/employee";

interface EmployeeFormProps {
  employee?: Employee | null;
  onClose: () => void;
}

const EmployeeForm = ({
  employee = null,
  onClose,
}: EmployeeFormProps) => {
  const user = useAuthStore(
    (state) => state.user,
  );

  const createEmployee = useCreateEmployee();
  const updateEmployee = useUpdateEmployee();

  const {
    data: employees = [],
    isLoading: employeesLoading,
  } = useEmployees();

  const {
    data: teams = [],
    isLoading: teamsLoading,
  } = useTeams();

  const {
    data: departments = [],
    isLoading: departmentsLoading,
  } = useDepartments();

  const isEditMode = employee !== null;

  const [employeeCode, setEmployeeCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [designation, setDesignation] = useState("");

  const [departmentId, setDepartmentId] =
    useState<number | "">("");

  const [teamId, setTeamId] =
    useState<number | "">("");

  const [managerId, setManagerId] =
    useState<number | "">("");

  const [joiningDate, setJoiningDate] =
    useState("");

  const [salary, setSalary] = useState("");

  const [status, setStatus] =
    useState("ACTIVE");

  /*
   * Populate form when editing.
   */
  useEffect(() => {
    if (!employee) {
      setEmployeeCode("");
      setFullName("");
      setEmail("");
      setPhone("");
      setDesignation("");
      setDepartmentId("");
      setTeamId("");
      setManagerId("");
      setJoiningDate("");
      setSalary("");
      setStatus("ACTIVE");

      return;
    }

    setEmployeeCode(employee.employee_code);
    setFullName(employee.full_name);
    setEmail(employee.email);
    setPhone(employee.phone ?? "");
    setDesignation(employee.designation);

    setDepartmentId(employee.department_id);

    setTeamId(
      employee.team_id ?? "",
    );

    setManagerId(
      employee.manager_id ?? "",
    );

    setJoiningDate(employee.joining_date);

    setSalary(
      String(employee.salary),
    );

    setStatus(employee.status);
  }, [employee]);

  /*
   * Teams belonging to selected department.
   */
  const filteredTeams = useMemo(() => {
    if (departmentId === "") {
      return [];
    }

    return teams.filter(
      (team) =>
        team.department_id === departmentId,
    );
  }, [teams, departmentId]);

  /*
   * Reset team when department changes.
   *
   * During edit, preserve the existing team
   * because the department has just been loaded.
   */
  useEffect(() => {
    if (!employee) {
      setTeamId("");
      return;
    }

    if (
      departmentId !== employee.department_id
    ) {
      setTeamId("");
    }
  }, [departmentId, employee]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!user?.company_id) {
      return;
    }

    if (departmentId === "") {
      return;
    }

    /*
     * EDIT
     */
    if (isEditMode && employee) {
      try {
        await updateEmployee.mutateAsync({
          employeeId: employee.id,

          data: {
            full_name: fullName.trim(),
            phone:
              phone.trim() || undefined,
            designation:
              designation.trim(),
            department_id: departmentId,
            team_id:
              teamId === ""
                ? null
                : teamId,
            manager_id:
              managerId === ""
                ? null
                : managerId,
            joining_date: joiningDate,
            salary: Number(salary),
            status,
          },
        });

        onClose();
      } catch (error) {
        console.error(
          "Failed to update employee:",
          error,
        );
      }

      return;
    }

    /*
     * CREATE
     */
    const payload: EmployeeCreate = {
      employee_code:
        employeeCode.trim(),

      full_name:
        fullName.trim(),

      email:
        email.trim(),

      phone:
        phone.trim() || undefined,

      designation:
        designation.trim(),

      company_id:
        user.company_id,

      department_id:
        departmentId,

      team_id:
        teamId === ""
          ? null
          : teamId,

      manager_id:
        managerId === ""
          ? null
          : managerId,

      joining_date:
        joiningDate,

      salary:
        Number(salary),

      status,
    };

    try {
      await createEmployee.mutateAsync(
        payload,
      );

      onClose();
    } catch (error) {
      console.error(
        "Failed to create employee:",
        error,
      );
    }
  };

  const isLoading =
    departmentsLoading ||
    teamsLoading ||
    employeesLoading;

  const isSubmitting =
    createEmployee.isPending ||
    updateEmployee.isPending;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6"
    >

      {/* Basic Information */}

      <div>

        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Basic Information
        </h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          <div>

            <label className="mb-1 block text-sm font-medium">
              Employee Code
            </label>

            <input
              required
              disabled={isEditMode}
              value={employeeCode}
              onChange={(event) =>
                setEmployeeCode(
                  event.target.value,
                )
              }
              placeholder="EMP-001"
              className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-indigo-500 disabled:bg-slate-100 disabled:text-slate-500"
            />

          </div>

          <div>

            <label className="mb-1 block text-sm font-medium">
              Full Name
            </label>

            <input
              required
              value={fullName}
              onChange={(event) =>
                setFullName(
                  event.target.value,
                )
              }
              placeholder="John Doe"
              className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-indigo-500"
            />

          </div>

          <div>

            <label className="mb-1 block text-sm font-medium">
              Email
            </label>

            <input
              required
              type="email"
              disabled={isEditMode}
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value,
                )
              }
              placeholder="john@company.com"
              className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-indigo-500 disabled:bg-slate-100 disabled:text-slate-500"
            />

          </div>

          <div>

            <label className="mb-1 block text-sm font-medium">
              Phone
            </label>

            <input
              value={phone}
              onChange={(event) =>
                setPhone(
                  event.target.value,
                )
              }
              placeholder="+91 9876543210"
              className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-indigo-500"
            />

          </div>

          <div className="md:col-span-2">

            <label className="mb-1 block text-sm font-medium">
              Designation
            </label>

            <input
              required
              value={designation}
              onChange={(event) =>
                setDesignation(
                  event.target.value,
                )
              }
              placeholder="Software Engineer"
              className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-indigo-500"
            />

          </div>

        </div>

      </div>

      {/* Organization */}

      <div>

        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Organization
        </h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {/* Department */}

          <div>

            <label className="mb-1 block text-sm font-medium">
              Department
            </label>

            <select
              required
              value={departmentId}
              onChange={(event) =>
                setDepartmentId(
                  event.target.value
                    ? Number(
                        event.target.value,
                      )
                    : "",
                )
              }
              disabled={
                departmentsLoading
              }
              className="w-full rounded-lg border bg-white px-3 py-2.5 outline-none focus:border-indigo-500"
            >

              <option value="">
                {departmentsLoading
                  ? "Loading departments..."
                  : "Select department"}
              </option>

              {departments.map(
                (department) => (
                  <option
                    key={department.id}
                    value={department.id}
                  >
                    {department.name}
                  </option>
                ),
              )}

            </select>

          </div>

          {/* Team */}

          <div>

            <label className="mb-1 block text-sm font-medium">
              Team
            </label>

            <select
              value={teamId}
              onChange={(event) =>
                setTeamId(
                  event.target.value
                    ? Number(
                        event.target.value,
                      )
                    : "",
                )
              }
              disabled={
                departmentId === "" ||
                teamsLoading
              }
              className="w-full rounded-lg border bg-white px-3 py-2.5 outline-none focus:border-indigo-500"
            >

              <option value="">
                {teamsLoading
                  ? "Loading teams..."
                  : departmentId === ""
                    ? "Select department first"
                    : filteredTeams.length === 0
                      ? "No teams available"
                      : "Select team"}
              </option>

              {filteredTeams.map(
                (team) => (
                  <option
                    key={team.id}
                    value={team.id}
                  >
                    {team.name}
                  </option>
                ),
              )}

            </select>

          </div>

          {/* Manager */}

          <div>

            <label className="mb-1 block text-sm font-medium">
              Manager
            </label>

            <select
              value={managerId}
              onChange={(event) =>
                setManagerId(
                  event.target.value
                    ? Number(
                        event.target.value,
                      )
                    : "",
                )
              }
              disabled={
                employeesLoading
              }
              className="w-full rounded-lg border bg-white px-3 py-2.5 outline-none focus:border-indigo-500"
            >

              <option value="">
                No manager
              </option>

              {employees
                .filter(
                  (item) =>
                    item.id !==
                    employee?.id,
                )
                .map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.full_name} —{" "}
                    {item.designation}
                  </option>
                ))}

            </select>

          </div>

        </div>

      </div>

      {/* Employment Details */}

      <div>

        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Employment Details
        </h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          <div>

            <label className="mb-1 block text-sm font-medium">
              Joining Date
            </label>

            <input
              required
              type="date"
              value={joiningDate}
              onChange={(event) =>
                setJoiningDate(
                  event.target.value,
                )
              }
              className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-indigo-500"
            />

          </div>

          <div>

            <label className="mb-1 block text-sm font-medium">
              Salary
            </label>

            <input
              required
              type="number"
              min="0"
              step="0.01"
              value={salary}
              onChange={(event) =>
                setSalary(
                  event.target.value,
                )
              }
              placeholder="50000"
              className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-indigo-500"
            />

          </div>

          <div>

            <label className="mb-1 block text-sm font-medium">
              Status
            </label>

            <select
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target.value,
                )
              }
              className="w-full rounded-lg border bg-white px-3 py-2.5 outline-none focus:border-indigo-500"
            >

              <option value="ACTIVE">
                ACTIVE
              </option>

              <option value="INACTIVE">
                INACTIVE
              </option>

              <option value="ON_LEAVE">
                ON LEAVE
              </option>

            </select>

          </div>

        </div>

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
            !user?.company_id
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
              ? "Update Employee"
              : "Create Employee"}

        </button>

      </div>

    </form>
  );
};

export default EmployeeForm;