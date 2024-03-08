import { DocumentResponseDto } from '../documents/dto/response/documentResponse.dto';

/**
 * Interfaz para obtener un documento.
 */
export interface DocumentGetFileInterface {
  /**
   * Maneja la solicitud para obtener un documento.
   * @param request Los datos de la solicitud.
   * @returns {Promise<DocumentResponseDto>} Una promesa que resuelve los datos de la respuesta.
   */
  handle(key: string): Promise<DocumentResponseDto>;
}
