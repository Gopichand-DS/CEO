import { useQuery } from "@tanstack/react-query";

import { getDepartments } from "../api/departmentApi";

export const DEPARTMENTS_QUERY_KEY = ["departments"];

export const useDepartments = () => {
  return useQuery({
    queryKey: DEPARTMENTS_QUERY_KEY,
    queryFn: getDepartments,
  });
};