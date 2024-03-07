import { ApiProperty } from '@nestjs/swagger';

export class DocumentResponseDto {
  /**
   * El estado de la solicitud del documento.
   */
  @ApiProperty()
  status: number;

  /**
   * El texto del estado de la solicitud del documento.
   */
  @ApiProperty()
  statusText: string;

  /**
   * Data de la solicitud del documento
   */
  @ApiProperty()
  data?: string;
}
