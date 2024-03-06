import { Injectable } from '@nestjs/common';
import { Helper } from '../../../helper/adapter';

@Injectable()
export class DocumentGetFileService {
  constructor(private readonly _helper: Helper) {}

  async getFile(key: string): Promise<any> {
    try {
      const obtainFile = await this._helper.ownCloudAdapter({
        method: 'GET',
        key,
      });

      return obtainFile;
    } catch (error) {
      throw error;
    }
  }
}
