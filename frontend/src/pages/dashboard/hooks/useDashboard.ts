import { useEffect } from "react";

import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooks";

import {
  fetchDashboard,
} from "../store/dashboardSlice";

export const useDashboard = () => {
  const dispatch = useAppDispatch();

  const {
    loading,
    error,
    overview,
  } = useAppSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  return {
    loading,
    error,
    data: overview,
  };
};