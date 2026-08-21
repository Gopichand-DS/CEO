import { useState } from "react";
import { Plus, Users } from "lucide-react";

import {
  useEmployees,
  useDeleteEmployee,
} from "./hooks/useEmployees";

import { useTeams } from "./hooks/useTeams";
import { useDepartments } from "../projects/hooks/useDepartments";

import EmployeeModal from "./components/EmployeeModal";
import EmployeeTable from "./components/EmployeeTable";

import type { Employee } from "./types/employee";

const EmployeesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] =
    useState<Employee | null>(null);

  const {
    data: employees = [],
    isLoading,
    isError,
  } = useEmployees();

  const {
    data: departments = [],
  } = useDepartments();

  const {
    data: teams = [],
  } = useTeams();

  const deleteEmployee = useDeleteEmployee();

  const handleDelete = async (
    employeeId: number,
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?",
    );

    if (!confirmed) {
      return;
    }

    await deleteEmployee.mutateAsync(employeeId);
  };

  const handleCreate = () => {
    setSelectedEmployee(null);
    setIsModalOpen(true);
  };

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="space-y-6 p-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-indigo-100 p-3">
            <Users className="text-indigo-600" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Employees
            </h1>

            <p className="text-sm text-slate-500">
              Manage your company's employees and workforce.
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={handleCreate}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          <Plus size={18} />
          New Employee
        </button>

      </div>

      {/* Loading */}

      {isLoading && (
        <div className="rounded-xl border bg-white p-8 text-center text-slate-500">
          Loading employees...
        </div>
      )}

      {/* Error */}

      {isError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center text-red-600">
          Unable to load employees.
        </div>
      )}

      {/* Table */}

      {!isLoading && !isError && (
        <EmployeeTable
          employees={employees}
          departments={departments}
          teams={teams}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Modal */}

      <EmployeeModal
        open={isModalOpen}
        employee={selectedEmployee}
        onClose={handleCloseModal}
      />

    </div>
  );
};

export default EmployeesPage;