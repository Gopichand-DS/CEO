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
          overflow-hidden
          rounded-2xl
          bg-[#fbf6e3]
          shadow-lg
          transition-all
          duration-300
          group-hover:scale-105
        "
      >
        <img
          src="/logo.png"
          alt="Mini CEO"
          className="h-full w-full object-cover"
        />
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