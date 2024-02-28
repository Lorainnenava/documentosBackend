import { APP_PIPE } from '@nestjs/core';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { Module, ValidationPipe } from '@nestjs/common';
import { FileController } from './document/owncloud.controller';
import { DocumentUploadService } from './document/document.service';
import { CarpetaAndSubCarpetaService } from './document/carpeta.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController, FileController],
  providers: [
    AppService,
    CarpetaAndSubCarpetaService,
    DocumentUploadService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
