import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui";

interface NavActionsProps {
  mobile?: boolean;
  onNavigate?: () => void;
}

export default function NavActions({
  mobile = false,
  onNavigate,
}: NavActionsProps) {
  if (mobile) {
  return (
    <div className="mt-8 flex flex-col gap-3">
      {/* Login */}
      <Button
        asChild
        variant="outline"
        className="
          w-full
          rounded-xl
          border-white
          bg-white
          text-black
          hover:bg-slate-100
          hover:text-black
        "
      >
        <Link
          to="/login"
          onClick={onNavigate}
          className="flex w-full items-center justify-center text-black font-semibold"
        >
          Login
        </Link>
      </Button>

      {/* Get Started */}
      <Button
        asChild
        className="
          group
          w-full
          rounded-xl
          bg-[#4F46E5]
          text-white
          hover:bg-[#4338CA]
          hover:text-white
        "
      >
        <Link
          to="/register"
          onClick={onNavigate}
          className="flex w-full items-center justify-center text-white font-semibold"
        >
          Get Started

          <ArrowRight
            className="
              ml-2
              h-4
              w-4
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

  return (
    <div className="flex items-center gap-3">
      <Button
        asChild
        variant="outline"
        className=" h-10 rounded-xl bg-white px-6 text-black hover:bg-slate-100"
        
      >
        <Link to="/login"
         className="font-semibold text-black"
         >
          Login
        </Link>
      </Button>

      <Button
        asChild
        className=" group rounded-xl bg-indigo-600 px-6 text-white shadow-lg transition-all duration-300 hover:bg-indigo-500 hover:text-white active:bg-indigo-700 border-0 "
      >
        <Link to="/register"
        className="flex items-center font-semibold text-white"
        >
          Get Started

          <ArrowRight
            className=" ml-2 h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-1" 
              />
        </Link>
      </Button>
    </div>
  );
}