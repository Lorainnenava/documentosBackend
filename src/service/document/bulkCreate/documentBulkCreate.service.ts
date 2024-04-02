import { ConflictException, Injectable } from '@nestjs/common';
import { Helper } from '../../../helper/adapter';
import { DocumentRepository } from 'src/infrastructure/documentRepository';
import { In } from 'typeorm';

@Injectable()
export class DocumentUploadServiceMassive {
  constructor(
    private readonly _helper: Helper,
    private readonly _documentRepository: DocumentRepository,
  ) {}

  async upload(files: {
    body: { buffer: Buffer | ArrayBuffer; originalname: string }[];
    key: string;
  }): Promise<string[]> {
    const documents: string[] = [];

    const originalnames = files.body.map((file) => file.originalname);

    // Buscar documentos en la base de datos por originalnames
    const searchDocuments = await this._documentRepository.findAll({
      where: { fileName: In(originalnames), state: 1 },
    });

    console.log(searchDocuments, '🥑🥑🥑');

    // Verificar si hay algún documento existente
    if (searchDocuments.length > 0) {
      throw new ConflictException(
        'Ya existe un registro con al menos uno de los nombres de archivo.',
      );
    }

    // Si no hay conflictos, proceder con la carga masiva
    // Resto del código para la carga masiva...

    const reducedData = files.body.map((current, index) => {
      const uniqueKey = `${files.key}/${index}/${current.originalname}`;
      return {
        fileName: current.originalname,
        key: uniqueKey,
        buffer: current.buffer,
      };
    });

    for (const file of reducedData) {
      console.log(file, '🍕🍕🍕');

      try {
        const createResult = await this._documentRepository.create(file);

        const createdId = createResult.id;

        const updatedUniqueKey = `${files.key}/${createdId}/${file.fileName}`;
        createResult.key = updatedUniqueKey;

        const see = await this._documentRepository.save(createResult);
        console.log(see, '🧀🧀');

        documents.push(updatedUniqueKey);

        const path: string[] = updatedUniqueKey.split('/');
        let currentPath: string = '';

        try {
          // Verifica si la carpeta existe; de lo contrario, la crea
          await this._helper.folderOrSubFolderExist(`${path[0]}/`);

          // Verificar si la primera subCarpeta existe dentro de la carpeta raíz; de lo contrario, crearla
          if (path.length > 1) {
            currentPath = `${path[0]}/${path[1]}/`;
            await this._helper.folderOrSubFolderExist(currentPath);
          }

          // Crear las subCarpetas una por una
          for (let i = 2; i < path.length - 1; i++) {
            currentPath += `${path[i]}/`;
            await this._helper.folderOrSubFolderExist(currentPath);
          }

          // Crea el archivo
          const createFile = await this._helper.ownCloudAdapter(
            'PUT',
            updatedUniqueKey,
            file.buffer,
          );

          if (createFile.status === 201) {
            documents.push(`Archivo ${updatedUniqueKey} guardado exitosamente`);
          }
        } catch (error) {
          throw error;
        }
      } catch (error) {
        throw error;
      }
    }

    return documents;
  }
}
