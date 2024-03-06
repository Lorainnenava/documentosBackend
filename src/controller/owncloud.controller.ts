import {
  Body,
  Post,
  Controller,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { DocumentRequestDto } from '../interface/documentRequest.dto';
import { DocumentResponseDto } from '../interface/documentResponse.dto';
import { DocumentUploadService } from '../service/document/create/documentUpload.service';
import { DocumentGetFileService } from '../service/document/getFile/documentGetFile.service';

@ApiTags('files')
@Controller()
export class FileController {
  constructor(
    private readonly _documentUpload: DocumentUploadService,
    private readonly _documentGetFileService: DocumentGetFileService,
  ) {}

  /**
   * Upload file
   * @param file
   * @returns
   */
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        key: {
          type: 'string',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile('file')
    file: any,
    @Body('key') key: string,
  ): Promise<DocumentResponseDto> {
    return await this._documentUpload.upload(file?.buffer, key);
  }

  @Post('getFile')
  async getFile(
    @Body() request: DocumentRequestDto,
  ): Promise<DocumentResponseDto> {
    return await this._documentGetFileService.getFile(request.key);
  }
}
