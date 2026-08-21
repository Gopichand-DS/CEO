import {
  Activity,
  BrainCircuit,
  CheckCircle2,
  LayoutDashboard,
} from "lucide-react";

import { Card } from "@/components/ui";

const advantages = [
  {
    icon: BrainCircuit,
    title: "AI Executive Reports",
    description:
      "Receive executive-ready reports automatically without collecting data manually.",
  },
  {
    icon: LayoutDashboard,
    title: "Unified Dashboard",
    description:
      "Monitor your entire organization from a single executive intelligence platform.",
  },
  {
    icon: Activity,
    title: "Instant Investigation",
    description:
      "Identify business issues, discover root causes, and receive AI recommendations within seconds.",
  },
  {
    icon: CheckCircle2,
    title: "Proactive Decisions",
    description:
      "Predict risks early and act before operational issues impact revenue or customer satisfaction.",
  },
];

export default function AfterCard() {
  return (
    <Card
      hover
      className="relative border-emerald-100"
    >
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-6 w-6" />
        </div>

        <div>
          <p className="text-sm font-medium text-emerald-600">
            After
          </p>

          <h3 className="text-2xl font-bold text-slate-900">
            Mini CEO AI
          </h3>
        </div>
      </div>

      <div className="space-y-5">
        {advantages.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="
                flex
                gap-4
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                p-4
              "
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                <Icon className="h-5 w-5" />
              </div>

              <div>
                <h4 className="font-semibold text-slate-900">
                  {item.title}
                </h4>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}