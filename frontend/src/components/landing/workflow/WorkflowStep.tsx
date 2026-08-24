import { ArrowDown, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface WorkflowStepProps {
  icon: LucideIcon;
  title: string;
  description: string;
  isLast?: boolean;
}

export default function WorkflowStep({
  icon: Icon,
  title,
  description,
  isLast = false,
}: WorkflowStepProps) {
  return (
    <div className="relative flex w-full flex-col items-center">
      {/* Step Card */}
      <div
        className="
          group
          flex
          h-full
          min-h-[430px]
          w-full
          flex-col
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-8
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-2
          hover:border-indigo-200
          hover:shadow-xl
        "
      >
        {/* Icon */}
        <div
          className="
            flex
            h-16
            w-16
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-indigo-100
            text-indigo-600
            transition-transform
            duration-300
            group-hover:scale-110
          "
        >
          <Icon className="h-8 w-8" />
        </div>

        {/* Content */}
        <h3 className="mt-6 text-xl font-bold text-slate-900">
          {title}
        </h3>

        <p className="mt-3 leading-7 text-slate-600">
          {description}
        </p>
      </div>

      {/* Connector */}
      {!isLast && (
        <>
          {/* Desktop */}
          <ArrowRight
            className="
              absolute
              -right-7
              top-1/2
              hidden
              h-8
              w-8
              -translate-y-1/2
              text-indigo-400
              lg:block
            "
          />

          {/* Mobile */}
          <ArrowDown
            className="
              mt-6
              h-8
              w-8
              text-indigo-400
              lg:hidden
            "
          />
        </>
      )}
    </div>
  );
}