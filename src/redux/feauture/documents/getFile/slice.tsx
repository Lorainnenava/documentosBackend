"use client";

import { DocumentGetFile } from "./request";
import { createSlice } from "@reduxjs/toolkit";
import { initialStateDocument } from "../initialState";

/**
 * DocumentGetFileSlice
 */
const DocumentGetFileSlice = createSlice({
    name: "DocumentGetFile",
    initialState: { ...initialStateDocument },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(DocumentGetFile.pending, (state) => {
            state.loading = true;
            state.error = undefined;
        });
        builder.addCase(DocumentGetFile.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
            state.error = undefined;
            state.success = true;
        });
        builder.addCase(DocumentGetFile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.success = false;
        });
    },
});
export const DocumentGetFileReducer = DocumentGetFileSlice.reducer;
