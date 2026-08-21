import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../api/taskApi";

import type {
  TaskCreate,
  TaskUpdate,
} from "../types/task";

export const taskQueryKey = ["tasks"];

export const useTasks = () => {
  return useQuery({
    queryKey: taskQueryKey,
    queryFn: getTasks,
  });
};

export const useCreateTask = () => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      data: TaskCreate,
    ) => createTask(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: taskQueryKey,
      });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      taskId,
      data,
    }: {
      taskId: number;
      data: TaskUpdate;
    }) =>
      updateTask(
        taskId,
        data,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: taskQueryKey,
      });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: deleteTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: taskQueryKey,
      });
    },
  });
};