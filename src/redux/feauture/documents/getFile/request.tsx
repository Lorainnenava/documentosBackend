import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const DocumentGetFile = createAsyncThunk(
    "/document/getFile",
    async (key: string) => {
        try {
            // Realizar la solicitud GET utilizando Axios
            const response = await axios.post(
                `http://localhost:5000/getFile`,
                { key },
                {
                    headers: {
                        "Content-type": "application/json",
                    },
                }
            );

            return response.data;
        } catch (error) {
            throw error;
        }
    }
);
