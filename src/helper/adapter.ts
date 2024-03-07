import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { DocumentResponseDto } from '../domain/documents/dto/response/documentResponse.dto';

@Injectable()
export class Helper {
  /**
   * Adaptador para manejar las solicitudes de ownCloud.
   * @param method - Método para realizar la solicitud.
   * @param key - Ruta identificadora del archivo.
   * @param body - Cuerpo del archivo.
   * @returns DocumentResponseDto
   */
  async ownCloudAdapter(
    method: string,
    key: string,
    Body?: Buffer | ArrayBuffer,
  ): Promise<DocumentResponseDto> {
    try {
      const response = await axios.request({
        method: method,
        url: `${process.env.OWNCLOUD_URL}/${key}`,
        data: Body && Body,
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(
            `${process.env.OWNCLOUD_USERNAME}:${process.env.OWNCLOUD_PASSWORD}`,
          ).toString('base64')}`,
        },
      });

      return {
        status: response.status,
        statusText: response.statusText,
        data: response.config.url,
      };
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return { status: 404, statusText: 'Not Found' };
      }
      throw error;
    }
  }

  /**
   * Verifica la existencia o crea una carpeta o una subcarpeta.
   * @param name - Nombre para buscar o crear una carpeta o subcarpeta.
   * @returns DocumentResponseDto
   */
  async folderOrSubFolderExist(name: string): Promise<DocumentResponseDto> {
    try {
      const searchFolderOrSubFolder = await this.ownCloudAdapter(
        'GET',
        `${name}`,
      );

      if (searchFolderOrSubFolder.status === 404) {
        await this.ownCloudAdapter('MKCOL', `${name}/`);
      }

      return searchFolderOrSubFolder;
    } catch (error) {
      throw error;
    }
  }
}
