import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const documentUpload = createAsyncThunk(
  "/document/upload",
  async (request: { body: ArrayBuffer; key: string }) => {
    try {
      // Crear un objeto FormData
      const formData = new FormData();
      formData.append("file", new Blob([request.body])); // Agregar el archivo al FormData
      formData.append("key", request.key); // Agregar la clave al FormData

      console.log(formData, "💛💛💛");

      // Realizar la solicitud POST utilizando Axios
      const response = await axios.post(
        `${process.env.OWNCLOUD_URL}/document/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Especificar el tipo de contenido como multipart/form-data
          },
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
