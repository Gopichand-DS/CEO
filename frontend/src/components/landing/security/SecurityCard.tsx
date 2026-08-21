import { CheckCircle2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card, IconBox } from "@/components/ui";

interface SecurityCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function SecurityCard({
  icon,
  title,
  description,
}: SecurityCardProps) {
  const Icon = icon;

  return (
    <Card
      className="
        group
        h-full
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-8
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-indigo-200
        hover:shadow-xl
      "
    >
      <IconBox
        className="
          transition-transform
          duration-300
          group-hover:scale-110
        "
      >
        <Icon className="h-6 w-6" />
      </IconBox>

      <h3 className="mt-6 text-xl font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-slate-600">
        {description}
      </p>

      <div className="mt-6 flex items-center gap-2 text-sm font-medium text-emerald-600">
        <CheckCircle2 className="h-5 w-5" />
        Enterprise Ready
      </div>
    </Card>
  );
}