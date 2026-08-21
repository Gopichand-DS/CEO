import {
  Clock,
  User,
} from "lucide-react";

import type {
  PendingApproval,
} from "@/types/dashboard";

interface Props {
  approvals: PendingApproval[];
}

const getPriorityColor = (
  priority: PendingApproval["priority"]
) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-700";

    case "medium":
      return "bg-yellow-100 text-yellow-700";

    default:
      return "bg-green-100 text-green-700";
  }
};

const PendingApprovals = ({
  approvals,
}: Props) => {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="mb-6">

        <h2 className="text-xl font-bold">
          Pending Approvals
        </h2>

        <p className="text-sm text-slate-500">
          Items awaiting executive approval
        </p>

      </div>

      <div className="space-y-4">

        {approvals.map((approval) => (

          <div
            key={approval.id}
            className="rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50"
          >

            <div className="flex items-start justify-between">

              <div>

                <h3 className="font-semibold">
                  {approval.title}
                </h3>

                <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">

                  <User size={15} />

                  {approval.requested_by}

                </div>

                <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">

                  <Clock size={15} />

                  {approval.requested_at}

                </div>

              </div>

              <div className="text-right">

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getPriorityColor(
                    approval.priority
                  )}`}
                >
                  {approval.priority.toUpperCase()}
                </span>

                <p className="mt-3 text-sm text-slate-500">
                  {approval.category}
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default PendingApprovals;