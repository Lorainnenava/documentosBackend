import { Injectable } from '@nestjs/common';
import { ownCloudAdapter } from './adapter';

@Injectable()
export class CarpetaAndSubCarpetaService {
  constructor() {}

  async folderExist(
    name: string,
  ): Promise<{ status: number; statusText: string }> {
    try {
      const obtainFolder = await ownCloudAdapter('GET', `${name}/`);

      if (obtainFolder.status === 404) {
        await ownCloudAdapter('MKCOL', `${name}/`);
      }

      return obtainFolder;
    } catch (error) {
      throw error;
    }
  }

  async subFolderExist(
    name: string,
  ): Promise<{ status: number; statusText: string }> {
    try {
      const obtainSubFolder = await ownCloudAdapter('GET', `${name}`);

      if (obtainSubFolder.status === 404) {
        await ownCloudAdapter('MKCOL', `${name}/`);
      }

      return obtainSubFolder;
    } catch (error) {
      throw error;
    }
  }
}
