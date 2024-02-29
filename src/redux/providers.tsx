"use client";
import { Provider } from "react-redux";
import { userStore } from "./store";

export function Providers({ children }: { children: React.ReactNode }) {
    return <Provider store={userStore}>{children}</Provider>;
}

export default Providers;
