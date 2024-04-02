"use client";
import { setupListeners } from "@reduxjs/toolkit/query";
import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { DocumentUploadReducer } from "./feauture/documents/create/slice";
import { DocumentGetFileReducer } from "./feauture/documents/getFile/slice";
import { MassiveReducer } from "./feauture/documents/bulkCreate/slice";
import { DocumentGetAllReducer } from "./feauture/documents/getAll/slice";
import { documentDeleteReducer } from "./feauture/documents/delete/slice";

/**
 * Configuración del store
 */
export const userStore = configureStore({
  reducer: {
    root: DocumentUploadReducer,
    getFile: DocumentGetFileReducer,
    massive: MassiveReducer,
    getAll: DocumentGetAllReducer,
    delete: documentDeleteReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

setupListeners(userStore.dispatch);

export type RootState = ReturnType<typeof userStore.getState>;
export type AppDispatch = typeof userStore.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
