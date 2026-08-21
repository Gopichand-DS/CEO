import {
  Building2,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

interface DepartmentPerformanceItem {
  id: number;
  department: string;
  performance: number;
  employees: number;
  status: string;
}

interface DepartmentPerformanceProps {
  departments: DepartmentPerformanceItem[];
}

const DepartmentPerformance = ({
  departments,
}: DepartmentPerformanceProps) => {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center gap-3">
        <Building2 className="text-blue-600" />

        <div>
          <h2 className="text-xl font-bold">
            Department Performance
          </h2>

          <p className="text-sm text-slate-500">
            Performance overview across all departments
          </p>
        </div>
      </div>

      {departments.length === 0 ? (
        <div className="py-10 text-center text-slate-500">
          No departments found.
        </div>
      ) : (
        <div className="space-y-6">
          {departments.map((department) => (
            <div key={department.id}>

              <div className="mb-2 flex items-center justify-between">

                <div>
                  <h3 className="font-semibold">
                    {department.department}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {department.employees} Employees
                  </p>
                </div>

                <div className="flex items-center gap-2">

                  {department.status === "Excellent" && (
                    <CheckCircle2
                      size={18}
                      className="text-green-600"
                    />
                  )}

                  {department.status === "Good" && (
                    <TrendingUp
                      size={18}
                      className="text-blue-600"
                    />
                  )}

                  {department.status === "Needs Attention" && (
                    <AlertTriangle
                      size={18}
                      className="text-red-600"
                    />
                  )}

                  <span
                    className={`text-sm font-semibold ${
                      department.status === "Excellent"
                        ? "text-green-600"
                        : department.status === "Good"
                        ? "text-blue-600"
                        : "text-red-600"
                    }`}
                  >
                    {department.status}
                  </span>

                </div>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-200">

                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    department.performance >= 90
                      ? "bg-green-500"
                      : department.performance >= 70
                      ? "bg-blue-500"
                      : "bg-red-500"
                  }`}
                  style={{
                    width: `${department.performance}%`,
                  }}
                />

              </div>

              <div className="mt-2 flex justify-end">

                <span className="text-sm font-semibold text-slate-600">
                  {department.performance}%
                </span>

              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DepartmentPerformance;