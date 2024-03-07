import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentRepository } from '../../../infrastructure/documentRepository';
import { DocumentDeleteResponseDto } from '../../../domain/documents/dto/response/documentDeleteResponse.dto';

@Injectable()
export class DocumentDeleteService {
  constructor(private readonly _documentRepository: DocumentRepository) {}

  async deleteFile(key: string): Promise<DocumentDeleteResponseDto> {
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
