import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import { dashboardService } from "../dashboardService";

import type { DashboardOverview } from "@/types/dashboard";

interface DashboardState {
  loading: boolean;
  error: string | null;
  overview: DashboardOverview | null;
}

const initialState: DashboardState = {
  loading: false,
  error: null,
  overview: null,
};

export const fetchDashboard =
  createAsyncThunk(
    "dashboard/fetchOverview",
    async () => {
      return await dashboardService.getOverview();
    }
  );

const dashboardSlice = createSlice({
  name: "dashboard",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(
        fetchDashboard.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchDashboard.fulfilled,
        (state, action) => {
          state.loading = false;
          state.overview = action.payload;
        }
      )

      .addCase(
        fetchDashboard.rejected,
        (state) => {
          state.loading = false;
          state.error =
            "Unable to load dashboard";
        });
  },
});

export default dashboardSlice.reducer;