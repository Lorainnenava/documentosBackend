import { DocumentState } from "./types";

export const initialStateDocument: DocumentState = {
    loading: false,
    error: undefined,
    success: null,
    data: {
        status: 0,
        statusText: "",
        data: "",
    },
};
