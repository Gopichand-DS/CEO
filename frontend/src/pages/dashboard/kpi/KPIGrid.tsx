import {
  DollarSign,
  TrendingUp,
  Users,
  FolderKanban,
} from "lucide-react";

import KPICard from "../KPICard/KPICard";

interface KPIGridProps {
  kpis: {
    revenue: number;
    profit: number;
    employees: number;
    projects: number;
  };
}

const KPIGrid = ({
  kpis,
}: KPIGridProps) => {
  const items = [
    {
      id: 1,
      title: "Revenue",
      value: `₹${kpis.revenue.toLocaleString("en-IN")}`,
      change: "0%",
      trend: "up" as const,
      icon: DollarSign,
    },
    {
      id: 2,
      title: "Profit",
      value: `₹${kpis.profit.toLocaleString("en-IN")}`,
      change: "0%",
      trend: "up" as const,
      icon: TrendingUp,
    },
    {
      id: 3,
      title: "Employees",
      value: kpis.employees.toString(),
      change: "Active",
      trend: "up" as const,
      icon: Users,
    },
    {
      id: 4,
      title: "Projects",
      value: kpis.projects.toString(),
      change: "Running",
      trend: "up" as const,
      icon: FolderKanban,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <KPICard
          key={item.id}
          item={item}
        />
      ))}
    </div>
  );
};

export default KPIGrid;