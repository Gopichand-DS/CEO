import { Bot } from "lucide-react";
import { Link } from "react-router-dom";

export default function NavLogo() {
  return (
    <Link
      to="/"
      className="group flex items-center gap-3"
      aria-label="Mini CEO"
    >
      <div
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-2xl
          bg-[#4F46E5]
          text-white
          shadow-lg
          transition-all
          duration-300
          group-hover:scale-105
          group-hover:shadow-indigo-500/30
        "
      >
        <Bot className="h-6 w-6" />
      </div>

      <div className="flex flex-col leading-none">
        <span
          className="
            text-base
            font-bold
            tracking-tight
            text-white
            transition-colors
            duration-300
            sm:text-lg
          "
        >
          Mini CEO
        </span>

        <span
          className="
            mt-0.5
            hidden
            text-xs
            font-medium
            tracking-wide
            uppercase
            text-slate-400
            sm:block
          "
        >
          Executive Intelligence
        </span>
      </div>
    </Link>
  );
}