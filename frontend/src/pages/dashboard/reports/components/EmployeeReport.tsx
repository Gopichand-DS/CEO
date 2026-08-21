import {
  UserCheck,
  Users,
  UserPlus,
} from "lucide-react";

import type { EmployeeAnalytics } from "../types/report";

interface EmployeeReportProps {
  employees: EmployeeAnalytics;
}

const EmployeeReport = ({
  employees,
}: EmployeeReportProps) => {
  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center gap-3">

        <div className="rounded-xl bg-orange-100 p-3">
          <Users
            size={22}
            className="text-orange-600"
          />
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Employee Performance
          </h2>

          <p className="text-sm text-slate-500">
            Workforce size, activity, utilization, and hiring overview.
          </p>
        </div>

      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">
            Total Employees
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-900">
            {employees.total_employees}
          </p>
        </div>

        <div className="rounded-xl bg-green-50 p-4">

          <div className="flex items-center gap-2">
            <UserCheck
              size={16}
              className="text-green-600"
            />

            <p className="text-sm text-slate-500">
              Active Employees
            </p>
          </div>

          <p className="mt-1 text-2xl font-bold text-green-700">
            {employees.active_employees}
          </p>

        </div>

        <div className="rounded-xl bg-blue-50 p-4">

          <div className="flex items-center gap-2">
            <UserPlus
              size={16}
              className="text-blue-600"
            />

            <p className="text-sm text-slate-500">
              New Employees
            </p>
          </div>

          <p className="mt-1 text-2xl font-bold text-blue-700">
            {employees.new_employees}
          </p>

        </div>

        <div className="rounded-xl bg-slate-50 p-4">

          <p className="text-sm text-slate-500">
            Inactive Employees
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-700">
            {employees.inactive_employees}
          </p>

        </div>

      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">

        <div>

          <div className="mb-2 flex items-center justify-between">

            <span className="text-sm font-medium text-slate-700">
              Employee Utilization
            </span>

            <span className="font-semibold text-slate-900">
              {employees.employee_utilization}%
            </span>

          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-200">

            <div
              className="h-full rounded-full bg-orange-500"
              style={{
                width: `${Math.min(
                  Math.max(
                    employees.employee_utilization,
                    0,
                  ),
                  100,
                )}%`,
              }}
            />

          </div>

        </div>

        <div className="rounded-xl bg-slate-50 p-4">

          <p className="text-sm text-slate-500">
            Average Salary
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-900">
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 0,
            }).format(employees.average_salary)}
          </p>

        </div>

      </div>

    </section>
  );
};

export default EmployeeReport;