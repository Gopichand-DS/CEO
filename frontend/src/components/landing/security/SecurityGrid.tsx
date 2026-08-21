import {
  Database,
  FileCheck2,
  KeyRound,
  Lock,
  ShieldCheck,
  UserCog,
} from "lucide-react";

import SecurityCard from "./SecurityCard";

const securityFeatures = [
  {
    icon: KeyRound,
    title: "JWT Authentication",
    description:
      "Secure authentication using industry-standard JWT access tokens to protect user sessions and API communication.",
  },
  {
    icon: Database,
    title: "Multi-Tenant Architecture",
    description:
      "Every company's data is logically isolated, ensuring complete separation and protection between organizations.",
  },
  {
    icon: UserCog,
    title: "Role-Based Access Control",
    description:
      "Grant employees, managers, and executives only the permissions required for their responsibilities.",
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description:
      "Sensitive business information is protected during transmission and securely handled throughout the platform.",
  },
  {
    icon: ShieldCheck,
    title: "Secure AI Processing",
    description:
      "AI investigations and executive insights operate within your organization's secured environment without exposing company data.",
  },
  {
    icon: FileCheck2,
    title: "Audit Logs & Monitoring",
    description:
      "Track authentication events, system activity, and important business actions for transparency and compliance.",
  },
];

export default function SecurityGrid() {
  return (
    <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {securityFeatures.map((feature) => (
        <SecurityCard
          key={feature.title}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
}