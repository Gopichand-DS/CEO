import EmployeeForm from "./EmployeeForm";

import type { Employee } from "../types/employee";

interface EmployeeModalProps {
  open: boolean;
  onClose: () => void;
  employee?: Employee | null;
}

const EmployeeModal = ({
  open,
  onClose,
  employee = null,
}: EmployeeModalProps) => {
  if (!open) {
    return null;
  }

  const isEditMode = employee !== null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">

        <div className="border-b px-6 py-5">

          <h2 className="text-xl font-bold text-slate-900">
            {isEditMode
              ? "Edit Employee"
              : "Add New Employee"}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {isEditMode
              ? "Update employee information."
              : "Add an employee to your company."}
          </p>

        </div>

        <EmployeeForm
          employee={employee}
          onClose={onClose}
        />

      </div>

    </div>
  );
};

export default EmployeeModal;