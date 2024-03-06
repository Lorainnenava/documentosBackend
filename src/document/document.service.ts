import { Injectable } from '@nestjs/common';
import { ownCloudAdapter } from './adapter';
import { CarpetaAndSubCarpetaService } from './carpeta.service';

@Injectable()
export class DocumentUploadService {
  constructor(
    private _carpetaAndSubCarpetaService: CarpetaAndSubCarpetaService,
  ) {}

  //asi sirve averigua como crear una carpeta
  async upload(Body: Buffer | ArrayBuffer, key: string): Promise<any> {
    // Extraer el nombre del archivo de la key
    const buffer = Body instanceof ArrayBuffer ? Body : Buffer?.from(Body);
    const path: string[] = key.split('/');

    let currentPath: string = '';
    try {
      // Verifica si la carpeta existe de lo contrario la crea
      await this._carpetaAndSubCarpetaService.folderExist(path[0]);

      // Verificar si la primera subCarpeta existe dentro de la carpeta raíz, de lo contrario, crearla
      if (path.length > 1) {
        currentPath = `${path[0]}/${path[1]}/`;
        await this._carpetaAndSubCarpetaService.subFolderExist(currentPath);
      }

      // Crear las subCarpetas una por una
      for (let i = 2; i < path.length - 1; i++) {
        currentPath += `${path[i]}/`;
        await this._carpetaAndSubCarpetaService.subFolderExist(currentPath);
      }

      // Crea el archivo
      const createFile = await ownCloudAdapter('PUT', key, buffer);

      if (createFile.status === 201) {
        return 'Archivo guardado exitosamente';
      }
    } catch (error) {
      throw error;
    }
  }
}
