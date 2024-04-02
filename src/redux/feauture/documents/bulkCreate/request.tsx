import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface DocumentBody {
  buffer: ArrayBuffer | Buffer;
  originalname: string;
}

export interface DocumentMassiveRequest {
  body: DocumentBody[];
  key: string;
}

export interface DocumentMassiveResponse {
  // Define the structure of the response data
}

export const documentMassive = createAsyncThunk(
  "/document/massive",
  async (request: DocumentMassiveRequest) => {
    try {
      const { body, key } = request;

      const formData = new FormData();

      // Append each file to the FormData
      body.forEach((file) => {
        formData.append("files", new Blob([file.buffer]), file.originalname);
      });

      // Append the key to the FormData
      formData.append("key", key);

      // Perform a POST request using Axios
      const response = await axios.post<DocumentMassiveResponse>(
        `${process.env.OWNCLOUD_URL}/document/massive`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
