const companies = [
  "Enterprise Co.",
  "GlobalTech",
  "Nova Systems",
  "Vertex Group",
  "Prime Analytics",
  "FutureWorks",
];

export default function CompanyLogos() {
  return (
    <div className="mt-16">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
        {companies.map((company) => (
          <div
            key={company}
            className="
              flex
              h-20
              items-center
              justify-center
              rounded-2xl
              border
              border-slate-200
              bg-white
              px-6
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-indigo-200
              hover:shadow-md
            "
          >
            <span
              className="
                text-center
                text-sm
                font-semibold
                tracking-wide
                text-slate-500
              "
            >
              {company}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}