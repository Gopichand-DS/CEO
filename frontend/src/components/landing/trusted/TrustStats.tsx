import {
  Clock3,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";

const stats = [
  {
    icon: Shield,
    value: "99.99%",
    label: "Platform Availability",
  },
  {
    icon: Clock3,
    value: "24/7",
    label: "AI Monitoring",
  },
  {
    icon: Sparkles,
    value: "Enterprise",
    label: "Ready",
  },
  {
    icon: Zap,
    value: "< 2 sec",
    label: "AI Response",
  },
];

export default function TrustStats() {
  return (
    <div className="mt-20 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center"
            >
              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-indigo-100
                  text-indigo-600
                "
              >
                <Icon className="h-7 w-7" />
              </div>

              <h3 className="mt-5 text-3xl font-bold text-slate-900">
                {stat.value}
              </h3>

              <p className="mt-2 text-sm font-medium text-slate-500">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}