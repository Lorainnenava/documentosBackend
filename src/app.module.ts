import { APP_PIPE } from '@nestjs/core';
import { Helper } from './helper/adapter';
import { ConfigModule } from '@nestjs/config';
import { Module, ValidationPipe } from '@nestjs/common';
import { FileController } from './controller/owncloud.controller';
import { DocumentUploadService } from './service/document/create/documentUpload.service';
import { DocumentGetFileService } from './service/document/getFile/documentGetFile.service';
import { FolderAndSubFoldersService } from './service/document/folderAndSobFolder/folderAndSubFolder.service';
import { DocumentUploadServiceMassive } from './service/document/bulkCreate/documentUpload.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [FileController],
  providers: [
    Helper,
    FolderAndSubFoldersService,
    DocumentUploadService,
    DocumentGetFileService,
    DocumentUploadServiceMassive,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
