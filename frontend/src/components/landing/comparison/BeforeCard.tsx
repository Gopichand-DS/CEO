import {
  Clock3,
  FileSpreadsheet,
  SearchX,
  XCircle,
} from "lucide-react";

import { Card } from "@/components/ui";

const painPoints = [
  {
    icon: FileSpreadsheet,
    title: "Manual Reports",
    description:
      "Executives spend hours collecting reports from multiple departments.",
  },
  {
    icon: SearchX,
    title: "Disconnected Systems",
    description:
      "Business data is scattered across dashboards, spreadsheets, and emails.",
  },
  {
    icon: Clock3,
    title: "Slow Decisions",
    description:
      "Finding the root cause of business issues often takes days.",
  },
  {
    icon: XCircle,
    title: "Reactive Management",
    description:
      "Problems are discovered only after they have already impacted revenue.",
  },
];

export default function BeforeCard() {
  return (
    <Card
      hover
      className="relative border-red-100"
    >
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
          <XCircle className="h-6 w-6" />
        </div>

        <div>
          <p className="text-sm font-medium text-red-600">
            Before
          </p>

          <h3 className="text-2xl font-bold text-slate-900">
            Traditional Business
          </h3>
        </div>
      </div>

      <div className="space-y-5">
        {painPoints.map((item) => {
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
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
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