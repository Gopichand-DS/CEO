export interface Project {
  id: number;
  name: string;
  description: string | null;
  company_id: number;
  department_id: number;
  start_date: string;
  end_date: string | null;
  status: string;
  budget: number;
  created_at: string;
}

export interface ProjectCreateRequest {
  name: string;
  description?: string | null;
  company_id: number;
  department_id: number;
  start_date: string;
  end_date?: string | null;
  status: string;
  budget: number;
}

export interface ProjectUpdateRequest {
  name?: string;
  description?: string | null;
  company_id?: number;
  department_id?: number;
  start_date?: string;
  end_date?: string | null;
  status?: string;
  budget?: number;
}