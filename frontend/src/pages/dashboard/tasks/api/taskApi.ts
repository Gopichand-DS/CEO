import api from "@/lib/axios";

import type {
  Task,
  TaskCreate,
  TaskUpdate,
} from "../types/task";

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get<Task[]>(
    "/tasks/",
  );

  return response.data;
};

export const getTask = async (
  taskId: number,
): Promise<Task> => {
  const response = await api.get<Task>(
    `/tasks/${taskId}`,
  );

  return response.data;
};

export const createTask = async (
  data: TaskCreate,
): Promise<Task> => {
  const response = await api.post<Task>(
    "/tasks/",
    data,
  );

  return response.data;
};

export const updateTask = async (
  taskId: number,
  data: TaskUpdate,
): Promise<Task> => {
  const response = await api.put<Task>(
    `/tasks/${taskId}`,
    data,
  );

  return response.data;
};

export const deleteTask = async (
  taskId: number,
): Promise<void> => {
  await api.delete(
    `/tasks/${taskId}`,
  );
};