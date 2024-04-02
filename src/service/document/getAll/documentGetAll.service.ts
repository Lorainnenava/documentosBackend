import { Injectable } from '@nestjs/common';
import { Helper } from '../../../helper/adapter';
import { DocumentResponseDto } from '../../../domain/documents/dto/response/documentResponse.dto';
import { DocumentGetAllInterface } from 'src/domain/interface/documentGetAllInterface';
import { DocumentRepository } from 'src/infrastructure/documentRepository';

@Injectable()
export class DocumentGetAll implements DocumentGetAllInterface {
  constructor(
    private readonly _helper: Helper,
    private readonly _documentRepository: DocumentRepository,
  ) {}

  async getAll(): Promise<DocumentResponseDto[]> {
    try {
      // Obtener documentos de la base de datos
      const searchDocuments = await this._documentRepository.findAll({
        where: { state: 1 },
      });

      if (searchDocuments) {
        // Obtener las URLs de los documentos de la base de datos
        const urls = searchDocuments.map((doc) => doc.key);
        console.log(urls, '🧁🧁🧁');

        // Obtener todos los documentos de ownCloud a partir de las URLs
        const todosLosDocumentos = await Promise.all(
          urls.map((url) => this._helper.ownCloudAdapter('GET', url)),
        );
        console.log(todosLosDocumentos, '💜💜💜');

        return todosLosDocumentos;
      } else {
        return [];
      }
    } catch (error) {
      throw error;
    }
  }
}
