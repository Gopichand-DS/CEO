import {
  AlertTriangle,
  AlertCircle,
  ShieldAlert,
} from "lucide-react";

import type {
  Alert,
} from "@/types/dashboard";

interface Props {
  alerts: Alert[];
}

const getSeverity = (
  severity: Alert["severity"]
) => {
  switch (severity) {
    case "critical":
      return {
        icon: (
          <ShieldAlert
            className="text-red-600"
            size={18}
          />
        ),
        badge: "bg-red-100 text-red-700",
      };

    case "high":
      return {
        icon: (
          <AlertTriangle
            className="text-orange-600"
            size={18}
          />
        ),
        badge: "bg-orange-100 text-orange-700",
      };

    case "medium":
      return {
        icon: (
          <AlertCircle
            className="text-yellow-600"
            size={18}
          />
        ),
        badge: "bg-yellow-100 text-yellow-700",
      };

    default:
      return {
        icon: (
          <AlertCircle
            className="text-blue-600"
            size={18}
          />
        ),
        badge: "bg-blue-100 text-blue-700",
      };
  }
};

const CriticalAlerts = ({
  alerts,
}: Props) => {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="mb-6">

        <h2 className="text-xl font-bold">
          Critical Alerts
        </h2>

        <p className="text-sm text-slate-500">
          Items requiring executive attention
        </p>

      </div>

      <div className="space-y-4">

        {alerts.map((alert) => {
          const style = getSeverity(alert.severity);

          return (
            <div
              key={alert.id}
              className="rounded-xl border border-slate-200 p-4"
            >
              <div className="flex items-start justify-between">

                <div className="flex gap-3">

                  {style.icon}

                  <div>

                    <h3 className="font-semibold">
                      {alert.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {alert.description}
                    </p>

                    <span className="mt-2 block text-xs text-slate-400">
                      {alert.created_at}
                    </span>

                  </div>

                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${style.badge}`}
                >
                  {alert.severity.toUpperCase()}
                </span>

              </div>
            </div>
          );
        })}

      </div>

    </div>
  );
};

export default CriticalAlerts;