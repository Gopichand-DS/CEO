import { Sparkles } from "lucide-react";

interface AIExecutiveSummaryProps {
  summary: string;
}

const AIExecutiveSummary = ({
  summary,
}: AIExecutiveSummaryProps) => {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="mb-5 flex items-center gap-3">

        <div className="rounded-xl bg-violet-100 p-3">
          <Sparkles
            size={24}
            className="text-violet-600"
          />
        </div>

        <div>

          <h2 className="text-xl font-bold">
            AI Executive Summary
          </h2>

          <p className="text-sm text-slate-500">
            AI-generated operational insights for executives
          </p>

        </div>

      </div>

      <div className="rounded-xl bg-slate-50 p-5">

        <p className="text-base leading-8 text-slate-700">

          {summary && summary.trim().length > 0
            ? summary
            : "No executive summary is available."}

        </p>

      </div>

    </div>
  );
};

export default AIExecutiveSummary;