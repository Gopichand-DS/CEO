import {
  Bell,
  CheckCheck,
} from "lucide-react";

import {
  useMarkAllNotificationsAsRead,
  useMarkNotificationAsRead,
  useNotifications,
} from "./hooks/useNotifications";

const NotificationsPage = () => {
  const {
    data: notifications = [],
    isLoading,
    isError,
  } = useNotifications();

  const markAsRead =
    useMarkNotificationAsRead();

  const markAllAsRead =
    useMarkAllNotificationsAsRead();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-slate-500">
          Loading notifications...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <p className="font-semibold text-red-700">
          Unable to load notifications.
        </p>

        <p className="mt-1 text-sm text-red-600">
          Please try again later.
        </p>
      </div>
    );
  }

  const unreadCount = notifications.filter(
    (notification) => !notification.is_read,
  ).length;

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-indigo-100 p-3">
            <Bell
              size={24}
              className="text-indigo-600"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Notifications
            </h1>

            <p className="text-sm text-slate-500">
              Important updates and alerts from your company.
            </p>
          </div>

        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={() =>
              markAllAsRead.mutate()
            }
            disabled={markAllAsRead.isPending}
            className="inline-flex items-center gap-2 rounded-xl border bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            <CheckCheck size={17} />

            Mark all as read
          </button>
        )}

      </div>

      {notifications.length === 0 ? (
        <div className="rounded-2xl border bg-white p-12 text-center shadow-sm">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <Bell
              size={28}
              className="text-slate-400"
            />
          </div>

          <h2 className="mt-5 text-lg font-semibold text-slate-800">
            No notifications yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            You're all caught up. Important company
            updates and alerts will appear here.
          </p>

        </div>
      ) : (
        <div className="space-y-3">

          {notifications.map(
            (notification) => (
              <div
                key={notification.id}
                className={`rounded-2xl border bg-white p-5 shadow-sm ${
                  !notification.is_read
                    ? "border-indigo-200"
                    : ""
                }`}
              >

                <div className="flex items-start justify-between gap-4">

                  <div>
                    <div className="flex flex-wrap items-center gap-2">

                      <h2 className="font-semibold text-slate-900">
                        {notification.title}
                      </h2>

                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                        {notification.priority}
                      </span>

                    </div>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {notification.message}
                    </p>

                    <p className="mt-2 text-xs text-slate-400">
                      {new Date(
                        notification.created_at,
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>

                  {!notification.is_read && (
                    <button
                      type="button"
                      onClick={() =>
                        markAsRead.mutate(
                          notification.id,
                        )
                      }
                      className="shrink-0 rounded-lg px-3 py-2 text-xs font-medium text-indigo-600 hover:bg-indigo-50"
                    >
                      Mark as read
                    </button>
                  )}

                </div>

              </div>
            ),
          )}

        </div>
      )}

    </div>
  );
};

export default NotificationsPage;