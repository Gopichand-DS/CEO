import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "@/features/auth/store/auth.store";

const SidebarFooter = () => {
  const navigate = useNavigate();

  const logout = useAuthStore(
    (state) => state.logout,
  );

  const handleLogout = () => {
    logout();

    navigate("/", {
      replace: true,
    });
  };

  return (
    <div className="border-t p-4">

      <button
        type="button"
        onClick={handleLogout}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600"
      >
        <LogOut size={18} />

        <span className="font-medium">
          Logout
        </span>
      </button>

    </div>
  );
};

export default SidebarFooter;