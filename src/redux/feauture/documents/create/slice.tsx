"use client";

import { documentUpload } from "./request";
import { createSlice } from "@reduxjs/toolkit";
import { initialStateDocument } from "../initialState";

/**
 * DocumentUploadSlice
 */
const DocumentUploadSlice = createSlice({
    name: "DocumentUpload",
    initialState: {...initialStateDocument},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(documentUpload.pending, (state) => {
            state.loading = true;
            state.error = undefined;
        });
        builder.addCase(documentUpload.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
            state.error = undefined;
            state.success = true;
        });
        builder.addCase(documentUpload.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.success = false;
        });
    },
});
export const DocumentUploadReducer = DocumentUploadSlice.reducer;
