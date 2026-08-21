export interface KPI {
  revenue: number;
  profit: number;
  employees: number;
  projects: number;
}

export interface RevenueChartItem {
  month: string;
  revenue: number;
  profit: number;
}

export interface Activity {
   id: number;
  title: string;
  description: string;
  created_at: string;
  type: string;
}

export interface EmployeeDepartment {
  department: string;
  employees: number;
}

export interface EmployeeOverview {
  total_employees: number;
  active_employees: number;
  on_leave: number;
  new_joinees: number;
  departments: EmployeeDepartment[];
}

export interface ProjectStatus {
  id: number;
  project: string;
  manager: string;
  progress: number;
  status: "On Track" | "At Risk" | "Delayed" | "Completed";
  due_date: string;
}

export interface DepartmentPerformance {
  id: number;
  department: string;
  performance: number;
  employees: number;
  status: "Excellent" | "Good" | "Needs Attention";
}

export interface CompanyHealth {
  overall_score: number;
  financial_health: number;
  employee_health: number;
  operational_health: number;
  customer_health: number;
}

export interface Alert {
  id: number;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  created_at: string;
}

export interface PendingApproval {
  id: number;
  title: string;
  requested_by: string;
  category: string;
  priority: "high" | "medium" | "low";
  requested_at: string;
}

export interface ExecutiveMetric {
  title: string;
  value: string;
  trend: string;
  status: "positive" | "warning" | "negative";
}


export interface DashboardOverview {
  kpis: KPI;
  revenue_chart: RevenueChartItem[];
  activities: Activity[];
  alerts: Alert[];
  executive_metrics: ExecutiveMetric[];
  company_health: CompanyHealth;
  approvals: PendingApproval[];
  ai_summary: string;
  department_performance: DepartmentPerformance[];
  project_status: ProjectStatus[];
  employee_overview: EmployeeOverview;
}