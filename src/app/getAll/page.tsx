"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { DocumentGetAll } from "@/redux/feauture/documents/getAll/request";
import Image from "next/image";
import { documentDelete } from "@/redux/feauture/documents/delete/request";

const Index = () => {
  const dispatch = useAppDispatch();
  const documentosSelector = useAppSelector((state) => state.getAll);
  const documentosSelectorDelete = useAppSelector((state) => state.delete);

  useEffect(() => {
    dispatch(DocumentGetAll());
  }, [dispatch]);

  useEffect(() => {
    // Verificar si la eliminación fue exitosa
    if (documentosSelectorDelete.success) {
      alert("Se ha eliminado el documento exitosamente.");
    }

    // Verificar si ha ocurrido un error durante la eliminación
    if (documentosSelectorDelete.error) {
      alert(
        `Error al eliminar el documento: ${documentosSelectorDelete.error}`
      );
    }
  }, [documentosSelectorDelete]);

  return (
    <>
      <h1>Prueba</h1>
      {documentosSelector.data &&
      Array.isArray(documentosSelector.data) &&
      documentosSelector.data.length > 0 ? (
        <ul>
          {documentosSelector.data.map((documento) => (
            <li key={documento.key}>
              <p>{documento.key}</p>
              <Image
                src={documento.data}
                alt="imagen"
                width={1000}
                height={500}
                unoptimized
              />
              <button onClick={() => dispatch(documentDelete(documento.key))}>
                botoncito
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay documentos disponibles.</p>
      )}
    </>
  );
};

export default Index;
