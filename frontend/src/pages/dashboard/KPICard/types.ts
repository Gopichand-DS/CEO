import type { ElementType } from "react";

export interface KPI {
  id: number;
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: ElementType;
}