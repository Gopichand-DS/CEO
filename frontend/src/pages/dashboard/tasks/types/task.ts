export interface Task {
  id: number;

  company_id: number;

  project_id: number;

  assigned_to: number | null;

  created_by: number;

  updated_by: number | null;

  title: string;

  description: string | null;

  status: string;

  priority: string;

  start_date: string;

  due_date: string | null;

  estimated_hours: number | null;

  actual_hours: number | null;

  created_at: string;

  updated_at: string | null;
}

export interface TaskCreate {
  project_id: number;

  assigned_to?: number | null;

  title: string;

  description?: string;

  status?: string;

  priority?: string;

  start_date: string;

  due_date?: string | null;

  estimated_hours?: number | null;

  actual_hours?: number | null;
}

export interface TaskUpdate {
  project_id?: number;

  assigned_to?: number | null;

  title?: string;

  description?: string;

  status?: string;

  priority?: string;

  start_date?: string;

  due_date?: string | null;

  estimated_hours?: number | null;

  actual_hours?: number | null;
}