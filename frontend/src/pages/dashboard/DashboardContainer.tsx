import DashboardContent from "./DashboardContent";

import DashboardSkeleton from "@/pages/dashboard/DashboardSkeleton";
import DashboardEmpty from "@/pages/dashboard/DashboardEmpty";
import DashboardError from "@/pages/dashboard/DashboardError";

import { useDashboard } from "@/pages/dashboard/hooks/useDashboard";

const DashboardContainer = () => {
  const {
    loading,
    error,
    data,
  } = useDashboard();

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <DashboardError
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (!data) {
    return <DashboardEmpty />;
  }

  return <DashboardContent dashboard={data} />;
};

export default DashboardContainer;