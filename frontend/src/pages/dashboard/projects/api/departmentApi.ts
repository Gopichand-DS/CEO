import api from "@/lib/axios";

export interface Department {
  id: number;
  name: string;
  description: string | null;
  company_id: number;
}

export const getDepartments = async (): Promise<
  Department[]
> => {
  const response = await api.get<Department[]>(
    "/departments/",
  );

  return response.data;
};