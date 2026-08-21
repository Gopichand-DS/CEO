import api from "@/lib/axios";

import type { DashboardOverview } from "@/types/dashboard";

export const getDashboardOverview = async () => {
  const response = await api.get<DashboardOverview>(
    "/dashboard/overview"
  );

  return response.data;
};