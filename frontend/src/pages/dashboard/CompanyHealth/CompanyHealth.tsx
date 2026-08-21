import {
  HeartPulse,
  CheckCircle2,
} from "lucide-react";

import type {
  CompanyHealth as CompanyHealthType,
} from "@/types/dashboard";

interface Props {
  health: CompanyHealthType;
}

const HealthBar = ({
  label,
  value,
}: {
  label: string;
  value: number;
}) => (
  <div>

    <div className="mb-2 flex justify-between">

      <span className="text-sm font-medium">
        {label}
      </span>

      <span className="text-sm font-semibold">
        {value}%
      </span>

    </div>

    <div className="h-3 rounded-full bg-slate-200">

      <div
        className={`h-full rounded-full ${
          value >= 90
            ? "bg-green-500"
            : value >= 75
            ? "bg-blue-500"
            : value >= 60
            ? "bg-yellow-500"
            : "bg-red-500"
        }`}
        style={{
          width: `${value}%`,
        }}
      />

    </div>

  </div>
);

const CompanyHealth = ({
  health,
}: Props) => {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm h-full">

      <div className="mb-6 flex items-center gap-3">

        <HeartPulse
          className="text-red-500"
        />

        <div>

          <h2 className="text-xl font-bold">
            Company Health
          </h2>

          <p className="text-sm text-slate-500">
            Overall organizational health
          </p>

        </div>

      </div>

      <div className="mb-8 flex flex-col items-center">

        <div className="flex h-28 w-28 items-center justify-center rounded-full border-8 border-green-500">

          <span className="text-3xl font-bold">
            {health.overall_score}%
          </span>

        </div>

        <div className="mt-3 flex items-center gap-2">

          <CheckCircle2
            className="text-green-600"
            size={18}
          />

          <span className="font-semibold text-green-600">
            Excellent
          </span>

        </div>

      </div>

      <div className="space-y-5">

        <HealthBar
          label="Financial"
          value={health.financial_health}
        />

        <HealthBar
          label="Employees"
          value={health.employee_health}
        />

        <HealthBar
          label="Operations"
          value={health.operational_health}
        />

        <HealthBar
          label="Customer"
          value={health.customer_health}
        />

      </div>

    </div>
  );
};

export default CompanyHealth;