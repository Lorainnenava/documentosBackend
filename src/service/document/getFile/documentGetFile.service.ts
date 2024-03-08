import { Injectable } from '@nestjs/common';
import { Helper } from '../../../helper/adapter';
import { DocumentGetFileInterface } from '../../../domain/interface/documentGetFileInterface';
import { DocumentResponseDto } from '../../../domain/documents/dto/response/documentResponse.dto';

/**
 * @export DocumentGetFile
 * @class DocumentGetFile
 * @implements {DocumentGetFileInterface}
 */
@Injectable()
export class DocumentGetFile implements DocumentGetFileInterface {
  /**
   * Inicializa una nueva instancia de la clase.
   * @param _helper
   */
  constructor(private readonly _helper: Helper) {}

  /**
   * @return {DocumentResponseDto}
   * @method handle --Maneja el retorno de un documento.
   */
  async handle(key: string): Promise<DocumentResponseDto> {
    try {
      const obtainFile = await this._helper.ownCloudAdapter('GET', key);

      return obtainFile;
    } catch (error) {
      throw error;
    }
  }
}
