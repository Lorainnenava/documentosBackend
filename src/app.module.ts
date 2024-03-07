import { APP_PIPE } from '@nestjs/core';
import { Helper } from './helper/adapter';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, ValidationPipe } from '@nestjs/common';
import { DocumentController } from './controller/document.controller';
import { DocumentRepository } from './infrastructure/documentRepository';
import { DocumentEntity } from './domain/documents/entity/document.entity';
import { DocumentUploadService } from './service/document/create/documentUpload.service';
import { DocumentDeleteService } from './service/document/delete/documentDelete.service';
import { DocumentGetFileService } from './service/document/getFile/documentGetFile.service';
import { FolderAndSubFoldersService } from './service/document/folderAndSobFolder/folderAndSubFolder.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT),
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USER,
      entities: [DocumentEntity],
      database: process.env.DB_NAME,
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([DocumentEntity]),
  ],
  controllers: [DocumentController],
  providers: [
    Helper,
    FolderAndSubFoldersService,
    DocumentRepository,
    DocumentUploadService,
    DocumentGetFileService,
    DocumentDeleteService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
  exports: [Helper, FolderAndSubFoldersService, TypeOrmModule],
})
export class AppModule {}
