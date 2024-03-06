"use client";

import React, {
    useRef,
    useState,
    FormEvent,
    useEffect,
    ChangeEvent,
} from "react";
import { toast } from "react-toastify";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { Button, Grid, Typography } from "@mui/material";
import { base64ToArrayBuffer, toBase64 } from "../../helper";
import { AddDocument, Form, SpanDocument } from "./styled";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { documentUpload } from "../../redux/feauture/documents/create/request";

const index = () => {
    const dispatch = useAppDispatch();
    /**
     * documentosSelector
     */
    const documentosSelector = useAppSelector((state) => state.root);

    const refInputFile = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState<string>("");
    const [document, setDocument] = useState<{
        body: ArrayBuffer;
        key: string;
    }>();

    /**
     * handleChangeFile
     */
    const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            const { files } = e.target;
            const resFile = files[0];
            const base64 = await toBase64(resFile);
            setFileName(resFile?.name);
            setDocument({
                body: base64ToArrayBuffer(base64),
                key: `Documentos/solicitud/23/primeraEtapa/${resFile?.name}`,
            });
        }
    };

    /**
     * Función para guardar un documento
     * @param event
     */
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!document) {
            toast("Debe adjuntar un archivo", {
                autoClose: 2000,
                type: "error",
                hideProgressBar: false,
            });
        } else {
            dispatch(documentUpload(document!));
        }
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
        <Grid
            container
            spacing={2}
            style={{
                height: "10%",
                backgroundColor: "gray",
                padding: "5px",
            }}
        >
            <Form onSubmit={handleSubmit}>
                <Grid item xs={2}>
                    <Typography fontSize={10}>Subir archivo</Typography>
                    <AddDocument
                        type="button"
                        onClick={() => refInputFile.current?.click()}
                    >
                        <NoteAddIcon fontSize="small" className="plus" />
                        <SpanDocument>
                            {fileName
                                ? String(fileName)?.charAt(0)?.toUpperCase() +
                                  String(fileName)
                                      ?.slice(1)
                                      ?.toLocaleLowerCase()
                                : "Seleccione un documento"}
                        </SpanDocument>
                    </AddDocument>
                    <input
                        style={{
                            display: "none",
                        }}
                        type="file"
                        name="name"
                        id="file"
                        ref={refInputFile}
                        accept=".xlsx, .xls, .csv, .png, .jpg, .pdf"
                        onChange={(e) => handleChangeFile(e)}
                    />
                </Grid>
                <Grid item style={{ marginTop: "15px" }}>
                    <Button
                        variant="contained"
                        type="submit"
                        disabled={documentosSelector.loading}
                    >
                        Cargar documento
                    </Button>
                </Grid>
            </Form>
        </Grid>
    );
};

export default index;
