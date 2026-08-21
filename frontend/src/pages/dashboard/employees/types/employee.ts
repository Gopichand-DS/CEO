export interface Employee {
  id: number;
  employee_code: string;
  full_name: string;
  email: string;
  phone: string | null;
  designation: string;
  company_id: number;
  team_id: number | null;
  department_id: number;
  manager_id: number | null;
  joining_date: string;
  salary: number;
  status: string;
  created_at: string;
}

export interface EmployeeCreate {
  employee_code: string;
  full_name: string;
  email: string;
  phone?: string;
  designation: string;
  company_id: number;
  team_id?: number | null;
  department_id: number;
  manager_id?: number | null;
  joining_date: string;
  salary: number;
  status?: string;
}

export interface EmployeeUpdate {
  full_name?: string;   
  phone?: string;
  team_id?: number | null;
  designation?: string;
  department_id?: number;
  manager_id?: number | null;
  joining_date?: string;
  salary?: number;
  status?: string;
}