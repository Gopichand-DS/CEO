import {
  BarChart3,
  BrainCircuit,
  Database,
  Search,
  TrendingUp,
} from "lucide-react";

import WorkflowStep from "./WorkflowStep";

const workflowSteps = [
  {
    icon: Database,
    title: "Collect Business Data",
    description:
      "Securely connect ERP, CRM, HR, finance, and operational systems into one unified platform.",
  },
  {
    icon: BrainCircuit,
    title: "AI Understands Your Business",
    description:
      "Mini CEO analyzes company operations, KPIs, departments, and historical performance automatically.",
  },
  {
    icon: Search,
    title: "AI Investigates Issues",
    description:
      "Revenue drops, project delays, operational bottlenecks, and business anomalies are investigated instantly.",
  },
  {
    icon: BarChart3,
    title: "Executive Insights",
    description:
      "Generate executive-ready reports, dashboards, predictions, and strategic recommendations.",
  },
  {
    icon: TrendingUp,
    title: "Smarter CEO Decisions",
    description:
      "Take faster, data-driven decisions with complete business visibility and AI-powered guidance.",
  },
];

export default function WorkflowTimeline() {
  return (
    <div className="mt-20">
      <div
        className="
          grid
          items-stretch
          gap-10
          lg:grid-cols-5
        "
      >
        {workflowSteps.map((step, index) => (
          <WorkflowStep
            key={step.title}
            icon={step.icon}
            title={step.title}
            description={step.description}
            isLast={index === workflowSteps.length - 1}
          />
        ))}
      </div>
    </div>
  );
}