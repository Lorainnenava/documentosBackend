import { Injectable } from '@nestjs/common';
import { Helper } from '../../../helper/adapter';
import { FolderAndSubFoldersService } from '../folderAndSobFolder/folderAndSubFolder.service';

@Injectable()
export class DocumentUploadService {
  constructor(
    private _folderAndSubFoldersService: FolderAndSubFoldersService,
    private readonly _helper: Helper,
  ) {}

  async upload(Body: Buffer | ArrayBuffer, key: string): Promise<any> {
    const buffer = Body instanceof ArrayBuffer ? Body : Buffer?.from(Body);
    const path: string[] = key.split('/');

    let currentPath: string = '';
    try {
      // Verifica si la carpeta exsite de lo contrario la crea
      await this._folderAndSubFoldersService.folderExist(path[0]);

      // Verificar si la primera subcarpeta existe dentro de la carpeta raíz, de lo contrario, crearla
      if (path.length > 1) {
        currentPath = `${path[0]}/${path[1]}/`;
        await this._folderAndSubFoldersService.subFolderExist(currentPath);
      }

      // Crear las subcarpetas una por una
      for (let i = 2; i < path.length - 1; i++) {
        currentPath += `${path[i]}/`;
        await this._folderAndSubFoldersService.subFolderExist(currentPath);
      }

      // Crea el archivo
      const createFile = await this._helper.ownCloudAdapter({
        method: 'PUT',
        key,
        Body: buffer,
      });

      if (createFile.status === 201) {
        return 'Archivo guardado exitosamente';
      }
    } catch (error) {
      throw error;
    }
  }
}
