import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentRepository } from '../../../infrastructure/documentRepository';
import { DocumentDeleteInterface } from '../../../domain/interface/documentDeleteInterface';
import { DocumentDeleteResponseDto } from '../../../domain/documents/dto/response/documentDeleteResponse.dto';

/**
 * @export DocumentDelete
 * @class DocumentDelete
 * @implements {DocumentDeleteInterface}
 */
@Injectable()
export class DocumentDelete implements DocumentDeleteInterface {
  /**
   * Inicializa una nueva instancia de la clase.
   * @param _documentRepository
   */
  constructor(private readonly _documentRepository: DocumentRepository) {}

  /**
   * @return {DocumentDeleteResponseDto}
   * @method handle --Maneja la eliminación de un documento.
   */
  async handle(key: string): Promise<DocumentDeleteResponseDto> {
    try {
      // Buscar un documento en la base de datos
      const searchDocument = await this._documentRepository.findOne({
        where: { key: key, state: 1 },
      });
      if (!searchDocument.id) {
        throw new NotFoundException();
      }

      const updateFile = await this._documentRepository.update(
        searchDocument.id,
        { ...searchDocument, state: 2 },
      );

      return updateFile;
    } catch (error) {
      throw error;
    }
  }
}
