import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();

  const paths = location.pathname
    .split("/")
    .filter(Boolean);

  return (
    <nav className="flex items-center gap-2 text-sm text-slate-500">
      <Link
        to="/dashboard"
        className="hover:text-blue-600"
      >
        Dashboard
      </Link>

      {paths.slice(1).map((path, index) => {
        const url =
          "/dashboard/" +
          paths.slice(1, index + 2).join("/");

        return (
          <div
            key={url}
            className="flex items-center gap-2"
          >
            <ChevronRight size={16} />

            <Link
              to={url}
              className="capitalize hover:text-blue-600"
            >
              {path.replace("-", " ")}
            </Link>
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;