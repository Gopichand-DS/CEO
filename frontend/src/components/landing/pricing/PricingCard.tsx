import { Check, Sparkles } from "lucide-react";

import { Button, Card } from "@/components/ui";

interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export default function PricingCard({
  name,
  price,
  description,
  features,
  popular = false,
}: PricingCardProps) {
  return (
    <Card
      className={`
        relative
        h-full
        rounded-3xl
        border
        p-8
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-2xl
        ${
          popular
            ? "scale-105 border-indigo-600 bg-indigo-50 shadow-xl"
            : "border-slate-200 bg-white hover:border-indigo-200"
        }
      `}
    >
      {/* Popular Badge */}
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
            <Sparkles className="h-4 w-4" />
            Most Popular
          </div>
        </div>
      )}

      {/* Plan Name */}
      <h3 className="text-2xl font-bold text-slate-900">
        {name}
      </h3>

      {/* Description */}
      <p className="mt-3 leading-7 text-slate-600">
        {description}
      </p>

      {/* Price */}
      <div className="mt-8 flex items-end gap-2">
        <span className="text-5xl font-extrabold tracking-tight text-slate-900">
          {price}
        </span>

        <span className="pb-2 text-slate-500">
          /month
        </span>
      </div>

      {/* Features */}
      <div className="mt-10 space-y-4">
        {features.map((feature) => (
          <div
            key={feature}
            className="flex items-start gap-3"
          >
            <div className="rounded-full bg-emerald-100 p-1">
              <Check className="h-4 w-4 text-emerald-600" />
            </div>

            <span className="text-slate-700">
              {feature}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <Button
        className="mt-10 w-full"
        variant={popular ? "primary" : "outline"}
        size="lg"
      >
        Get Started
      </Button>
    </Card>
  );
}