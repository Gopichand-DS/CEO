import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Save, UserRound, Eye, EyeOff, LockKeyhole } from "lucide-react";
import api from "@/lib/axios";
import { useAuthStore } from "@/features/auth/store/auth.store";

const SettingsPage = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [fullName, setFullName] = useState("");
  const [designation, setDesignation] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isChangingPassword, setIsChangingPassword] =
    useState(false);

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const handleChangePassword = async () => {
  if (!currentPassword) {
    toast.error("Enter your current password.");
    return;
  }

  if (!newPassword) {
    toast.error("Enter a new password.");
    return;
  }

  if (newPassword.length < 8) {
    toast.error(
      "New password must contain at least 8 characters.",
    );
    return;
  }

  if (newPassword !== confirmPassword) {
    toast.error("New passwords do not match.");
    return;
  }

  try {
    setIsChangingPassword(true);

    await api.put(
      "/users/me/password",
      {
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      },
    );

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    toast.success(
      "Password changed successfully.",
    );
  } catch (error: any) {
    toast.error(
      error?.response?.data?.detail ??
        "Unable to change password.",
    );
  } finally {
    setIsChangingPassword(false);
  }
  };

  useEffect(() => {
    if (!user) return;

    setFullName(user.full_name);
    setDesignation(user.designation);
  }, [user]);

  const handleSave = async () => {
    if (!fullName.trim()) {
      toast.error("Full name is required.");
      return;
    }

    if (!designation.trim()) {
      toast.error("Designation is required.");
      return;
    }

    try {
      setIsSaving(true);

      const response = await api.put(
        "/users/me",
        {
          full_name: fullName.trim(),
          designation: designation.trim(),
        },
      );

      setUser(response.data);

      toast.success("Profile updated successfully.");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.detail ??
          "Unable to update profile.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="rounded-2xl border bg-white p-8 text-center">
        <p className="text-slate-500">
          Loading profile...
        </p>
      </div>
    );
  }

  const initial =
    user.full_name?.trim().charAt(0).toUpperCase() || "?";

  return (
    <div className="mx-auto max-w-4xl space-y-6">

      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Settings
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your profile and account information.
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">

        <div className="mb-8 flex items-center gap-4">

          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
            {initial}
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Profile
            </h2>

            <p className="text-sm text-slate-500">
              Update your personal information.
            </p>
          </div>

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Full Name
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(event) =>
                setFullName(event.target.value)
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Designation
            </label>

            <input
              type="text"
              value={designation}
              onChange={(event) =>
                setDesignation(event.target.value)
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="e.g. Data Engineer"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              value={user.email}
              disabled
              className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500"
            />

            <p className="mt-1 text-xs text-slate-400">
              Email cannot be changed here.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Account Role
            </label>

            <input
              type="text"
              value={user.role}
              disabled
              className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500"
            />

            <p className="mt-1 text-xs text-slate-400">
              Your system role is managed by the organization.
            </p>
          </div>

        </div>
        <div className="rounded-2xl border bg-white p-6 shadow-sm">

  <div className="mb-8 flex items-center gap-4">

    <div className="rounded-xl bg-slate-100 p-3">
      <LockKeyhole
        size={22}
        className="text-slate-600"
      />
    </div>

    <div>
      <h2 className="text-lg font-bold text-slate-900">
        Security
      </h2>

      <p className="text-sm text-slate-500">
        Change your account password.
      </p>
    </div>

  </div>

  <div className="space-y-5">

    {/* Current Password */}

    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        Current Password
      </label>

      <div className="relative">

        <input
          type={
            showCurrentPassword
              ? "text"
              : "password"
          }
          value={currentPassword}
          onChange={(event) =>
            setCurrentPassword(event.target.value)
          }
          className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="Enter current password"
        />

        <button
          type="button"
          onClick={() =>
            setShowCurrentPassword(
              !showCurrentPassword,
            )
          }
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
        >
          {showCurrentPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>

      </div>
    </div>

    {/* New Password */}

    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        New Password
      </label>

      <div className="relative">

        <input
          type={
            showNewPassword
              ? "text"
              : "password"
          }
          value={newPassword}
          onChange={(event) =>
            setNewPassword(event.target.value)
          }
          className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="Enter new password"
        />

        <button
          type="button"
          onClick={() =>
            setShowNewPassword(
              !showNewPassword,
            )
          }
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
        >
          {showNewPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>

      </div>

      <p className="mt-2 text-xs text-slate-400">
        Use at least 8 characters.
      </p>
    </div>

    {/* Confirm Password */}

    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        Confirm New Password
      </label>

      <div className="relative">

        <input
          type={
            showConfirmPassword
              ? "text"
              : "password"
          }
          value={confirmPassword}
          onChange={(event) =>
            setConfirmPassword(
              event.target.value,
            )
          }
          className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="Confirm new password"
        />

        <button
          type="button"
          onClick={() =>
            setShowConfirmPassword(
              !showConfirmPassword,
            )
          }
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
        >
          {showConfirmPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>

      </div>
    </div>

  </div>

  <div className="mt-8 flex justify-end border-t pt-6">

    <button
      type="button"
      onClick={handleChangePassword}
      disabled={isChangingPassword}
      className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Save size={17} />

      {isChangingPassword
        ? "Changing..."
        : "Change Password"}
    </button>

  </div>

</div>

        <div className="mt-8 flex justify-end border-t pt-6">

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={17} />

            {isSaving
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>

      </div>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-slate-100 p-3">
            <UserRound
              size={20}
              className="text-slate-600"
            />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">
              Account Information
            </h2>

            <p className="text-sm text-slate-500">
              Your account is associated with company ID{" "}
              {user.company_id}.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default SettingsPage;