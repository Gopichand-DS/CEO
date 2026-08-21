import { ArrowRight, Sparkles } from "lucide-react";

export default function ComparisonDivider() {
  return (
    <div className="flex items-center justify-center py-8 lg:py-0">
      <div className="flex flex-col items-center">
        <div
          className="
            flex
            h-24
            w-24
            items-center
            justify-center
            rounded-full
            bg-gradient-to-br
            from-indigo-600
            to-violet-600
            text-white
            shadow-xl
            shadow-indigo-500/20
            transition-transform
            duration-300
            hover:scale-105
          "
        >
          <ArrowRight className="hidden h-10 w-10 lg:block" />

          <ArrowRight className="h-10 w-10 rotate-90 lg:hidden" />
        </div>

        <div className="mt-5 flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2">
          <Sparkles className="h-4 w-4 text-indigo-600" />

          <span className="text-sm font-semibold text-indigo-700">
            AI Transformation
          </span>
        </div>
      </div>
    </div>
  );
}