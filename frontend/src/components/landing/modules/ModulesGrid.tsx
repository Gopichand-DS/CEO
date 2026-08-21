import {
  BarChart3,
  BrainCircuit,
  BriefcaseBusiness,
  ClipboardCheck,
  DollarSign,
  Users,
} from "lucide-react";

import ModuleCard from "./ModuleCard";

const modules = [
  {
    icon: BrainCircuit,
    title: "Executive AI",
    description:
      "Talk to your business using natural language and receive executive-level insights in seconds.",
    features: [
      "AI Business Chat",
      "Executive Reports",
      "KPI Analysis",
      "Strategic Recommendations",
    ],
  },
  {
    icon: ClipboardCheck,
    title: "AI Investigation",
    description:
      "Automatically investigate revenue drops, project delays, operational issues, and business anomalies.",
    features: [
      "Root Cause Analysis",
      "Department Investigation",
      "AI Recommendations",
      "Risk Detection",
    ],
  },
  {
    icon: BarChart3,
    title: "Executive Reports",
    description:
      "Generate daily, weekly, and monthly executive summaries without manual reporting.",
    features: [
      "Daily Reports",
      "Revenue Dashboard",
      "Performance Trends",
      "Export & Share",
    ],
  },
  {
    icon: DollarSign,
    title: "Financial Analytics",
    description:
      "Monitor financial performance with AI-powered forecasting and profitability insights.",
    features: [
      "Revenue Tracking",
      "Expense Analysis",
      "Profit Forecasting",
      "Financial KPIs",
    ],
  },
  {
    icon: BriefcaseBusiness,
    title: "Project Intelligence",
    description:
      "Track project progress, identify bottlenecks, and predict delivery risks before they happen.",
    features: [
      "Project Health",
      "Timeline Analysis",
      "Delay Prediction",
      "Resource Utilization",
    ],
  },
  {
    icon: Users,
    title: "Employee Insights",
    description:
      "Understand workforce productivity, department performance, and organizational efficiency.",
    features: [
      "Performance Metrics",
      "Attendance Insights",
      "Department Analytics",
      "Productivity Trends",
    ],
  },
];

export default function ModulesGrid() {
  return (
    <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {modules.map((module) => (
        <ModuleCard
          key={module.title}
          icon={module.icon}
          title={module.title}
          description={module.description}
          features={module.features}
        />
      ))}
    </div>
  );
}