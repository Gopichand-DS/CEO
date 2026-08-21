import { Link } from "react-router-dom";

export default function RegisterHeader() {
  return (
    <div className="text-center">
      <h1
        className="
          text-3xl
          font-bold
          tracking-tight
          text-slate-900
        "
      >
        Create Your Account
      </h1>

      <p
        className="
          mt-3
          text-base
          leading-7
          text-slate-600
        "
      >
        Join <span className="font-semibold text-slate-900">Mini CEO</span> and
        empower your business with AI-driven executive intelligence.
      </p>

      <div
        className="
          mt-6
          flex
          items-center
          justify-center
          gap-1
          text-sm
        "
      >
        <span className="text-slate-500">
          Already have an account?
        </span>

        <Link
          to="/login"
          className="
            font-semibold
            text-[#4F46E5]
            transition-colors
            duration-300
            hover:text-[#4338CA]
          "
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}