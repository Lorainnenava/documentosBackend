import { Injectable } from '@nestjs/common';
import { Helper } from '../../../helper/adapter';

@Injectable()
export class FolderAndSubFoldersService {
  constructor(private readonly _hepler: Helper) {}

  async folderExist(
    name: string,
  ): Promise<{ status: number; statusText: string }> {
    try {
      const obtainFolder = await this._hepler.ownCloudAdapter({
        method: 'GET',
        key: `${name}/`,
      });

      if (obtainFolder.status === 404) {
        await this._hepler.ownCloudAdapter({
          method: 'MKCOL',
          key: `${name}/`,
        });
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
      const obtainSubFolder = await this._hepler.ownCloudAdapter({
        method: 'GET',
        key: `${name}`,
      });

      if (obtainSubFolder.status === 404) {
        await this._hepler.ownCloudAdapter({
          method: 'MKCOL',
          key: `${name}/`,
        });
      }

      return obtainSubFolder;
    } catch (error) {
      throw error;
    }
  }
}
