import { createAsyncThunk } from "@reduxjs/toolkit";

import { dashboardService } from "../dashboardService";

export const fetchDashboardOverview = createAsyncThunk(
  "dashboard/overview",
  async (_, thunkAPI) => {
    try {
      return await dashboardService.getOverview();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.detail ??
          "Failed to load dashboard."
      );
    }
  }
);