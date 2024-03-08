import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

/**
 * Representa los datos de solicitud del documento.
 */
export class DocumentRequestDto {
  /**
   * Llave identificadora del docuemnto
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  key: string;
}
