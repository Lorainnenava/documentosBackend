import { DocumentDeleteResponseDto } from '../documents/dto/response/documentDeleteResponse.dto';

/**
 * Interfaz para eliminar un documento.
 */
export interface DocumentDeleteInterface {
  /**
   * Maneja la solicitud para eliminar un documento.
   * @param request Los datos de la solicitud.
   * @returns {Promise<DocumentDeleteResponseDto>} Una promesa que resuelve los datos de la respuesta.
   */
  handle(key: string): Promise<DocumentDeleteResponseDto>;
}
