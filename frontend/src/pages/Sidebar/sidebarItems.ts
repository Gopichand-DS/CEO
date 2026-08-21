import {
  LayoutDashboard,
  BrainCircuit,
  FolderKanban,
  Users,
  BarChart3,
  Building2,
  Bell,
  ListChecks,
  Settings,
  GroupIcon,
} from "lucide-react";

export const sidebarItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "AI Assistant",
    path: "/dashboard/ai",
    icon: BrainCircuit,
  },
  {
    title: "Projects",
    path: "/dashboard/projects",
    icon: FolderKanban,
  },

  {
  title: "Tasks",
  path: "/dashboard/tasks",
  icon: ListChecks,
  },
  
  {
    title: "Employees",
    path: "/dashboard/employees",
    icon: Users,
  },

  {
  title: "Teams",
  path: "/dashboard/teams",
  icon: GroupIcon,
  },

  {
    title: "Reports",
    path: "/dashboard/reports",
    icon: BarChart3,
  },
  {
    title: "Company",
    path: "/dashboard/company",
    icon: Building2,
  },
  {
    title: "Notifications",
    path: "/dashboard/notifications",
    icon: Bell,
  },
  {
    title: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
  },
];