import {
  Users,
  UserCheck,
  UserPlus,
  UserX,
} from "lucide-react";

interface DepartmentDistribution {
  department: string;
  employees: number;
}

interface EmployeeOverviewData {
  total_employees: number;
  active_employees: number;
  on_leave: number;
  new_joinees: number;
  departments: DepartmentDistribution[];
}

interface EmployeeOverviewProps {
  overview: EmployeeOverviewData;
}

const EmployeeOverview = ({
  overview,
}: EmployeeOverviewProps) => {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center gap-3">

        <Users className="text-indigo-600" />

        <div>
          <h2 className="text-xl font-bold">
            Employee Overview
          </h2>

          <p className="text-sm text-slate-500">
            Workforce statistics and department distribution
          </p>
        </div>

      </div>

      <div className="grid grid-cols-2 gap-4">

        <div className="rounded-xl bg-blue-50 p-4">

          <div className="flex items-center gap-3">

            <Users className="text-blue-600" />

            <div>

              <p className="text-sm text-slate-500">
                Total Employees
              </p>

              <h3 className="text-2xl font-bold">
                {overview.total_employees}
              </h3>

            </div>

          </div>

        </div>

        <div className="rounded-xl bg-green-50 p-4">

          <div className="flex items-center gap-3">

            <UserCheck className="text-green-600" />

            <div>

              <p className="text-sm text-slate-500">
                Active
              </p>

              <h3 className="text-2xl font-bold">
                {overview.active_employees}
              </h3>

            </div>

          </div>

        </div>

        <div className="rounded-xl bg-yellow-50 p-4">

          <div className="flex items-center gap-3">

            <UserX className="text-yellow-600" />

            <div>

              <p className="text-sm text-slate-500">
                On Leave
              </p>

              <h3 className="text-2xl font-bold">
                {overview.on_leave}
              </h3>

            </div>

          </div>

        </div>

        <div className="rounded-xl bg-purple-50 p-4">

          <div className="flex items-center gap-3">

            <UserPlus className="text-purple-600" />

            <div>

              <p className="text-sm text-slate-500">
                New Joinees
              </p>

              <h3 className="text-2xl font-bold">
                {overview.new_joinees}
              </h3>

            </div>

          </div>

        </div>

      </div>

      <div className="mt-8">

        <h3 className="mb-4 text-lg font-semibold">
          Department Distribution
        </h3>

        {overview.departments.length === 0 ? (
          <div className="py-6 text-center text-slate-500">
            No departments available.
          </div>
        ) : (
          <div className="space-y-4">

            {overview.departments.map((department) => (

              <div key={department.department}>

                <div className="mb-2 flex justify-between">

                  <span className="font-medium">
                    {department.department}
                  </span>

                  <span className="text-sm text-slate-500">
                    {department.employees}
                  </span>

                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-200">

                  <div
                    className="h-full rounded-full bg-indigo-600"
                    style={{
                      width: `${
                        overview.total_employees > 0
                          ? (department.employees /
                              overview.total_employees) *
                            100
                          : 0
                      }%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default EmployeeOverview;