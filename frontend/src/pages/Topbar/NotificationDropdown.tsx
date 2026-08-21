import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotificationDropdown = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate("/dashboard/notifications")}
      aria-label="Notifications"
      className="relative rounded-xl p-2 transition hover:bg-slate-100"
    >
      <Bell size={20} />

      <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
    </button>
  );
};

export default NotificationDropdown;