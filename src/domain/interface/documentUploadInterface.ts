/**
 * Interfaz para crear un documento.
 */
export interface DocumentUploadInterface {
  /**
   * Maneja la solicitud para crear uno o varios documentos.
   * @param request Los datos de la solicitud.
   * @returns {Promise<string>} Una promesa que resuelve los datos de la respuesta.
   */
  handle(
    Body: Buffer | ArrayBuffer | (Buffer | ArrayBuffer)[],
    key: string,
  ): Promise<string>;
}
