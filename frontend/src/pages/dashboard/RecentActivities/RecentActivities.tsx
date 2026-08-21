import {
  Clock3,
  Activity,
} from "lucide-react";

import type {
  Activity as ActivityType,
} from "@/types/dashboard";

interface Props {
  activities: ActivityType[];
}

const RecentActivities = ({
  activities,
}: Props) => {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm h-full">

      <div className="mb-6 flex items-center gap-3">

        <Activity
          className="text-blue-600"
          size={24}
        />

        <div>
          <h2 className="text-xl font-bold">
            Recent Activities
          </h2>

          <p className="text-sm text-slate-500">
            Latest business activities
          </p>
        </div>

      </div>

      <div className="space-y-5">

        {activities.map((activity) => (

          <div
            key={activity.id}
            className="flex gap-4 rounded-xl border border-slate-100 p-4 hover:bg-slate-50 transition"
          >

            <div className="mt-1 rounded-full bg-blue-100 p-2">

              <Clock3
                size={16}
                className="text-blue-600"
              />

            </div>

            <div className="flex-1">

              <h3 className="font-semibold">
                {activity.title}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {activity.description}
              </p>

              <span className="mt-2 inline-block text-xs text-slate-400">
                {activity.created_at}
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default RecentActivities;