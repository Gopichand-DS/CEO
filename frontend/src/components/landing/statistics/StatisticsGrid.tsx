import {
  Activity,
  BrainCircuit,
  Building2,
  ChartNoAxesCombined,
  Clock3,
  ShieldCheck,
} from "lucide-react";

import StatisticCard from "./StatisticCard";

const statistics = [
  {
    value: "95%",
    title: "Faster Executive Reporting",
    description:
      "Generate executive-ready reports in seconds instead of spending hours collecting and analyzing business data.",
  },
  {
    value: "10×",
    title: "Quicker AI Investigations",
    description:
      "Rapidly identify revenue drops, project delays, and operational bottlenecks with AI-powered investigations.",
  },
  {
    value: "99.9%",
    title: "Platform Availability",
    description:
      "Designed for high availability to ensure executives always have access to critical business insights.",
  },
  {
    value: "24/7",
    title: "AI Executive Assistant",
    description:
      "Monitor your business continuously and receive intelligent recommendations anytime, day or night.",
  },
  {
    value: "100+",
    title: "Business KPIs Analyzed",
    description:
      "Track finance, sales, operations, HR, and project performance from one unified executive dashboard.",
  },
  {
    value: "Enterprise",
    title: "Multi-Tenant Architecture",
    description:
      "Built for organizations of every size with secure company isolation, scalability, and enterprise-grade reliability.",
  },
];

export default function StatisticsGrid() {
  return (
    <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {statistics.map((stat, index) => {
        const icons = [
          Clock3,
          BrainCircuit,
          ShieldCheck,
          Activity,
          ChartNoAxesCombined,
          Building2,
        ];

        const Icon = icons[index];

        return (
          <div key={stat.title} className="relative">
            <div className="absolute right-8 top-8 rounded-xl bg-indigo-50 p-3 text-indigo-600">
              <Icon className="h-6 w-6" />
            </div>

            <StatisticCard
              value={stat.value}
              title={stat.title}
              description={stat.description}
            />
          </div>
        );
      })}
    </div>
  );
}