import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { DocumentRequestDto } from '../interface/documentRequest.dto';
import { DocumentResponseDto } from '../interface/documentResponse.dto';

@Injectable()
export class Helper {
  async ownCloudAdapter(
    request: DocumentRequestDto,
  ): Promise<DocumentResponseDto> {
    try {
      const response = await axios.request({
        method: request.method,
        url: `${process.env.OWNCLOUD_URL}/${request.key}`,
        data: request.Body && request.Body,
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
}
