import {
  BrainCircuit,
  Building2,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

const certifications = [
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description:
      "Role-based access control with enterprise-grade authentication.",
  },
  {
    icon: Building2,
    title: "Multi-Tenant Architecture",
    description:
      "Secure company data isolation designed for organizations of any size.",
  },
  {
    icon: BrainCircuit,
    title: "AI-Powered Intelligence",
    description:
      "Transform operational data into executive insights using AI.",
  },
  {
    icon: LockKeyhole,
    title: "End-to-End Encryption",
    description:
      "Protect sensitive business information during storage and transmission.",
  },
];

export default function Certifications() {
  return (
    <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {certifications.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-indigo-200
              hover:shadow-lg
            "
          >
            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-xl
                bg-indigo-100
                text-indigo-600
              "
            >
              <Icon className="h-7 w-7" />
            </div>

            <h3 className="mt-6 text-lg font-semibold text-slate-900">
              {item.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              {item.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}