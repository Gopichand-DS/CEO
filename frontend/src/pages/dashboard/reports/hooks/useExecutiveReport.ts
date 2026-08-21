import { useQuery } from "@tanstack/react-query";

import { getExecutiveReport } from "../api/reportApi";

export const executiveReportQueryKey = [
  "executive-report",
];

export const useExecutiveReport = () => {
  return useQuery({
    queryKey: executiveReportQueryKey,
    queryFn: getExecutiveReport,
  });
};