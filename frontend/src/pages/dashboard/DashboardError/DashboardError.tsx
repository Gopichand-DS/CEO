import { TriangleAlert } from "lucide-react";

interface Props {
  onRetry: () => void;
}

const DashboardError = ({
  onRetry,
}: Props) => {
  return (
    <div className="flex h-[500px] flex-col items-center justify-center rounded-2xl border bg-white">

      <TriangleAlert
        size={70}
        className="text-red-500"
      />

      <h2 className="mt-6 text-2xl font-bold">
        Unable to Load Dashboard
      </h2>

      <p className="mt-3 text-slate-500">
        Something went wrong while fetching dashboard data.
      </p>

      <button
        onClick={onRetry}
        className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        Retry
      </button>

    </div>
  );
};

export default DashboardError;