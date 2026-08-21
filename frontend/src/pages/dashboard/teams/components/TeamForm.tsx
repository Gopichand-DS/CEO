import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import {
  useCreateTeam,
  useUpdateTeam,
} from "../hooks/useTeams";

import { useDepartments } from "../../projects/hooks/useDepartments";
import { useAuthStore } from "@/features/auth/store/auth.store";

import type {
  Team,
  TeamCreate,
} from "../types/team";

interface TeamFormProps {
  team?: Team | null;
  onClose: () => void;
}

const TeamForm = ({
  team = null,
  onClose,
}: TeamFormProps) => {
  const user = useAuthStore(
    (state) => state.user,
  );

  const createTeam = useCreateTeam();
  const updateTeam = useUpdateTeam();

  const {
    data: departments = [],
    isLoading: departmentsLoading,
  } = useDepartments();

  const isEditMode = team !== null;

  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");

  const [departmentId, setDepartmentId] =
    useState<number | "">("");

  useEffect(() => {
    if (!team) {
      setName("");
      setDescription("");
      setDepartmentId("");
      return;
    }

    setName(team.name);
    setDescription(team.description ?? "");
    setDepartmentId(team.department_id);
  }, [team]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!user?.company_id) {
      return;
    }

    if (departmentId === "") {
      return;
    }

    try {
      if (isEditMode && team) {
        await updateTeam.mutateAsync({
          teamId: team.id,

          data: {
            name: name.trim(),
            description:
              description.trim() || undefined,
            department_id: departmentId,
          },
        });
      } else {
        const payload: TeamCreate = {
          name: name.trim(),

          description:
            description.trim() || undefined,

          company_id:
            user.company_id,

          department_id:
            departmentId,
        };

        await createTeam.mutateAsync(
          payload,
        );
      }

      onClose();
    } catch (error) {
      console.error(
        isEditMode
          ? "Failed to update team:"
          : "Failed to create team:",
        error,
      );
    }
  };

  const isSubmitting =
    createTeam.isPending ||
    updateTeam.isPending;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6"
    >

      <div>

        <label className="mb-1 block text-sm font-medium">
          Team Name
        </label>

        <input
          required
          minLength={2}
          maxLength={100}
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          placeholder="Backend Development"
          className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-indigo-500"
        />

      </div>

      <div>

        <label className="mb-1 block text-sm font-medium">
          Department
        </label>

        <select
          required
          value={departmentId}
          onChange={(event) =>
            setDepartmentId(
              event.target.value
                ? Number(event.target.value)
                : "",
            )
          }
          disabled={departmentsLoading}
          className="w-full rounded-lg border bg-white px-3 py-2.5 outline-none focus:border-indigo-500"
        >

          <option value="">
            {departmentsLoading
              ? "Loading departments..."
              : "Select department"}
          </option>

          {departments.map(
            (department) => (
              <option
                key={department.id}
                value={department.id}
              >
                {department.name}
              </option>
            ),
          )}

        </select>

      </div>

      <div>

        <label className="mb-1 block text-sm font-medium">
          Description
        </label>

        <textarea
          maxLength={255}
          rows={4}
          value={description}
          onChange={(event) =>
            setDescription(
              event.target.value,
            )
          }
          placeholder="Describe the purpose of this team..."
          className="w-full resize-none rounded-lg border px-3 py-2.5 outline-none focus:border-indigo-500"
        />

      </div>

      <div className="flex justify-end gap-3 border-t pt-5">

        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          className="rounded-lg border px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={
            isSubmitting ||
            departmentsLoading ||
            departmentId === "" ||
            !user?.company_id
          }
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >

          {isSubmitting && (
            <Loader2
              size={17}
              className="animate-spin"
            />
          )}

          {isSubmitting
            ? isEditMode
              ? "Updating..."
              : "Creating..."
            : isEditMode
              ? "Update Team"
              : "Create Team"}

        </button>

      </div>

    </form>
  );
};

export default TeamForm;