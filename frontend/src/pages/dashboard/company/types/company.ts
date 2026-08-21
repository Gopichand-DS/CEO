import type {
  ExecutiveAnalytics,
} from "@/pages/dashboard/reports/types/report";

export interface CompanyInfo {
  id: number;
  name: string;
  industry: string | null;
  country: string | null;
}

export interface CompanyAnalytics {
  company: CompanyInfo;
  analytics: ExecutiveAnalytics;
}