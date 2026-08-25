import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card, IconBox } from "@/components/ui";
import { Link, useLocation } from "react-router-dom";
interface ModuleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
}

export default function ModuleCard({
  icon: Icon,
  title,
  description,
  features,
}: ModuleCardProps) {
  const location = useLocation();
  return (
    <Card
      hover
      className="group h-full"
    >
      <IconBox className="transition-transform duration-300 group-hover:scale-110">
        <Icon className="h-6 w-6" />
      </IconBox>

      <h3 className="mt-6 text-2xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-slate-600">
        {description}
      </p>

      <ul className="mt-6 space-y-3">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-3"
          >
            <span className="h-2 w-2 rounded-full bg-indigo-600" />

            <span className="text-sm text-slate-600">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Link
  to="/login"
  state={{ backgroundLocation: location }}
  className="
    mt-8
    inline-flex
    items-center
    gap-2
    font-semibold
    text-indigo-600
    transition-all
    duration-300
    hover:gap-3
  "
>
  Learn More

  <ArrowRight className="h-4 w-4" />
</Link>
    </Card>
  );
}