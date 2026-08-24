import {
  Activity,
  Building2,
  ShieldCheck,
  Zap,
} from "lucide-react";

const metrics = [
  {
    icon: Building2,
    title: "500+",
    subtitle: "Companies",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise",
    subtitle: "Security",
  },
  {
    icon: Activity,
    title: "99.99%",
    subtitle: "Uptime",
  },
  {
    icon: Zap,
    title: "24/7",
    subtitle: "AI Monitoring",
  },
];

export default function HeroMetrics() {
  return (
    <div className="mt-10 flex flex-wrap gap-5">
      {metrics.map((metric) => {
        const Icon = metric.icon;

        return (
          <div
            key={metric.subtitle}
            className="
              w-fit
              min-w-[160px]
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-5
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-indigo-200
              hover:shadow-lg
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-indigo-100
                  text-indigo-600
                "
              >
                <Icon className="h-5 w-5" />
              </div>

              <div className="whitespace-nowrap">
                <h3 className="text-lg font-bold leading-tight text-slate-900">
                  {metric.title}
                </h3>

                <p className="mt-1 text-sm leading-tight text-slate-500">
                  {metric.subtitle}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}