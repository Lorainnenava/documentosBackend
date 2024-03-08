import { ApiProperty } from '@nestjs/swagger';

/**
 * Representa los datos de respuesta del documento eliminado.
 */
export class DocumentDeleteResponseDto {
  /**
   * El identificador del documento.
   */
  @ApiProperty()
  id?: number;

  /**
   * El nombre del documento
   */
  @ApiProperty()
  fileName: string;

  /**
   * Llave del documento
   */
  @ApiProperty()
  key: string;

  /**
   * El estado del documento.
   */
  @ApiProperty()
  state?: number;

  /**
   * La fecha de creación del documento.
   */
  @ApiProperty()
  createdAt?: Date;

  /**
   * La fecha de actualización del documento.
   */
  @ApiProperty()
  updatedAt?: Date;

  /**
   * La fecha de eliminación del documento.
   */
  @ApiProperty()
  deletedAt?: Date;
}
