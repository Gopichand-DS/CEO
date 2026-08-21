import { useState } from "react";
import { Plus, UsersRound } from "lucide-react";

import {
  useDeleteTeam,
  useTeams,
} from "./hooks/useTeams";

import { useDepartments } from "../projects/hooks/useDepartments";

import TeamModal from "./components/TeamModal";
import TeamTable from "./components/TeamTable";

import type { Team } from "./types/team";

const TeamsPage = () => {
  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [selectedTeam, setSelectedTeam] =
    useState<Team | null>(null);

  const {
    data: teams = [],
    isLoading,
    isError,
  } = useTeams();

  const {
    data: departments = [],
  } = useDepartments();

  const deleteTeam = useDeleteTeam();

  const handleCreate = () => {
    setSelectedTeam(null);
    setIsModalOpen(true);
  };

  const handleEdit = (team: Team) => {
    setSelectedTeam(team);
    setIsModalOpen(true);
  };

  const handleDelete = async (
    teamId: number,
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this team?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteTeam.mutateAsync(teamId);
    } catch (error) {
      console.error(
        "Failed to delete team:",
        error,
      );
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTeam(null);
  };

  return (
    <div className="space-y-6 p-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-indigo-100 p-3">
            <UsersRound className="text-indigo-600" />
          </div>

          <div>

            <h1 className="text-2xl font-bold text-slate-900">
              Teams
            </h1>

            <p className="text-sm text-slate-500">
              Manage teams and their department assignments.
            </p>

          </div>

        </div>

        <button
          type="button"
          onClick={handleCreate}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          <Plus size={18} />
          New Team
        </button>

      </div>

      {/* Loading */}

      {isLoading && (
        <div className="rounded-xl border bg-white p-8 text-center text-slate-500">
          Loading teams...
        </div>
      )}

      {/* Error */}

      {isError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center text-red-600">
          Unable to load teams.
        </div>
      )}

      {/* Table */}

      {!isLoading && !isError && (
        <TeamTable
          teams={teams}
          departments={departments}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Modal */}

      <TeamModal
        open={isModalOpen}
        team={selectedTeam}
        onClose={handleCloseModal}
      />

    </div>
  );
};

export default TeamsPage;