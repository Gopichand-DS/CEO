import api from "@/lib/axios";

import type {
  Project,
  ProjectCreateRequest,
  ProjectUpdateRequest,
} from "../types/project";

export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get<Project[]>("/projects/");

  return response.data;
};

export const getProject = async (
  projectId: number,
): Promise<Project> => {
  const response = await api.get<Project>(
    `/projects/${projectId}`,
  );

  return response.data;
};

export const createProject = async (
  data: ProjectCreateRequest,
): Promise<Project> => {
  const response = await api.post<Project>(
    "/projects/",
    data,
  );

  return response.data;
};

export const updateProject = async (
  projectId: number,
  data: ProjectUpdateRequest,
): Promise<Project> => {
  const response = await api.put<Project>(
    `/projects/${projectId}`,
    data,
  );

  return response.data;
};

export const deleteProject = async (
  projectId: number,
): Promise<void> => {
  await api.delete(`/projects/${projectId}`);
};