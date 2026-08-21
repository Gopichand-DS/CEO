export interface ProjectAnalytics {
  total_projects: number;
  active_projects: number;
  completed_projects: number;
  planned_projects: number;
  delayed_projects: number;
  completion_rate: number;
  average_progress: number;
  overdue_percentage: number;
  high_risk_projects: number;
}

export interface TaskAnalytics {
  total_tasks: number;
  pending_tasks: number;
  in_progress_tasks: number;
  in_review_tasks: number;
  completed_tasks: number;
  blocked_tasks: number;
  on_hold_tasks: number;
  cancelled_tasks: number;
  overdue_tasks: number;
  completion_percentage: number;
  overdue_percentage: number;
  critical_priority_tasks: number;
  high_priority_tasks: number;
  medium_priority_tasks: number;
  low_priority_tasks: number;
}

export interface EmployeeAnalytics {
  total_employees: number;
  active_employees: number;
  inactive_employees: number;
  new_employees: number;
  employee_utilization: number;
  average_salary: number;
}

export interface WorkflowAnalytics {
  total_workflows: number;
  total_instances: number;
  pending_instances: number;
  running_instances: number;
  completed_instances: number;
  failed_instances: number;
  completion_rate: number;
  failure_rate: number;
  pending_rate: number;
  workflow_health_score: number;
}

export interface ExecutiveKPIs {
  revenue: number;
  profit: number;
  active_projects: number;
  active_employees: number;
  completed_tasks: number;
  company_health: number;
}

export interface ExecutiveAnalytics {
  kpis: ExecutiveKPIs;
  projects: ProjectAnalytics;
  tasks: TaskAnalytics;
  employees: EmployeeAnalytics;
  workflows: WorkflowAnalytics;
  ai_summary: string;
}

export interface ExecutiveDecision {
  priority: string;
  title: string;
  description: string;
  findings: string[];
  recommendations: string[];
  confidence: number | null;
}

export interface ExecutiveDecisionResponse {
  overall_status: string;
  executive_summary: string;
  decisions: ExecutiveDecision[];
}

export interface ExecutiveReport {
  company_id: number;
  generated_at: string;
  executive_summary: string;
  analytics: ExecutiveAnalytics;
  decisions: ExecutiveDecisionResponse;
}