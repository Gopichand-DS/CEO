import { ShieldCheck, BrainCircuit, BarChart3 } from "lucide-react";

export default function LoginLeftPanel() {
  return (
    <div className="flex h-full flex-col justify-center">
      <span
        className="
          inline-flex
          w-fit
          rounded-full
          border
          border-indigo-200
          bg-indigo-50
          px-4
          py-2
          text-sm
          font-semibold
          text-indigo-700
        "
      >
        Executive Intelligence Platform
      </span>

      <h2
        className="
          mt-6
          text-5xl
          font-bold
          leading-tight
          tracking-tight
          text-slate-900
        "
      >
        Welcome Back,
        <br />
        Executive.
      </h2>

      <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
        Access your AI-powered executive workspace and make faster,
        smarter business decisions with real-time operational intelligence.
      </p>

      <div className="mt-12 space-y-6">
        <Feature
          icon={<BrainCircuit className="h-6 w-6" />}
          title="AI Business Intelligence"
          description="Receive intelligent insights from your business data."
        />

        <Feature
          icon={<BarChart3 className="h-6 w-6" />}
          title="Real-Time Analytics"
          description="Monitor KPIs, projects, employees and operations."
        />

        <Feature
          icon={<ShieldCheck className="h-6 w-6" />}
          title="Enterprise Security"
          description="Protected with secure authentication and role-based access."
        />
      </div>
    </div>
  );
}

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function Feature({
  icon,
  title,
  description,
}: FeatureProps) {
  return (
    <div className="flex gap-4">
      <div
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-xl
          bg-indigo-100
          text-indigo-600
        "
      >
        {icon}
      </div>

      <div>
        <h3 className="font-semibold text-slate-900">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-slate-600">
          {description}
        </p>
      </div>
    </div>
  );
}