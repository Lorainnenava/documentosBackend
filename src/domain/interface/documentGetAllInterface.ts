import { DocumentResponseDto } from '../documents/dto/response/documentResponse.dto';

export interface DocumentGetAllInterface {
  getAll(): Promise<DocumentResponseDto[]>;
}
