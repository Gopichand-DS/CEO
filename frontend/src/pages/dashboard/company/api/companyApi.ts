import api from "@/lib/axios";

import type { CompanyInfo } from "../types/company";
import type { ExecutiveReport } from "@/pages/dashboard/reports/types/report";

export const getCompany = async (
  companyId: number,
): Promise<CompanyInfo> => {
  const response = await api.get<CompanyInfo>(
    `/companies/${companyId}`,
  );

  return response.data;
};

export const getCompanyAnalytics =
  async (): Promise<ExecutiveReport> => {
    const response =
      await api.get<ExecutiveReport>(
        "/reports/executive",
      );

    return response.data;
  };
  