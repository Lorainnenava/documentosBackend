import { Injectable } from '@nestjs/common';
import { Helper } from '../../../helper/adapter';
import { DocumentResponseDto } from '../../../domain/documents/dto/response/documentResponse.dto';

@Injectable()
export class DocumentGetFileService {
  constructor(private readonly _helper: Helper) {}

  async getFile(key: string): Promise<DocumentResponseDto> {
    try {
      const obtainFile = await this._helper.ownCloudAdapter('GET', key);

      return obtainFile;
    } catch (error) {
      throw error;
    }
  }
}
