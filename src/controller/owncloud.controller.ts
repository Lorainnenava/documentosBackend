import {
  Body,
  Post,
  Controller,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
  UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { DocumentUploadService } from '../service/document/create/documentUpload.service';
import { DocumentGetFileService } from '../service/document/getFile/documentGetFile.service';
import { DocumentUploadServiceMasive } from 'src/service/document/bultCreate/documentUpload.service';

@ApiTags('files')
@Controller()
export class FileController {
  constructor(
    private readonly _documentUpload: DocumentUploadService,
    private readonly _documentGetFileService: DocumentGetFileService,
    private readonly _documentGetFileServiceMasive: DocumentUploadServiceMasive,
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
  ): Promise<string> {
    return await this._documentUpload.upload(file?.buffer, key);
  }

  /**
   * Upload multiple files using mass upload service
   * @param files
   * @param keys
   * @returns
   */
  @Post('masive')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
        key: {
          type: 'string',
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(
    @UploadedFiles() files: any[],
    @Body('key') key: string,
  ): Promise<string[]> {
    const fileObjects = files.map((file) => ({
      buffer: file.buffer,
      originalname: file.originalname,
    }));
    return await this._documentGetFileServiceMasive.upload({
      body: fileObjects,
      key,
    });
  }

  @Get('getFile/:key')
  async getFile(@Param('key') key: string): Promise<any> {
    return await this._documentGetFileService.getFile(key);
  }
}
