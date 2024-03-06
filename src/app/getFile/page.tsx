"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { DocumentGetFile } from "../../redux/feauture/documents/getFile/request";

const Index = () => {
    const dispatch = useAppDispatch();
    const documentoSelector = useAppSelector((state) => state.getFile);

    useEffect(() => {
        dispatch(
            DocumentGetFile(
                "Documentos/solicitud/23/primeraEtapa/ffbd5b5a-f473-455e-87dc-40b0572b1a9c-cover.png"
            )
        );
    }, [dispatch]);

    return (
        <>
            <h1>Prueba</h1>
            {documentoSelector.data.data && (
                <Image
                    src={documentoSelector.data.data}
                    alt="imagen"
                    width={1000}
                    height={500}
                    unoptimized
                />
            )}
        </>
    );
};

export default Index;
