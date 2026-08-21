import type { LucideIcon } from "lucide-react";

export interface SidebarMenuItem {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
}