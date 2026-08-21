import api from "@/lib/axios";

import type {
  Employee,
  EmployeeCreate,
  EmployeeUpdate,
} from "../types/employee";

export const getEmployees = async (): Promise<Employee[]> => {
  const response = await api.get<Employee[]>("/employees/");
  return response.data;
};

export const getEmployee = async (
  employeeId: number,
): Promise<Employee> => {
  const response = await api.get<Employee>(
    `/employees/${employeeId}`,
  );

  return response.data;
};

export const createEmployee = async (
  data: EmployeeCreate,
): Promise<Employee> => {
  const response = await api.post<Employee>(
    "/employees/",
    data,
  );

  return response.data;
};

export const updateEmployee = async (
  employeeId: number,
  data: EmployeeUpdate,
): Promise<Employee> => {
  const response = await api.put<Employee>(
    `/employees/${employeeId}`,
    data,
  );

  return response.data;
};

export const deleteEmployee = async (
  employeeId: number,
): Promise<Employee> => {
  const response = await api.delete<Employee>(
    `/employees/${employeeId}`,
  );

  return response.data;
};