import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui";

interface StatisticCardProps {
  value: string;
  title: string;
  description: string;
}

export default function StatisticCard({
  value,
  title,
  description,
}: StatisticCardProps) {
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
        text-center
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-indigo-200
        hover:shadow-xl
      "
    >
      {/* Statistic Value */}
      <div
        className="
          bg-gradient-to-r
          from-indigo-600
          to-violet-600
          bg-clip-text
          text-5xl
          font-extrabold
          tracking-tight
          text-transparent
          transition-transform
          duration-300
          group-hover:scale-110
        "
      >
        {value}
      </div>

      {/* Title */}
      <h3 className="mt-6 text-xl font-semibold text-slate-900">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-4 leading-7 text-slate-600">
        {description}
      </p>

      {/* Footer */}
      <Link
  to="/login"
  className="
    mt-8
    flex
    items-center
    justify-center
    gap-2
    text-sm
    font-medium
    text-indigo-600
    transition-all
    duration-300
    hover:gap-3
  "
>
  <span>Business Impact</span>

  <ArrowUpRight
    className="
      h-4
      w-4
      transition-transform
      duration-300
      group-hover:translate-x-1
      group-hover:-translate-y-1
    "
  />
</Link>
    </Card>
  );
}