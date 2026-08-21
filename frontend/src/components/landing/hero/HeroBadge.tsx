import { Sparkles } from "lucide-react";

export default function HeroBadge() {
  return (
    <div
      className="
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        border-indigo-200
        bg-indigo-50
        px-4
        py-2
        text-sm
        font-semibold
        text-indigo-700
        shadow-sm
        transition-all
        duration-300
        hover:border-indigo-300
        hover:bg-indigo-100
      "
    >
      <Sparkles className="h-4 w-4" />

      <span>AI Executive Intelligence Platform</span>
    </div>
  );
}