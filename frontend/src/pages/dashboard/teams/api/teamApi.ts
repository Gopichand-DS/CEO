import api from "@/lib/axios";

import type {
  Team,
  TeamCreate,
  TeamUpdate,
} from "../types/team";

export const getTeams = async (): Promise<Team[]> => {
  const response = await api.get<Team[]>("/teams/");

  return response.data;
};

export const createTeam = async (
  data: TeamCreate,
): Promise<Team> => {
  const response = await api.post<Team>(
    "/teams/",
    data,
  );

  return response.data;
};

export const updateTeam = async (
  teamId: number,
  data: TeamUpdate,
): Promise<Team> => {
  const response = await api.put<Team>(
    `/teams/${teamId}`,
    data,
  );

  return response.data;
};

export const deleteTeam = async (
  teamId: number,
): Promise<{ message: string }> => {
  const response = await api.delete<{
    message: string;
  }>(`/teams/${teamId}`);

  return response.data;
};