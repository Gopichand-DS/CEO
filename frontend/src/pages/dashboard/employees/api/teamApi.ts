import api from "@/lib/axios";

import type { Team } from "../types/team";

export const getTeams = async (): Promise<Team[]> => {
  const response = await api.get<Team[]>("/teams/");

  return response.data;
};