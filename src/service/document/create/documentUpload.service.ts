import { Injectable } from '@nestjs/common';
import { Helper } from '../../../helper/adapter';
import { DocumentRepository } from '../../../infrastructure/documentRepository';
import { DocumentUploadInterface } from '../../../domain/interface/documentUploadInterface';

/**
 * @export DocumentUploadService
 * @class UploadDocument
 * @implements {DocumentUploadInterface}
 */
@Injectable()
export class DocumentUploadService implements DocumentUploadInterface {
  /**
   *
   * @param _helper
   * @param _documentRepository
   */
  constructor(
    private readonly _helper: Helper,
    private readonly _documentRepository: DocumentRepository,
  ) {}

  /**
   * @return {string}
   * @method handle
   * @description Este metodo retorna string.
   */
  async handle(Body: Buffer | ArrayBuffer, key: string): Promise<string> {
    try {
      const buffer = Body instanceof ArrayBuffer ? Body : Buffer?.from(Body);
      const path: string[] = key.split('/');
      const fileName: string = path[path?.length - 1];

      // Buscar un documento en la base de datos
      const searchDocument = await this._documentRepository.findOne({
        where: { key: key, state: 1 },
      });

      if (!searchDocument) {
        // Crear documento en la base de datos
        await this._documentRepository.create({
          fileName,
          key,
        });
      }

      let currentPath: string = '';

      // Verifica si la carpeta exsite de lo contrario la crea
      await this._helper.folderOrSubFolderExist(`${path[0]}/`);

      // Verificar si la primera subCarpeta existe dentro de la carpeta raíz, de lo contrario, crearla
      if (path.length > 1) {
        currentPath = `${path[0]}/${path[1]}/`;

        await this._helper.folderOrSubFolderExist(currentPath);
      }

      // Crear las subCarpetas una por una
      for (let i = 2; i < path.length - 1; i++) {
        currentPath += `${path[i]}/`;

        await this._helper.folderOrSubFolderExist(currentPath);
      }

      // Crea el archivo en owncloud
      const createFile = await this._helper.ownCloudAdapter('PUT', key, buffer);

      if (createFile.status === 201 || createFile.status === 204) {
        return 'Archivo guardado exitosamente';
      }
    } catch (error) {
      throw error;
    }
  }
}
