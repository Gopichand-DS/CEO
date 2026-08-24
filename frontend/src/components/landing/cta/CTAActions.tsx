import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui";

export default function CTAActions() {
  return (
    <div className="mt-12 flex items-center justify-center">
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
    </div>
  );
}