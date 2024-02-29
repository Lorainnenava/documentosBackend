"use client";
import { AppDispatch, RootState } from "./store";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

/**
 * Definicion de los hooks usados en nuestra applicación
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
