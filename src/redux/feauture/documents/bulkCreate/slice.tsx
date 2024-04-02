"use client";

import { documentMassive } from "./request";
import { createSlice } from "@reduxjs/toolkit";
import { initialStateDocument } from "../initialState";

/**
 * MassiveSlice
 */
const MassiveSlice = createSlice({
  name: "Massive",
  initialState: { ...initialStateDocument },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(documentMassive.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(documentMassive.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = undefined;
      state.success = true;
    });
    builder.addCase(documentMassive.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.success = false;
    });
  },
});
export const MassiveReducer = MassiveSlice.reducer;
