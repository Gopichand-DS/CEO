import {
  Bell,
  Building2,
  FolderKanban,
  LayoutDashboard,
  Settings,
  Sparkles,
  Users,
  BarChart3,
} from "lucide-react";

import type { SidebarMenuItem } from "./sidebar.types";

export const sidebarItems: SidebarMenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "ai",
    label: "AI Assistant",
    path: "/dashboard/ai",
    icon: Sparkles,
  },
  {
    id: "projects",
    label: "Projects",
    path: "/dashboard/projects",
    icon: FolderKanban,
  },
  {
    id: "employees",
    label: "Employees",
    path: "/dashboard/employees",
    icon: Users,
  },
  {
    id: "reports",
    label: "Reports",
    path: "/dashboard/reports",
    icon: BarChart3,
  },
  {
    id: "company",
    label: "Company",
    path: "/dashboard/company",
    icon: Building2,
  },
  {
    id: "notifications",
    label: "Notifications",
    path: "/dashboard/notifications",
    icon: Bell,
  },
  {
    id: "settings",
    label: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
  },
];