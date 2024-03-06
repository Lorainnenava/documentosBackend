export interface DocumentState {
    loading: boolean;
    error: string | undefined;
    success: boolean | null;
    data: {
        status: number;
        statusText: string;
        data?: string;
    };
}
