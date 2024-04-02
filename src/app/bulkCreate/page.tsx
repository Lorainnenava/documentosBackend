"use client";
import {
  useEffect,
  useRef,
  useState,
  ChangeEvent,
  FormEvent,
  useCallback,
} from "react";
import { toast } from "react-toastify";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { base64ToArrayBuffer, toBase64 } from "@/helper";
import { documentUpload } from "@/redux/feauture/documents/create/request";
import { AddDocument, Form, SpanDocument } from "./styled";
import { documentMassive } from "@/redux/feauture/documents/bulkCreate/request";
import { BulkDocument } from "./types";

const Massive = () => {
  const dispatch = useAppDispatch();
  const documentosSelector = useAppSelector((state) => state.root);

  const [fileRows, setFileRows] = useState<Array<{ files: FileList | null }>>([
    { files: null },
  ]);

  const handleFileChange =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setFileRows((prevFileRows) => {
          const newFileRows = [...prevFileRows];
          newFileRows[index] = { files: e.target.files };
          return newFileRows;
        });
      }
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const bulkDocuments: BulkDocument[] = [];

    // Process and collect each file row
    for (const fileRow of fileRows) {
      const { files } = fileRow;

      if (files && files.length > 0) {
        for (const file of Array.from(files)) {
          console.log(file, "✨✨✨");
          const base64 = await toBase64(file);
          console.log(base64, "🌹🌹🌹");

          const document: BulkDocument = {
            body: base64ToArrayBuffer(base64),
            originalname: file.name,
          };

          bulkDocuments.push(document);
        }
      }
    }
    const transformedBulkDocuments = {
      body: bulkDocuments.flatMap((document) => ({
        buffer: document.body,
        originalname: document.originalname,
      })),
      key: `test/melany/solicitudDocuments`,
    };

    try {
      // Intenta realizar la carga masiva
      if (bulkDocuments.length > 0) {
        const response = await dispatch(
          documentMassive(transformedBulkDocuments)
        );

        if (response) {
          // Si hay un error, muestra un mensaje de error
          toast.success("creado exitosamente");
        } else {
          // Si no hay errores, muestra un mensaje de éxito
          toast.error("Error en la carga masiva");
        }
      }
    } catch (error) {
      // Manejo de errores inesperados
      toast.error("Error en la carga masiva");
      console.error(error); // Puedes imprimir el error en la consola para fines de depuración
    }
  };

  const handleAddMore = () => {
    setFileRows((prevFileRows) => [...prevFileRows, { files: null }]);
  };

  /**
   * useEffect para verificar si el documento se creo o no
   */
  useEffect(() => {
    if (documentosSelector.success === true) {
      toast(documentosSelector.data.statusText, {
        autoClose: 2000,
        type: "success",
        hideProgressBar: false,
      });
    } else if (
      documentosSelector.error &&
      documentosSelector.success === false
    ) {
      toast("Ha ocurrido un error.", {
        autoClose: 2000,
        type: "error",
        hideProgressBar: false,
      });
    }
  }, [documentosSelector]);
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {fileRows.map((fileRow, index) => (
          <Grid item xs={2} key={index}>
            <Typography fontSize={10}>Subir archivos</Typography>
            <Box flexDirection="column">
              <AddDocument
                type="button"
                onClick={() => {
                  const fileInput = document.getElementById(
                    `file-${index}`
                  ) as HTMLInputElement;
                  fileInput?.click();
                }}
              >
                <SpanDocument>
                  {fileRow?.files
                    ? fileRow.files[0]?.name
                    : "Seleccione un documento"}
                </SpanDocument>
                <NoteAddIcon fontSize="small" className="plus" />
              </AddDocument>
              <input
                style={{ display: "none" }}
                type="file"
                name="name"
                id={`file-${index}`}
                accept=".xlsx, .xls, .csv, .png, .jpg, .pdf"
                multiple
                onChange={handleFileChange(index)}
              />
            </Box>
          </Grid>
        ))}
        <Grid item xs={12} style={{ marginTop: "15px" }}>
          <Button
            variant="contained"
            type="submit"
            disabled={documentosSelector.loading}
          >
            Cargar documentos
          </Button>
          <Button
            variant="contained"
            type="button"
            onClick={handleAddMore}
            style={{ marginLeft: "10px" }}
          >
            Agregar más
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
};

export default Massive;
