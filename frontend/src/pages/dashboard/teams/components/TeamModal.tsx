import TeamForm from "./TeamForm";

import type { Team } from "../types/team";

interface TeamModalProps {
  open: boolean;
  onClose: () => void;
  team?: Team | null;
}

const TeamModal = ({
  open,
  onClose,
  team = null,
}: TeamModalProps) => {
  if (!open) {
    return null;
  }

  const isEditMode = team !== null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl">

        <div className="border-b px-6 py-5">

          <h2 className="text-xl font-bold text-slate-900">
            {isEditMode
              ? "Edit Team"
              : "Add New Team"}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {isEditMode
              ? "Update team information."
              : "Create a team under your company."}
          </p>

        </div>

        <TeamForm
          team={team}
          onClose={onClose}
        />

      </div>

    </div>
  );
};

export default TeamModal;