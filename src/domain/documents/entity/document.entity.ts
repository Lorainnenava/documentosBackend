import {
  Column,
  Entity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**
 * Representa los datos de la entidad para el documento.
 */
@Entity({
  name: 'documents',
  schema: 'public',
})
export class DocumentEntity {
  /**
   * El identificador del documento.
   */
  @PrimaryGeneratedColumn()
  id?: number;

  /**
   * El nombre del documento
   */
  @Column({ type: 'varchar' })
  fileName: string;

  /**
   * Llave del documento
   */
  @Column({ type: 'varchar' })
  key: string;

  /**
   * El estado del documento.
   */
  @Column({ type: 'int', default: 1 })
  state?: number;

  /**
   * La fecha de creación del documento.
   */
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt?: Date;

  /**
   * La fecha de actualización del documento.
   */
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt?: Date;

  /**
   * La fecha de eliminación del documento.
   */
  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
