import {
  BrainCircuit,
  Sparkles,
} from "lucide-react";

interface Props {
  summary: string;
}

const AIExecutiveInsights = ({
  summary,
}: Props) => {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm h-full">

      <div className="flex items-center gap-3">

        <div className="rounded-xl bg-violet-100 p-3">
          <BrainCircuit
            className="text-violet-600"
            size={24}
          />
        </div>

        <div>
          <h2 className="text-xl font-bold">
            AI Executive Insights
          </h2>

          <p className="text-sm text-slate-500">
            AI-generated business summary
          </p>
        </div>

      </div>

      <div className="mt-8 rounded-xl bg-slate-50 p-5">

        <div className="mb-4 flex items-center gap-2">

          <Sparkles
            size={18}
            className="text-amber-500"
          />

          <span className="font-semibold">
            Executive Summary
          </span>

        </div>

        <p className="leading-8 text-slate-700">
          {summary}
        </p>

      </div>

    </div>
  );
};

export default AIExecutiveInsights;