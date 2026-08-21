import {
  DollarSign,
  TrendingUp,
  Users,
  FolderKanban,
} from "lucide-react";

import KPICard from "../KPICard/KPICard";

import type { DashboardOverview } from "@/types/dashboard";

interface Props {
  dashboard: DashboardOverview;
}

const KPICards = ({ dashboard }: Props) => {
  const cards = [
    {
      id: 1,
      title: "Total Revenue",
      value: `₹${dashboard.kpis.revenue.toLocaleString()}`,
      change: "+12.5%",
      trend: "up" as const,
      icon: DollarSign,
    },
    {
      id: 2,
      title: "Profit",
      value: `₹${dashboard.kpis.profit.toLocaleString()}`,
      change: "+8.2%",
      trend: "up" as const,
      icon: TrendingUp,
    },
    {
      id: 3,
      title: "Employees",
      value: dashboard.kpis.employees.toString(),
      change: "+4",
      trend: "up" as const,
      icon: Users,
    },
    {
      id: 4,
      title: "Projects",
      value: dashboard.kpis.projects.toString(),
      change: "-2",
      trend: "down" as const,
      icon: FolderKanban,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((item) => (
        <KPICard
          key={item.id}
          item={item}
        />
      ))}
    </div>
  );
};

export default KPICards;