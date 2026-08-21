export interface Team {
  id: number;
  name: string;
  description: string | null;
  company_id: number;
  department_id: number;
}

export interface TeamCreate {
  name: string;
  description?: string;
  company_id: number;
  department_id: number;
}

export interface TeamUpdate {
  name?: string;
  description?: string;
  department_id?: number;
}