import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const documentDelete = createAsyncThunk(
  "/document/deleteFile",
  async (key: string) => {
    try {
      // Realizar la solicitud POST utilizando Axios
      const response = await axios.post(
        `${process.env.OWNCLOUD_URL}/document/deleteFile`,
        key,
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
