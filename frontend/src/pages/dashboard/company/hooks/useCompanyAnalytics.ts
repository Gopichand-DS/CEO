import { useQuery } from "@tanstack/react-query";

import {
  getCompany,
  getCompanyAnalytics,
} from "../api/companyApi";

import type { CompanyInfo } from "../types/company";

import type { ExecutiveReport } from "@/pages/dashboard/reports/types/report";

import { useAuthStore } from "@/features/auth/store/auth.store";

interface CompanyAnalyticsData {
  company: CompanyInfo;
  report: ExecutiveReport;
}

export const useCompanyAnalytics = () => {
  const companyId = useAuthStore(
    (state) => state.user?.company_id,
  );

  return useQuery<CompanyAnalyticsData>({
    queryKey: [
      "company-analytics",
      companyId,
    ],

    queryFn: async () => {
      if (!companyId) {
        throw new Error(
          "Company ID is not available.",
        );
      }

      const [company, report] =
        await Promise.all([
          getCompany(companyId),
          getCompanyAnalytics(),
        ]);

      return {
        company,
        report,
      };
    },

    enabled: !!companyId,
  });
};