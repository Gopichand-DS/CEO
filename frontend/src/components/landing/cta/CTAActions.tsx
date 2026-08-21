import { ArrowRight, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui";

export default function CTAActions() {
  return (
    <div className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
      {/* Primary Button */}
      <Button
        asChild
        size="lg"
        className="
          group
          h-14
          min-w-[240px]
          rounded-xl
          bg-[#4F46E5]
          px-8
          text-base
          font-semibold
          text-white
          shadow-xl
          transition-all
          duration-300
          hover:-translate-y-1
          hover:bg-[#4338CA]
          hover:text-white
          hover:shadow-2xl
          active:bg-[#3730A3]
        "
      >
        <Link
          to="/register"
          className="flex items-center justify-center text-white"
        >
          <span>Get Started</span>

          <ArrowRight
            className="
              ml-2
              h-5
              w-5
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />
        </Link>
      </Button>

      {/* Secondary Button */}
      <Button
        asChild
        size="lg"
        className="
          group
          h-14
          min-w-[240px]
          rounded-xl
          border
          border-white/20
          bg-white/5
          px-8
          text-base
          font-semibold
          text-white
          backdrop-blur-xl
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-white/40
          hover:bg-white/10
          hover:text-white
        "
      >
        <Link
          to="/book-demo"
          className="flex items-center justify-center text-white"
        >
          <CalendarDays
            className="
              mr-2
              h-5
              w-5
              transition-transform
              duration-300
              group-hover:scale-110
            "
          />

          <span>Book a Demo</span>
        </Link>
      </Button>
    </div>
  );
}