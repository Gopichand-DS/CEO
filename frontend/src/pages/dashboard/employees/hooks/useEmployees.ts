import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createEmployee,
  deleteEmployee,
  getEmployees,
  updateEmployee,
} from "../api/employeeApi";

import type {
  EmployeeCreate,
  EmployeeUpdate,
} from "../types/employee";

export const employeeQueryKey = ["employees"];

export const useEmployees = () => {
  return useQuery({
    queryKey: employeeQueryKey,
    queryFn: getEmployees,
  });
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: EmployeeCreate) =>
      createEmployee(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: employeeQueryKey,
      });
    },
  });
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      employeeId,
      data,
    }: {
      employeeId: number;
      data: EmployeeUpdate;
    }) =>
      updateEmployee(employeeId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: employeeQueryKey,
      });
    },
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmployee,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: employeeQueryKey,
      });
    },
  });
};