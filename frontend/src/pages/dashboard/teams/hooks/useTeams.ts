import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createTeam,
  deleteTeam,
  getTeams,
  updateTeam,
} from "../api/teamApi";

import type {
  TeamCreate,
  TeamUpdate,
} from "../types/team";

export const teamQueryKey = ["teams"];

export const useTeams = () => {
  return useQuery({
    queryKey: teamQueryKey,
    queryFn: getTeams,
  });
};

export const useCreateTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TeamCreate) =>
      createTeam(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: teamQueryKey,
      });
    },
  });
};

export const useUpdateTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      teamId,
      data,
    }: {
      teamId: number;
      data: TeamUpdate;
    }) =>
      updateTeam(teamId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: teamQueryKey,
      });
    },
  });
};

export const useDeleteTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTeam,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: teamQueryKey,
      });
    },
  });
};