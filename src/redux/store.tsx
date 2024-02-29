"use client";
import { setupListeners } from "@reduxjs/toolkit/query";
import { DocumentUploadReducer } from "./feauture/documents/slice";
import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

/**
 * Configuración del store
 */
export const userStore = configureStore({
    reducer: { root: DocumentUploadReducer },
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
