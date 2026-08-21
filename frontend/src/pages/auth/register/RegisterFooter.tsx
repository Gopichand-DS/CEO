import { Link } from "react-router-dom";
import { Copyright } from "lucide-react";

export default function RegisterFooter() {
  return (
    <div
      className="
        mt-10
        border-t
        border-slate-200
        pt-6
      "
    >
      <div
        className="
          flex
          flex-col
          items-center
          justify-between
          gap-4
          text-sm
          text-slate-500
          sm:flex-row
        "
      >
        {/* Copyright */}
        <div className="flex items-center gap-2">
          <Copyright className="h-4 w-4" />

          <span>
            {new Date().getFullYear()} Mini CEO
          </span>
        </div>

        {/* Footer Links */}
        <div className="flex items-center gap-6">
          <Link
            to="/privacy"
            className="
              transition-colors
              duration-300
              hover:text-[#4F46E5]
            "
          >
            Privacy
          </Link>

          <Link
            to="/terms"
            className="
              transition-colors
              duration-300
              hover:text-[#4F46E5]
            "
          >
            Terms
          </Link>

          <Link
            to="/support"
            className="
              transition-colors
              duration-300
              hover:text-[#4F46E5]
            "
          >
            Help
          </Link>
        </div>
      </div>
    </div>
  );
}