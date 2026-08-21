import { ChevronDown } from "lucide-react";

import { useAuthStore } from "@/features/auth/store/auth.store";

const UserDropdown = () => {
  const user = useAuthStore(
    (state) => state.user,
  );

  const fullName = user?.full_name || "User";

  const initial =
    fullName.trim().charAt(0).toUpperCase();

  return (
    <button className="flex items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-slate-100">

      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
        {initial}
      </div>

      <div className="text-left">

        <h3 className="text-sm font-semibold">
          {fullName}
        </h3>

        <p className="text-xs text-slate-500">
          {user?.designation || "Employee"}
        </p>

      </div>

      <ChevronDown size={18} />

    </button>
  );
};

export default UserDropdown;