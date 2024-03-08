import {
  Put,
  Body,
  Post,
  Controller,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { DocumentUpload } from '../service/document/create/documentUpload.service';
import { DocumentDelete } from '../service/document/delete/documentDelete.service';
import { DocumentGetFile } from '../service/document/getFile/documentGetFile.service';
import { DocumentRequestDto } from '../domain/documents/dto/request/documentRequest.dto';
import { DocumentResponseDto } from '../domain/documents/dto/response/documentResponse.dto';
import { DocumentDeleteResponseDto } from '../domain/documents/dto/response/documentDeleteResponse.dto';

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
    private readonly _documentDelete: DocumentDelete,
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
}
