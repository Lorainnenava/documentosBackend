"use client";
import { documentDelete } from "./request";
import { createSlice } from "@reduxjs/toolkit";
import { initialStateDocument } from "../initialState";

/**
 * documentDeleteSlice
 */
const documentDeleteSlice = createSlice({
  name: "documentDelete",
  initialState: { ...initialStateDocument },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(documentDelete.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(documentDelete.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = undefined;
      state.success = true;
    });
    builder.addCase(documentDelete.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.success = false;
    });
  },
});
export const documentDeleteReducer = documentDeleteSlice.reducer;
