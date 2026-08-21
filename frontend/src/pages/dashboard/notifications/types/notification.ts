export interface Notification {
  id: number;
  company_id: number;
  user_id: number | null;
  title: string;
  message: string;
  notification_type: string;
  priority: string;
  is_read: boolean;
  created_at: string;
}