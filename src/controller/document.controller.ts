import {
  Put,
  Body,
  Post,
  Controller,
  UploadedFile,
  UseInterceptors,
  UploadedFiles,
  Get,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { DocumentUpload } from '../service/document/create/documentUpload.service';
import { DocumentDelete } from '../service/document/delete/documentDelete.service';
import { DocumentGetFile } from '../service/document/getFile/documentGetFile.service';
import { DocumentRequestDto } from '../domain/documents/dto/request/documentRequest.dto';
import { DocumentResponseDto } from '../domain/documents/dto/response/documentResponse.dto';
import { DocumentDeleteResponseDto } from '../domain/documents/dto/response/documentDeleteResponse.dto';
import { DocumentUploadServiceMassive } from '../service/document/bulkCreate/documentBulkCreate.service';
import { DocumentGetAll } from 'src/service/document/getAll/documentGetAll.service';

/**
 * @class
 * @public
 * @name DocumentController
 * @description Esta clase es el controlador de la aplicación
 */
@ApiTags('Document')
@Controller('document')
export class DocumentController {
  /**
   * @constructor
   * @param _documentUpload
   * @param _documentGetFileService
   * @param _documentDeleteService
   */
  constructor(
    private readonly _documentUpload: DocumentUpload,
    private readonly _documentGetFile: DocumentGetFile,
    private readonly _documentGetAll: DocumentGetAll,
    private readonly _documentDelete: DocumentDelete,
    private readonly _documentBulkCreate: DocumentUploadServiceMassive,
  ) {}

  /**
   * Crear documento
   * @param file - El objeto de solicitud del documento.
   * @returns Una promesa que resuelve el objeto de respuesta del documento.
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
    return await this._documentUpload.handle(file?.buffer, key);
  }

  /**
   * Obtener un documento
   * @param request - El objeto de solicitud del documento.
   * @returns Una promesa que resuelve el objeto de respuesta del documento.
   */
  @Post('getFile')
  async getFile(
    @Body() request: DocumentRequestDto,
  ): Promise<DocumentResponseDto> {
    return await this._documentGetFile.handle(request.key);
  }

  /**
   * Obtener un documento
   * @param request - El objeto de solicitud del documento.
   * @returns Una promesa que resuelve el objeto de respuesta del documento.
   */
  @Get('getAllDocuments')
  async getAllDocuments(): Promise<DocumentResponseDto[]> {
    return await this._documentGetAll.getAll();
  }

  /**
   * Eliminar un documento
   * @param request - El objeto de solicitud del documento.
   * @returns Una promesa que resuelve el objeto de respuesta del documento.
   */
  @Put('deleteFile')
  async deleteFile(
    @Body() request: DocumentRequestDto,
  ): Promise<DocumentDeleteResponseDto> {
    return await this._documentDelete.handle(request.key);
  }

  /**
   * Upload multiple files using mass upload service
   * @param files
   * @param keys
   * @returns
   */
  @Post('massive')
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
    return await this._documentBulkCreate.upload({
      body: fileObjects,
      key,
    });
  }
}
