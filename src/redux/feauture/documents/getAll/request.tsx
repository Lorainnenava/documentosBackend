import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Acción para obtener todos los documentos
export const DocumentGetAll = createAsyncThunk("/document/getAll", async () => {
  try {
    // Realizar la solicitud GET para obtener todos los documentos
    const response = await axios.get(
      "http://localhost:5000/document/getAllDocuments",
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
});
