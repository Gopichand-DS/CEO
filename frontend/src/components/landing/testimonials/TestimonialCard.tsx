import { Quote, Star } from "lucide-react";

import { Card } from "@/components/ui";

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  quote: string;
  initials: string;
}

export default function TestimonialCard({
  name,
  role,
  company,
  quote,
  initials,
}: TestimonialCardProps) {
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
      {/* Quote Icon */}
      <div className="flex items-center justify-between">
        <div className="rounded-2xl bg-indigo-100 p-3 text-indigo-600">
          <Quote className="h-6 w-6" />
        </div>

        <div className="flex items-center gap-1 text-amber-400">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className="h-4 w-4 fill-current"
            />
          ))}
        </div>
      </div>

      {/* Testimonial */}
      <p className="mt-8 leading-8 text-slate-600 italic">
        "{quote}"
      </p>

      {/* Executive */}
      <div className="mt-8 flex items-center gap-4">
        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            bg-gradient-to-r
            from-indigo-600
            to-violet-600
            text-lg
            font-bold
            text-white
            transition-transform
            duration-300
            group-hover:scale-110
          "
        >
          {initials}
        </div>

        <div>
          <h3 className="font-semibold text-slate-900">
            {name}
          </h3>

          <p className="text-sm text-slate-500">
            {role}
          </p>

          <p className="text-sm font-medium text-indigo-600">
            {company}
          </p>
        </div>
      </div>
    </Card>
  );
}