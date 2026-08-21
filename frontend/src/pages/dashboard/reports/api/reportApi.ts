import api from "@/lib/axios";

import type { ExecutiveReport } from "../types/report";

export const getExecutiveReport =
  async (): Promise<ExecutiveReport> => {
    const response =
      await api.get<ExecutiveReport>(
        "/reports/executive",
      );

    return response.data;
  };