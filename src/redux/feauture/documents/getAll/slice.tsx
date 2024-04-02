"use client";
import { DocumentGetAll } from "./request";
import { createSlice } from "@reduxjs/toolkit";
import { initialStateDocument } from "../initialState";

/**
 * DocumentGetAllSlice
 */
const DocumentGetAllSlice = createSlice({
  name: "DocumentGetAll",
  initialState: { ...initialStateDocument },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(DocumentGetAll.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(DocumentGetAll.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = undefined;
      state.success = true;
    });
    builder.addCase(DocumentGetAll.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.success = false;
    });
  },
});
export const DocumentGetAllReducer = DocumentGetAllSlice.reducer;
