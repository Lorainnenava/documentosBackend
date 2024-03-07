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
import { DocumentRequestDto } from '../domain/documents/dto/request/documentRequest.dto';
import { DocumentUploadService } from '../service/document/create/documentUpload.service';
import { DocumentDeleteService } from '../service/document/delete/documentDelete.service';
import { DocumentResponseDto } from '../domain/documents/dto/response/documentResponse.dto';
import { DocumentGetFileService } from '../service/document/getFile/documentGetFile.service';

@ApiTags('Document')
@Controller('document')
export class DocumentController {
  constructor(
    private readonly _documentUpload: DocumentUploadService,
    private readonly _documentGetFileService: DocumentGetFileService,
    private readonly _documentDeleteService: DocumentDeleteService,
  ) {}

  /**
   * Crear documento
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
   * Obtener un documento
   * @param request
   * @returns
   */
  @Post('getFile')
  async getFile(
    @Body() request: DocumentRequestDto,
  ): Promise<DocumentResponseDto> {
    return await this._documentGetFileService.getFile(request.key);
  }

  /**
   * Eliminar un documento
   * @param request
   * @returns
   */
  @Put('deleteFile')
  async deleteFile(
    @Body() request: DocumentRequestDto,
  ): Promise<DocumentResponseDto> {
    return await this._documentDeleteService.deleteFile(request.key);
  }
}
