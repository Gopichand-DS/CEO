import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SearchResult {
  title: string;
  description: string;
  path: string;
}

const searchResults: SearchResult[] = [
  {
    title: "Dashboard",
    description: "Company overview and executive metrics",
    path: "/dashboard",
  },
  {
    title: "AI Assistant",
    description: "Ask questions and investigate business data",
    path: "/dashboard/ai",
  },
  {
    title: "Projects",
    description: "Manage and monitor company projects",
    path: "/dashboard/projects",
  },
  {
    title: "Employees",
    description: "View and manage employees",
    path: "/dashboard/employees",
  },
  {
    title: "Teams",
    description: "Manage company teams",
    path: "/dashboard/teams",
  },
  {
    title: "Tasks",
    description: "Track company tasks and progress",
    path: "/dashboard/tasks",
  },
  {
    title: "Reports",
    description: "Executive reports and business analytics",
    path: "/dashboard/reports",
  },
  {
    title: "Company",
    description: "Company performance and analytics",
    path: "/dashboard/company",
  },
  {
    title: "Settings",
    description: "Manage your profile and account",
    path: "/dashboard/settings",
  },
  {
    title: "Notifications",
    description: "View company notifications and alerts",
    path: "/dashboard/notifications",
  },
];

const SearchBox = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();

  const results =
    normalizedQuery.length === 0
      ? []
      : searchResults
          .filter((item) => {
            const searchableText =
              `${item.title} ${item.description}`.toLowerCase();

            return searchableText.includes(
              normalizedQuery,
            );
          })
          .sort((a, b) => {
            const aExact =
              a.title.toLowerCase() === normalizedQuery;

            const bExact =
              b.title.toLowerCase() === normalizedQuery;

            if (aExact && !bExact) return -1;
            if (!aExact && bExact) return 1;

            return 0;
          });

  const handleSelect = (path: string) => {
    setQuery("");
    navigate(path);
  };

  return (
    <div className="relative w-full max-w-md">

      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        value={query}
        onChange={(event) =>
          setQuery(event.target.value)
        }
        placeholder="Search..."
        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:bg-white"
      />

      {normalizedQuery && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">

          {results.length > 0 ? (
            <div className="max-h-80 overflow-y-auto py-2">

              {results.map((result) => (
                <button
                  key={result.path}
                  type="button"
                  onClick={() =>
                    handleSelect(result.path)
                  }
                  className="w-full px-4 py-3 text-left transition hover:bg-slate-50"
                >
                  <p className="font-medium text-slate-900">
                    {result.title}
                  </p>

                  <p className="mt-0.5 text-xs text-slate-500">
                    {result.description}
                  </p>
                </button>
              ))}

            </div>
          ) : (
            <div className="px-4 py-6 text-center">

              <p className="text-sm font-medium text-slate-700">
                No matching results
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Try searching for a dashboard section.
              </p>

            </div>
          )}

        </div>
      )}

    </div>
  );
};

export default SearchBox;