import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function LoginFooter() {
  return (
    <div className="mt-8 border-t border-slate-200 pt-6 text-center">
      <p className="text-sm text-slate-600">
        Don't have an account?
      </p>

      <Link
        to="/register"
        className="
          mt-3
          inline-flex
          items-center
          gap-2
          font-semibold
          text-indigo-600
          transition-colors
          hover:text-indigo-700
        "
      >
        Create your organization

        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}